const express = require("express");

const app = express();

// ******* sequence of routes matters alot ********

// here / means anything that matches with that /
//  so even if we enter /hello or /test it will go to this route only.Becoz it matches with /

app.use("/", (req, res) => {
  res.send("This is main route");
});

// the below arrow function is known as request handler
// this is called when matched with /hello
// also matches pattern is "/hello/*""
// /hello123 does not matches, even / after hello is important "hello/"
app.use("/hello", (req, res) => {
  res.send("Hello from server..");
});

app.use("/test", (req, res) => {
  res.send("Hello test from server..");
});

// this route never get executed becoz
// in order of sequence everytime the above /test route only gets executed

app.use("/test/2", (req, res) => {
  res.send("Hello test2 from server..");
});

app.listen(3000, () => {
  console.log("server is listening...");
});
