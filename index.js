require("dotenv").config();
const cors = require('cors');

const port = process.env.PORT || 4000;

// Frame work
const express = require("express");
const mongoose = require("mongoose");

// Microservices Routes
const User = require("./routes/user/index.js");
const Info = require("./routes/info/index.js");

// Initializing express
const app = express();
// Configurations
app.use(express.json());

// cors options
const corsOptions ={
    origin:'https://passwordmanager-api.herokuapp.com', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// Establish Database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }).then(() => console.log("database connection established..."));

// Home / Root Route
app.get("/root", async (req, res) => res.json({ Status: "Sucess" }));

// Initializing Microservices
app.use("/user", User);
app.use("/info", Info);

app.listen(port, () => console.log("Server running...."));
