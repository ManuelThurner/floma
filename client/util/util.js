import { Tracker } from 'meteor/tracker';
import { Guests } from '../../imports/guests.js';

Util = new Object();

$.extend(Util, {
	updateGuest: function(params) {
		var guest = Util.getGuest();
		Guests.update(guest._id, {$set: params});
	},
	getGuest: function() {
		var code = Session.get("code");
		return code ? Guests.findOne({code: code}) : null;
	},

	showAreaBasedOnRsvp: function(guest) {
		if (guest) {
			$(".external-area").css({display: 'none'});

			if (guest.is_attending === true) {
				if (guest.has_won_game) {
					$(".game-area").css('display', 'none');
					$("canvas").remove();
				} else {
					$('#rsvpInitial').css('display', 'none');
					$("#game").css('display', 'block');
				}
			} else if (guest.is_attending === false) {
				$(".game-area").css('display', 'none');
				$(".internal-area").css('display', 'none');
			}
		}
	},

	formatCurrency: function (price) {
		if (typeof price != "number") {
			return;
		}
		var p =  (price.toFixed(2) + "").replace(".", ",") + " €";
		p = p.replace(",00", ",–");
		return p;
	}
});