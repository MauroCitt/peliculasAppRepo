const {Router} = require('express');
const { apiConnectionController } = require('../controllers/apiConnectionController.js');
const genreConnectionController = require('../controllers/genreConnectionController.js');
const crewApiController = require('../controllers/crewApiController.js');

const router = Router();

router.get('/', apiConnectionController.getJsonFile);
router.get('/genres', genreConnectionController.getJsonFile);
router.get('/crew', crewApiController.getJsonFile);

module.exports = router;