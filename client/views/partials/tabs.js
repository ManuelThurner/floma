Template.tabs.helpers({
	isCurrentTab: function(tabName) {
		return (tabName == Session.get("currentTab"));
	},
	isProUser: function() {
		return Kaia.isProUser();
	}
});
Template.tabs.events({
	"click .a-tab-link": function(e) {
		var currentTab = Session.get("currentTab");
		var number = $(e.target).closest('a').data('name');
		carousel.slick('slickGoTo', number);
		Session.set("currentTab", number);
	}
});