
const expressJwt = require('express-jwt');
const authenticate = expressJwt({secret: 'server secret'});
const validar = require('../../config/validar')

module.exports = function(app){
	var controller = app.controllers.desafio;
	app.route('/dados')
		.get(validar, controller.listaDados);
	
};