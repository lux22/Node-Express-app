// const path = require("path");
const { people } = require("./data");
const api_error = require("./error");
const express = require("express");
// const bodyParser = require("body-parser");
const multer = require("multer");
const formData = multer(); //for parsing formdata
const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

// parsing multipart/formdata
app.use(formData.array());

// Static assetis files in the server.
app.use(express.static("public"));

// get people from the api
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, users: people });
});

// Posting to pople api datae
app.post("/api/people", (req, res) => {
  let error = validateFormfield(req.body);
  if (Object.keys(error).length === 0)
    res.status(200).json({ success: true, data: req.body });
  else {
    res.status(401).json({ success: false, msg: error });
  }
});

// send form data as post to server by parsing req.body when perform ing form action as post
app.post("/login/formlogin", (req, res) => {
  const { Fname, Lname } = req.body;
  if (Fname && Lname)
    res.status(200).send(`<h1> ${Fname} ${Lname} has logged in</h1>`);
  res.status(401).send("Pleaser provide cred");
});

app.listen(5000, () => {
  console.log("server is running at 5000");
});

const validateFormfield = (userDetails) => {
  let errors = {};
  Object.keys(userDetails).forEach(function (key) {
    if (userDetails[key] == "") {
      errors[key] = api_error[key];
    }
  });
  return errors;
};
