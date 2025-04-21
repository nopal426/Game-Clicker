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
  document.getElementById("skor").classList.add("flash");
  document.getElementById("klikBtn").classList.add("bounce");

  const sound = document.getElementById("klikSound");
  sound.currentTime = 0;
  sound.play();

  setTimeout(() => {
    document.getElementById("skor").classList.remove("flash");
    document.getElementById("klikBtn").classList.remove("bounce");
  }, 200);
}

function hitungMundur() {
  waktu--;
  document.getElementById("timer").innerText = "Time Left: " + waktu + " seconds";

  if (waktu <= 0) {
    clearInterval(timer);
    jalan = false;

    if (skor > highscore) {
      highscore = skor;
      localStorage.setItem("highscore", skor);
    }

    document.getElementById("highscore").innerText = "High Score: " + highscore;

    // Modal & Confetti
    document.getElementById("finalSkor").innerText = skor;
    document.getElementById("finalSkor").classList.add("animate");
    document.getElementById("hasilModal").style.display = "flex";

    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.6 }
    });
  }
}

function restartGame() {
  clearInterval(timer);
  skor = 0;
  waktu = 60;
  jalan = false;
  document.getElementById("skor").innerText = skor;
  document.getElementById("timer").innerText = "Time Left: 60 seconds";
  document.getElementById("klikBtn").disabled = false;
  document.getElementById("hasilModal").style.display = "none";
  document.getElementById("finalSkor").classList.remove("animate");
}

function toggleTema() {
  document.body.classList.toggle("terang");
}

function tutupModal() {
  document.getElementById("hasilModal").style.display = "none";
}