function serviceFactory(platform) {
  let service;
  switch (platform) {
    case "win64":
    case "win32":
      service = require("node-windows").Service;
      break;
    case "linux":
      service = require("node-linux").Service;
      break;
    case "darwin":
      service = require("node-mac").Service;
      break;
    default:
      throw Error(`unsupported operating system: ${platform}`);
  }
  return service;
}

function serviceFileFactory(platform) {
  let file;
  switch (platform) {
    case "win64":
    case "win32":
      file = "machine-certificate-win";
      break;
    case "linux":
      file = "machine-certificate-linus";
      break;
    case "darwin":
      file = "machine-certificate-macos";
      break;
    default:
      throw Error(`unsupported operating system: ${platform}`);
  }
  return file;
}

module.exports = { serviceFactory, serviceFileFactory };
