require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const routes = require("./routes");

const port = process.env.PORT || 3001;
const app = express();


app.use(express.static("../frontend/dist"));

app.use(cookieParser());
app.use(express.json());



app.use("/api", routes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
