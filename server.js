import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/expand", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: "Missing URL" });
  }

  try {
    const response = await fetch(url, {
      redirect: "follow",
    });

    const finalUrl = response.url;

    res.json({ finalUrl });
  } catch (err) {
    res.status(500).json({ error: "Failed to expand URL" });
  }
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
