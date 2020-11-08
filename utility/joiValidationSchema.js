/** JOI Schema for request Validation.
 *
 * @requires express
 */
/**
 * JOI Schema for request Validation.
 * @const
 * @namespace validationSchema
 */
const Joi = require('joi')

//Schema of employee 
const employeeSchema = Joi.object({
    employeeId: Joi.string()
    .required(),
    firstName: Joi.string()
      .required()
      .min(1)
      .max(10),
    lastName: Joi.string()
      .required()
      .min(1)
      .max(10),
    middleName: Joi.string()
      .min(1)
      .max(10),
    gender: Joi.any()
      .allow('M','F')
      .required(),
    mobileNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
    dateOfBirth:Joi.date()
      .less('now')
      .required(),
    personalEmail: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
});

const employeeQuery = Joi.object({
    sortByField: Joi.string().valid('employeeId','firstName','lastName','middleName','gender','mobileNumber','dateOfBirth','personalEmail')
})

//Schema of employee id
const employeeIdQuery = Joi.object({
    employeeId: Joi.string()
})

//Schema to update employee
const employeeUpdatebody = Joi.object({
    firstName: Joi.string()
      .min(1)
      .max(10),
    lastName: Joi.string()
      .min(1)
      .max(10),
    middleName: Joi.string()
      .min(1)
      .max(10),
    gender: Joi.any()
      .allow('M','F'),
    mobileNumber: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
    dateOfBirth:Joi.date()
      .less('now'),
    personalEmail: Joi.string()
      .email({ tlds: { allow: false } })
})

module.exports = {employeeSchema,employeeQuery,employeeUpdatebody,employeeIdQuery}