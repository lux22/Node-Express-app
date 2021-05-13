import insertItemTemplate from "./template/htmlTemplate.js";
import {
  validationError,
  alertError,
  alertSuccess,
} from "./template/alertTemplate.js";
import {
  result,
  registForm,
  api_alert,
  update,
  state,
  register,
} from "./constants.js";

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
  if (e.target.classList.contains("list-group-item")) {
    update.disabled = false;
    register.disabled = true;
    try {
      registForm.reset();
      const { data } = await axios.get(`/api/people/postman/${id}`);
      Object.keys(data.data).forEach((key) => {
        if (key != "id") {
          if (document.getElementsByName(key)[0].tagName == "SELECT")
            document.getElementsByName(key)[0].value = data.data[key];
          document
            .getElementsByName(key)[0]
            .setAttribute("value", data.data[key]);
        }
      });
    } catch (err) {
      api_alert.innerHTML = alertError(err.response.data.msg);
    }
  }
};

const updateForm = async (e) => {
  e.preventDefault();
  register.disabled = false;
  update.disabled = true;
  const fromdata = new FormData(registForm);
  try {
    const { data } = await axios.put(
      `/api/people/postman/${state.id}`,
      fromdata
    );
    api_alert.innerHTML = alertSuccess(data.msg);
    setTimeout(() => {
      api_alert.innerHTML = "";
    }, 2500);
  } catch (err) {
    api_alert.innerHTML = alertError(err.response.data.msg);
  }
};

document.addEventListener("click", editForm);
update.addEventListener("click", updateForm);
registForm.addEventListener("submit", postFormData);
