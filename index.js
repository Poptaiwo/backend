//imports
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./route/user.router");
const cors = require("cors");
require("dotenv").config();

//middleware routes
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
app.use("/", router);

//PORTS
let PORT = process.env.PORT;
let URI = process.env.URI;

app.listen(PORT, () => {
  mongoose
    .connect(URI)
    .then(() => {
        console.log("server listening on port:" + PORT);
      console.log("mongodb connected successfully");
    })
    .catch(() => {
      console.log("monggodb connection error");
    });
});
