// backend/src/routes/quadTreeRoutes.js
const express = require("express");
const { insertPoint, searchPoints } = require("../controllers/quadTreeController");
const router = express.Router();

// Route to insert a point into the QuadTree
router.post("/insert", insertPoint);

// Route to search for points within a range
router.get("/search", searchPoints);

module.exports = router;

