//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//Event Listeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions

function addTodo(event) {
    //prevent  form from submitting
    event.preventDefault();

    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //create LI

    const newtodo = document.createElement('li');
    newtodo.innerText = todoInput.value;
    newtodo.classList.add('todo-item');
    todoDiv.appendChild(newtodo);


    //Add Todo to Local Storage
    saveLocalTodos(todoInput.value);

    //cheak Mark Button

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-button");
    todoDiv.appendChild(completedButton);


    //cheak trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-Button");
    todoDiv.appendChild(trashButton);

    //Append 
    todoList.appendChild(todoDiv);

    //Clear Todo input Value
    todoInput.value = "";

}

function deleteCheck(e) {
    const item = e.target;
    //delete todo
    if (item.classList[0] === "trash-Button") {
        const todo = item.parentElement;
        //animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    if (item.classList[0] === "completed-button") {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function (todo) {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = "flex";
                }
                else {
                    todo.style.display = "none";
                }
                break;
        }

    });
}


function saveLocalTodos(todo) {
    //CHEAK--HEY Do I Already Have Thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}


function getTodos() {
    //CHEAK--HEY Do I Already Have Thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function (todo) {
        //Todo DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        //create LI

        const newtodo = document.createElement('li');
        newtodo.innerText = todo;
        newtodo.classList.add('todo-item');
        todoDiv.appendChild(newtodo);


        //cheak Mark Button

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-button");
        todoDiv.appendChild(completedButton);


        //cheak trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-Button");
        todoDiv.appendChild(trashButton);

        //Append 
        todoList.appendChild(todoDiv);

    });

}

function removeLocalTodos(todo){
    //CHEAK--HEY Do I Already Have Thing in there?
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}