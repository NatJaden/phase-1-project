// Event listener for form submission
document.querySelector(".form").addEventListener("submit", newDriver);

// Function to handle form submission
function newDriver(e) {
  e.preventDefault(); // Prevents default
  let newDriverObj = {
    driverId: e.target.driverId.value,
    url: e.target.url.value,
    givenName: e.target.givenName.value,
    familyName: e.target.familyName.value,
    dateOfBirth: e.target.dateOfBirth.value,
    nationality: e.target.nationality.value,
    imageUrl: e.target.imageUrl.value,
    upvotes: 0,
  };
  // Calls the function that renders the new driver card
  renderOneDriver(newDriverObj);
  // Calls the function that adds the new driver to the server
  addNewDriver(newDriverObj);
}

// Function to render a single driver card
function renderOneDriver(driver) {
  // Create a new card element
  const card = document.createElement("li");
  card.className = "card";
  card.innerHTML = `
    <div class="image-container">
      <img src ="${driver.imageUrl}" class = "driver-image">
    </div>
    <p> <span class= "upVotes"> ${driver.upvotes}<span> votes </p>
    <div class="content">
      <h4>${driver.givenName} ${driver.familyName}</h4>
      <p>Driver ID: ${driver.driverId}</p>
      <p>Wikipedia URL:${driver.url}</a></p>
      <p>Date of Birth: ${driver.dateOfBirth}</p>
      <p>Nationality: ${driver.nationality}</p>
    </div>
    <div class="Buttons">
      <button id="delbtn"> Delete</button> 
      <button id="editbtn">Upvote</button> 
      <button id="editbtn2">Downvote</button> 
    </div>
  `;
  // Event listener for upvote button
  card.querySelector("#editbtn").addEventListener("click", () => {
    driver.upvotes++;
    card.querySelector("span").textContent = driver.upvotes;
    upvoteDriver(driver); // Update upvotes
  });
  card.querySelector("#editbtn2").addEventListener("click", () => {
    driver.upvotes--;
    card.querySelector("span").textContent = driver.upvotes;
    downvoteDriver(driver); // Update downvotes
  });
  // Event listener for delete button
  card.querySelector("#delbtn").addEventListener("click", () => {
    card.remove();
    deleteDriver(driver.id);
  });
  // Adds the created card to the driver list
  document.querySelector(".driver-list").appendChild(card);
}

// Function to fetch all drivers
function getAllDrivers() {
  fetch("http://localhost:3000/drivers")
    .then((res) => res.json())
    .then((drivers) => {
      drivers.forEach((driver) => renderOneDriver(driver));
    });
}

// Function to add a new driver
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

// Function to update the upvotes
function upvoteDriver(newDriverObj) {
  fetch(`http://localhost:3000/drivers/${newDriverObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDriverObj),
  })
    .then((res) => res.json())
    .then((driver) => console.log(driver));
}

// Function to update the upvotes
function downvoteDriver(newDriverObj) {
  fetch(`http://localhost:3000/drivers/${newDriverObj.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDriverObj),
  })
    .then((res) => res.json())
    .then((driver) => console.log(driver));
}
// Function to delete a driver
function deleteDriver(id) {
  fetch(`http://localhost:3000/drivers/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((driver) => console.log(driver));
}

// Function to initialize
function initialize() {
  getAllDrivers();
}

initialize(); // Calls the initialize function
