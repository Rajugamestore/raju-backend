const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server raju-backend berhasil jalan di Railway");
});

// Contoh API beli diamond
app.post("/beli", (req, res) => {
  const { userId, diamond } = req.body;

  if (!userId || !diamond) {
    return res.status(400).json({
      success: false,
      message: "User ID dan jumlah diamond wajib diisi",
    });
  }

  res.json({
    success: true,
    message: "Pembelian berhasil diproses",
    data: {
      userId,
      diamond,
    },
  });
});

// Railway wajib pakai process.env.PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server jalan di port ${PORT}`);
});
