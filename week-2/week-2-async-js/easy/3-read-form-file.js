import { readFile } from "fs";

const filePath = a.txt;
readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.log("File has error", err);
    return;
  }

  console.log("File content", data);
});

function expensiveTask() {
  for (let i = 0; i < 1e8; i++) {}
  console.log("complete of the expense task");
}
expensiveTask();
