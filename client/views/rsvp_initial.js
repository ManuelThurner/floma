import { Guests } from '../../imports/guests.js';

Template.rsvpInitial.onRendered(function() {

});

Template.rsvpInitial.helpers({
	firstName() {
		return Util.getGuest() ? Util.getGuest().first_name : "";
	}
});

Template.rsvpInitial.events({
	'click #yes-initial': function(event, instance) {
		var guest = Util.getGuest();
		Util.updateGuest({is_attending: true});
		guest.is_attending = true;
		Util.showAreaBasedOnRsvp(guest);
	},
	'click #no-initial': function(event, instance) {
		var r = confirm("Bist Du sicher, dass Du nicht kommen kannst?");
		if (r == true) {
			var guest = Util.getGuest();
			Util.updateGuest({is_attending: false});
			guest.is_attending = false;
			Util.showAreaBasedOnRsvp(guest);
		} else {

		}
	}
});