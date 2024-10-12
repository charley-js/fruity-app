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

const symbols = {
  "🍎": "apple",
  "🍌": "banana",
  "🍒": "cherries",
  "🍋": "lemon",
  "🍓": "strawberry",
  "🍉": "watermelon",
};

let balanceText;
let payoutText;

function create() {
  const spinButton = document.createElement("button");
  spinButton.innerText = "SPIN";
  spinButton.style.position = "absolute";
  spinButton.style.top = "625px";
  spinButton.style.right = "745px";
  spinButton.style.padding = "10px 20px";
  spinButton.style.fontSize = "20px";
  spinButton.style.cursor = "pointer";

  document.body.appendChild(spinButton);

  balanceText = document.createElement("div");
  balanceText.style.position = "absolute";
  balanceText.style.top = "20px";
  balanceText.style.left = "20px";
  balanceText.style.color = "white";
  balanceText.style.fontSize = "20px";
  document.body.appendChild(balanceText);

  payoutText = document.createElement("div");
  payoutText.style.position = "absolute";
  payoutText.style.top = "50px";
  payoutText.style.left = "20px";
  payoutText.style.color = "white";
  payoutText.style.fontSize = "20px";
  document.body.appendChild(payoutText);

  spinButton.addEventListener("click", () => {
    handleSpin().then((res) => {
      console.log(res);
      this.updateReels(res.symbols);
      updateBalanceAndPayout(res.balance, res.payout);
    });
  });

  const symbolWidth = 100;
  const symbolHeight = 100;
  const reelXStart = config.width / 2 - 150;
  const reelYStart = 100;
  const reelSpacingX = 120;
  const symbolSpacingY = 120;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const randomSymbol = Phaser.Math.RND.pick(Object.keys(symbols));
      const symbolImage = this.add.image(
        reelXStart + i * reelSpacingX,
        reelYStart + j * symbolSpacingY,
        symbols[randomSymbol]
      );

      symbolImage.displayWidth = symbolWidth;
      symbolImage.displayHeight = symbolHeight;

      reels[i].push(symbolImage);
    }
  }
}

function updateReels(fruits) {
  reels.forEach((reel) => {
    reel.forEach((symbol) => symbol.destroy());
  });

  const reelXStart = config.width / 2 - 150;
  const symbolWidth = 100;
  const symbolHeight = 100;
  const symbolSpacingY = 120;

  for (let i = 0; i < 3; i++) {
    const symbolKey = symbols[fruits[i]];

    const symbolImageMiddle = this.add.image(reelXStart + i * 120, 100 + symbolSpacingY, symbolKey);

    symbolImageMiddle.displayWidth = symbolWidth;
    symbolImageMiddle.displayHeight = symbolHeight;

    reels[i].push(symbolImageMiddle);
  }

  for (let i = 0; i < 3; i++) {
    const randomSymbolTop = Phaser.Math.RND.pick(Object.keys(symbols));
    const symbolImageRandomTop = this.add.image(reelXStart + i * 120, 100, symbols[randomSymbolTop]);

    symbolImageRandomTop.displayWidth = symbolWidth;
    symbolImageRandomTop.displayHeight = symbolHeight;
    reels[i].unshift(symbolImageRandomTop);

    const randomSymbolBottom = Phaser.Math.RND.pick(Object.keys(symbols));
    const symbolImageRandomBottom = this.add.image(
      reelXStart + i * 120,
      100 + symbolSpacingY * 2,
      symbols[randomSymbolBottom]
    );

    symbolImageRandomBottom.displayWidth = symbolWidth;
    symbolImageRandomBottom.displayHeight = symbolHeight;
    reels[i].push(symbolImageRandomBottom);
  }
}

function updateBalanceAndPayout(balance, payout) {
  balanceText.innerText = `Balance: $${balance}`;
  payoutText.innerText = `Payout: $${payout}`;
}

Phaser.Scene.prototype.updateReels = updateReels;
