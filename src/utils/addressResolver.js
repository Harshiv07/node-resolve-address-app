const request = require('request');

const addressResolver = (address, callback) => {
	const url =
		'https://geocoder.ls.hereapi.com/6.2/geocode.json?apiKey=gWKQs3J_eJ0qjFJDoXqXluEPVjVcilndqscW3wUTV0g&searchtext=+' +
		address;
	request({ url, json: true }, (error, { body } = {}) => {
		const location = body.Response.View[0]['Result'][0]['Location'].Address;
		if (error) {
			callback('Unable to connect to location services..!', undefined);
		} else if (location === null) {
			callback('Unable to find location..!', undefined);
		} else {
			callback(undefined, {
				place: location.Label,
				houseNumber: location.HouseNumber,
				street: location.Street,
				city: location.City,
				state: location.State,
				country: location.Country,
				postcode: location.PostalCode,
			});
		}
	});
};

module.exports = addressResolver;
