let score = 0;
let time = 60;
let running = false;
let currentUser = "";

function login() {
  const input = document.getElementById("username").value.trim();
  if (!input) return alert("Please enter a username.");

  currentUser = input;
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("gameSection").style.display = "block";
  document.getElementById("currentUser").innerText = currentUser;

  loadHighScore();
  showLeaderboard();
}

function clickMe() {
  if (!running) {
    startTimer();
    running = true;
  }

  score++;
  document.getElementById("score").innerText = score;

  const clickSound = document.getElementById("clickSound");
  clickSound.currentTime = 0;
  clickSound.play();
}

function startTimer() {
  const timer = setInterval(() => {
    time--;
    document.getElementById("timer").innerText = `Time: ${time} seconds`;

    if (time <= 0) {
      clearInterval(timer);
      document.getElementById("clickBtn").disabled = true;
      document.getElementById("timer").innerText = "Time's up!";
      saveScore();
    }
  }, 1000);
}

function restartGame() {
  score = 0;
  time = 60;
  running = false;
  document.getElementById("score").innerText = score;
  document.getElementById("timer").innerText = "Time: 60 seconds";
  document.getElementById("clickBtn").disabled = false;
}

function saveScore() {
  const data = JSON.parse(localStorage.getItem("leaderboard")) || {};
  if (!data[currentUser]) data[currentUser] = 0;

  if (score > data[currentUser]) {
    data[currentUser] = score;
    localStorage.setItem("leaderboard", JSON.stringify(data));
    document.getElementById("highscore").innerText = `High Score: ${score}`;
    alert("New high score!");
  }

  showLeaderboard();
}

function loadHighScore() {
  const data = JSON.parse(localStorage.getItem("leaderboard")) || {};
  const high = data[currentUser] || 0;
  document.getElementById("highscore").innerText = `High Score: ${high}`;
}

function showLeaderboard() {
  const data = JSON.parse(localStorage.getItem("leaderboard")) || {};
  const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]).slice(0, 5);

  const list = document.getElementById("leaderboard");
  list.innerHTML = "";
  sorted.forEach(([user, sc], i) => {
    const li = document.createElement("li");
    li.textContent = `${i + 1}. ${user} - ${sc}`;
    list.appendChild(li);
  });
}
