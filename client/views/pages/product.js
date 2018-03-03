Template.product.helpers({
	formattedPrice: function () {
		return Util.formatCurrency(Template.instance().data.price);
	},
	formattedMultipliedPrice: function () {
		var amount = Session.get("amount-"+Template.instance().data.id);
		return Util.formatCurrency(Template.instance().data.price * (amount||1));
	},
	amounts: function() {
		var max = Template.instance().data.amount;
		var array = [];
		for (var i = 0; i < max; i++) {
			array.push(i+1);
		}
		return array;
	}
});
Template.product.events({
	"click .a-buy": function(e) {
		var el = $(e.currentTarget).closest('.a-buy');
		var id = el.attr('data-id');
		var amount = (Session.get("amount-"+id)||1);
		Session.set("purchaseSubject", Template.instance().data.subject);
		Session.set("purchaseAmount", amount);
		Session.set("purchasePrice", amount*Template.instance().data.price);
		//open tooltip
		$('#purchase').removeClass('u-hidden');
	},
	"change .a-amount": function(e) {
		var el = $(e.currentTarget).closest('.a-amount');
		var id = el.attr('data-id');
		Session.set("amount-"+id, Number(el.val()));
	}
});