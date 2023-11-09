const {Router} = require('express');
const apiConnectionController = require('../controllers/apiConnectionController.js');

const router = Router();

router.get('/', apiConnectionController.getJsonFile);

module.exports = router;