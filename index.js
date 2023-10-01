const argv = require("yargs").argv;
const { createFile, getFile, getInfo } = require("./files");

function invokeAction({ action, fileName, content }) {
  switch (action) {
    case "create":
      createFile(fileName, content);
      break;

    case "get":
      getFile();
      break;

    case "getInfo":
      getInfo(fileName);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// node index.js --action create --fileName hello --content HelloWorld!
