var mongoose = require('mongoose');

module.exports = function(){
	var schema = mongoose.Schema({
		matricula:{
			type: String,
			required: true,
			unique:true
		},
		nome:{
			type: String,
			required: true,
			unique:true
		},
		email:{
			type: String,
			required: true,
			unique:true
		},
		semestre:{
			type: Number,
			required: true
		},
		turno:{
			type: String
		},
		voucher:{
			type: String
		},
		curso:{
			type: String,
		}, 
		disciplinas:{
			type: String,
			required: true
		}
	});
	return mongoose.model('User', schema);
};
