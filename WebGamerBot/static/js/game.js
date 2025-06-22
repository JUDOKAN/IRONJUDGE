const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const boxer = new Image();
const boxerPunch = new Image();
const boxer2 = new Image();
const boxer2Punch = new Image();
const background = new Image();

boxer.src = "/static/img/boxer.png";
boxerPunch.src = "/static/img/boxer_punch.png";
boxer2.src = "/static/img/boxer2.png";
boxer2Punch.src = "/static/img/boxer2_punch.png";
background.src = "/static/img/arkaplan.png";

let boxerX = 700, boxerY = 100;
let boxer2X = 200, boxer2Y = 125;
let boxerHealth = 100, boxer2Health = 100;
let isPunching1 = false, isPunching2 = false;

const punchSound = new Audio("/static/sound/hurt.mp3");
const lossSound = new Audio("/static/sound/loss.mp3");

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Oyuncu 1 Sağlık: ${boxerHealth}`, 700, 50);
  ctx.fillText(`Oyuncu 2 Sağlık: ${boxer2Health}`, 200, 50);

  ctx.drawImage(isPunching1 ? boxerPunch : boxer, boxerX, boxerY);
  ctx.drawImage(isPunching2 ? boxer2Punch : boxer2, boxer2X, boxer2Y);
}

function checkCollision() {
  return (
    boxerX < boxer2X + 50 &&
    boxerX + 50 > boxer2X &&
    boxerY < boxer2Y + 80 &&
    boxerY + 80 > boxer2Y
  );
}

function gameLoop() {
  draw();
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  switch (e.code) {
    case "ArrowRight":
      boxerX += 10;
      break;
    case "ArrowLeft":
      boxerX -= 10;
      break;
    case "ControlRight":
      isPunching1 = true;
      if (checkCollision()) {
        boxer2Health -= 10;
        punchSound.play();
        if (boxer2Health <= 0) endGame("Oyuncu 1 Kazandı!");
      }
      setTimeout(() => { isPunching1 = false }, 500);
      break;

    case "KeyD":
      boxer2X += 10;
      break;
    case "KeyA":
      boxer2X -= 10;
      break;
    case "KeyE":
      isPunching2 = true;
      if (checkCollision()) {
        boxerHealth -= 10;
        punchSound.play();
        if (boxerHealth <= 0) endGame("Oyuncu 2 Kazandı!");
      }
      setTimeout(() => { isPunching2 = false }, 500);
      break;
  }
});

function endGame(message) {
  lossSound.play();
  setTimeout(() => {
    alert(message + "\nYeniden başlamak için sayfayı yenileyin.");
    location.reload();
  }, 100);
}

window.onload = () => {
  gameLoop();
};
