const checkExtension = (fileName) => {
  const EXTENSION = ["txt", "html", "js", "css", "json"];
  const arrExtension = fileName.split(".");
  const extension = arrExtension[arrExtension.length - 1];
  const isPresent = EXTENSION.includes(extension);

  return { isPresent, extension };
};

module.exports = checkExtension;
