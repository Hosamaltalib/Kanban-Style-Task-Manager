let tasks = [];
let currentColumn = "";

const taskModal = document.getElementById("taskModal");
const taskTitleInput = document.getElementById("taskTitleInput");
const taskDescInput = document.getElementById("taskDescInput");
const taskPriorityInput = document.getElementById("taskPriorityInput");
const taskDateInput = document.getElementById("taskDateInput");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");

function openModal(columnId) {
    currentColumn = columnId;
    taskModal.classList.remove("is-hidden");
    taskTitleInput.focus();
}

function closeModal() {
    taskModal.classList.add("is-hidden");
    taskTitleInput.value = "";
    taskDescInput.value = "";
    taskPriorityInput.value = "low";
    taskDateInput.value = "";
}

document.querySelectorAll(".add-task-btn").forEach(button => {
    button.addEventListener("click", () => {
        const columnId = button.getAttribute("data-column");
        openModal(columnId);
    });
});

cancelModalBtn.addEventListener("click", closeModal);

function saveTask() {
    const title = taskTitleInput.value.trim();
    if (!title) {
        alert("Please enter a task title!");
        return;
    }

    const newTask = {
        id: Date.now(),
        title: title,
        description: taskDescInput.value.trim(),
        priority: taskPriorityInput.value,
        date: taskDateInput.value,
        status: currentColumn
    };

    tasks.push(newTask);
    renderBoard();
    closeModal();
}

function renderBoard() {
    const lists = {
        todo: document.getElementById("todo-list"),
        inprogress: document.getElementById("inprogress-list"),
        done: document.getElementById("done-list")
    };

    Object.values(lists).forEach(list => list.innerHTML = "");

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-card priority-${task.priority}`;
        li.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <small>Due: ${task.date || 'No date'}</small>
        `;
        lists[task.status].appendChild(li);
    });

    document.getElementById("task-counter").textContent = `Total Tasks: ${tasks.length}`;
}

saveTaskBtn.addEventListener("click", saveTask);