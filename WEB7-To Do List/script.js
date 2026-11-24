
let tasks = [];

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({ name: task, completed: false });
    input.value = "";
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.textContent = task.name;

        if (task.completed) {
            li.classList.add("completed");
        }

        li.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            displayTasks();
        };

        let del = document.createElement("button");
        del.textContent = "Delete";

        del.onclick = function (event) {
            event.stopPropagation();
            tasks.splice(index, 1);
            displayTasks();
        };

        li.appendChild(del);
        list.appendChild(li);
    });
}
