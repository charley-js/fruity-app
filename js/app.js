import { handleSpin } from "./api.js";

const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  parent: "container",
  backgroundColor: "#283048",
  scene: {
    preload,
    create,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("apple", "assets/images/apple.png");
  this.load.image("banana", "assets/images/banana.png");
  this.load.image("cherries", "assets/images/cherries.png");
  this.load.image("lemon", "assets/images/lemon.png");
  this.load.image("strawberry", "assets/images/strawberry.png");
  this.load.image("watermelon", "assets/images/watermelon.png");
}

let reels = [[], [], []];
const symbols = ["apple", "banana", "cherries", "lemon", "strawberry", "watermelon"];

function create() {
  const spinButton = document.createElement("button");
  spinButton.innerText = "SPIN";
  spinButton.style.position = "absolute";
  spinButton.style.top = "500px";
  spinButton.style.left = "400px";
  spinButton.style.padding = "10px 20px";
  spinButton.style.fontSize = "20px";
  spinButton.style.cursor = "pointer";

  document.body.appendChild(spinButton);

  spinButton.addEventListener("click", handleSpin);

  const symbolWidth = 100;
  const symbolHeight = 100;
  const reelXStart = 200;
  const reelYStart = 100;
  const reelSpacingX = 120;
  const symbolSpacingY = 120;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const randomSymbol = Phaser.Math.RND.pick(symbols);
      const symbolImage = this.add.image(reelXStart + i * reelSpacingX, reelYStart + j * symbolSpacingY, randomSymbol);

      symbolImage.displayWidth = symbolWidth;
      symbolImage.displayHeight = symbolHeight;

      reels[i].push(symbolImage);
    }
  }
}
