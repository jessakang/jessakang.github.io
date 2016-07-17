var game = new Phaser.Game(600, 600);

var box = function (options) {
  var bmd = game.add.bitmapData(options.length,options.width);
  bmd.ctx.beginPath();
  bmd.ctx.rect(0,0,options.length,options.width);
  bmd.ctx.fillStyle = options.color;
  bmd.ctx.fill();
    return bmd;
};

var mainState = {
  create: function () {
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.stage.backgroundColor = "#1D873F";
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.enableBody = true;

    this.player = game.add.sprite(32, 32,
      box({
        length: 32,
        width: 32,
        color: '#9361b5'
      })
    );

    this.enemy = [

      game.add.sprite(350, 80,
      box ({
        length: 32,
        width: 32,
        color: '#eb6111'
      })
    ),

    game.add.sprite(250, 250,
      box ({
        length: 32,
        width: 32,
        color: '#eb6111'
      })
    ),

    game.add.sprite(180, 500,
      box ({
        length: 32,
        width: 32,
        color: '#eb6111'
      })
    ),

    game.add.sprite(400, 530,
      box ({
        length: 32,
        width: 32,
        color: '#eb6111'
      })
    )];

    this.walls = game.add.group();
    this.walls.enableBody = true;
    var top = this.walls.create(0, 0,
      box({
        length: game.world.width,
        width: 16,
        color: '#114F3C'
      })
    );
    top.body.immovable = true;

    var bottom = this.walls.create(0, game.world.height - 16,
      box ({
        length: game.world.width,
        width: 16,
        color: '#114F3C'
      })
    );
    bottom.body.immovable = true;

    var leftWall = this.walls.create(0, 16,
      box ({
        length: 16,
        width: game.world.height -32,
        color: '#114F3C'
      })
    );
    leftWall.body.immovable = true;

    var rightWall = this.walls.create(game.world.width - 16, 16,
      box ({
        length: 16,
        width: game.world.height -32,
        color: '#114F3C'
      })
    );
    rightWall.body.immovable = true;

    var innerWall1 = this.walls.create(game.world.width / 4, 16,
      box ({
        length: 16,
        width: game.world.height - game.world.height / 4,
        color: '#114F3C'
      })
    );
    innerWall1.body.immovable = true;

    var innerWall2 = this.walls.create(game.world.width / 2, 185,
      box ({
        length: 16,
        width: game.world.height - game.world.height / 4,
        color: '#114F3C'
      })
    );
    innerWall2.body.immovable = true;

    var innerWall3 = this.walls.create(game.world.width / 1.4, 16,
      box ({
        length: 16,
        width: game.world.height - game.world.height / 4,
        color: '#114F3C'
      })
    );
    innerWall3.body.immovable = true;

    var innerWall4 = this.walls.create(game.world.width / 1.2, 185,
      box ({
        length: 16,
        width: game.world.height - game.world.height / 4,
        color: '#114F3C'
      })
    );
    innerWall4.body.immovable = true;

    var innerWall5 = this.walls.create(game.world.width / 7.5, 185,
      box ({
        length: 16,
        width: game.world.height - game.world.height / 2.5,
        color: '#114F3C'
      })
    );
    innerWall5.body.immovable = true;

    var innerWall6 = this.walls.create(game.world.width / 2.75, 80,
      box ({
        length: 16,
        width: game.world.height - game.world.height / 2,
        color: '#114F3C'
      })
    );
    innerWall6.body.immovable = true;

    var innerWall7 = this.walls.create(game.world.width / 1.65, 190,
      box ({
        length: 16,
        width: game.world.height - game.world.height / 2,
        color: '#114F3C'
      })
    );
    innerWall7.body.immovable = true;

    var innerWall8 = this.walls.create(game.world.width / 1.2, 10,
      box ({
        length: 16,
        width: game.world.height - game.world.height / 1.2,
        color: '#114F3C'
      })
    );
    innerWall8.body.immovable = true;

    this.cursor = game.input.keyboard.createCursorKeys();
    this.player.body.collideWorldBounds = true;
  },
  update: function () {

    game.physics.arcade.collide(this.player, this.walls);
    game.physics.arcade.overlap(this.player, this.enemy,
      this.handlePlayerDeath, null, this);

    var speed = 250;
    this.player.body.velocity.y = 0;
    this.player.body.velocity.x = 0;

    if (this.cursor.up.isDown) {
      this.player.body.velocity.y -= speed;
    } else if (this.cursor.down.isDown) {
      this.player.body.velocity.y += speed;
    }
    if (this.cursor.left.isDown) {
      this.player.body.velocity.x -= speed;
    } else if (this.cursor.right.isDown) {
      this.player.body.velocity.x += speed;
    }

  },
  handlePlayerDeath: function (player, enemy) {
    player.kill();
    game.state.start("gameOver");
  }
},

  gameOverState = {
    create: function () {
      label = game.add.text(game.world.width / 2, game.world.height / 2,
        'GAME OVER\nPRESS SPACE to try again',
        {
          font: '30px Arial',
          fill: '#fff',
          align: 'center'
        }
      );
      label.anchor.setTo(0.5, 0.5);
      this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },
    update: function () {
      if (this.spacebar.isDown) {
        game.state.start('main');
      }
    }
  };



game.state.add('main', mainState);
game.state.start('main');
game.state.add('gameOver', gameOverState);
