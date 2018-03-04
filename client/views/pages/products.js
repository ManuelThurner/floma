Template.products.helpers({
	hasDeclined: function () {
		var guest = Util.getGuest();
		return (guest && guest.is_attending === false);
	}
});