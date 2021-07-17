const models = require('../models');
const Validator = require('fastest-validator'); 


//for save
function save(req,res){
	const post = {
		title: req.body.title,
		content: req.body.content,
		imageUrl: req.body.image_url,
		categoryId: req.body.category_id,
		userId: req.userData.userId
	}


	/*validation part
		we use validation for save function we can also use 
		for update function also by changing v.Validator( updatePost, schema );
		here we validate our object*/
	const schema = {
		title:{ type: "string", optional: false, max: "100" },
		content:{ type: "string", optional: false, max: "500" },
		categoryId:{ type:"number", optional: false }
	}
	
	//objects instance
	const v = new Validator();
	const validationResponse = v.Validator( post, schema );

	if(validationResponse !== true){
		return res.status(400).json({
			message:"Validation error!",
			error: validationResponse
		});
	}
/////////////////////////validation ends

	//CHECKED BY A VALID CATEGORY ID
	models.Category.findByPk(req.body.category_id).then(result => {
		if(result !== null){
			models.Post.create(post).then(result => {
				res.status(201).json({
					message: "Post created successfully",
					post: result
				});
			}).catch(error => {
				res.status(500).json({
					message: "Something went wrong!",
					error: error
				});
			});
		}
		else{
			res.status(400).json({
					message: "Invalid Category ID"
			});
		}
	});

}

//get particular id values
function show(req,res){
	const id = req.params.id;

	models.Post.findByPk(id).then(result => {
		if(result){
			res.status(200).json(result);
		}
		else{
			res.status(404).json({
				message:"Record not found!"
			});
		}
		res.status(200).json(result);
	}).catch(error => {
		res.status(500).json({
			message: "Something went wrong!"
		});
	});
}

//show all
function index(req,res){
	models.Post.findAll().then(result=>{
		res.status(200).json(result);
	}).catch(error => {
		res.status(500).json({
			message: "Something went wrong!"
		});
	});
}

//update
function update(req,res){
	const id = req.params.id;
	const userId = 1;

	const updatePost = {
		title: req.body.title,
		content: req.body.content,
		imageUrl: req.body.image_url,
		categoryId: req.body.category_id,
	}
	

	models.Post.update(updatePost,{where:{id:id, userId:userId}
	}).then(result => {
		res.status(200).json({
			message:"Post updated successfully",
			post: updatePost
		});
	}).catch(error => {
		res.status(500).json({
			message:"Something went wrong!",
			error: error		
		});
	});
}


//delete
function destroy(req,res){
	const id = req.params.id;
	const userId = 1;

	models.Post.destroy({where:{id:id, userId:userId}
	}).then(result => {
		res.status(200).json({
			message:"Post deleted successfully",
			
		});
	}).catch(error => {
		res.status(500).json({
			message:"Something went wrong!",
			error: error		
		});
	});
}


module.exports = {
	save:save,
	show:show,
	index:index,
	update:update,
	destroy:destroy
}