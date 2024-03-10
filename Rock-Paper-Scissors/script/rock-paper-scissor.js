let computerMove;
let result;
const score = JSON.parse(localStorage.getItem("score")) || {
  Win: 0,
  Losse: 0,
  Tie: 0,
};

let isAutoPlaying = false;
let intervalId;

document.querySelector(".js-auto-play").addEventListener("click", () => {
  autoPlay();
});

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".js-auto-play").innerText = "Stop Play";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-auto-play").innerText = "Auto Play";
  }
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

const jsResetFuction = () => {
  score.Win = 0;
  score.Losse = 0;
  score.Tie = 0;
  localStorage.removeItem("score");
  let curr_score = document.querySelector(".js-score");
  curr_score.innerText = `Wins: ${score.Win}, Losses: ${score.Losse}, Ties: ${score.Tie}`;
};

document.querySelector(".js-reset-button").addEventListener("click", () => {
  jsResetFuction();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === 'q') {
    jsResetFuction();
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === 'a') {
    autoPlay();
  }
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  }
});

function playGame(playerMove) {
  computerMove = pickComputerMove();
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Losse";
    } else {
      result = "You Won";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Won";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else {
      result = "You Losse";
    }
  } else {
    if (computerMove === "rock") {
      result = "You Losse";
    } else if (computerMove === "paper") {
      result = "You Won";
    } else {
      result = "Tie";
    }
  }

  if (result === "You Won") {
    score.Win += 1;
  } else if (result === "You Losse") {
    score.Losse += 1;
  } else {
    score.Tie += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  let curr_result = document.querySelector(".js-result");
  curr_result.innerText = result;

  let curr_choice = document.querySelector(".js-choice");
  curr_choice.innerHTML = `You <img src="images/${playerMove}-emoji.png" class = "imgSize"> vs <img src="images/${computerMove}-emoji.png" class = "imgSize"> Computer.`;

  let curr_score = document.querySelector(".js-score");
  curr_score.innerText = `Wins: ${score.Win}, Losses: ${score.Losse}, Ties: ${score.Tie}`;
  // alert(
  //   `You picked ${playerMove}. Computer Picked ${computerMove}. ${result}
  //   Wins: ${score.Win}, Losses: ${score.Losse}, Ties: ${score.Tie}`

  // );
}

function pickComputerMove() {
  const randomNum = Math.random();
  if (randomNum > 0 && randomNum < 1 / 3) {
    computerMove = "rock";
  } else if (randomNum > 1 / 3 && randomNum < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}
