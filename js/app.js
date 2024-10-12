const config = {
  type: Phaser.AUTO,
  width: 1000,
  height: 500,
  parent: "container",
  backgroundColor: "#283048",
  scene: {
    preload,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("apple", "../assets/images/apple.png");
  this.load.image("banana", "../assets/images/banana.png");
  this.load.image("cherries", "../assets/images/cherries.png");
  this.load.image("lemon", "../assets/images/lemon.png");
  this.load.image("strawberry", "../assets/images/strawberry.png");
  this.load.image("watermelon", "../assets/images/watermelon.png");
}
