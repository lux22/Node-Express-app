const submitFormBtn = document.querySelector(".submit_form");
const result = document.querySelector(".list-group");
const registForm = document.querySelector("#reg_form");
console.log(registForm);
// Fetch data from the server api
const fetchPeople = (async () => {
  try {
    const { data } = await axios.get("/api/people");
    const person = data.users
      .map((user) => {
        return `<li class="list-group-item d-flex justify-content-between lh-sm">
          <div>
            <h6 class="my-0">${user.name}</h6>
            <small class="text-muted">Brief description</small>
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
  } catch (err) {
    console.log("ERrro");
  }
};

registForm.addEventListener("submit", postFormData);
