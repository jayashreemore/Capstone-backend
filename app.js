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

//error middleware
app.use(errorHandler);

//PORT

const port = process.env.PORT || 9000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
