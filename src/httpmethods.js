const express = require("express");

const app = express();

// This below use wil get print but not get as the order matters,
app.use("/user", (req, res) => {
  res.send("This gets print");
});

app.get("/user", (req, res) => {
  res.send({
    firstname: "Chanda",
    lastName: "Sukesh",
  });
});

app.post("/postUser", (req, res) => {
  res.send("This is post call!");
});

app.listen(3000, () => {
  console.log("app is listening");
});
