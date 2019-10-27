const express = require('express');
const router = express.Router();

const recordingCtr = require('../controllers/recording.controller')

//? root route => /recording/...
router.post('/', recordingCtr.create);
router.get('/', recordingCtr.all);
router.get('/:id', recordingCtr.get);
router.put('/:id', recordingCtr.update);
router.put('/:id/audio', recordingCtr.createAudio);
router.put('/:id/delete', recordingCtr.deleteAudio);
router.delete('/:id', recordingCtr.delete);

module.exports = router;