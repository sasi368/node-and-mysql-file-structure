//for normal post registeration

//in post.controller.js
const models = require('../models');

function register(req,res){
	const post = {
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	} 
	models.Register.create(post).then(result=>{
		res.status(201).json({
			message: "Registered successfully",
			post: result
		});
	}).catch(error =>{
		res.status(500).json({
			message: "something went wrong!",
			post: error
		});
	});
}


module.exports = {
	save:save
}