let scoreBoard = [];
let playerName = "";

// write some code to populate the scoreboard if there are scroes that exist in local storage
//^^ ADD AND RETRIEve


function saveScore(playerName) {
  let scoreObject = {
    name: playerName,
    score: player.score,
  };
  scoreBoard.push(scoreObject);
  console.log(scoreBoard);
  let leaderboard = document.querySelector("#leaderboard-list");
let listitem = document.createElement("li")
listitem.innerHTML = playerName + player.score
leaderboard.appendChild(listitem);
// set local storage scoreboard appending our new score

}

const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const gameArea = document.querySelector(".gameArea"); //HTML FILES CONNECTING WHITH THE DIV

document.addEventListener("keydown", (e) => {
  //storing the name after loss.
  if (e.keyCode == 13) {
    if (document.querySelector("#inputBox")) {
      playerName = document.querySelector("#inputBox").value;
      if (playerName.length > 0) {
        saveScore(playerName);
      }
    }
    start(); // this will input in the log/
  }
});

let player = { speed: 10, score: 0 };
let highest = 0;

let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

function keyDown(e) {
  // e.preventDefault();
  keys[e.key] = true;
}
function keyUp(e) {
  // e.preventDefault();
  keys[e.key] = false;
}

function isCollide(a, b) {
  aRect = a.getBoundingClientRect();
  bRect = b.getBoundingClientRect();
  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
}
//////////////////////////////////////////////////////////////////////
function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 950) {
      item.y -= 900;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function moveLines() {
  let lines = document.querySelectorAll(".lines");
  lines.forEach(function (item) {
    if (item.y >= 950) {
      item.y -= 900;
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}

function endGame() {
  let inputBox = document.createElement("input");
  player.start = false;
  startScreen.classList.remove("hide");
  startScreen.innerHTML =
    "Game Over <br> Final score:" + player.score + " " + "<br>ENTER NAME";
  startScreen.appendChild(inputBox);
  inputBox.setAttribute("id", "inputBox");
}

/////////////////////////////////////////////////////////////////////////////
function moveEnemy(car) { // this for loop
  let enemy = document.querySelectorAll(".enemy");
  enemy.forEach(function (item) {
    if (isCollide(car, item)) {
      endGame();
    }
    if (item.y >= 950) {
      item.y = -100;
      item.style.left = Math.floor(Math.random() * 450) + "px";
    }
    item.y += player.speed;
    item.style.top = item.y + "px";
  });
}
window.requestAnimationFrame(gamePlay);
//console.log(player.score++);
player.score++;
if (player.score >= highest) {
  highest = player.score;
}
score.innerHTML =
  "Your Score:" + player.score + "<br><br>" + "Highest Score:" + highest;

function Reset() {
  highest = 0;
}
player.start = true;
player.score = 0;
window.requestAnimationFrame(gamePlay);

function gamePlay() {
  let car = document.querySelector(".car");
  let road = gameArea.getBoundingClientRect();
  /*console.log(road);*/

  if (player.start) {
    moveLines();
    moveEnemy(car);

    if (keys.ArrowUp && player.y > road.top + 70) {
      player.y -= player.speed; 
    }
    if (keys.ArrowDown && player.y < road.bottom - 85) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < road.width - 80) {
      player.x += player.speed;
    }
    car.style.top = player.y + "px";
    car.style.left = player.x + "px";

    window.requestAnimationFrame(gamePlay);
    //console.log(player.score++);
    player.score++;
    if (player.score >= highest) {
      highest = player.score;
    }
    score.innerHTML =
      "Your Score:" + player.score + "<br>1212<br>" + "Highest Score:" + highest;
  }
}
function Reset() {
  highest = 0;
}
function start() {
  //gamearea.classList.remove('hide');
  console.log("ran");
  let playerName = document.querySelector("#inputBox").value;
  console.log(playerName);
  startscreen.classList.add("hide");
  gamearea.innerHTML = "";
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);
}
function start() {
  //gameArea.classList.remove('hide');
  startScreen.classList.add("hide");
  gameArea.innerHTML = "";
  player.start = true;
  player.score = 0;
  window.requestAnimationFrame(gamePlay);

  for (x = 0; x < 6; x++) {
    let roadLine = document.createElement("div");
    roadLine.setAttribute("class", "lines");
    roadLine.y = x * 300;
    roadLine.style.top = roadLine.y + "px";
    gameArea.appendChild(roadLine);
  }

  let car = document.createElement("div");
  car.setAttribute("class", "car");
  /*car.innerText="Hey I am car";*/
  gameArea.appendChild(car);

  player.x = car.offsetLeft;
  player.y = car.offsetTop;

  /* console.log(car.offsetTop);
                console.log(car.offsetLeft);*/

  for (x = 0; x < 4; x++) { 
    let enemyCar = document.createElement("div");
    enemyCar.setAttribute("class", "enemy");// this loops creates element a
    // to run and generates a new element color car overtime.
    enemyCar.y = (x + 1) * 350 * -2;
    enemyCar.style.top = enemyCar.y + "px";
    enemyCar.style.backgroundColor = randomColor();
    enemyCar.style.left = Math.floor(Math.random() * 5550) + "px";
    gameArea.appendChild(enemyCar);
  }
} // this will call from to the for loop up top^^^/
function randomColor() {
  function c() {
    let hex = Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#" + c() + c() + c();
}

function pad(val) {
  let  valString = val + "";
  if (valString.length < 1) {
    return "66" + valString;
  } else {
    return valString;
  }
}
