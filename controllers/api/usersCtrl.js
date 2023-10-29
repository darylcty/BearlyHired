const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function create(req, res) {
	const { name, email, password, secret } = req.body;
	try {
		let user;
		if (secret === process.env.ADMIN_SECRET) {
			user = new User({
				name,
				email,
				password,
				isAdmin: true,
			});
			await user.save();
			} else {
				user = new User({
					name,
					email,
					password,
					isAdmin: false,
				});
				await user.save();
			}
		const token = createJWT(user);
		res.json(token);
	} catch (error) {
		console.error(error);
		res
			.status(500)
			.json({ error: "An error occurred while creating the user." });
	}
}

function createJWT(user) {
	console.log("User being signed into token:", user);

	return jwt.sign({ user }, process.env.SECRET, { expiresIn: "8h" });
}

async function login(req, res) {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) throw new Error();
		const match = await bcrypt.compare(req.body.password, user.password);
		if (!match) throw new Error();
		res.json(createJWT(user));
		} catch (error) {
			res.status(400).json("Incorrect username or password");
		}
	}

function checkToken(req, res) {
	console.log("req.user", req.user);
	res.json(req.exp);
}

module.exports = {
	create,
	createJWT,
	login,
	checkToken,
};