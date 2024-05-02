const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
var cookieParser = require("cookie-parser");

const errorHandler = require("./middleware/error");

//imports routes
const authRoutes = require("./routes/authRoutes");
const postRoute = require("./routes/postRoute");
const subscriptionRoutes = require("./routes/subscriptionRoutes");
const contactusRoutes = require("./routes/contactusRoutes");
//database connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));


  // New MongoDB connection string format
const uri = 'mongodb+srv://admin:Mangodb1234@ac-dc6ar8a-shard-00-00.tzfgrgx.mongodb.net:27017,ac-dc6ar8a-shard-00-01.tzfgrgx.mongodb.net:27017,ac-dc6ar8a-shard-00-02.tzfgrgx.mongodb.net:27017/blogger?authSource=admin&replicaSet=atlas-7gogxm-shard-0&ssl=true';

// Connect to MongoDB
//mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  //.then(() => console.log('DB connected'))
  //.catch(err => console.error('Error connecting to DB:', err));

//Middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cookieParser());
app.use(cors());

//routes middleware
app.use("/api", authRoutes);
app.use("/api", postRoute);
app.use("/api", subscriptionRoutes);
app.use("/api", contactusRoutes);
//error middleware
app.use(errorHandler);

//PORT

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});