//Open the modal
$('#modal-button').on('click', function() {
    $('#formModal').modal('show');
});
//Read the tasks from the local storage and initialize the tasks array if there are none
function readTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    if (!tasks) {
        tasks = [];
    }
    return tasks;
}

//Save the tasks to the local storage
function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Create task card
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