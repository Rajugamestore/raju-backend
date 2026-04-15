require("dotenv").config();
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// 🔥 CREATE PAYMENT
app.post("/create-payment", async (req, res) => {
  const { orderId, amount } = req.body;

  try {
    const response = await axios.post(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        transaction_details: {
          order_id: orderId,
          gross_amount: amount,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(process.env.MIDTRANS_SERVER_KEY + ":").toString("base64"),
        },
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔐 SIGN DIGIFLAZZ
function createSign(username, apiKey, ref_id) {
  return crypto
    .createHash("md5")
    .update(username + apiKey + ref_id)
    .digest("hex");
}

// 🔥 WEBHOOK MIDTRANS
app.post("/midtrans-webhook", async (req, res) => {
  const data = req.body;

  if (data.transaction_status === "settlement") {
    try {
      const digi = await axios.post(
        "https://api.digiflazz.com/v1/transaction",
        {
          username: process.env.DIGI_USERNAME,
          buyer_sku_code: "ML86",
          customer_no: "12345678",
          ref_id: data.order_id,
          sign: createSign(
            process.env.DIGI_USERNAME,
            process.env.DIGI_API_KEY,
            data.order_id
          ),
        }
      );

      console.log("DIGIFLAZZ:", digi.data);
    } catch (err) {
      console.log(err.message);
    }
  }

  res.send("OK");
});

app.get("/", (req, res) => {
  res.send("RAJU BACKEND RUNNING 🔥");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("SERVER RUNNING 🔥");
});app.get("/", (req, res) => {
  res.send("RAJU BACKEND AKTIF 🚀");
});app.use(express.json());
