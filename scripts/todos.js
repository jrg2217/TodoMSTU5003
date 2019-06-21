// The core TRUTH of this program
var data = [
	{
		id: 1497141891479,
		task: "Do stuff",
		done: true
	},
	{
		id: 1497141913701,
		task: "Do more stuff",
		done: true
	},
	{
		id: 1497141937545,
		task: "Do even more stuff",
		done: true
	}
];

// Important Elements - Cached as variables
var todosEl = document.querySelector('#todos');
var inputEl = document.querySelector('input');
var completedEl = document.querySelector('#counter');

function initializeTodos() {
	updateTodoItems();
}

function updateTodoItems() {
	var todosHTML = "";
	for (todo of data) {
		if (todo.done) {
			todosHTML += `<li id="${ todo.id }" class="complete" onclick="toggleComplete(event)">`;
			todosHTML += `<i class="fa fa-check-circle-o"></i>`; // Font-awesome
		} else {
			todosHTML += `<li id="${ todo.id }" onclick="toggleComplete(event)">`;
			todosHTML += `<i class="fa fa-circle-o"></i>`; // Font-awesome
		}

		todosHTML += `${ todo.task }`;
		todosHTML += `</li>`;
	}
	if (todosHTML === "") {
		todosHTML = "<li>Nothing todo...</li>";
	}
	todosEl.innerHTML = todosHTML;
	updateRemoveBtn();
}

function updateRemoveBtn() {
	var completedTodos = data.filter(function(todo){
	  return todo.done === true;
	});

	completedEl.textContent = completedTodos.length;

	if (completedTodos.length) {
		completedEl.parentElement.disabled = false;
	} else {
		completedEl.parentElement.disabled = true;
	}
}

function onEnterKey(event) {
	if (event.code === "Enter") {
		addTodoItem();
	}
}

function validateTask(task) {
	if (task !== "") {
		return true;
	} else {
		return false;
	}
}

function addTodoItem() {
	if (validateTask(inputEl.value)) {
		return;
	}

	var newTodo = {
		id: getTimeStamp()
	};

	newTodo.task = inputEl.value;
	newTodo.done = false;

	data.push(newTodo);

	updateTodoItems();
	resetInput();
}

function toggleComplete(event) {
	var todoID = parseInt(event.currentTarget.id);
	var todoData = getTodoData(todoID);
	todoData.done = !todoData.done;
	updateTodoItems();
}

function removeTodoItem(event) {
	var incompleteTodos = data.filter(function(todo){
	  return todo.done === false;
	});
	data = incompleteTodos;
	updateTodoItems();
}

function resetInput() {
	inputEl.value = "";
}

function getTodoData(id) {
	var todoFound;

	for (var i=0; i < data.length; i++) {
		if (data[i].id === id) {
			todoFound = data[i];
			indexAt = i;
			break;
		}
	}

	if (todoFound) {
		return todoFound;
	} else {
		return null;
	}
}

// HELPER FUNCTION
function getTimeStamp() {
	return Date.now(); // this returns a timestamp in milliseconds since 1970.
}

// PARTIAL FUNCTIONS
function markAllComplete() {
	// Add a button to your HTML that will be used to mark all todos as complete.
	// Modify this incomplete function so that it:
	// 1) Changes all todo objects in data as done:true
	// 2) Updates the visual display of the todo items in the todo app
	// 3) Call this function in the appropriate place(s) (somwhere else in this code)
}
function updateItemsLeft() {
	// Add an area where the app can give feedback to the user, how many items are left todo.
	// E.g. (3 items, all unchecked) "You have 3 tasks left"
	// E.g. (3 items, 1 checked) "You have 2 tasks left"
	// Modify this incomplete function so that it:
	// 1) Calculates how many todo items are incomplete
	// 2) Updates the visual display by printing the feedback
	// 3) Call this function in the appropriate place(s) (somwhere else in this code)
}

// START THE APPLICATION
initializeTodos();
