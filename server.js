const express = require("express");
const path = require("path");

const app = express();

const port = process.env.PORT || 3000;

// ambil file static (css, dll)
app.use(express.static(__dirname));

// tampilkan index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, () => {
  console.log("Server jalan di port " + port);
});
