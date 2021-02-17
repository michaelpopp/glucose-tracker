const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();

const User = require('../models/Users');

// @route   POST /user
// @desc    Creates a user
// @acess   Public
router.post(
	'/',
	[
		body('name', 'Please add a name').not().isEmpty(),
		body('email', 'Please include a valid email').isEmail(),
		body(
			'password',
			'Please ebter a passwird with 6 or more characters'
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { name, email, password } = req.body;

		try {
			let user = await User.findOne({ email });

			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}

			user = new User({
				name,
				email,
				password,
			});

			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user: {
					id: user.id,
				},
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn: 360000,
				},
				(error, token) => {
					if (error) throw error;
					return res.json({ token });
				}
			);
		} catch (error) {
			console.error(error.message);
			return res.status(500).send('Server Error has occured...');
		}
	}
);

module.exports = router;
