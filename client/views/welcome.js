import { Guests } from '../../imports/guests.js';



Template.welcome.onRendered(function helloOnCreated() {
	var carousel = $('.internal-area');
	carousel.slick({
		dots: true,
		arrows: true,
		draggable: true,
		mobileFirst: true,
		swipe: true,
		slidesToShow: 1,
		speed: 150,
		infinite: false
	});

	Util.showAreaBasedOnRsvp(Util.getGuest());
});

Template.welcome.helpers({
});

Template.welcome.events({
	'click #submit': function(event, instance) {
		var input = $("#code");

		var guest = Guests.findOne({code: input.val()});
		if (guest) {
			Session.set("code", input.val());
			// go to next screen
			$(".external-area").animate({
				left: '100%'
			}, {
				duration: 500,
				complete: function () {
					Util.showAreaBasedOnRsvp(Util.getGuest());
				}
			});
		} else {
			//show error
			$("#submit-status").html("Falscher Code");
		}
	},
	"keypress #code": function() {
		$("#submit-status").html("");
	}
});