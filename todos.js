const todoDiv = document.querySelector("#todos");
const firstTodoSubTitle = todoDiv.querySelector("#first-todo-title");
const todoList = todoDiv.querySelector("#todo-list");
const todoForm = todoDiv.querySelector("#todo-form");

const today = new Date();
const todayIndex = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`;
function getTodos() {
    const todos = localStorage.getItem(todayIndex);
    if (todos) {
        return JSON.parse(todos);
    } else {
        return [];
    }
}
function setTodos(todos) {
    localStorage.setItem(todayIndex, JSON.stringify(todos));
}
function addNewTodo(todo, timestring) {
    currentTodoList.push({timestring: timestring, text: todo, completed: false});
    setTodos(currentTodoList);
    drawTodos();
}
function deleteTodo(event) {
    currentTodoList = currentTodoList.filter((todoObj) => String(todoObj.timestring) !== event.target.parentElement.id)
    setTodos(currentTodoList);
    if (currentTodoList.length === 0) {
        showFirstTodoTitle();
    }
    drawTodos();
}
function completeTodo(event) {
    currentTodoList = currentTodoList.map((todoObj) => {
        if (String(todoObj.timestring) === event.target.parentElement.id) {
            todoObj.completed = !todoObj.completed;
        }
        return todoObj;
    });
    setTodos(currentTodoList);
}
let currentTodoList = getTodos();


function showFirstTodoTitle() {
    firstTodoSubTitle.classList.remove("hidden");
}
function hideFirstTodoTitle() {
    firstTodoSubTitle.classList.add("hidden");
}
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const todo = appDiv.querySelector("#todo").value;
    addNewTodo(todo, Date.now());
    appDiv.querySelector("#todo").value = "";
    drawTodos();
});

//Initialize the todos
function drawTodos() {
    if (currentTodoList.length > 0) {
        hideFirstTodoTitle();
    } else {
        showFirstTodoTitle();
    }
    if (todoList.hasChildNodes) {
        const childCount = todoList.childNodes.length;
        for (let childIdx=childCount; childIdx>0; childIdx--) {
            todoList.childNodes[childIdx-1].remove();
        }
    }
    currentTodoList.forEach((todoObj) => {
        const todoContainer = document.createElement("div");
        todoContainer.id = todoObj.timestring
        const todoItem = document.createElement("input");
        todoItem.type = "checkbox";
        todoItem.checked = todoObj.completed;
        todoItem.id = `todo-item-${todoObj.timestring}`;
        todoItem.className = "todoItem";
        todoItem.addEventListener("change", completeTodo);
        todoContainer.appendChild(todoItem);
        const todoLabel = document.createElement("label");
        todoLabel.htmlFor = `todo-item-${todoObj.timestring}`;
        const todoSpan = document.createElement("span");
        todoSpan.innerText = todoObj.text;
        todoLabel.appendChild(todoSpan);
        todoContainer.appendChild(todoLabel);
        const todoDelete = document.createElement("span");
        todoDelete.id = `todo-delete-${todoObj.timestring}`;
        todoDelete.className = "todoDelete";
        todoDelete.innerText = "❌";
        todoDelete.addEventListener("click", deleteTodo);
        todoContainer.appendChild(todoDelete);
        todoList.appendChild(todoContainer);
    });
}
drawTodos();