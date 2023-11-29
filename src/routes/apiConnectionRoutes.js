const {Router} = require('express');
const { apiConnectionController } = require('../controllers/apiConnectionController.js');
const genreConnectionController = require('../controllers/genreConnectionController.js');
const crewApiController = require('../controllers/crewApiController.js');
const auth = require('../controllers/usersAuthController.js');

const router = Router();

router.get('/', apiConnectionController.getJsonFile);
router.get('/genres', genreConnectionController.getJsonFile);
router.get('/crew', crewApiController.getJsonFile);
router.get('/login', function(req, res, next) {
    res.render('index', { error: false });
});

router.post('/login/user', auth.login);
router.post('/verify', auth.verify_token);

module.exports = router;