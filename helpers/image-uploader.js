const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
	//file location
	destination: function(req,file,callback){
		callback(null, './uploads');
	},
	//file name
	filename: function(req,file,callback){
		callback(null, new Date().getTime() + path.extname(file.originalname));
	}
});

const fileFilter = (req,file,callback)=>{
	if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
		callback(null,true);
	}else{
		callback(new Error('Unsupported files'), false);
	}
}

const upload = multer({
	storage:storage,
	//for limiting file size (here 10MB in bits)
	limits:{
		fileSize:1024*1024*10
	},
	fileFilter:fileFilter
});

module.exports = {
	upload:upload
}