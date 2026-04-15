const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const username = process.env.DIGI_USERNAME;
const apiKey = process.env.DIGI_API_KEY;

app.post("/order", async (req, res) => {
  const { userId, productCode } = req.body;

  const refId = "RAJU-" + Date.now();
  const sign = crypto
    .createHash("md5")
    .update(username + apiKey + refId)
    .digest("hex");

  try {
    const response = await axios.post(
      "https://api.digiflazz.com/v1/transaction",
      {
        username,
        buyer_sku_code: productCode,
        customer_no: userId,
        ref_id: refId,
        sign,
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running"));
