Candy.IS_PORTRAIT_MODE = $(window).height() > $(window).width();
// define width and height of the game
if (Candy.IS_PORTRAIT_MODE) {
	Candy.GAME_WIDTH = 500;
	Candy.GAME_HEIGHT = 889;
} else {
	Candy.GAME_WIDTH = 889;
	Candy.GAME_HEIGHT = 500;
}