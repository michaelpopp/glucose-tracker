const mongoose = require('mongoose');

const GlucoseSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'users',
	},
	reading: {
		type: Number,
		required: true,
	},
	date: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('glucose', GlucoseSchema);
