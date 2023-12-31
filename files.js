const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const log = console.log;
const dataValidator = require("./helpers/dataValidator.js");
const checkExtension = require("./helpers/checkExtension.js");
const newNameValidator = require("./helpers/newNameValidator.js");
const { error } = require("console");

const createFile = async (fileName, content) => {
  const file = { fileName, content };
  const validatedData = dataValidator(file);
  if (validatedData.error) {
    log(
      chalk.red(
        `Please specify "${validatedData.error.details[0].path}" parameter`
      )
    );
    return;
  }

  if (!checkExtension(fileName).isPresent) {
    log(
      chalk.red(
        `Sorry, this application ".${
          checkExtension(fileName).extension
        }" does not support...`
      )
    );
    return;
  }

  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    // await fs.writeFile(filePath, JSON.stringify(content), "utf-8");
    log(chalk.green(`File "${fileName}" was successfully created.`));
  } catch (error) {
    log(chalk.red(error));
  }
};

const getFile = async () => {
  const folderPath = path.join(__dirname, "files");
  const folderData = await fs.readdir(folderPath);

  if (!folderData.length) {
    log(chalk.red("The folder is empty"));
    return;
  }
  console.log(folderData);
};

const getInfo = async (fileName) => {
  const folderPath = path.join(__dirname, "files");
  const folderData = await fs.readdir(folderPath);
  if (!folderData.includes(fileName)) {
    log(chalk.red(`No file with name "${fileName}"`));
    return;
  }

  const filePath = path.join(__dirname, "files", fileName);
  const content = await fs.readFile(filePath, "utf8");
  const extname = path.extname(fileName).slice(1);
  const name = path.basename(fileName, `${extname}`);
  console.log({ name, extname, content });
};

const changeFile = async (fileName, content) => {
  const folderPath = path.join(__dirname, "files");
  const folderData = await fs.readdir(folderPath);

  if (!folderData.includes(fileName)) {
    log(chalk.red(`No file with name "${fileName}"`));
    return;
  }
  const file = { fileName, content };
  const validatedData = dataValidator(file);
  if (validatedData.error) {
    log(
      chalk.red(
        `Please specify "${validatedData.error.details[0].path}" parameter`
      )
    );
    return;
  }

  if (!checkExtension(fileName).isPresent) {
    log(
      chalk.red(
        `Sorry, this application ".${
          checkExtension(fileName).extension
        }" does not support...`
      )
    );
    return;
  }

  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.appendFile(filePath, `\n${content}`, "utf-8");
    // await fs.appendFile(filePath, JSON.stringify(`${content}`), "utf-8");
    log(
      chalk.green(
        `File "${fileName}" was successfully changed. Content: ${content}`
      )
    );
  } catch (error) {
    log(chalk.red(error));
  }
};

const reNameFile = async (fileName, newName) => {
  const folderPath = path.join(__dirname, "files");
  const folderData = await fs.readdir(folderPath);
  if (!folderData.includes(fileName)) {
    log(chalk.red(`No file with name "${fileName}"`));
    return;
  }

  const file = { newName };
  const validatedName = newNameValidator(file);
  if (validatedName.error) {
    log(
      chalk.red(
        `Please specify "${validatedName.error.details[0].path}" parameter`
      )
    );
    return;
  }

  const oldPath = path.join(__dirname, "files", fileName);
  const newPath = path.join(__dirname, "files", newName);
  console.log(newName);
  try {
    await fs.rename(oldPath, newPath);
    log(chalk.green(`File "${newName}" was successfully renamed.`));
  } catch (error) {
    log(chalk.red(error));
  }
};

const deleteFile = async (fileName) => {
  const folderPath = path.join(__dirname, "files");
  const folderData = await fs.readdir(folderPath);
  if (!folderData.includes(fileName)) {
    log(chalk.red(`No file with name "${fileName}"`));
    return;
  }
  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.unlink(filePath);
    log(chalk.green(`File "${fileName}" was successfully deleted.`));
  } catch (error) {
    log(chalk.red(error));
  }
};

module.exports = {
  createFile,
  getFile,
  getInfo,
  changeFile,
  reNameFile,
  deleteFile,
};
