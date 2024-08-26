const fs = require("fs");
const { Command } = require("commander");
const program = new Command();
const path = "./todo2.json";

const loadTodos = () => {
  try {
    const todos = fs.readFileSync(path, "utf-8");
    return JSON.parse(todos);
  } catch (error) {
    return [];
  }
};

const saveTodo = (todos) => {
  fs.writeFileSync(path, JSON.stringify(todos, null, 2));
};

program
  .name("todo-list-2")
  .description("CLI for creating the todo application")
  .version("0.8.0");

program
  .command("add")
  .description("Add the todo task")
  .argument("<task>", "Define the task")
  .action((task) => {
    const todos = loadTodos();
    todos.push({
      task,
      done: false,
      started: new Date().toLocaleTimeString(),
      ended: null,
    });
    saveTodo(todos);
    console.log(`${task} Added!!!`);
  });

program
  .command("delete")
  .description("Delete the todo from the file")
  .argument("<index>", "Define the todo number to delete")
  .action((index) => {
    const todos = loadTodos();
    if (index < 0 || index > todos.length) {
      console.log("Invalid todo number");
      return;
    }
    const [deleted] = todos.splice(index - 1, 1);
    saveTodo(todos);
    console.log(`Deleted: ${deleted.task}`);
  });

program
  .command("done")
  .description("Marks todo as completed")
  .argument("<index>", "Define the todo number you completed")
  .action((index) => {
    const todos = loadTodos();
    if (index < 0 || index > todos.length) {
      console.log("Invalid todo number");
      return;
    }
    todos[index - 1].done = true;
    todos[index - 1].ended = new Date().toLocaleTimeString();
    saveTodo(todos);
    console.log(`Marked as done: ${todos[index - 1].task}`);
  });

program
  .command("update")
  .description("Change the todo task")
  .arguments("<task>, <index>", "Task to add to the existing task")
  .action((task, index) => {
    const todos = loadTodos();
    if (index < 0 || index > todos.length) {
      console.log("Invalid todo number");
      return;
    }
    const prevTask = todos[index - 1].task;
    todos[index - 1].task = task;
    const currTask = todos[index - 1].task;
    saveTodo(todos);
    console.log(
      `Task has been successfully changed from ${prevTask} -> ${currTask}`
    );
  });

program
  .command("list")
  .description("List the all tasks")
  .action(() => {
    const todos = loadTodos();
    if (todos.length === 0) {
      console.log("Todo list is empty");
      return;
    }
    todos.forEach((todo, index) => {
      const status = todo.done ? "Done" : "Pending";
      console.log(
        `${index + 1}. ${todo.task} -> ${status} creted: ${
          todo.started
        } completed: ${todo.ended}`
      );
    });
  });

program.parse();
