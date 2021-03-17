require('dotenv').config();
const app = require('./server');

// Conecta la bd
require('./config/database')();

app.listen(process.env.PORT, () => {
	console.log('Server is listening on port', process.env.PORT);
});
