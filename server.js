require("dotenv").config();

const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// TEST ROOT
app.get("/", (req, res) => {
  res.send("Raju backend running✅");
});

// CEK SALDO DIGIFLAZZ
app.get("/cek-saldo", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.digiflazz.com/v1/cek-saldo",
      {
        cmd: "deposit",
        username: process.env.DIGIFLAZZ_USERNAME,
        sign: process.env.DIGIFLAZZ_API_KEY
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message
    });
  }
});

// SERVER
app.listen(process.env.PORT || 3000, () => {
  console.log("Server jalan 🚀");
});
