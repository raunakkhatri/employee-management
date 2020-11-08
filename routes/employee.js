const express = require('express');
const employee = express.Router();
const validator = require('express-joi-validation').createValidator({});

const joi = require("../utility/joiValidationSchema");
const controller = require('../controllers/employee');
const log = require('../utility/logger').logger;


const saveEmployee = async (req,res)=>{
    log.info(`request to create new user`);
    await controller.saveEmployee(req.body)
    .then(response=>{
        log.info(`user with employee id: ${response.employeeId} created succesfully`);
        res.status(201).send(response);
    })
    .catch(error=>{
        log.error(`error while creating user , error:${error.errmsg}`);
        res.status(400).json({error:error.errmsg});
    })
}

const fetchEmployee = async (req,res)=>{
    log.info(`request to fetch all the employee`);
    const sortByField = req.params.sortByField;
    console.log(sortByField)
    await controller.fetchEmployee(sortByField)
    .then(response=>{
        log.info(`succesfully fetched all the users`);
        res.status(200).send(response);
    })
    .catch(error=>{
        log.info(`error while fetching all the users, error:`,error.errmsg);
        res.status(400).json({ error: error.errmsg });
    })
}


const updateEmployee = async (req,res)=>{
    log.info(`request to update empoyee Id: ${req.params.employeeId}`);
    let params = {
        reqBody:req.body,
        employeeId: req.params.employeeId
    }
    await controller.updateEmployee(params)
    .then(response=>{
        if(!response){
            log.error(`empoyee Id: ${req.params.employeeId} does not exist`);
            res.status(404).send({message:"Employee does not exist"});
        }else{
            log.info(`empoyee Id: ${req.params.employeeId} updated succesfully`);
            res.status(200).send(response);
        }
        
    })
    .catch(error=>{
        log.info(`error while updating empoyee Id: ${req.params.employeeId}, Error: ${error.errmsg}`);
        res.status(400).json({ error: error.errmsg });
    })
}


const deleteEmployee = async (req,res)=>{
    log.info(`request to delete employee with empoyee Id: ${req.params.employeeId}`);
    await controller.deleteEmployee(req.params.employeeId)
    .then(response=>{
        if(response.deletedCount==0){
            log.error(`empoyee Id: ${req.params.employeeId} does not exist`);
            res.status(404).send(response);
        }else{
            log.info(`empoyee Id: ${req.params.employeeId} deleted succesfully`);
            res.status(200).send(response);
        }
    })
    .catch(error=>{
        log.info(`error while updating empoyee Id: ${req.params.employeeId}, Error: ${error.errmsg}`);
        res.status(400).json({ error: error.errmsg });  
    })
}

//route to create new employee
employee.post('/',validator.body(joi.employeeSchema),
saveEmployee);

//route to fetch all employee
employee.get('/:sortByField?',validator.params(joi.employeeQuery),
fetchEmployee);

//route to update employee by employee ID
employee.put('/:employeeId',validator.params(joi.employeeIdQuery),validator.body(joi.employeeUpdatebody),
updateEmployee);

//route to delete employee by employee ID
employee.delete('/:employeeId',validator.params(joi.employeeIdQuery),
deleteEmployee);

module.exports = employee;
