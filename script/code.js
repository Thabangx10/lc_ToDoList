// let todoList1 = JSON.parse(localStorage.getItem('todoList')) || [];

//         function renderTodoList() {
//             let todoListElement = document.getElementById('todo-list');
//             todoListElement.innerHTML = '';

//             for (let i = 0; i < todoList1.length; i++) {
//                 let todoItem = todoList1[i];
//                 let listItem = document.createElement('li');
//                 listItem.classList.add('todo-item');

//                 let checkbox = document.createElement('input');
//                 checkbox.type = 'checkbox';
//                 checkbox.checked = todoItem.completed;
//                 checkbox.classList.add('checkbox');
//                 checkbox.addEventListener('change', function () {
//                     toggleCompletion(i);
//                 });
//                 listItem.appendChild(checkbox);

//                 let task = document.createElement('span');
//                 task.textContent = todoItem.name;
//                 task.classList.add('task');
//                 if (todoItem.completed) {
//                     task.classList.add('completed');
//                 }
//                 listItem.appendChild(task);

//                 todoListElement.appendChild(listItem);
//             }
//         }
        

// function saveTodoList() {
//     localStorage.setItem('todoList', JSON.stringify(todoList1));
// }

// function addItem() {
//     let inputElement = document.getElementById('input');
//     let newItem = inputElement.value.trim();
    
//     if (newItem !== '') {
//         let todoItem = {
//             name: newItem,
//             completed: false
//         };

//             todoList1.push(todoItem);
//             saveTodoList();
//             renderTodoList();
//             inputElement.value = '';
//         }
// }

    // Function to toggle completion of an item
        // function toggleCompletion(index) {
        //     todoList1[index].completed = !todoList1[index].completed;
        //     saveTodoList();
        //     renderTodoList();

        //     //Remove completed items
        //     if (todoList1[index].completed) {
        //         todoList1.splice(index, 1);
        //         saveTodoList();
        //         renderTodoList();
        //     }
        // }

// Function to sort the to-do list
// function sortItems() {
//     todoList1.sort(function (a, b) {
//         let nameA = a.name
//         let nameB = b.name
        
//         if (nameA > nameB) {
//                 return -1;
//             }if (nameA < nameB) {
//                 return 1;
//                 }
//                 return 0;
//             });

//             saveTodoList();
//             renderTodoList();
// }

// Event listeners for add and sort buttons
// document.getElementById('add').addEventListener('click', addItem);
// document.getElementById('sort').addEventListener('click', sortItems);

// Initial rendering of the to-do list
// renderTodoList();
// saveTodoList();

const addBtn = document.querySelector('#add-btn');
const sortBtn = document.querySelector('#sort-btn');
const todoInput = document.querySelector('#todo-input');
const resultDisplay = document.querySelector('#result-display');
let todoList = JSON.parse(localStorage.getItem('todo-list')) ? JSON.parse(localStorage.getItem('todo-list')) : [];
let tempID = todoList[todoList.length-1] ? todoList[todoList.length-1].id + 1: 1;
let todoDeleteButtons;
let todoCheckBoxes;
let editButtons;

addBtn.addEventListener('click', addItem);

function addItem(){
    event.preventDefault();
    if(todoInput.value == ''){
        alert('Input is Empty!')
    } else {
        todoList.push({
            id: tempID,
            name: todoInput.value,
            completed: false,
            date: new Date()
        });
        tempID++;
        todoInput.value = '';
        localStorage.setItem('todo-list', JSON.stringify(todoList));
        renderList();
    }
}

sortBtn.addEventListener('click', sortItem)
function sortItem(){
    event.preventDefault();
    todoList = todoList.sort((a,b)=>{
        if(a.name < b.name){
            return -1;
        } else {
            return 1;
        }
        return 0;
    })
    localStorage.setItem('todo-list', JSON.stringify(todoList))
    renderList();
}

function deleteButtons(){
    todoDeleteButtons = [...document.querySelectorAll('.close-btn')];
    todoDeleteButtons.forEach((item)=>{
        item.addEventListener('click',deleteItem)
    })
}
function deleteItem(){
    let startPoint = todoDeleteButtons.indexOf(event.target);
    todoList.splice(startPoint, 1);
    localStorage.setItem('todo-list', JSON.stringify(todoList))
    renderList();
}
function checkBoxes(){
    todoCheckBoxes = [...document.querySelectorAll('.todo-item-checkbox')];
    todoCheckBoxes.forEach((item)=>{
        item.addEventListener('click', checkBox)
    })
}
function checkBox(){
    let indexPosition = todoCheckBoxes.indexOf(event.target);
    if(todoList[indexPosition].completed === true){
        todoList[indexPosition].completed = false;
    } else {
        todoList[indexPosition].completed = true
    }
    renderList();
}

function editItem(){
editButtons = [...document.querySelectorAll('.edit-btn')];
editButtons.forEach((item)=>{
    item.addEventListener('click', editTodoItem)
})
}
function editTodoItem(){
    let newName = prompt('Enter new name:');
    let index = editButtons.indexOf(event.target);
    todoList[index].name = newName;
    localStorage.setItem('todo-list', JSON.stringify(todoList));
    renderList();
}
function renderList(){
    resultDisplay.innerHTML = '';
    todoList.forEach((item)=>{
        if(item.completed === false){
            resultDisplay.innerHTML += 
            `
            <div class="todo-item">
                <input type="checkbox" id="completed${item.id}" class="todo-item-checkbox">
                <p>${item.name}</p>
                <button id="edit-btn${item.id}" class="edit-btn">Edit</button>
                <button id="close-btn${item.id}" class="close-btn">X</button>
            </div>
            `
        } else {
            resultDisplay.innerHTML += 
            `
            <div class="todo-item">
                <input type="checkbox" id="completed${item.id}" class="todo-item-checkbox" checked>
                <p class="checked">${item.name}</p>
                <button id="edit-btn${item.id}" class="edit-btn">Edit</button>

                <button id="close-btn${item.id}" class="close-btn">X</button>
            </div>
            `
        }
    })
    deleteButtons();
    checkBoxes();
    editItem();
}

renderList();