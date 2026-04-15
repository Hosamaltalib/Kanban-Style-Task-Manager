let tasks = [];
let currentColumn = "";

// تعريف العناصر
const taskModal = document.getElementById("taskModal");
const taskTitleInput = document.getElementById("taskTitleInput");
const taskDescInput = document.getElementById("taskDescInput");
const taskPriorityInput = document.getElementById("taskPriorityInput");
const taskDateInput = document.getElementById("taskDateInput");
const saveTaskBtn = document.getElementById("saveTaskBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");
const priorityFilter = document.getElementById("priorityFilter");
const clearDoneBtn = document.getElementById("clear-done-btn");

// --- وظائف الـ Modal ---
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

// --- وظائف السحب والإفلات (Drag & Drop) ---
function handleDragStart(e) {
    e.dataTransfer.setData("text/plain", e.target.id);
    e.target.style.opacity = "0.5";
}

function handleDragEnd(e) {
    e.target.style.opacity = "1";
}

function handleDrop(e) {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain").replace("task-", "");
    const newStatus = e.currentTarget.id; 

    const taskIndex = tasks.findIndex(t => t.id == taskId);
    if (taskIndex !== -1) {
        tasks[taskIndex].status = newStatus;
        renderBoard(priorityFilter.value);
    }
}

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
    renderBoard(priorityFilter.value);
    closeModal();
}

function renderBoard(filter = "all") {
    const lists = {
        todo: document.getElementById("todo-list"),
        inprogress: document.getElementById("inprogress-list"),
        done: document.getElementById("done-list")
    };

    Object.values(lists).forEach(list => {
        list.innerHTML = "";
        const column = list.parentElement;
        column.addEventListener("dragover", (e) => e.preventDefault());
        column.addEventListener("drop", handleDrop);
    });

    const filteredTasks = tasks.filter(task => {
        if (filter === "all") return true;
        return task.priority === filter;
    });

    filteredTasks.forEach(task => {
        const li = document.createElement("li");
        li.className = `task-card priority-${task.priority}`;
        li.id = `task-${task.id}`; 
        li.draggable = true; 

        li.innerHTML = `
            <h4>${task.title}</h4>
            <p>${task.description}</p>
            <small>Due: ${task.date || 'No date'}</small>
        `;

        li.addEventListener("dragstart", handleDragStart);
        li.addEventListener("dragend", handleDragEnd);

        lists[task.status].appendChild(li);
    });

    document.getElementById("task-counter").textContent = `Total Tasks: ${tasks.length}`;
}

function clearDoneTasks() {
    if (confirm("Are you sure you want to clear all completed tasks?")) {
        tasks = tasks.filter(task => task.status !== "done");
        renderBoard(priorityFilter.value);
    }
}

document.querySelectorAll(".add-task-btn").forEach(button => {
    button.addEventListener("click", () => {
        const columnId = button.getAttribute("data-column");
        openModal(columnId);
    });
});

saveTaskBtn.addEventListener("click", saveTask);
cancelModalBtn.addEventListener("click", closeModal);
priorityFilter.addEventListener("change", () => renderBoard(priorityFilter.value));
clearDoneBtn.addEventListener("click", clearDoneTasks);

renderBoard();