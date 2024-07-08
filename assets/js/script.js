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

