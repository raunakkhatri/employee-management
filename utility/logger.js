/**
 * @module logger
 */
const { createLogger, format, transports } = require("winston");
const os = require('os');
const fs = require('fs');
const moment = require('moment');


/**
 * Create the directory for writing the logs
 */
let logFolder = '/logs/employeeManagment';
if (!fs.existsSync(logFolder)) {
    try {
        fs.mkdirSync(logFolder, { recursive: true });
    } catch (e) {
      console.error(e)
    }
}
const accessLogStream = fs.createWriteStream(`${logFolder}/access.log`, { flags: 'a' });

/**
 * @summary Initialize access log writer.
 **/

const logger = createLogger({
    level: "info",
    format: format.combine(
      format.timestamp({
        format: moment(new Date()).format("YYYY-MM-DDTHH:mm:ss")
      }),
      format.json()
    ),
    transports: [
      // uncomment below section to print request log
      new transports.Stream({
        level: "info",
        format: format.combine(
          format.colorize(),
          format.printf(
            info => `${info.timestamp} ${info.level}: ${info.message}`
          )
        ),
        stream: accessLogStream
      })
    ]
  });
  

  module.exports.logger = logger;