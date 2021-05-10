// const path = require("path");
const { people } = require("./data");
const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// get people from the api
app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, users: people });
});

app.post("/api/people", (req, res) => {
  // const {};
  // res.status(200).json({ success: true, users: people });
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
