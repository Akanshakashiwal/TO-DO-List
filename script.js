let taskList = [];

document.getElementById('add-task').addEventListener('click', addTask);

function addTask() {
  let newTask = document.getElementById('new-task').value.trim();
  if (newTask !== '') {
    taskList.push({ text: newTask, completed: false });
    renderTaskList();
    document.getElementById('new-task').value = '';
  }
}

function renderTaskList() {
  let taskListHTML = '';
  taskList.forEach((task, index) => {
    taskListHTML += `
      <li>
        <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
        <label for="task-${index}">${task.text}</label>
        <button class="delete-task" data-index="${index}">X</button>
      </li>
    `;
  });
  document.getElementById('task-list').innerHTML = taskListHTML;
  addEventListenersToTasks();
}

function addEventListenersToTasks() {
  let taskListItems = document.getElementById('task-list').children;
  for (let i = 0; i < taskListItems.length; i++) {
    let taskListItem = taskListItems[i];
    let checkbox = taskListItem.children[0];
    let deleteButton = taskListItem.children[2];
    checkbox.addEventListener('click', toggleTaskCompleted);
    deleteButton.addEventListener('click', deleteTask);
  }
}

function toggleTaskCompleted(event) {
  let taskIndex = event.target.id.split('-')[1];
  taskList[taskIndex].completed = !taskList[taskIndex].completed;
  renderTaskList();
}

function deleteTask(event) {
  let taskIndex = event.target.dataset.index;
  taskList.splice(taskIndex, 1);
  renderTaskList();
}

renderTaskList();