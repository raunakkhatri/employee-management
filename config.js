const os = require('os');

let env = process.env.NODE_ENV || 'DEVELOPMENT'
let dbUser = process.env.MONGO_USERNAME || '';
let dbPassword = process.env.MONGO_PASSWORD || '';
let dbHost = process.env.MONGO_HOST || 'localhost';
let dbPort = 27017;
let dbName = process.env.MONGO_DATABASE || 'berkadia';
process.env.PORT = 3000; 

process.env.containername = os.hostname();
if (env === 'DEVELOPMENT') {
    process.env.MONGODB_URI = `mongodb://${dbHost}:${dbPort}/${dbName}`
} else if (env === 'TEST') {
    process.env.MONGODB_URI = `mongodb://${dbHost}:${dbPort}/berkadiatest`;
} else if(env==='PRODUCTION'){
    process.env.MONGODB_URI = `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`;
}