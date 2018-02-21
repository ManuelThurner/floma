Candy.MainMenu = function(game){};
Candy.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');
		var t = this.add.sprite(0, 0, 'title');
		t.scale.setTo(0.5, 0.5);
		// add the button that will start the game
		this.add.button(462, Candy.GAME_HEIGHT-203, 'button-start', this.startGame, this, 1, 0, 2);
	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
		$("#bgmusic")[0].play();
	}
};