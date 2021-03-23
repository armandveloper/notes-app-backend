const mongoose = require('mongoose');

module.exports = async () => {
	try {
		await mongoose.connect(process.env.DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('Connection with db has been established');
	} catch (err) {
		console.log("Connection with db doesn't established ");
	}
};
