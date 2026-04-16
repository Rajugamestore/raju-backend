const express = require("express");
const path = require("path");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.static(__dirname));

const USERNAME = process.env.DIGI_USERNAME;
const API_KEY = process.env.DIGI_API_KEY;

function md5(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// API ORDER
app.post("/api/order", async (req, res) => {
  try {
    const { buyer_sku_code, customer_no, ref_id } = req.body;

    const sign = md5(USERNAME + API_KEY + ref_id);

    const response = await fetch("https://api.digiflazz.com/v1/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: USERNAME,
        buyer_sku_code,
        customer_no,
        ref_id,
        sign
      })
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server jalan di port " + PORT);
});
