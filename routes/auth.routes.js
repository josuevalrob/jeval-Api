
const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const authController = require('../controllers/auth.controller');
const storage = require('../configs/storage.config');

router.post('/signup', authController.singup);
router.post('/register', secure.isAuthenticated, authController.register);
router.put('/signup', secure.isAuthenticated, authController.update)

router.post('/signin', authController.authenticate);
router.post('/logout', secure.isAuthenticated, authController.logout);

module.exports = router;