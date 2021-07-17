//in post.controller.js
const models = require('../models');


function upload(req,res){
	const post = {
		file: req.file.filename,
	} 
	models.ImageUpload.create(post).then(result=>{
		res.status(200).json({
			message: "Uploaded successfully",
			result: req.file.filename
		}); 
	}).catch(error =>{
		res.status(500).json({
			message: "something went wrong!", 
			post: error
		});
	});
}





module.exports = {
	upload:upload
}