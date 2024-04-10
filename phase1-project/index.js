document.querySelector(".form").addEventListener("submit", newDriver);

function newDriver(e) {
  e.preventDefault();
  let newDriverObj = {
    driverId: e.target.driverId.value,
    url: e.target.url.value,
    givenName: e.target.givenName.value,
    familyName: e.target.familyName.value,
    dateOfBirth: e.target.dateOfBirth.value,
    nationality: e.target.nationality.value,
    imageUrl: e.target.imageUrl.value,
    upvotes: 0
  };
  renderOneDriver(newDriverObj);
  addNewDriver(newDriverObj);
}

function renderOneDriver(driver) {
  const card = document.createElement("li");
  card.className = "card";
  card.innerHTML = `
      <img src ="${driver.imageUrl}">
      <div class='content'>
        <h4>${driver.givenName} ${driver.familyName}</h4>
        <p>Driver ID: ${driver.driverId}</p>
        <p>Wikipedia URL: ${driver.url}</p>
        <p>Date of Birth: ${driver.dateOfBirth}</p>
        <p>Nationality: ${driver.nationality}</p>
      </div>
      <div class="Buttons"><button id="delbtn"> Delete </button> 
      <button id="editbtn"> Edit </button>
      </div>
    `;

  card
    .querySelector("#editbtn")
    .addEventListener("click", () => {
      card
    });
  document.querySelector(".driver-list").appendChild(card);
}
function getAllDrivers() {
  fetch("http://localhost:3000/drivers")
    .then((res) => res.json())
    .then((drivers) => {
      drivers.forEach((driver) => renderOneDriver(driver));
    });
}

function addNewDriver(newDriverObj) {
  fetch("http://localhost:3000/drivers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDriverObj),
  })
    .then((res) => res.json())
    .then((driver) => console.log(driver));
}

function initialize() {
  getAllDrivers();
}

initialize();
