document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage
    loadTasks();

    // Add task
    addTaskButton.addEventListener('click', function () {
        const taskText = taskInput.value;
        const dueDate = taskDate.value;

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const task = {
            text: taskText,
            date: dueDate,
            completed: false
        };

        addTask(task);
        taskInput.value = '';
        taskDate.value = '';
    });

    // Function to add task
    function addTask(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <span>${task.text} - ${task.date}</span>
            <div>
                <button onclick="toggleComplete(this)">Complete</button>
                <button onclick="editTask(this)">Edit</button>
                <button onclick="removeTask(this)">Remove</button>
            </div>
        `;

        taskList.appendChild(li);
        saveTasks();
    }

    // Toggle task completion
    window.toggleComplete = function (button) {
        const li = button.parentNode.parentNode;
        li.classList.toggle('completed');
        saveTasks();
    }

    // Edit task
    window.editTask = function (button) {
        const li = button.parentNode.parentNode;
        const span = li.querySelector('span');
        const [taskText, dueDate] = span.innerText.split(' - ');

        taskInput.value = taskText;
        taskDate.value = dueDate;

        li.remove();
        saveTasks();
    }

    // Remove task
    window.removeTask = function (button) {
        const li = button.parentNode.parentNode;
        li.remove();
        saveTasks();
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task-item').forEach(li => {
            const span = li.querySelector('span');
            const completed = li.classList.contains('completed');
            tasks.push({ text: span.innerText, completed });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item ' + (task.completed ? 'completed' : '');
            li.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button onclick="toggleComplete(this)">Complete</button>
                    <button onclick="editTask(this)">Edit</button>
                    <button onclick="removeTask(this)">Remove</button>
                </div>
            `;
            taskList.appendChild(li);
        });
    }
});
