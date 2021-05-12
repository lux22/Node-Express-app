const insertItemTemplate = (data, key) => {
  const addPersonTemp = `<li class="list-group-item d-flex justify-content-between lh-sm" key=${key}>
          <div>
            <h6 class="my-0">${data.fname} ${data.lname}</h6>
            <small class="text-muted">${data.address}</small>
          </div>
        </li>`;
  return addPersonTemp;
};

export default insertItemTemplate;
