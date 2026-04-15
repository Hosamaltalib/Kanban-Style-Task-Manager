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