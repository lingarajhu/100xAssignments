const fs = require("fs").promises;

async function fileCleaner(file) {
  try {
    // read the file
    const content = await fs.readFile(file, "utf-8");

    // remove the extra spaces
    const cleanedContent = content.replace(/\s+/g, " ").trim();

    // write back to the file
    await fs.writeFile(file, cleanedContent);
    console.log("File cleaned sucessfully");
  } catch (error) {
    console.error("Error ", error);
  }
}
const file = "a.txt";

fileCleaner(file)
  .then((res) => console.log(res, "Operation completed"))
  .catch((error) => console.error("Operation faild", error));
