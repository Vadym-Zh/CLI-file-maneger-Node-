const argv = require("yargs").argv;
const {
  createFile,
  getFile,
  getInfo,
  changeFile,
  reNameFile,
  deleteFile,
} = require("./files");

function invokeAction({ action, fileName, content, newName }) {
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

    case "changeFile":
      changeFile(fileName, content);
      break;

    case "reName":
      reNameFile(fileName, newName);
      break;

    case "deleteFile":
      deleteFile(fileName);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
