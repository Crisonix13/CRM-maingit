const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });

  // Add click event listener to show details in the pop-up
  task.addEventListener("click", showDetails);
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

// Function to show details in the pop-up
function showDetails() {
  const name = this.querySelector(".card-title").textContent;
  const number = this.querySelectorAll(".card-text")[0].textContent;
  const email = this.querySelectorAll(".card-text")[1].textContent;

  document.getElementById("detailsName").textContent = "Name: " + name;
  document.getElementById("detailsNumber").textContent = "Number: " + number;
  document.getElementById("detailsEmail").textContent = "Email: " + email;

  document.getElementById("popup").style.display = "block";
}

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  els.forEach((task) => {
    const { top } = task.getBoundingClientRect();

    const offset = mouseY - top;

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });
  return closestTask;
};
