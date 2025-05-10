let todos = []

async function addNewToDo() {
  const newToDoInput = document.getElementById("new-todo-input")

  const toDoInputText = newToDoInput.value;

  if (toDoInputText.trim() === "") {
    return;
  }

  const newToDo = {
    description: toDoInputText,
    completed: false
  }

  await addToDo(newToDo);
  await showToDos();

  newToDoInput.value = ""
}

async function showToDos() {
  await getToDos();

  const todoRows = document.getElementById("todo-rows")

  let todoRowsContent = "";

  todos.forEach((todo, index) => {
    const currentRow = `
          <tr>
            <th scope="row">${index + 1}</th>
            <td>
              <div class="d-flex">
                <p class="me-auto" style="color: ${todo.completed ? 'green' : 'black'}; text-decoration: ${todo.completed ? 'line-through' : 'none'};">${todo.description} </p>
                <div class="d-flex gap-4">
                  <input id="btn-${todo.id}" type="checkbox" class="btn-check" ${todo.completed ? 'checked' : ''}
                  onchange="toggleCompleted('${todo.id}', ${!todo.completed})"/>
                  <label class="btn btn-outline-success" for="btn-${todo.id}">${todo.completed ? 'Completed' : 'Complete'}</label>
                  <button class="btn btn-danger btn-sm" onclick="deleteById('${todo.id}')">Delete</button>
                </div>
              </div>
            </td>
          </tr>
    `
    todoRowsContent += currentRow;
  })
  todoRows.innerHTML = todoRowsContent;
}

async function toggleCompleted(id, completed) {
  await updateToDo(id, completed);
  showToDos();
}

async function deleteById(id) {
  await deleteToDo(id);
  showToDos();
}


showToDos();