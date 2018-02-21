Template.game.onRendered(function() {
	var game = new Phaser.Game(889, 500, Phaser.AUTO, 'game');
	// add game states
	game.state.add('Boot', Candy.Boot);
	game.state.add('Preloader', Candy.Preloader);
	game.state.add('MainMenu', Candy.MainMenu);
	game.state.add('Game', Candy.Game);
	// start the Boot state
	game.state.start('Boot');
});