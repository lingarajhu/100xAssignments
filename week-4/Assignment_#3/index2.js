const express = require("express");
const fs = require("fs");
const app = express();
const path = "./todos.json";

const loadTodos = () => {
  try {
    const todos = fs.readFileSync(path, "utf-8");
    return JSON.parse(todos);
  } catch (error) {
    return [];
  }
};

const saveTodos = (todos) => {
  fs.writeFileSync(path, JSON.stringify(todos, null, 2));
};

app.use(express.json());

// list the all the todos
app.get("/todos", (req, res) => {
  const todos = loadTodos();
  if (!todos) {
    return res.status(204).json({
      message: "There is no todo registred",
    });
  }
  res.json(todos);
});

// get the perticular todo
app.get("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid todo Id" });
  }
  const todos = loadTodos();
  if (!todos) {
    return res.status(204).json({ message: "Todo is empty" });
  }
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res
      .status(411)
      .json({ message: "Todo not found, Id must be invalid" });
  }
  res.json(todo);
});

// creates the new fresh todo
app.post("/todos", (req, res) => {
  const title = req.body.title;
  const completed = req.body.isCompleted;
  const description = req.body.description;

  if (!title && !completed && !description) {
    return res.status(400).json({ message: "Invalid client Input" });
  }

  const todos = loadTodos();
  const todo = {
    id: Date.now(),
    title,
    completed,
    description,
  };
  todos.push(todo);

  saveTodos(todos);

  res.json({
    msg: "todo add sucessfully",
    todo,
  });
});

// updates the todo
app.put("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todos = loadTodos();
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid Id" });
  }

  const todo = todos.find((todo) => todo.id === id);

  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  todo.title = req.body.title;
  todo.completed = req.body.isCompleted;
  todo.description = req.body.description;
  saveTodos(todos);

  res.json({
    msg: "Todo updated successfully",
    updatedTodo: todo,
  });
});

// delete the todo
app.delete("/todos/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid Id" });
  }
  const todos = loadTodos();
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) {
    return res.status(411).json({ error: "Todo is not found" });
  }
  const newTodos = todos.filter((todo) => todo.id !== id);
  saveTodos(newTodos);

  res.json({
    message: "Todo is deleted",
    deletedTodo: todo,
  });
});

app.listen(3001);
