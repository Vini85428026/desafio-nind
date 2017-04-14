module.exports = function(app){

	var User = app.models.user;

	var controller = {};
	var success = { 
					texto: "A persistência é o caminho do êxito.",
					autor: "Charles Chaplin"
				}

	controller.listaDados = function(req, res){
		/*User.find(function(error,users){
			if(error){
				console.error(error);
				res.status(500).json(error);
			}*/
			console.log("chegou aqui");
			res.json(success);
	//	})
	};

	controller.obtemUser= function(req,res){
		var _id = req.params.id;
		USer.findById(_id)
		.then(
			function(user){
				if(!user) throw new Error("User não encontrado");
				res.json(user)
			},
			function(erro){
				console.log(erro);
				res.status(404).json
			}
		);		
	};

	controller.removeUser = function(req,res){
		var _id = req.params.id;
		User.remove({"_id":_id})
		.then(
			function(){
				res.end();
			},
			function(erro){
				return console.error(erro);
			}
		);
	};



	return controller;
}