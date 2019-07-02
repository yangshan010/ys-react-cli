const os = require("os");
const ifaces = os.networkInterfaces();

function getLocalIp() {
  let host = "127.0.0.1";

  for (const dev in ifaces) {
    ifaces[dev].forEach(function(details) {
      if (
        details.family === "IPv4" &&
        details.address.indexOf("192.168") >= 0
      ) {
        host = details.address;
      }
    });
  }

  return host;
}

module.exports = getLocalIp();
