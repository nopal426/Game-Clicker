let skor = 0;
let waktu = 60;
let jalan = false;

let highscore = localStorage.getItem("highscore") || 0;
document.getElementById("highscore").innerText = `Skor Tertinggi: ${highscore}`;

function klik() {
  if (!jalan) {
    mulaiTimer();
    jalan = true;
  }

  skor++;
  document.getElementById("skor").innerText = skor;

  // efek bounce
  const btn = document.getElementById("klikBtn");
  btn.classList.add("bounce");
  setTimeout(() => btn.classList.remove("bounce"), 200);

  // efek flash skor
  const skorEl = document.getElementById("skor");
  skorEl.classList.add("flash");
  setTimeout(() => skorEl.classList.remove("flash"), 200);

  // suara klik
  const sound = document.getElementById("klikSound");
  sound.currentTime = 0;
  sound.play();
}

function mulaiTimer() {
  const timer = setInterval(() => {
    waktu--;
    document.getElementById("timer").innerText = `Waktu: ${waktu} detik`;

    if (waktu <= 0) {
      clearInterval(timer);
      document.getElementById("timer").innerText = "Waktu Habis!";
      document.getElementById("klikBtn").disabled = true;

      if (skor > highscore) {
        localStorage.setItem("highscore", skor);
        document.getElementById("highscore").innerText = `Skor Tertinggi: ${skor}`;
        alert("Selamat! Skor tertinggi baru!");
      }
    }
  }, 1000);
}

function restartGame() {
  skor = 0;
  waktu = 60;
  jalan = false;
  document.getElementById("skor").innerText = skor;
  document.getElementById("timer").innerText = "Waktu: 10 detik";
  document.getElementById("klikBtn").disabled = false;
}

function toggleTema() {
  document.body.classList.toggle("terang");
}
