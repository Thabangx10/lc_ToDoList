let todoList = JSON.parse(localStorage.getItem('todoList')) || [];

        function renderTodoList() {
            let todoListElement = document.getElementById('todo-list');
            todoListElement.innerHTML = '';

            for (let i = 0; i < todoList.length; i++) {
                let todoItem = todoList[i];
                let listItem = document.createElement('li');
                listItem.classList.add('todo-item');

                let checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.checked = todoItem.completed;
                checkbox.classList.add('checkbox');
                checkbox.addEventListener('change', function () {
                    toggleCompletion(i);
                });
                listItem.appendChild(checkbox);

                let task = document.createElement('span');
                task.textContent = todoItem.name;
                task.classList.add('task');
                if (todoItem.completed) {
                    task.classList.add('completed');
                }
                listItem.appendChild(task);

                todoListElement.appendChild(listItem);
            }
        }
        

function saveTodoList() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function addItem() {
    let inputElement = document.getElementById('input');
    let newItem = inputElement.value.trim();
    
    if (newItem !== '') {
        let todoItem = {
            name: newItem,
            completed: false
        };

            todoList.push(todoItem);
            saveTodoList();
            renderTodoList();
            inputElement.value = '';
        }
}

        // Function to toggle completion of an item
        function toggleCompletion(index) {
            todoList[index].completed = !todoList[index].completed;
            saveTodoList();
            renderTodoList();

            // Remove completed items
            // if (todoList[index].completed) {
            //     todoList.splice(index, 1);
            //     saveTodoList();
            //     renderTodoList();
            // }
        }

// Function to sort the to-do list
function sortItems() {
    todoList.sort(function (a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        
        if (nameA < nameB) {
                return -1;
            }if (nameA > nameB) {
                return 1;
                }
                return 0;
            });

            saveTodoList();
            renderTodoList();
}

// Event listeners for add and sort buttons
document.getElementById('add').addEventListener('click', addItem);
document.getElementById('sort').addEventListener('click', sortItems);

// Initial rendering of the to-do list
renderTodoList();