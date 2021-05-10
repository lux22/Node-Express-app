const submitFormBtn = document.querySelector(".submit_form");
const result = document.querySelector(".list-group");
const registForm = document.querySelector("#reg_form");
const api_error = document.querySelector(".api_error");
const invalid_field = document.querySelectorAll(".invalid-feedback");

// console.log(newmap);
const fetchPeople = (async () => {
  try {
    const { data } = await axios.get("/api/people");
    const person = data.users
      .map((user) => {
        return `<li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 class="my-0">${user.fname} ${user.lname}</h6>
            <small class="text-muted">${user.address}</small>
          </div>
        </li>`;
      })
      .join("");
    result.innerHTML = person;
  } catch (err) {
    console.log("Api error: cannot fetch the  data");
  }
})();

const postFormData = async (ev) => {
  ev.preventDefault();
  const fromdata = new FormData(registForm);
  try {
    const { data } = await axios.post("/api/people", fromdata);
    const newPerson = `
    <li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 class="my-0">${data.data.fname} ${data.data.lname}</h6>
            <small class="text-muted">${data.data.address}</small>
          </div>
        </li>
    `;
    result.innerHTML += newPerson;
  } catch (err) {
    let error_msg = err.response.data.msg;
    Object.keys(error_msg).forEach((key) => {
      document
        .querySelectorAll("[data-error =" + key + "]")[0]
        .classList.remove("invalid-feedback");
      document.querySelectorAll("[data-error =" + key + "]")[0].textContent =
        error_msg[key];
    });
  }
};

registForm.addEventListener("submit", postFormData);
