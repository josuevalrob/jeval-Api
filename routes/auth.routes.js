
const express = require('express');
const router = express.Router();

const secure = require('../middlewares/secure.mid');
const authController = require('../controllers/auth.controller');

router.post('/ /', authController.register);
router.post('/authenticate', authController.authenticate);
router.post('/logout', secure.isAuthenticated, authController.logout);
router.put('/update', secure.isAuthenticated, authController.update)

module.exports = router;