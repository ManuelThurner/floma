Template.contact.helpers({
	isOS: function () {
		var userAgent = window.navigator.userAgent;

		return (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i));
	}
});
Template.contact.events({
	"click .a-logout": function(e) {
		Session.set("code", null);
		localStorage.removeItem("code");
		window.location.reload();
	}
});