const { people } = require("../../data");
const api_error = require("../../error");

const getAllPeople = (req, res) => {
  res.status(200).json({ success: true, users: people });
};

const postAllPeople = (req, res) => {
  let error = validateFormfield(req.body);
  if (Object.keys(error).length === 0)
    res.status(200).json({ success: true, data: req.body });
  else res.status(404).json({ success: false, msg: error });
};

const getAllPeoplePostMan = (req, res) => {
  let error = validateFormfield(req.body);
  if (Object.keys(error).length === 0)
    res.status(200).json({ success: true, data: [...people, req.body] });
  else {
    res.status(401).json({ success: false, msg: error });
  }
};

const getSpecificData = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(data);
  const personAvailable = people.find((people) => people.id === Number(id));
  if (!personAvailable)
    res
      .status(404)
      .json({ success: false, msg: "no matching person with id was found" });

  res.status(200).json({ success: true, data: personAvailable });
};

const updateUserList = (req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(data);
  const personAvailable = people.find((people) => people.id === Number(id));
  if (!personAvailable)
    res
      .status(404)
      .json({ success: false, msg: "no matching person with id was found" });

  res.status(200).json({ success: true, data: personAvailable });
};

const formLogin = (req, res) => {
  const { Fname, Lname } = req.body;
  if (Fname && Lname)
    res.status(200).send(`<h1> ${Fname} ${Lname} has logged in</h1>`);
  res.status(401).send("Pleaser provide cred");
};

const validateFormfield = (userDetails) => {
  let errors = {};
  Object.keys(userDetails).forEach(function (key) {
    if (userDetails[key] == "") {
      errors[key] = api_error[key];
    }
  });
  return errors;
};

module.exports = {
  getAllPeople,
  postAllPeople,
  getAllPeoplePostMan,
  getSpecificData,
  updateUserList,
  formLogin,
};
