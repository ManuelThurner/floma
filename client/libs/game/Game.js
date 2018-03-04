Candy.Game = function(game){
	// define needed variables for Candy.Game
	this._player = null;
	this._candyGroup = null;
	this._spawnCandyTimer = 0;
	this._fontStyle = null;
	// define Candy variables to reuse them in Candy.item functions
	Candy._scoreText = null;
	Candy._score = 0;
	Candy._health = 0;
};
Candy.Game.prototype = {
	create: function(){
		// start the physics engine
		this.physics.startSystem(Phaser.Physics.ARCADE);
		// set the global gravity
		this.physics.arcade.gravity.y = 200;
		// display images: background, floor and score
		this.add.sprite(0, 0, 'background');
		//this.add.sprite(-30, Candy.GAME_HEIGHT-160, 'floor');
		this.add.sprite(10, 5, 'score-bg');
		// add pause button
		this.add.button(Candy.GAME_WIDTH-96-10, 5, 'button-pause', this.managePause, this);
		// add player animation
		// set font style
		this._fontStyle = { font: "36px Helvetica, Arial", fill: "#fff", stroke: "#6b8963", strokeThickness: 3, align: "center" };
		// initialize the spawn timer
		this._spawnCandyTimer = 0;
		// initialize the score text with 0
		Candy._scoreText = this.add.text(120, 20, "0", this._fontStyle);
		// set health of the player
		Candy._health = 10;
		Candy._score = 0;
		// create new group for candy
		this._candyGroup = this.add.group();
		// spawn first candy
		Candy.item.spawnCandy(this);
	},
	managePause: function(){
		if (this.game.paused) return;
		// pause the game
		this.game.paused = true;
		// add proper informational text
		if (Candy.IS_PORTRAIT_MODE) {
			var pausedText = this.add.text(50, 250, "Spiel pausiert.\nBerühre den Bildschirm,\n um fortzufahren.", this._fontStyle);
		} else {
			var pausedText = this.add.text(120, 250, "Spiel pausiert.\nBerühre den Bildschirm, um fortzufahren.", this._fontStyle);
		}

		// set event listener for the user's click/tap the screen
		this.input.onDown.add(function(){
			// remove the pause text
			pausedText.destroy();
			// unpause the game
			this.game.paused = false;
		}, this);
	},
	update: function(){
		if (Candy.GAME_OVER) return;

		// update timer every frame
		this._spawnCandyTimer += this.time.elapsed;
		// if spawn timer reach one second (1000 miliseconds)
		if(this._spawnCandyTimer > 1000) {
			// reset it
			this._spawnCandyTimer = 0;
			// and spawn new candy
			if (Candy._score > 100) {
				Candy.item.spawnCandy(this);
			}
			if (Candy._score > 70) {
				Candy.item.spawnCandy(this);
			}
			Candy.item.spawnCandy(this);
		}
		// loop through all candy on the screen
		this._candyGroup.forEach(function(candy){
			// to rotate them accordingly
			candy.angle += candy.rotateMe;
		});
		// if the health of the player drops to 0, the player dies = game over
		if(!Candy._health) {
			Candy.GAME_OVER = true;
			if (Candy.IS_ENDLESS) {
				var g = Util.getGuest();
				if (!g.score || g.score < Candy._score) {
					Util.updateGuest({score: Candy._score});
				}
			}

			// show the game over message
			var x = Candy.IS_PORTRAIT_MODE ? 0 : (Candy.GAME_WIDTH-594)/2;
			this.add.sprite(x, (Candy.GAME_HEIGHT-271)/2, 'game-over');
			var skipBtn = this.add.button(Candy.IS_PORTRAIT_MODE ? 50 : 462, Candy.GAME_HEIGHT-203, Candy.IS_ENDLESS ? 'button-return' : 'button-skip', function() {
				$("#bgmusic")[0].pause();
				$("#game").css('display', 'none');
				$(".game-area").css('display', 'none');
				$(".won-game-toast").css('display', 'none');
				this.game.paused = false;
				this.state.start('Boot');
				skipBtn.destroy();
				retryBtn.destroy();
			}.bind(this), this, 1, 0, 2);

			var retryBtn = this.add.button(50, Candy.IS_PORTRAIT_MODE ? Candy.GAME_HEIGHT-303 : Candy.GAME_HEIGHT-203, 'button-retry', function() {
				// start game
				this.state.start('Game');
				skipBtn.destroy();
				retryBtn.destroy();
				// unpause the game
				this.game.paused = false;
				Candy.GAME_OVER = false;
			}.bind(this), this, 1, 0, 2);

			// pause the game
			this.game.paused = true;
		}
	}
};

Candy.item = {
	spawnCandy: function(game){
		// calculate drop position (from 0 to game width) on the x axis
		var dropPos = Math.floor(Math.random()*Candy.GAME_WIDTH);
		// define the offset for every candy
		var dropOffset = [0];
		// randomize candy type
		var candyType = 0;
		// create new candy
		var candy = game.add.sprite(dropPos, dropOffset[candyType], 'candy');
		// add new animation frame
		candy.animations.add('anim', [candyType], 10, true);
		// play the newly created animation
		candy.animations.play('anim');
		// enable candy body for physic engine
		game.physics.arcade.gravity.y += Math.round((Candy._score||2)/2);
		game.physics.enable(candy, Phaser.Physics.ARCADE);
		// enable candy to be clicked/tapped
		candy.inputEnabled = true;
		// add event listener to click/tap
		candy.events.onInputDown.add(this.clickCandy, this);
		// be sure that the candy will fire an event when it goes out of the screen
		candy.checkWorldBounds = true;
		// reset candy when it goes out of screen
		candy.events.onOutOfBounds.add(this.removeCandy, this);
		// set the anchor (for rotation, position etc) to the middle of the candy
		candy.anchor.setTo(0.5, 0.5);
		// set the random rotation value
		candy.rotateMe = (Math.random()*4)-2;
		// add candy to the group
		game._candyGroup.add(candy);
	},
	clickCandy: function(candy, pointer){
		// kill the candy when it's clicked
		candy.kill();
		// add points to the score
		Candy._score += 1;
		// update score text
		Candy._scoreText.setText(Candy._score);

		//end game
		var SCORE_TO_WIN = 30;

		if (window.location.hostname == 'localhost') {
			SCORE_TO_WIN = 5;
		}

		if (!Candy.IS_ENDLESS && Candy._score >= SCORE_TO_WIN) {
			$("#bgmusic")[0].pause();
			$("#win")[0].play();
			if (pointer && pointer.game) {
				pointer.game.paused = true;
			}
			$(".game-area").css('display', 'none');
			$("canvas").remove();
			Util.updateGuest({has_won_game: true, score: SCORE_TO_WIN});
		} else {
			$("#coin")[0].play();
		}
	},
	removeCandy: function(candy){
		// kill the candy
		candy.kill();
		// decrease player's health
		Candy._health -= 10;
		$("#gameover")[0].play();
	}
};