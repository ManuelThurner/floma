var gateway;

import { Meteor } from 'meteor/meteor';
import { Guests } from "../imports/guests.js";
import braintree from 'braintree';

Meteor.startup(function () {
  gateway = braintree.connect({
    //environment: braintree.Environment.Sandbox,
    environment: braintree.Environment.Production,
    publicKey: Meteor.settings.BT_PUBLIC_KEY,
    privateKey: Meteor.settings.BT_PRIVATE_KEY,
    merchantId: Meteor.settings.BT_MERCHANT_ID
  });
});

Meteor.methods({
  getClientToken: function (clientId) {
    var generateToken = Meteor.wrapAsync(gateway.clientToken.generate, gateway.clientToken);
    var options = {};

    if (clientId) {
      options.clientId = clientId;
    }

    var response = generateToken(options);

    return response.clientToken;
  },
  createTransaction: function (code, data) {
    var transaction = Meteor.wrapAsync(gateway.transaction.sale, gateway.transaction);


	  console.log(data);

	  var guest = Guests.findOne({code: code});
	  console.log(guest);

    var response = transaction({
      amount: data.price,
      paymentMethodNonce: data.nonce,
	  //name: data.subject,
      customer: {
        firstName: guest.first_name,
        lastName: guest.last_name
      }
    });

	  if (response.success) {
		  Guests.update(guest._id, {$push: {purchased: {
			  amount: data.amount,
			  price: data.price,
			  subject: data.subject
		  }}});
	  }

    return response;
  }
});
