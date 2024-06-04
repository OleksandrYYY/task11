"use strict";

document.addEventListener('DOMContentLoaded', () => {
  createDefaultTasks();
  createList();
  document.querySelector("#addTaskButton").addEventListener("click", addTask)
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

    const removeIcon = document.createElement("i");
    removeIcon.className = "fa fa-times";
    removeIcon.addEventListener("click", (event) => {
      event.stopPropagation();
      removeTask(index);
    });

    
    createElemLi.appendChild(createIcon);
    createElemLi.appendChild(removeIcon);
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

function addTask () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskInput = document.querySelector("#taskInput");
  const newTask = taskInput.value.trim();
  if (newTask !== "") {
    tasks.push(newTask);
    taskInput.value = "";
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createList();
  }
}