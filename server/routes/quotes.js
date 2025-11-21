const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/", async (req, res) => {
  try {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();

    if (data && data[0]) {
      res.json({
        quote: data[0].q,
        author: data[0].a,
      });
    } else {
      res.json({
        quote: "Keep pushing forward!",
        author: "Unknown",
      });
    }
  } catch (err) {
    console.error("Error fetching quote:", err);
    res.status(500).json({ error: "Failed to fetch quote" });
  }
});

module.exports = router;
