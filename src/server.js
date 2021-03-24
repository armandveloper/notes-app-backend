const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

app.use(helmet());
if (process.env.NODE_ENV === 'development') {
	app.use(cors());
} else {
	app.use(
		cors({
			origin: 'https://armcruz.github.io',
			optionsSuccessStatus: 200,
		})
	);
}
app.use(express.json());

app.use('/api', require('./routes/index.routes'));

module.exports = app;
