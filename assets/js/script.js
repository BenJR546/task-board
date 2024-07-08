
$('#modal-button').on('click', function() {
    $('#formModal').modal('show');
});

function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
        tasks = [];
    }
    return tasks;
}


function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


function createTaskCard(task) {
    const taskCard = $('<div>')
        .addClass('card task-card draggable my-3')
        .attr('data-task-id', task.id);
    const cardHeader = $('<div>')
        .addClass('card-header h4')
        .text(task.name);
    const cardBody = $('<div>')
        .addClass('card-body');
    const cardDescription = $('<p>')
        .addClass('card-text')
        .text(task.description);
    const cardDueDate = $('<p>')
        .addClass('card-text')
        .text(task.dueDate);
    const cardDeleteBtn = $('<button>')
        .addClass('btn btn-danger delete')
        .text('Delete')
        .attr("data-task-id", task.id);
    cardDeleteBtn.on('click', handleDeleteTask);

    if (task.dueDate && task.status !== 'done') {
        const now = dayjs();
        const taskDueDate = dayjs(task.dueDate, 'DD/MM/YYYY');

        if (now.isSame(taskDueDate, 'day')) {
            taskCard.addClass('bg-warning text-dark');
        } else if (now.isAfter(taskDueDate, 'day')) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
        } else if (task.status === 'done') {
            taskCard.addClass('bg-success text-white');
        $('#formModal').modal('hide');
    }

    cardBody.append(cardDescription, cardDueDate, cardDeleteBtn);
    taskCard.append(cardHeader, cardBody);

    
    taskCard.draggable({
        opacity: 0.7,
        zIndex: 100,
        helper: function () {
            return $(this).clone().css({
                width: $(this).outerWidth()
            });
        },
    });

    return taskCard;
}

function printTaskData() {
    const tasks = readTasksFromStorage();

    const todoList = $('#todo-cards');
    todoList.empty();

    const inProgressList = $('#in-progress-cards');
    inProgressList.empty();

    const doneList = $('#done-cards');
    doneList.empty();

    for (let task of tasks) {
        if (task.status === 'to-do') {
            todoList.append(createTaskCard(task));
        } else if (task.status === 'in-progress') {
            inProgressList.append(createTaskCard(task));
        } else if (task.status === 'done') {
            doneList.append(createTaskCard(task));
        }
    }
}

function handleDeleteTask() {
    const taskId = $(this).attr('data-task-id');
    const tasks = readTasksFromStorage();

    tasks.forEach((task) => {
        if (task.id === taskId) {
            tasks.splice(tasks.indexOf(task), 1);
        }
    });

    saveTasksToLocalStorage(tasks);
    printTaskData();
}

function handleTaskFormSubmit(event) {
    event.preventDefault();

    const taskName = $('#task-name').val().trim();
    const taskDescription = $('#description').val().trim();
    const taskDueDate = $('#due-date').val();
//add crypto to generate unique UUID
    const newTask = {
        id: crypto.randomUUID(),
        name: taskName,
        description: taskDescription,
        dueDate: taskDueDate,
        status: 'to-do'
    };

    const tasks = readTasksFromStorage();
    tasks.push(newTask);

    saveTasksToLocalStorage(tasks);
    printTaskData();

    $('#task-name').val('');
    $('#description').val('');
    $('#due-date').val('');

    $('#formModal').modal('hide');
}
