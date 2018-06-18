const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure:false,
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.USERNAME,
    pass: process.env.PASSWORD
  }
});

let mailOptions = {
  from: process.env.USERNAME,
  to: 'anshuldubey2166@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
