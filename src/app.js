const path = require('path');
const express = require('express');
const hbs = require('hbs');

const addressResolver = require('./utils/addressResolver');

const app = express();
const port = 5000;

const publicDirecPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');

app.set('view engine', 'hbs');
app.set('views', viewPath);
app.use(express.static(publicDirecPath));

// GET Request for homepage
app.get('/', (req, res) => {
	res.send('Backend Task');
});

// GET Request to display what the app is about
app.get('/about', (req, res) => {
	res.render('about');
});

// GET Request to resolve the city, state, country and other details from a third party API
app.get('/resolve', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please enter an address',
		});
	}
	addressResolver(req.query.address, (error, { place, houseNumber, street, city, state, country, postcode } = {}) => {
		if (error) {
			return res.send({ error });
		}

		res.send({
			place: place,
			houseNumber: houseNumber,
			street: street,
			city: city,
			state: state,
			country: country,
			postcode: postcode,
		});
	});
});

// Display Error Page for other GET Requests
app.get('*', (req, res) => {
	res.render('error404', {
		title: '404',
		name: 'Harshiv',
		errorMsg: 'Page not found',
	});
});

app.listen(port, () => {
	console.log(`Server is listening at http://localhost:${port}`);
});

// Example locations Tested:
// http://localhost:5000/resolve?address=%22Ahmedabad%20University,%20GICT%20Building,%20Central%20Campus,%20Navrangpura,%20Ahmedabad,%20Gujarat%20380009
//
