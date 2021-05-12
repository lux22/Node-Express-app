const express = require("express");
const router = express.Router();
const {
  getAllPeople,
  postAllPeople,
  getAllPeoplePostMan,
  getSpecificData,
  updateUserList,
  formLogin,
} = require("../controller/people.controller");

// get people from the api
router.get("/", getAllPeople);

// Posting to pople api datae
router.post("/", postAllPeople);

// Postman req
router.post("/postman", getAllPeoplePostMan);

// get specific data by using the route paramerter.
router.get("/postman/:id", getSpecificData);

router.put("/postman/:id", updateUserList);

// send form data as post to server by parsing req.body when perform ing form action as post
router.post("/login/formlogin", formLogin);

module.exports = router;
