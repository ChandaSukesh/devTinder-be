const express = require("express");

const app = express();

// it can have multiple route handlers
// output would be response1 becoz it goes line by line and once it encounter res.send it wil send back and it wont go next line
// even if we comment res.send in first route handler it wont go to second response.
// response 2 would be execute only if we write next()
app.use(
  "/userMultiple",
  (req, res, next) => {
    //route handler 1
    // res.send("response1");
    // if we write res.send here, the execution stops here and wont go to response 2, but output+error also would be coming
    // to overcome this error, we remove nested route handlers and make individual routes then it wil work fine.
    // if we comment out res.send, then execution would be going to response 2
    next();

    // res.send("response1");
    // if we write next first and res.send later then then also response 2 would be getting print
    // but error would be also be coming becoz of call stack, first respone 2 is being executed
    // later it is come to again res.send in response 1 handler, as already res.send in response 2 is alread sent
    // it cant sent res.send in respone 1 so error would be throwing out
  },
  (req, res) => {
    // route handler 2
    res.send("response2");
    // next();
    // if we write next here it will get an error as it doesn't have next route handler
    // if we dont write write next and res.send both then it wil keep on loading becoz it is expecting something to return.
  }
);

// here we can also send all route handlers in one use
// or we can define as individual one, with next logic as same applies
// route path we should define as same..

app.listen(3000, () => {
  console.log("app is listening");
});

// Note:
// 1)If we dont write res.send then it wil go on wait for the request to send from server,
//  it will be loading forever and after sometime it will become timeout

// all these are same
// app.use("/route",r1,r2,r3)
// app.use("/route",[r1,r2,r3])
// app.use("/route",[r1,r2],r3)

// this code will throw an error

app.get("/userSecondMultiple", (req, res) => {
  console.log("user multiple response 1");
  // res.send("res1");
  next();
});

app.get("/userSecondMultiple", (req, res) => {
  // res.send("res2");
  console.log("user multiple response 2");
  next();
});

//this will go into infinite loop

app.get("/userThirdMultiple", (req, res) => {
  console.log("user multiple response 1");
});

app.get("/userThirdMultiple", (req, res) => {
  // res.send("res2");
  console.log("user multiple response 2");
  next();
});

// Note:
// These route handlers are called middlewares
// if we write next(), then it would be going to matching route handler and send the response back,
// so from beginning route handler to matching route handlers, all in between route handlers are called as middlewares.
// Middleware functions have access to the request object (req), response object (res), and a next function.
// Middleware can either terminate the request-response cycle or pass control to the next middleware using the next() function.

// we use app.use for middleware, becoz we want it to work for all http methods, post,put,get delete, so that's
// why in general we write app.use

// so general one example for middleware is authorization
// lets assume there are three route handlers, where for each path u need to check whether he is authorized or not.
// instead of writing this authorization logic in all three different handlers,
// what we do is we write this logic in first middleware and write next() only if he is authorized,
// else we restrict him not to pass to next route handlers

// ex: app.use("/admin",(res,rep,next)=>{
// if(authorized)
// {
//   next()
// }
// else{
//   restrict him not to pass further, by saying.., res.status(401).send("Unauthorized!!")
// }
// })
//  app.get("/adminGet",()=>...)
//  app.delete("/adminDelete",()=>...)

// if we write app.get instead of app.use then that authorization logic will be valid only for get request not for delete in this example.

// the difference between app.use and app.all is..
// the main difference is that
// app. use() will match any URL that starts with the path, but
// app. all() will only match a URL path that is exactly equal to the specified path.

// another way to write middle ware is
// app.get("/routeGet", middleFn, (req,res)=>...)

// error handling can be done by adding try, catch and also by below way..
// app.use("/",(err,req,res,next)=>...)
// so if we write 4 arguments, first argument is the error

// ex:
// app.use("/",(err,req,res,next)=>{
// if(err){
//   res.status(500).send("Something went wrong!!")
// }
// })

// another way to handle error is.., but above is standard way of writing than below
// app.get("/getUser",(req,res)=>{
//     try{
//       throw new Error("error")
//       res.send("response sent")
//     }
//     catch(err){
//       res.status(500).send("Something went wrong!!")
//     }
// })
