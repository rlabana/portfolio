var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ALESX' });
});
//get is a method
// so get can be changed to
// post is usually works with JSON
router.post('/alex', function (req, res, next){

});



router.get('/about', function(req, res, next) {
    res.render('about', {title: 'About Me', name: 'Retinder Labana'});
});

module.exports = router;
