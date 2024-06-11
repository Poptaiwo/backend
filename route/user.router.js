const express = require('express');
const router = express.Router();
const { registerUser, postRegister, loginUser, postLogin, dashboardUser} = require('../controller/user.controller')

router.get('/register', registerUser)
router.post('/register', postRegister)
router.get('/login', loginUser)
router.post('/login', postLogin)
router.get('/dashboard', dashboardUser)


module.exports = router;