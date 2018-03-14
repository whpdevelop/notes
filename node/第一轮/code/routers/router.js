var express = require('express');

var router = express.Router();
var controller = require('../controlers/controller');

router.get('/',controller.showIndex);
router.get('/add',controller.showAdd);
router.post('/add',controller.add);


module.exports = router;
