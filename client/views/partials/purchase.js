import braintree from 'braintree-web';

Session.set('paymentFormStatus', null);
Session.set("paymentMethod", null);
var isBraintreeInitialized = false;

function initializeBraintree(clientToken) {
	if (isBraintreeInitialized) return;

	braintree.setup(clientToken, 'dropin', {
		container: 'dropin',
		paypal: {
			singleUse: true,
			amount: Session.get("purchasePrice"),
			currency: 'EUR',
			button: {
				type: 'checkout'
			}
		},
		paymentMethodNonceReceived: function (event, nonce) {
			Session.set('paymentFormStatus', true);
			var guest = Util.getGuest();

			// we've received a payment nonce from braintree
			// we need to send it to the server, along with any relevant form data
			// to make a transaction
			var data = {};
			data.id = Session.get("purchaseId");
			data.amount = Session.get("purchaseAmount");
			data.price = Session.get("purchasePrice");
			data.subject = Session.get("purchaseSubject");
			data.nonce = nonce;

			Meteor.call('createTransaction', (guest ? guest.code : null), data, function (err, result) {
				Session.set('paymentFormStatus', null);
				//Show confirmation
				if (result.success) {
					$('#purchase-completed').removeClass('u-hidden');
				} else {
					$('#purchase-error').removeClass('u-hidden');
				}

				$('#purchase').addClass('u-hidden');
			});
		}
	});

	isBraintreeInitialized = true;
}

Template.purchase.helpers({
	isCreditCard: function () {
		return Session.get("paymentMethod") == "creditcard";
	},
	isWire: function () {
		return Session.get("paymentMethod") == "wire";
	},
	formattedPrice: function () {
		return Util.formatCurrency(Session.get("purchasePrice"));
	},
	subject: function () {
		return Session.get("purchaseSubject");
	},
	amount: function () {
		return Session.get("purchaseAmount");
	},
	paymentFormStatusClass: function () {
		return Session.get('paymentFormStatus') ? 'is-submitting' : '';
	}
});

Template.purchase.rendered = function () {
	Meteor.call('getClientToken', function (err, clientToken) {
		if (err) {
			console.log('There was an error', err);
			return;
		}

		initializeBraintree(clientToken);
	});
};
Template.purchase.events({
	"click .a-choose-creditcard": function(e) {
		Session.set("paymentMethod", "creditcard");
		$('#creditcard-form').css('display', 'block');
	},
	"click .a-choose-wire": function(e) {
		Session.set("paymentMethod", "wire");
	},
	"click .a-close": function(e) {
		$('#purchase').addClass('u-hidden');
		Session.set("paymentMethod", null);
		$('#creditcard-form').css('display', 'none');
	},
	"click .a-close-completed": function(e) {
		$('#purchase-completed').addClass('u-hidden');
		Session.set("paymentMethod", null);
		$('#creditcard-form').css('display', 'none');
	},
	"click .a-close-error": function(e) {
		$('#purchase-error').addClass('u-hidden');
		Session.set("paymentMethod", null);
		$('#creditcard-form').css('display', 'none');
	}
});