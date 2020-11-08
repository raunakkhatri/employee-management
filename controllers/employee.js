const { sort, filter } = require('../ecosystem.config');
const EmployeeModel = require('../models/employee');

const saveEmployee = async (employeeObject)=>{
    return new Promise((resolve, reject) => {
        const employee = new EmployeeModel(employeeObject);
        employee.save()
        .then(response=>resolve(response))
        .catch(error=>{
            reject(error)
        })
    })
}

const fetchEmployee = async(sortByField) =>{
    return new Promise((resolve, reject) => {
        EmployeeModel.find()
        .sort(sortByField)
        .then(response=>{
            resolve(response)
        })
        .catch(error=>reject(error))
    })
}


const updateEmployee = async(params) =>{
    return new Promise((resolve, reject) => {
        EmployeeModel.findOneAndUpdate({employeeId:params.employeeId},params.reqBody, {
            new: true
        })
        .then(response=>resolve(response))
        .catch(error=>reject(error))
    })
}

const deleteEmployee = async(employeeId) =>{
    return new Promise((resolve, reject) => {
        EmployeeModel.deleteOne({employeeId:employeeId})
        .then(response=>resolve(response))
        .catch(error=>reject(error))
    })
}
module.exports = {saveEmployee,fetchEmployee,updateEmployee,deleteEmployee};


