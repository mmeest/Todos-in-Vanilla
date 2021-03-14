//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos());
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    //Check if input is not empty
    event.preventDefault();
    if(todoInput.value != ''){
        let numOfLis = document.querySelectorAll('.todo-item').length;
        console.log(numOfLis);
        //Prevent form from submitting
        console.log('hello');
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = numOfLis + 1 + '. ' + todoInput.value;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Add Todo to local storage
        saveLocalTodos(todoInput.value);
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);
        //Clear Todo input value
        todoInput.value="";
    }
}

function deleteCheck(e){
    console.log(e.target);              // buttonclick event response
    const item = e.target;
    //Delete todo
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    //Check mark
    if(item.classList[0] === "complete-btn"){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

//Save to local storage
function saveLocalTodos(todo){
    //Check if already items in storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    //Check if already items in storage
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        let numOfLis = document.querySelectorAll('.todo-item').length;
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = numOfLis + 1 + '. ' + todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //Check mark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //Trash button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //Append to list
        todoList.appendChild(todoDiv);
    })
}