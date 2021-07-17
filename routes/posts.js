const express = require('express');
const postsController = require('../controllers/post.controller');
const checkAuthMiddleware = require('../middleware/check-auth');

const router = express.Router();





router.post("/",checkAuthMiddleware.checkAuth,postsController.save);
/*for getting a variable we can use :variable name in postcontroller file
on a particular function*/
router.get("/:id",postsController.show);
router.get("/",postsController.index);
router.patch("/:id",checkAuthMiddleware.checkAuth,postsController.update);
router.delete("/:id",checkAuthMiddleware.checkAuth,postsController.destroy);

module.exports = router;
