// backend/src/controllers/quadTreeController.js
const { QuadTree, Point } = require("../services/quadTreeService");

// Initialize QuadTree with a default boundary
const quadTree = new QuadTree({ x: 0, y: 0, width: 1000, height: 1000 });

// Insert a point into the QuadTree
exports.insertPoint = (req, res) => {
  const { x, y, data } = req.body;
  if (x === undefined || y === undefined) {
    return res.status(400).json({ error: "x and y coordinates are required" });
  }
  
  const point = new Point(x, y, data);
  quadTree.insert(point);
  res.json({ message: "Point inserted successfully!", point });
};

// Search for points within a given range in the QuadTree
exports.searchPoints = (req, res) => {
  const { x, y, range } = req.query;
  if (x === undefined || y === undefined || range === undefined) {
    return res.status(400).json({ error: "x, y, and range are required" });
  }
  
  const results = quadTree.search({ x: Number(x), y: Number(y), range: Number(range) });
  res.json({ results });
};

