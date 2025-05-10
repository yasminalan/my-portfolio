const TODOS_KEY = 'todos'
async function getToDos() {
  try {
    const response = await fetch('http://localhost:8080/api/v1/todos');
    todos = await response.json();
  } catch (error) {
    const todosLocalStorageString = localStorage.getItem(TODOS_KEY);
    if (todosLocalStorageString) {
      todos = JSON.parse(todosLocalStorageString);
    }
    console.error('Error:', error);
  }
}

async function addToDo(todo) {
  try {
    const response = await fetch('http://localhost:8080/api/v1/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });

    if (!response.ok) {
      throw new Error('Failed to save todo');
    }
  } catch (error) {
    todo.id = randomIndex();
    todos.push(todo);
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    console.error('Error:', error);
  }
}

async function updateToDo(id, completed) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/todos/${id}?completed=${completed}`, {
      method: 'PUT'
    });

    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
  } catch (error) {
    todos = todos.map(todo => {
      if (todo.id == id) {
        todo.completed = completed;
      }
      return todo;
    })
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    console.error('Error:', error);
  }
}

async function deleteToDo(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/v1/todos/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  } catch (error) {
    todos = todos.filter(todo => todo.id != id);
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
    console.error('Error:', error);
  }
}

function randomIndex() {
  return Math.floor(Math.random() * 10000000);
}