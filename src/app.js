const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

// if we keep anything in use then it gets applies for all request, so middlewares, we define using 'use'
// this middleware is used to read json objects which we are sending from postman post method
app.use(express.json());

app.post("/signup", async (req, res) => {
  const userObj = {
    firstName: "Virat",
    lastName: "Kholi",
    emailId: "viratkholi@yahoo.in",
    password: "123123",
    age: 35,
    gender: "Male",
  };
  // Creating a new instance of a User model
  const user = new User(userObj);

  // this below line is used when u send data from postman instead of userObj above, this is used to send dynamic data
  // const user = new User(req.body);

  // Always wrap mongoose operation in try and catch, also wrap with async and await
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error while sending user!!");
  }
});

// here always first data connection should happen first later server should start listening
// this is  standard rule
connectDB()
  .then(() => {
    console.log("Data connection successful");
    app.listen(3000, () => {
      console.log("server is listening...");
    });
  })
  .catch((err) => {
    console.error("Data error!!", err);
  });
