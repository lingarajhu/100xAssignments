const fs = require("fs");

const data = "This content will go inside the file";

fs.writeFile(a.txt, data, (err) => {
  if (err) {
    console.error("error while writing the file");
    return;
  }
  console.log("data written to a.txt");
});
