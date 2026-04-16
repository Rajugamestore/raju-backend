const express = require("express");
const cors = require("cors");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const USERNAME = process.env.DIGI_USERNAME;
const API_KEY = process.env.DIGI_API_KEY;

function md5(text) {
  return crypto.createHash("md5").update(text).digest("hex");
}

app.get("/", (req, res) => {
  res.send("Raju backend aktif ✅");
});

app.post("/order", async (req, res) => {
  try {
    const { customer_no, buyer_sku_code } = req.body;

    const ref_id = "INV-" + Date.now();
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
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server jalan di port " + PORT);
});
