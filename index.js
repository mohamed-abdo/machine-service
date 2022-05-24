const shell = require("shelljs");
const sudo = require("sudo-prompt");
const path = require("node:path");
const os = require("node:os");
const fs = require("node:fs");
const { serviceFileFactory } = require("./utils");

let serviceFile = serviceFileFactory(os.platform());

const script = path.join(process.execPath, "../", serviceFile);
console.log(`file exists: ${fs.existsSync(script)}`);
shell.echo(`run machine-certificate from: ${script} for ${os.platform()}`);
var options = {
  name: "machine service uninstaller",
};
sudo.exec("npm i pm2 -g", options, function (error, _) {
  if (error) throw error;
  console.log("elevated permissions is granted");
  shell.exec(`pm2 start -f ${script}`);
  shell.exec("pm2 save");
});
