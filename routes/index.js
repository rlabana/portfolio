var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Retinder Labana' });
});

/* GET weather app .*/
router.get('/weather', function(req, res, next) {
    res.render('weather', { title: 'Weather App',
                            slogan: 'Coast To Coast Temperature When It Really Matters',
                            webPageName: 'The Weather Net'});
});

module.exports = router;
