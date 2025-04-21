let score = 0;
let timeLeft = 60;
let username = "";
let timerInterval;

function login() {
  const input = document.getElementById("username");
  if (input.value.trim() === "") return alert("Enter a username!");
  username = input.value;
  document.getElementById("display-name").innerText = username;
  document.getElementById("login-container").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  startGame();
}

function startGame() {
  score = 0;
  timeLeft = 60;
  document.getElementById("score").innerText = score;
  document.getElementById("timer").innerText = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;
    if (timeLeft <= 0) endGame();
  }, 1000);
}

function handleClick() {
  if (timeLeft > 0) {
    score++;
    document.getElementById("score").innerText = score;
  }
}

function endGame() {
  clearInterval(timerInterval);
  saveScore(username, score);
  showLeaderboard();
}

function saveScore(name, score) {
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push({ name, score });
  scores.sort((a, b) => b.score - a.score);
  scores = scores.slice(0, 10); // top 10 only
  localStorage.setItem("scores", JSON.stringify(scores));
}

function showLeaderboard() {
  const scores = JSON.parse(localStorage.getItem("scores")) || [];
  const board = document.getElementById("leaderboard");
  board.innerHTML = "";
  scores.forEach((s, i) => {
    const li = document.createElement("li");
    li.textContent = `${s.name} - ${s.score}`;
    board.appendChild(li);
  });
}

function restart() {
  login(); // just re-login to restart game
}