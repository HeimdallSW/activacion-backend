var express = require('express');
var api = express.Router();




var activacionController = require('../controllers/activacion-controllers');
api.post('/activacion/RFC',activacionController.verificaRFC);
api.post('/activacion/token',activacionController.validaToken,);



module.exports = api;