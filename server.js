require("dotenv").config();

const express = require("express");
const axios = require("axios");
const crypto = require("crypto");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Raju backend running✅");
});

app.get("/cek-saldo", async (req, res) => {
  try {
    const username = process.env.DIGIFLAZZ_USERNAME;
    const apiKey = process.env.DIGIFLAZZ_API_KEY;

    const sign = crypto
      .createHash("md5")
      .update(username + apiKey + "depo")
      .digest("hex");

    const response = await axios.post("https://api.digiflazz.com/v1/cek-saldo", {
      cmd: "deposit",
      username,
      sign
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.response?.data || error.message
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server jalan 🚀");
});
