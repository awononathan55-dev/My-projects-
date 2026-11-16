const id = crypto.randomUUID();
const formModal = document.querySelector(".form-modal");
const form = document.querySelector("form");

const title = document.querySelector("#title");
const description = document.querySelector("#description");
const date = document.querySelector("#date");

const taskTable = document.querySelector("#task-list");

const totalTask = document.querySelector("#total-task");
const totalCompleted = document.querySelector("#total-completed");
const totalPending = document.querySelector("#total-pending");

function addTask(){
  if (title.value == "") {
    alert("Please enter a task title.");
    return;
  }
  else{
    let li = document.createElement("li");
    li.innerHTML = title.value;
    taskTable.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00D7";
    li.appendChild(span);

    title.value = "";
    formModal.style.display = "none";

    calculateStats();
    SaveTask();
  }
}

taskTable.addEventListener("click", function(e){
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    calculateStats();
    SaveTask();
  }
  calculateStats();
  SaveTask();

  if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    calculateStats();
    SaveTask();
  }
});

function SaveTask(){
  localStorage.setItem("data", taskTable.innerHTML);
}
function LoadTask(){
  taskTable.innerHTML = localStorage.getItem("data");
  calculateStats();
}
function calculateStats(){
  let total = taskTable.children.length;
  let completed = taskTable.querySelectorAll("li.checked").length;
  let pending = total - completed;
  let progress = total === 0 ? 0 :
  Math.round((completed / total) * 100);

  totalTask.textContent = total;
  totalCompleted.textContent = completed;
  totalPending.textContent = pending;
  document.getElementById("percentage").textContent = progress + "%";
  document.querySelector(".progress-card").style.background = `conic-gradient(#6366f1 0% ${progress}%, #ffffff ${progress}% 100%)`;

  let stats = {
    total,
    completed,
    pending,
    progress
  };
  localStorage.setItem("stats", JSON.stringify(stats));
}

LoadTask();

function ShowModal(){
  formModal.style.display = "flex";
  title.value = "";
  description.value = "";
  date.value = "";
}

function CloseModal(){
  formModal.style.display = "none";
}