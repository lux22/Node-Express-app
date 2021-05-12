import insertItemTemplate from "./template/htmlTemplate.js";
import { validationError, alertError } from "./template/errorTemplate.js";
import { result, registForm, api_error, update, state } from "./constants.js";

// fetch all the users from the server
const fetchPeople = (async () => {
  try {
    const { data } = await axios.get("/api/people");
    const person = data.users
      .map((user, key) => {
        return insertItemTemplate(user, key + 1);
      })
      .join("");
    // console.log(person);
    result.innerHTML = person;
  } catch (err) {
    console.log("Api error: cannot fetch the  data");
  }
})();

// post form data to the server
const postFormData = async (ev) => {
  ev.preventDefault();
  const key = document.getElementsByClassName("list-group-item").length + 1;
  try {
    const fromdata = new FormData(registForm);
    const { data } = await axios.post("/api/people", fromdata);

    const newPerson = insertItemTemplate(data.data, key);
    registForm.reset();
    result.innerHTML = newPerson;
    document
      .querySelectorAll("[data-error]")
      .forEach((item) => item.classList.add("invalid-feedback"));
  } catch (err) {
    validationError(err.response.data.msg);
  }
};

// get specific user details from the server
const editForm = async (e) => {
  const id = e.target.getAttribute("key");
  state.id = id;
  update.disabled = false;
  if (e.target.classList.contains("list-group-item")) {
    try {
      registForm.reset();
      const { data } = await axios.get(`/api/people/postman/${id}`);
      Object.keys(data.data).forEach((key) => {
        if (key != "id") {
          document
            .getElementsByName(key)[0]
            .setAttribute("value", data.data[key]);
        }
      });
    } catch (err) {
      api_error.innerHTML = alertError(err.response.data.msg);
    }
  }
};

document.addEventListener("click", editForm);
document.addEventListener("click", editForm);
// update.addEventListener("click", updateForm);
registForm.addEventListener("submit", postFormData);
