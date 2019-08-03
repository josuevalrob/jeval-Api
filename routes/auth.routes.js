
const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const authController = require('../controllers/auth.controller');

router.post('/signup', authController.register);
router.put('/signup', secure.isAuthenticated, authController.update)

router.post('/signin', authController.authenticate);
router.post('/logout', secure.isAuthenticated, authController.logout);

module.exports = router;