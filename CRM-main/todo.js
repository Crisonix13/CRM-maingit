// todo.js

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const popup = document.getElementById("popup");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = document.createElement("div");
  newTask.classList.add("card", "task");
  newTask.setAttribute("draggable", "true");
  newTask.innerHTML = `
    <div class="card-body" onclick="showDetails()">
      <h5 class="card-title">${value}</h5>
      <p class="card-text">Number</p>
      <p class="card-text">Email</p>
    </div>
  `;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);

  input.value = "";
});

function showDetails() {
  const name = this.querySelector(".card-title").textContent;
  const number = this.querySelectorAll(".card-text")[0].textContent;
  const email = this.querySelectorAll(".card-text")[1].textContent;

  // Insert data into pop-up elements
  document.getElementById("detailsName").textContent = "Name: " + name;
  document.getElementById("detailsNumber").textContent = "Number: " + number;
  document.getElementById("detailsEmail").textContent = "Email: " + email;

  // Display the pop-up
  document.getElementById("popup").style.display = "block";
}

// Function to close the pop-up
function closePopup() {
  popup.style.display = "none";
}

// Event listener for close button click to hide the popup
const closeButton = document.getElementById("closeButton");
if (closeButton) {
  closeButton.addEventListener("click", closePopup);
}
