Template.event.helpers({
	firstName: function () {
		var guest = Util.getGuest();
		return guest ? guest.first_name : '';
	}
});