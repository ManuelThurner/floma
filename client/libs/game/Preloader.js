Candy.Preloader = function(game){
	// define width and height of the game
	Candy.GAME_WIDTH = 889;
	Candy.GAME_HEIGHT = 500;
};
Candy.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#B4D9E7';
		// load images
		this.load.image('background', 'img/background.jpg');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		// load spritesheets
		this.load.spritesheet('candy', 'img/candy.png', 96, 96);
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);
		this.load.spritesheet('button-skip', 'img/button-skip.png', 401, 143);
		this.load.spritesheet('button-retry', 'img/button-retry.png', 401, 143);
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};