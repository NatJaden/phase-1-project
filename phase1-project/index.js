// Event listener for form submission
document.querySelector(".form").addEventListener("submit", newDriver);

// Function to handle form submission
function newDriver(e) {
  e.preventDefault(); // Prevent default form submission
  // Gets the data entered into the for
  let newDriverObj = {
    driverId: e.target.driverId.value,
    url: e.target.url.value,
    givenName: e.target.givenName.value,
    familyName: e.target.familyName.value,
    dateOfBirth: e.target.dateOfBirth.value,
    nationality: e.target.nationality.value,
    imageUrl: e.target.imageUrl.value,
    upvotes: 0, // Sets the upvotes to 0
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
    <p> <span class= "upVotes"> ${driver.upvotes}<span> Upvotes </p>
    <div class="content">
      <h4>${driver.givenName} ${driver.familyName}</h4>
      <p>Driver ID: ${driver.driverId}</p>
      <p>Wikipedia URL:${driver.url}</a></p>
      <p>Date of Birth: ${driver.dateOfBirth}</p>
      <p>Nationality: ${driver.nationality}</p>
    </div>
    <div class="Buttons">
      <button id="delbtn"> Delete</button> 
      <button id="editbtn"> <img class="upvotebtn" src="https://cdn3.emoji.gg/emojis/3388_Upvote.png"> </button> 
      <button id="editbtn2"> Downvote </button> 
    </div>
  `;
  // Event listener for upvote button
  card.querySelector("#editbtn").addEventListener("click", () => {
    driver.upvotes++;
    card.querySelector("span").textContent = driver.upvotes;
    upvoteDriver(driver); // Update upvotes on server
  });
  card.querySelector("#editbtn2").addEventListener("click", () => {
    driver.upvotes--;
    card.querySelector("span").textContent = driver.upvotes;
    downvoteDriver(driver); // Update downvotes on server
  });
  // Event listener for delete button which when clicked deletes the card from the UI and the server
  card.querySelector("#delbtn").addEventListener("click", () => {
    card.remove();
    deleteDriver(driver.id);
  });
  // Adds the created card to the driver list
  document.querySelector(".driver-list").appendChild(card);
}

// Function to fetch all drivers from the server
function getAllDrivers() {
  fetch("http://localhost:3000/drivers")
    .then((res) => res.json())
    .then((drivers) => {
      drivers.forEach((driver) => renderOneDriver(driver));
    });
}

// Function to add a new driver to the server
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

// Function to update the upvotes of a driver on the server
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

// Function to update the upvotes of a driver on the server
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
// Function to delete a driver from the server
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

// Function to initialize the application
function initialize() {
  getAllDrivers();
}

initialize(); // Calls the initialize function
