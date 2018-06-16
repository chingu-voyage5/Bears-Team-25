const express = require('express');
var passport=require("passport");

export function loggedIn(req, res, next) {
    if (req.user) {
    	console.log("Here");
        next();
    } else {
        res.redirect('/login');
    }
}