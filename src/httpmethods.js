const express = require("express");

const app = express();

// This below use wil get print but not get as the order matters,
// app.use it is used to handle any kind of request, either get,post,put delete etc..
// app.use("/user", (req, res) => {
//   res.send("This gets print");
// });

app.get("/user", (req, res) => {
  res.send({
    firstname: "Chanda",
    lastName: "Sukesh",
  });
});

app.post("/postUser", (req, res) => {
  res.send("This is post call!");
});

// some advance concepts with route
// 1. here  ? refers to optional, which means b is optional here
// ex: /ab?c===> /ac if we give also it wil work in the url
// ex: /ab(cd)?d ===? here cd is optional, /abd is allowed

// 2. + refers to more than 1 occurance also allowed
// ex: /ab+c===> /abbbbc is allows, but not /abcc

// 3. * refers anything is allowed in the place of *
// ex: /ab*c ===> /abSukeshhdhdhc

//4. regex also allowed instead of string
// ex: /a/
// app.get("/ab+c", (req, res) => {
//   res.send({
//     firstname: "Chanda",
//     lastName: "Sukesh",
//   });
// });

// query params
app.get("/userQuery", (req, res) => {
  console.log("suk1", req.query);
  res.send({
    firstname: "Chanda",
    lastName: "Sukesh",
  });
});

// path params(route params)
app.get("/userParam/:userId", (req, res) => {
  console.log("suk1", req.params);
  res.send({
    firstname: "Chanda",
    lastName: "Sukesh",
  });
});

app.listen(3000, () => {
  console.log("app is listening");
});
