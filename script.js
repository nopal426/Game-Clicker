let score = 0;
let timeLeft = 60;
let username = "";
let timerInterval;

function login() {
  const input = document.getElementById("username");
  username = input.value.trim();
  if (username === "") {
    alert("Please enter a username!");
    return;
  }

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
  document.getElementById("click-button").disabled = false;

  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      document.getElementById("click-button").disabled = true;
      endGame();
    }
  }, 1000);
}

function handleClick() {
  score++;
  document.getElementById("score").innerText = score;
}

function endGame() {
  saveScore(username, score);
  showLeaderboard();
}

function saveScore(name, score) {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name, score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard.slice(0, 10)));
}

function showLeaderboard() {
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  const leaderboardDiv = document.getElementById("leaderboard");
  leaderboardDiv.innerHTML = "<h3>Leaderboard</h3>";
  leaderboard.forEach((entry, index) => {
    leaderboardDiv.innerHTML += `<p>${index + 1}. ${entry.name} - ${entry.score}</p>`;
  });
}