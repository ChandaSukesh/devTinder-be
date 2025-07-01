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
  // This is used while sending static data
  // const user = new User(userObj);

  // this below line is used when u send data from postman instead of userObj above, this is used to send dynamic data
  const user = new User(req.body);

  // Always wrap mongoose operation in try and catch, also wrap with async and await
  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send(`Error while sending user!!::${err}`);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  console.log("suk1", req.body.emailId);
  try {
    const userEmailId = await User.find({ emailId: req.body.emailId });
    console.log("suk2", userEmailId);
    res.send(userEmailId);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// get api to get all the users
app.get("/feed", async (req, res) => {
  try {
    // the find method is one the method of mongoose, see mongoose documentation for 'Model' for other methods
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//delete the user
app.delete("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    // await User.findByIdAndDelete({ _id: userId }); or await User.findByIdAndDelete(userId );
    // both of them works
    const users = await User.findByIdAndDelete({ _id: userId });
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// update the user
app.patch("/user", async (req, res) => {
  try {
    const userId = req.body.userId;
    const users = await User.findByIdAndUpdate({ _id: userId }, req.body);
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
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

// Note:
// 1)any other data which is not present in schema, then it wont get added when you send from postman(i.e.., field)
