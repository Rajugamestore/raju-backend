const express = require("express");
const app = express();

app.use(express.json());

// ===== DATA 9 GAME + 20 TOP UP =====
const dataGame = {
  "Mobile Legends": Array.from({ length: 20 }, (_, i) => [`${(i+1)*10} Diamond`, `${(i+1)*3000}`]),
  "Free Fire": Array.from({ length: 20 }, (_, i) => [`${(i+1)*5} Diamond`, `${(i+1)*2000}`]),
  "Valorant": Array.from({ length: 20 }, (_, i) => [`${(i+1)*100} VP`, `${(i+1)*10000}`]),
  "PUBG Mobile": Array.from({ length: 20 }, (_, i) => [`${(i+1)*60} UC`, `${(i+1)*15000}`]),
  "Roblox": Array.from({ length: 20 }, (_, i) => [`${(i+1)*80} Robux`, `${(i+1)*12000}`]),
  "Sausage Man": Array.from({ length: 20 }, (_, i) => [`${(i+1)*60} Candy`, `${(i+1)*8000}`]),
  "Genshin Impact": Array.from({ length: 20 }, (_, i) => [`${(i+1)*60} Crystal`, `${(i+1)*15000}`]),
  "Blood Strike": Array.from({ length: 20 }, (_, i) => [`${(i+1)*100} Gold`, `${(i+1)*9000}`]),
  "COD Mobile": Array.from({ length: 20 }, (_, i) => [`${(i+1)*80} CP`, `${(i+1)*12000}`])
};

// ===== HALAMAN UTAMA =====
app.get("/", (req, res) => {
  res.send(`
  <html>
  <body style="font-family:Arial;background:#0b5ed7;color:white;text-align:center;padding:30px;">

  <h1>RAJU GAME STORE</h1>
  <h2>Pilih Game</h2>

  ${Object.keys(dataGame).map(game => `
    <div style="margin:10px;">
      <a href="/game?nama=${game}" style="color:white;text-decoration:none;">
        <div style="background:#1c6ed5;padding:15px;border-radius:10px;">
          <h3>${game}</h3>
        </div>
      </a>
    </div>
  `).join("")}

  </body>
  </html>
  `);
});

// ===== HALAMAN TOP UP =====
app.get("/game", (req, res) => {
  const game = req.query.nama;
  const list = dataGame[game];

  res.send(`
  <html>
  <body style="font-family:Arial;background:#0b5ed7;color:white;text-align:center;padding:30px;">

  <h1>${game}</h1>

  <input id="userId" placeholder="Masukkan ID" style="padding:10px;width:200px;">
  <br><br>

  <select id="nominal" style="padding:10px;width:200px;">
    ${list.map(item => `<option>${item[0]} - ${item[1]}</option>`).join("")}
  </select>

  <br><br>

  <button onclick="beli()" style="padding:10px 20px;background:#00c853;color:white;border:none;">
    BELI
  </button>

  <h2 id="result"></h2>

  <script>
    function beli(){
      const userId = document.getElementById("userId").value;
      const nominal = document.getElementById("nominal").value;

      fetch("/beli", {
        method:"POST",
        headers:{ "Content-Type":"application/json" },
        body: JSON.stringify({ userId, nominal, game:"${game}" })
      })
      .then(res => res.json())
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

// ===== API =====
app.post("/beli", (req, res) => {
  const { userId, nominal, game } = req.body;

  if (!userId || !nominal) {
    return res.json({
      success: false,
      message: "Isi ID dan pilih nominal dulu"
    });
  }

  res.json({
    success: true,
    message: "Berhasil beli " + nominal + " untuk " + game + " ID " + userId
  });
});

// ===== PORT RAILWAY =====
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log("Server jalan di port " + PORT);
});
