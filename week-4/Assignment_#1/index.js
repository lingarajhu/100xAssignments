const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
  .name("counter")
  .description("This will counts number of words in a sentence")
  .version("0.8.0");

program
  .command("count")
  .description("This will counts number of words in a sentence")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const dataArr = data.split(" ");
        console.log(dataArr.length);
      }
    });
  });

program.parse();
