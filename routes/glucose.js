const auth = require('../middleware/auth');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const User = require('../models/Users');
const Glucose = require('../models/Glucoses');

// @route	GET /glucose
// @desc	Gets all of a users glucose readings
// @access	Private
router.get('/', auth, async (req, res) => {
	try {
		let glucoseReadings = await Glucose.find({ user: req.user.id }).sort({
			date: -1,
		});

		return res.json(glucoseReadings);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send('Server Error has occured...');
	}
});

// @route   POST /glucose
// @desc    creates an entry for a glucose reading
// @acess   Private
router.post(
	'/',
	[
		auth,
		[
			body('reading', 'A glucose reading is required').not().isEmpty(),
			body('date', 'A date is required').not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { reading, date, time } = req.body;

		try {
			const newGlucose = new Glucose({
				user: req.user.id,
				reading,
				date,
				time,
			});

			await newGlucose.save();
			return res.json(newGlucose);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send('Server Error has occured...');
		}
	}
);

module.exports = router;
