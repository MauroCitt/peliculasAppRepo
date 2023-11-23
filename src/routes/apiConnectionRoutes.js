const {Router} = require('express');
const apiConnectionController = require('../controllers/apiConnectionController.js');
const genreConnectionController = require('../controllers/genreConnectionController.js');

const router = Router();

router.get('/', apiConnectionController.getJsonFile);
router.get('/genres', genreConnectionController.getJsonFile);

module.exports = router;