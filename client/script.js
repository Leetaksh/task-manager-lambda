const API_URL = "http://localhost:3000/tasks";

async function loadTasks() {

  const search =
    document.getElementById("search").value;

  const filter =
    document.getElementById("filter").value;

  let url = API_URL;

  const params = [];

  if (search) {
    params.push(`search=${search}`);
  }

  if (filter) {
    params.push(`status=${filter}`);
  }

  if (params.length > 0) {
    url += "?" + params.join("&");
  }

  const response = await fetch(url);
  const tasks = await response.json();

  const taskList =
    document.getElementById("task-list");

  taskList.innerHTML = "";

  tasks.forEach(task => {

    const taskDiv =
      document.createElement("div");

    taskDiv.classList.add("task");

    if (task.status === "completed") {
      taskDiv.classList.add("completed");
    }

    taskDiv.innerHTML = `
      <h3>${task.title}</h3>
      <p>${task.description}</p>
      <p>Status: ${task.status}</p>

      <div class="task-buttons">

        <button onclick="toggleTask(${task.id}, '${task.title}', '${task.description}', '${task.status}')">
          ${
            task.status === "pending"
            ? "Complete"
            : "Undo"
          }
        </button>

        <button onclick="deleteTask(${task.id})">
          Delete
        </button>

      </div>
    `;

    taskList.appendChild(taskDiv);
  });
}

async function createTask() {

  const title =
    document.getElementById("title").value;

  const description =
    document.getElementById("description").value;

  if (!title.trim()) {
    alert("Task title required");
    return;
  }

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type":
      "application/json"
    },
    body: JSON.stringify({
      title,
      description
    })
  });

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";

  loadTasks();
}

async function deleteTask(id) {

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  loadTasks();
}

async function toggleTask(
  id,
  title,
  description,
  status
) {

  const newStatus =
    status === "pending"
    ? "completed"
    : "pending";

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type":
      "application/json"
    },
    body: JSON.stringify({
      title,
      description,
      status: newStatus
    })
  });

  loadTasks();
}

loadTasks();