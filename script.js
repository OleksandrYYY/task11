"use strict";

document.addEventListener('DOMContentLoaded', () => {
  createDefaultTasks();
  createList();
});

function createDefaultTasks() {
  const defaultTasks = [
    "Поїсти", "Поспати", "Сходити в зал", 
    "Поїсти", "Поспати", "Сходити в офіс", 
    "Поїсти", "Поспати", "Піти додому"
  ];
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  if (tasks.length === 0) {
    localStorage.setItem("tasks", JSON.stringify(defaultTasks));
  }
}


// function addTask (text) {
//   let items = JSON.parse(localStorage.getItem("items")) || [];
//   items.push(text);
//   localStorage.setItem("items", JSON.stringify(items));
//   createList();
// }


function createList () {
  const getElemList = document.querySelector(".list");
  getElemList.innerHTML = "";
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((elem, index) => {
    const createElemLi = document.createElement("li");
    createElemLi.textContent = elem;
    createElemLi.setAttribute("data-index", index);

    const createIcon = document.createElement("i");
    createIcon.className = "fa fa-edit";
    createIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      changeTask(index);
    });

    createElemLi.appendChild(createIcon);
    getElemList.appendChild(createElemLi);
    createElemLi.addEventListener("click", () => removeTask(index));
  })
}

function removeTask (index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  createList();
}

function changeTask (index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let newTask = prompt("Change task:", tasks[index]);
  if (newTask !== null && newTask.trim() !== "") {
    tasks[index] = newTask;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createList();
  }
}