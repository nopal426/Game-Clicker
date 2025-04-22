const WEB_APP_URL = "https://script.google.com/macros/s/PASTE_LINK_LU_DI_SINI/exec";

let skor = 0;
let waktu = 60;
let timer;
let jalan = false;

let highscore = localStorage.getItem("highscore") || 0;
document.getElementById("highscore").innerText = "High Score: " + highscore;

function klik() {
  if (!jalan) {
    jalan = true;
    timer = setInterval(hitungMundur, 1000);
  }

  skor++;
  document.getElementById("skor").innerText = skor;
}

function hitungMundur() {
  waktu--;
  document.getElementById("timer").innerText = "Time Left: " + waktu + " seconds";

  if (waktu <= 0) {
    clearInterval(timer);
    jalan = false;

    const nama = document.getElementById("namaPemain").value || "Anonymous";
    if (skor > highscore) {
      highscore = skor;
      localStorage.setItem("highscore", skor);
    }

    document.getElementById("highscore").innerText = "High Score: " + highscore;
    document.getElementById("finalNama").innerText = nama;
    document.getElementById("finalSkor").innerText = skor;
    document.getElementById("hasilModal").style.display = "flex";

    fetch(WEB_APP_URL, {
      method: "POST",
      body: JSON.stringify({ nama, skor }),
      headers: { "Content-Type": "application/json" }
    }).then(() => loadLeaderboard());
  }
}

function restartGame() {
  skor = 0;
  waktu = 60;
  jalan = false;
  document.getElementById("skor").innerText = skor;
  document.getElementById("timer").innerText = "Time Left: 60 seconds";
  document.getElementById("hasilModal").style.display = "none";
  clearInterval(timer);
}

function tutupModal() {
  document.getElementById("hasilModal").style.display = "none";
}

function loadLeaderboard() {
  const sheetID = WEB_APP_URL.split("/")[5];
  const url = `https://opensheet.elk.sh/${sheetID}/Sheet1`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => b.skor - a.skor);
      let isi = "";
      data.slice(0, 10).forEach(row => {
        isi += `<li>${row.nama}: ${row.skor}</li>`;
      });
      document.getElementById("daftarPemain").innerHTML = isi;
    });
}

loadLeaderboard();