const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ===== FRONTEND =====
app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Raju Game Store</title>
  </head>
  <body style="font-family: Arial; text-align:center; background:#0b5ed7; color:white; padding:50px;">
    
    <h1>MOBILE LEGENDS</h1>

    <p>10 Diamond - 2.853</p>
    <p>12 Diamond - 3.347</p>
    <p>150 Diamond - 38.517</p>
    <p>220 Diamond - 56.263</p>

    <br>

    <input id="userId" placeholder="Masukkan ID" style="padding:10px;">
    <br><br>

    <select id="diamond" style="padding:10px;">
      <option value="10">10 Diamond</option>
      <option value="12">12 Diamond</option>
      <option value="150">150 Diamond</option>
      <option value="220">220 Diamond</option>
    </select>

    <br><br>

    <button onclick="beli()" style="padding:10px; background:#00c853; color:white; border:none;">
      BELI
    </button>

    <p id="result"></p>

    <script>
      function beli() {
        const userId = document.getElementById("userId").value;
        const diamond = document.getElementById("diamond").value;

        fetch("/beli", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ userId, diamond })
        })
        .then(res => {
          if (!res.ok) {
            throw new Error("Server error");
          }
          return res.json();
        })
        .then(data => {
          document.getElementById("result").innerText = data.message;
        })
        .catch(err => {
          document.getElementById("result").innerText = "Error: " + err.message;
        });
      }
    </script>

  </body>
  </html>
  `);
});

// ===== BACKEND =====
app.post("/beli", (req, res) => {
  const { userId, diamond } = req.body;

  if (!userId || !diamond) {
    return res.status(400).json({
      success: false,
      message: "Isi ID dan diamond dulu"
    });
  }

  res.json({
    success: true,
    message: "Berhasil beli " + diamond + " diamond untuk ID " + userId
  });
});

// ===== PORT (WAJIB RAILWAY) =====
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
