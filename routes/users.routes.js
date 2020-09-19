
const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');

router.get('/', userController.all);
router.get('/:id', userController.get);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);


module.exports = router;