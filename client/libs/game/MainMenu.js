Candy.MainMenu = function(game){};
Candy.MainMenu.prototype = {
	create: function(){
		// display images
		if (Candy.IS_PORTRAIT_MODE) {
			var b = this.add.sprite(0, 0, 'background-portrait');
		} else {
			var b = this.add.sprite(0, 0, 'background');
			b.scale.setTo(0.5, 0.5);
		}

		if (Candy.IS_PORTRAIT_MODE) {
			var t = this.add.sprite(0, 180, 'title-portrait');
			t.scale.setTo(0.5, 0.5);
		} else {
			var t = this.add.sprite(0, 0, 'title');
			t.scale.setTo(0.5, 0.5);
		}

		// add the button that will start the game
		var x = Candy.IS_PORTRAIT_MODE ? 50 : 462;
		this.add.button(x, Candy.GAME_HEIGHT-203, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
		$("#bgmusic")[0].play();
	}
};