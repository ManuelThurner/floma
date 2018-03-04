import { Guests } from '../../../imports/guests.js';


Template.highscore.helpers({
	highscore: function () {
		var g = Guests.find({score: {$exists: true}}, {sort: {score: -1}, limit: 20}).fetch();
		var b = [];
		var n = 1;
		for (var i in g) {
			b.push({
				place: n,
				score: g[i].score,
				first_name: g[i].first_name
			});
			n++;
		}
		return b;
	}
});
Template.highscore.events({
	"click .a-replay": function(e) {
		$('#rsvpInitial').css('display', 'none');
		$("#game").css('display', 'block');
		$(".game-area").css('display', 'block');
		Candy.GAME_OVER = false;
		Candy.IS_ENDLESS = true;
	}
});