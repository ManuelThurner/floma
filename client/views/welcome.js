import { Guests } from '../../imports/guests.js';



Template.welcome.onRendered(function helloOnCreated() {
	var carousel = $('.carousel');
	window.carousel = carousel.slick({
		dots: false,
		arrows: false,
		draggable: true,
		mobileFirst: true,
		swipe: true,
		slidesToShow: 1,
		speed: 150,
		infinite: false
	});
	Session.set("currentTab", 0);
	carousel.on('afterChange', function(event, slick, currentSlide){
		Session.set("currentTab", currentSlide);
	});

	Util.showAreaBasedOnRsvp(Util.getGuest());

	//try to login based on local storage
	setTimeout(function() {
		var storedCode = localStorage.getItem("code");
		if (storedCode) {
			var guest = Guests.findOne({code: storedCode});
			if (guest) {
				Session.set("code", storedCode);
				// go to next screen
				$(".external-area").css('left', '100%');
				Util.showAreaBasedOnRsvp(Util.getGuest());
			}
		}
	}, 1000);

});

Template.welcome.helpers({
});

Template.welcome.events({
	'click #submit': function(event, instance) {
		var input = $("#code");
		var code = input.val().trim().toUpperCase();

		var guest = Guests.findOne({code: code});
		if (guest) {
			Session.set("code", code);
			localStorage.setItem("code", code);
			// go to next screen
			$(".external-area").css('left', '100%');
			Util.showAreaBasedOnRsvp(Util.getGuest());
		} else {
			//show error
			$("#submit-status").html("Falscher Code");
		}
	},
	"keypress #code": function() {
		$("#submit-status").html("");
	}
});