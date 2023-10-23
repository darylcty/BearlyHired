const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/usersCtrl");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// POST /api/users
router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);
router.post("/", usersCtrl.create);

//POST /api/users/login
router.post("/login", usersCtrl.login);

module.exports = router;
