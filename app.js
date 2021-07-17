//importing or initiallition express
const express = require('express');
const bodyParser = require('body-parser');

//create a instance of express
const app = express();

const postsRoute = require('./routes/posts');
const userRoute = require('./routes/user');
const imageRoute = require('./routes/images');
const registerRoute = require('./routes/register');

app.use(bodyParser.json());
app.use("/uploads",express.static('uploads'));

app.use("/posts",postsRoute);
app.use("/user",userRoute);
app.use("/images",imageRoute);
app.use("/user-register",registerRoute);


/*export this file so that other files 
can use*/
module.exports = app;