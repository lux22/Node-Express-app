const express = require("express");
const app = express();

const people = require("./router/people");

const multer = require("multer");
const formData = multer(); //for parsing formdata

// parsing multipart/formdata
app.use(formData.array());

// app.use(express.urlencoded({ extended: false }));

// app.use(express.json());

app.use(express.static("public"));

app.use("/api/people", people);

// Static assetis files in the server.

app.listen(5000, () => {
  console.log("server is running at 5000");
});
