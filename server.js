//including configuration 
require('./config');
//including the node modules
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const log = require('./utility/logger').logger;

const app = express();
const port = process.env.PORT;
const mongoConnection = process.env.MONGODB_URI;
app.use(bodyParser.json())
app.use(cors());
mongoose.connect(mongoConnection, {useNewUrlParser: true, useUnifiedTopology: true,  useCreateIndex:true});

mongoose.connection.on('connected',()=>{
  log.info(`Mongoose default connection is open to ${mongoConnection}` );
});

mongoose.connection.on('error', (err)=>{
  log.error(`Mongoose default connection has occured ${err} error`);
});

mongoose.connection.on('disconnected',()=>{
  log.info(`Mongoose default connection is disconnected`);
});

/**
 * Protects the application from some well known web vulnerabilities by setting HTTP headers appropriately.
 * reference link https://github.com/helmetjs/helmet/issues/167 for x-frames-options issue
 */
app.use(helmet())

// Data Sanitization against NoSQL Injection Attacks
app.use(mongoSanitize());

//application api route
app.use("/api",require('./routes/'));

//routes of the swagger 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//creating nodejs server
app.listen(port, () => {
    log.info(`CONTAINERNAME=${process.env.containername}, app started at port ${port}`);
  })

process.on('SIGINT', function(){
  mongoose.connection.close(function(){
      log.info("Mongoose default connection is disconnected due to application termination");
      process.exit(0)
  });
});


module.exports = app;