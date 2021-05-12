const validationError = (errmsg) => {
  return Object.keys(errmsg).forEach((key) => {
    document
      .querySelectorAll("[data-error =" + key + "]")[0]
      .classList.remove("invalid-feedback");
    document.querySelectorAll("[data-error =" + key + "]")[0].textContent =
      errmsg[key];
  });
};

const alertError = (msg) => {
  const template = `<div class="alert alert-danger" role="alert">
    ${msg}
</div>`;
  return template;
};

export { validationError, alertError };
