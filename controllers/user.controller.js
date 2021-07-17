const models = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');



//for sign up using email 

function signUp(req,res){

	//for check duplicate email
	models.User.findOne({where:{email:req.body.email}}).then(result => {
		if(result){
			res.status(200).json({
					message: "Email already exists!",
			});
		}
		else{
			//for password hash
			bcryptjs.genSalt(10, function(err,salt){
				bcryptjs.hash(req.body.password, salt, function(err,hash){
					const user = {
						name: req.body.name,
						email: req.body.email,
						password: hash
					}

					models.User.create(user).then(result=>{
						res.status(201).json({
							message: "User created",
							result: result
						});
					}).catch(error=>{
						res.status(500).json({
							message: "Something went wrong!",
						});
					});
				});
			});
		}
	}).catch(error => {
		res.status(500).json({
			message: "Something went wrong!",
		});
	});

}

//login with token generate

function login(req,res){
	models.User.findOne({where:{email: req.body.email}}).then(user=>{
		if(user === null){
			res.status(401).json({
				message:"Invalid credentials",
			});
		}
		else{
			bcryptjs.compare(req.body.password,user.password,function(err,result){
				if(result){
				
					const token = jwt.sign({
						email: user.email,
						userName: user.name,
						userId: user.id
					}, process.env.JWT_KEY, function(err,token){
							res.status(200).json({
								message:"Authentication successful!",
								token: token,
								result: user.id,
								post: user.name
								
							});	
					});	
				}
				else{
					res.status(401).json({
						message:"Invalid credentials",
					});
				}
			});
		}
	}).catch(error=>{
		res.status(500).json({
			message:"Something went wrong!",
		});
	});
}




function showusers(req,res){
	models.User.findAll().then(result=>{
		res.status(200).json(result);
	}).catch(error => {
		res.status(500).json({
			message: "Something went wrong!"
		});
	});
}
	


module.exports = {
	signUp:signUp,
	login:login,
	showusers:showusers
}