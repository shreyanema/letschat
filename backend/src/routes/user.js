const express = require('express');
const router  = express.Router();
const authController = require("../controllers/user");
const userSelector = require("../controllers/alluser.js")

router.post('/login',authController.login);
router.post('/register',authController.register);
router.post('/letschat', userSelector.alluser)
module.exports = router;
