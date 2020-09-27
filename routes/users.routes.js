
const express = require('express');
const router = express.Router();

const userController = require('../controllers/users.controller');
const eflController = require('../controllers/efl.controller');
const emotionsController = require('../controllers/emotions.controllers');
const strategiesController = require('../controllers/strategies.controller');

router.get('/', userController.all);
router.get('/:id', userController.get);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);

router.get('/:id/elf', eflController.get);
router.put('/:id/elf', eflController.update);

router.get('/:id/emotions', emotionsController.get);
router.put('/:id/emotions', emotionsController.update);

router.get('/:id/strategy/:stg', strategiesController.get);
router.put('/:id/strategy/:stg', strategiesController.update);

module.exports = router;