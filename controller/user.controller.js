const router = require("../route/user.router");
const userModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

const registerUser = (req, res) => {
  res.send("Welcome to my signup page");
};

const postRegister = (req, res) => {
  console.log(req.body);
  const { firstname, lastname, email, password } = req.body;
  let user = new userModel(req.body);
  user.save()
    .then(() => {
      res.send({ status: true, message: "user saved" });
      console.log("user saved successfully");
    })
    .catch((err) => {
      res.send({ status: false, message: "user not saved" });
      console.log(err, "user not saved");
    });
};

const loginUser = (req, res) => {
  res.send("Welcome to my login page");
};

const postLogin = (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  userModel
    .findOne({ email: email })
    .then((user) => {
      console.log(user);
      if (!user) {
        res.send({ status: 404, message: "email not found" });
      } else {
        user.validatePassword(password, (err, same) => {
          if (same) {
            let secret = process.env.SECRET

           let token = jwt.sign({email},secret, {expiresIn: "7h"})
           console.log(token);
            res.send({ status: true, message: "signed in successfully",token});
          } else {
            res.send({ status: false, message: "invalid password"});
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      console.log("user not found");
    });
};

const dashboardUser = (req, res) => {
  // userModel.find().then((data) => {
  //   console.log(data);
  //   res.send({ data: data });
  // });
  let token = req.headers.authorization.split(" ")[1];
  let secret = process.env.SECRET;

  jwt.verify(token, secret, (err,result)=>{
    if(err){
      console.log(err);
      res.send({status: false, message: "invalid token"});
    }else{
      // userModel.findOne({email: result.email})
      res.send({status: true, message: "valid token", result});
      console.log(result);
    }
  })
};


module.exports = {
  registerUser,
  postRegister,
  loginUser,
  postLogin,
  dashboardUser,
};
