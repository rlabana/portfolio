var express = require('express');
var router = express.Router();

//This path did not work
router.get('/weather', function(req, res, next) {
    res.render('weather', {title: 'ALEX NG'});
});

module.exports = router;