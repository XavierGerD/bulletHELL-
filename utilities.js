let globalFlashCounter = 0;

let setFlashCounter = () => {
  globalFlashCounter = 1;
  flashCounterDecrease();
};

let flashCounterDecrease = () => {
  if (globalFlashCounter > 0) {
    globalFlashCounter -= 0.005;
    setTimeout(flashCounterDecrease, 10);
  }
};

let playAreaFlash = () => {
  ctx.fillStyle = "rgba(255, 255, 255," + globalFlashCounter + ")";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
};
