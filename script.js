const addTask = document.getElementById("add-task");
const taskInput = document.querySelector(".todo-input");
const deleteAll = document.getElementById("removeall");
const completeTasks = document.getElementById("complete");
const incompleteTasks = document.getElementById("incomplete");
let i;
let tasks;

if (localStorage.tasks != null) {
  tasks = JSON.parse(localStorage.tasks);
} else {
  tasks = [];
}

function readTasks() {
  const todos = document.querySelector(".todos");
  const emptyImg = document.querySelector(".empty-image");
  let myTasks = "";
  tasks.forEach((item) => {
    myTasks += `
      <li class="todo">
        <label for="task${item.id}">
          <input class="task-input" id="task${
            item.id
          }" type="checkbox" onchange="updateTask(${item.id})" ${
      item.status === "complete" ? "checked" : ""
    }/>
          <span>${item.task}</span>
        </label>
        <button class="delete-btn" onclick="removeTask(${
          item.id
        })"><i class="fa fa-times"></i></button>
      </li>
    `;
  });
  if (myTasks != "") {
    emptyImg.style.display = "none";
  } else {
    emptyImg.style.display = "block";
  }
  todos.innerHTML = myTasks;

  completeTasks.addEventListener("click", (eo) => {
    incompleteTasks.classList.remove("active");
    eo.target.classList.toggle("active");
    myTasks = ``;
    if (eo.target.className.includes("active")) {
      tasks.forEach((item) => {
        if (item.status === "complete") {
          myTasks += `
            <li class="todo">
              <label for="task${item.id}">
                <input class="task-input" id="task${item.id}" type="checkbox" onchange="updateTask(${item.id})" checked />
                <span>${item.task}</span>
              </label>
              <button class="delete-btn" onclick="removeTask(${item.id})"><i class="fa fa-times"></i></button>
            </li>
          `;
        }
      });
    }else{
      tasks.forEach((item) => {
          myTasks += `
            <li class="todo">
              <label for="task${item.id}">
                <input class="task-input" id="task${item.id}" type="checkbox" onchange="updateTask(${item.id})" ${item.status === "complete" ? "checked" : "" } />
                <span>${item.task}</span>
              </label>
              <button class="delete-btn" onclick="removeTask(${item.id})"><i class="fa fa-times"></i></button>
            </li>
          `;
      });
    }
    todos.innerHTML = myTasks;
  });

  incompleteTasks.addEventListener("click", (eo) => {
    completeTasks.classList.remove("active");
    eo.target.classList.toggle("active");
    myTasks = ``;
    if (eo.target.className.includes("active")) {
      tasks.forEach((item) => {
        if (item.status === "incomplete") {
          myTasks += `
            <li class="todo">
              <label for="task${item.id}">
                <input class="task-input" id="task${item.id}" type="checkbox" onchange="updateTask(${item.id})" />
                <span>${item.task}</span>
              </label>
              <button class="delete-btn" onclick="removeTask(${item.id})"><i class="fa fa-times"></i></button>
            </li>
          `;
        }
      });
    }else{
      tasks.forEach((item) => {
          myTasks += `
            <li class="todo">
              <label for="task${item.id}">
                <input class="task-input" id="task${item.id}" type="checkbox" onchange="updateTask(${item.id})" ${item.status === "complete" ? "checked" : "" } />
                <span>${item.task}</span>
              </label>
              <button class="delete-btn" onclick="removeTask(${item.id})"><i class="fa fa-times"></i></button>
            </li>
          `;
      });
    }
    todos.innerHTML = myTasks;
  });
}

window.addEventListener("load", readTasks());

addTask.addEventListener("submit", (eo) => {
  eo.preventDefault();
  let newTask = {
    id: tasks.length,
    task: taskInput.value,
    status: "incomplete",
  };
  tasks.push(newTask);
  localStorage.tasks = JSON.stringify(tasks);
  taskInput.value = "";
  readTasks();
});

function removeTask(id) {
  tasks.forEach((item) => {
    if (item.id === id) {
      tasks.splice(item.id, 1);
    }
  });
  localStorage.tasks = JSON.stringify(tasks);
  readTasks();
}

deleteAll.addEventListener("click", (eo) => {
  tasks.splice(0, tasks.length);
  localStorage.tasks = JSON.stringify(tasks);
  readTasks();
});

function updateTask(id) {
  tasks.forEach((item) => {
    if (item.id === id) {
      if (item.status === "incomplete") {
        item.status = "complete";
      } else {
        item.status = "incomplete";
      }
    }
  });
  localStorage.tasks = JSON.stringify(tasks);
  readTasks();
}
