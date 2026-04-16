const express = require("express");
const fetch = require("node-fetch");

const app = express();

app.get("/proxy", async (req, res) => {
  try {
    const url = req.query.url;

    if (!url) {
      return res.send("No URL provided");
    }

    const response = await fetch(url);
    let text = await response.text();

    // VERY basic rewriting (you will improve this)
    text = text.replace(/href="\//g, `href="${url}/`);
    text = text.replace(/src="\//g, `src="${url}/`);

    res.send(text);
  } catch (err) {
    res.send("Error fetching site");
  }
});

app.listen(3000, () => console.log("Server running"));