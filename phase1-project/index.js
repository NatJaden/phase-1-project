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
    upvotes: 0,
  };
  renderOneDriver(newDriverObj);
  addNewDriver(newDriverObj);
}

function renderOneDriver(driver) {
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
      <div class="Buttons"><button id="delbtn"> Delete </button> 
      <button id="editbtn"> Upvote </button> 
      </div>
    `;


  card.querySelector("#editbtn").addEventListener("click", () => {
    driver.upvotes++;
    card.querySelector("span").textContent = driver.upvotes;
    upvoteDriver(driver);
  });
}