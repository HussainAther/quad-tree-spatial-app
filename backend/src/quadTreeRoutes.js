// backend/src/index.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { Pool } = require("pg");

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test route
app.get("/", (req, res) => {
  res.send("QuadTree Spatial API is running 🚀");
});

// API routes
const quadTreeRoutes = require("./routes/quadTreeRoutes");
app.use("/api/quadTree", quadTreeRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// backend/src/routes/quadTreeRoutes.js
const express = require("express");
const { insertPoint, searchPoints } = require("../controllers/quadTreeController");
const router = express.Router();

router.post("/insert", insertPoint);
router.get("/search", searchPoints);

module.exports = router;

// backend/src/controllers/quadTreeController.js
const { QuadTree, Point } = require("../services/quadTreeService");
const quadTree = new QuadTree({ x: 0, y: 0, width: 1000, height: 1000 });

exports.insertPoint = (req, res) => {
  const { x, y, data } = req.body;
  const point = new Point(x, y, data);
  quadTree.insert(point);
  res.json({ message: "Point inserted successfully!", point });
};

exports.searchPoints = (req, res) => {
  const { x, y, range } = req.query;
  const results = quadTree.search({ x: Number(x), y: Number(y), range: Number(range) });
  res.json({ results });
};

// backend/src/services/quadTreeService.js
class Point {
  constructor(x, y, data = null) {
    this.x = x;
    this.y = y;
    this.data = data;
  }
}

class QuadTree {
  constructor(boundary, capacity = 4) {
    this.boundary = boundary;
    this.capacity = capacity;
    this.points = [];
    this.divided = false;
  }

  insert(point) {
    if (!this.contains(point)) return false;
    
    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    }
    
    if (!this.divided) this.subdivide();
    return this.northeast.insert(point) || this.northwest.insert(point) || 
           this.southeast.insert(point) || this.southwest.insert(point);
  }

  contains(point) {
    return (
      point.x >= this.boundary.x &&
      point.x <= this.boundary.x + this.boundary.width &&
      point.y >= this.boundary.y &&
      point.y <= this.boundary.y + this.boundary.height
    );
  }
  
  search(range) {
    let found = [];
    if (!this.intersects(range)) return found;
    
    for (let p of this.points) {
      if (p.x >= range.x - range.range && p.x <= range.x + range.range &&
          p.y >= range.y - range.range && p.y <= range.y + range.range) {
        found.push(p);
      }
    }
    
    if (this.divided) {
      found = found.concat(this.northeast.search(range));
      found = found.concat(this.northwest.search(range));
      found = found.concat(this.southeast.search(range));
      found = found.concat(this.southwest.search(range));
    }
    return found;
  }
  
  subdivide() {
    const { x, y, width, height } = this.boundary;
    const w = width / 2;
    const h = height / 2;
    
    this.northeast = new QuadTree({ x: x + w, y, width: w, height: h });
    this.northwest = new QuadTree({ x, y, width: w, height: h });
    this.southeast = new QuadTree({ x: x + w, y: y + h, width: w, height: h });
    this.southwest = new QuadTree({ x, y: y + h, width: w, height: h });
    
    this.divided = true;
  }
}

module.exports = { QuadTree, Point };

