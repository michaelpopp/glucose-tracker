const mongoose = require('mongoose');
const config = require('config');
const URI = config.get('mongoURI');

const connectDatabase = async () => {
	try {
		await mongoose.connect(URI, {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		console.log('Connect to database secured...');
	} catch (error) {
		console.error(error.message);
		process.exit(1);
	}
};

module.exports = connectDatabase;
