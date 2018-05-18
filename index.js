import express from "express";
import consign from "consign";

const app=express();


app.use(function(e,req, res, next){
    console.log(e);
    console.log("whatapp");
    next();
});

consign()
    .include("libs/config.js")
    .then("db.js")
    .then("auth.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);



