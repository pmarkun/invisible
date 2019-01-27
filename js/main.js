const config = {
  type: Phaser.AUTO, // Which renderer to use
  width: 800, // Canvas width in pixels
  height: 600, // Canvas height in pixels
  parent: "game-container", // ID of the DOM element to add the canvas to
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // Top down game, so no gravity
    }
  }
};
let player;
let cursors;
const game = new Phaser.Game(config);


function preload() {
   this.load.image("tileset1", "images/tileset.png");
   this.load.image("hero", "images/hero.png");
   this.load.image("chinelo", "images/chinelo.png");
    this.load.tilemapTiledJSON("map", "levels/map.json");
  // Runs once, loads up assets like images and audio
}

function create() {
  // Runs once, after all assets in preload are loaded
  // Load a map from a 2D array of tile indices

  // When loading from an array, make sure to specify the tileWidth and tileHeight
const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
const tiles = map.addTilesetImage("house", "tileset1");
const underLayer = map.createStaticLayer("under", tiles, 0, 0);
const worldLayer = map.createStaticLayer("world", tiles, 0, 0);
const overLayer = map.createStaticLayer("over", tiles, 0, 0);

  worldLayer.setCollisionByProperty({ collision: true });


  chinelo = this.physics.add.sprite(300,300, "chinelo");
  chinelo.body.imovable = true;
  chinelo.body.moves = false;

  player = this.physics.add.sprite(160, 160, "hero")
  this.physics.add.collider(player, worldLayer);
  this.physics.add.collider(player, chinelo)



  const camera = this.cameras.main;
 camera.startFollow(player);
camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

 cursors = this.input.keyboard.createCursorKeys();
}

function update(time, delta) {
  const speed = 175;
  const prevVelocity = player.body.velocity.clone();
    // Stop any previous movement from the last frame
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }

  this.input.keyboard.once("keydown_G", event => {

  });

  this.input.keyboard.once("keydown_D", event => {

  });

  // Normalize and scale the velocity so that player can't move faster along a diagonal
player.body.velocity.normalize().scale(speed);


}
