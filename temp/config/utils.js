const os = require("os");
const iFaces = os.networkInterfaces();

exports.DevUtil = class DevUtil {
  static getLocalHost() {
    let host = "127.0.0.1";
    for (const dev in iFaces) {
      if (iFaces.hasOwnProperty(dev)) {
        iFaces[dev].forEach(function(details) {
          if (
            details.family === "IPv4" &&
            details.address.indexOf("192.168") >= 0
          ) {
            host = details.address;
          }
        });
      }
    }

    return host;
  }
};
