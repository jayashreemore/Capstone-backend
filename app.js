const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
var cookieParser = require('cookie-parser');


const errorHandler =require('./middleware/error');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:false
}).then(() => console.log("DB Connectd"))
.catch((err) => console.log(err));
//import routes
const authRoutes = require('./routes/authRoutes');


//MIDDLEWARE
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}));
app.use(cookieParser());
app.use(cors());

// /ROUTES MIDDLEWARE
app.use('/api', authRoutes);

//error middleware
app.use(errorHandler);


// //port
const port = process.env.PORT || 5050



app.listen(port, () => {
    console.log(` Server is running on port ${port}`);
})