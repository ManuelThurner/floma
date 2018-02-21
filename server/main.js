import { Meteor } from 'meteor/meteor';
import { Guests } from "../imports/guests.js";

Meteor.startup(() => {
  // code to run on server at startup

	/*Guests.remove({});

	Guests.insert({
		first_name: "Daniela",
		last_name: "Thurner",
		code: "AXD7"
	});

	console.log(Guests.find({}).fetch());*/
});
