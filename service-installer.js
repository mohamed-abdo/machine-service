const os = require("node:os");
const fs = require('node:fs');
const path = require("node:path");
const sudo = require("sudo-prompt");
const srvName = "machine-service-installer";
const { serviceFileFactory, serviceFactory } = require("./utils");

let Service = serviceFactory(os.platform());

let serviceFile = serviceFileFactory(os.platform());

const script = path.join(__dirname, "../dist", serviceFile);
console.log(`file exists: ${fs.existsSync(script)}`);
// Create a new service object
var svc = new Service({
  name: srvName,
  description: "machine service installer",
  script: script,
  nodeOptions: ["--harmony", "--max_old_space_size=4096"],
  //, workingDirectory: '...'
  //allowServiceLogon: true,
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on("install", function () {
  sudo.exec("echo hello", options, function (error, _) {
    if (error) throw error;
    console.info("installing machine-service-installer from " + script);
    svc.start();
  });
});
svc.on("alreadyinstalled", function () {
  console.info("machine-service-installer already installed!");
});

var options = {
  name: "machine service installer",
};
sudo.exec("echo hello", options, function (error, _) {
  if (error) throw error;
  console.info("elevated permissions is granted");
  svc.install();
});
