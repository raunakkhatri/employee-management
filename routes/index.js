const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const log = require('../utility/logger').logger;

//monngoDB healthcheck
router.use('/healthcheck',(req,res)=>{
    log.info(`Applicaiton health check`);
    if(mongoose.connection.readyState){
        log.info(`MongoDB connection healthcheck`);
        res.json({application:"ok",mongoDB:"ok"})
    }
    else{
        log.error(`MongoDB healthcheck failed`);
        res.status(500).send({message:"Something is wrong with the application"})
    }
    
});

router.use('/employee',require('./employee'));

module.exports = router;