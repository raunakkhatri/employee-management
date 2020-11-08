const request = require("supertest");
var should = require("should");
const expect = require('chai').expect;
const app = require('../server');
const mongoose = require('mongoose');

const employeeObject = {
  "employeeId": "BK00001",
  "firstName":"Raunak",
  "lastName": "Khatri",
  "middleName":"Vivek",
  "gender": "M",
  "mobileNumber": "9876543210",
  "dateOfBirth":"12/02/1990",
  "personalEmail":"raunakkhatri@gmail.com"
}
const mobileMissingObject = {
  "employeeId": "BK00001",
  "firstName":"Raunak",
  "lastName": "Khatri",
  "middleName":"Vivek",
  "gender": "M",
  "dateOfBirth":"12/02/1990",
  "personalEmail":"raunakkhatri@gmail.com"
}

const updateEmployeeObject = {
  "mobileNumber": "8765432190",
  "personalEmail":"raunakkhatri@example.com"
}


describe('Get all employee',()=> {
  it('should return array of all the employees',(done) =>{
    request(app)
      .get('/api/employee')
      .end((err, res)=> {
        expect(res.statusCode).to.equal(200);
        done(); 
      })
    });
  it('should return array of all the employees in assending order',(done) =>{
    request(app)
      .get('/api/employee/firstName')
      .end((err, res)=> {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array')
        done(); 
      })
    });
  it('should through error if sort by field not exist',(done) =>{
    request(app)
      .get('/api/employee/test')
      .end((err, res)=> {
        expect(res.statusCode).to.equal(400);
        done(); 
      })
    });
});

describe('Create new employee',()=> {
  it('should create new employee',(done) =>{
    request(app)
      .post('/api/employee')
      .send(employeeObject)
      .end((err, res)=> {
        expect(res.statusCode).to.equal(201);
        expect(res.body._id).to.not.be.null;
        expect(res.body.employeeId).to.equal('BK00001')
        done(); 
      })
    });
  it('Should throw error if user already exist',(done) =>{
    request(app)
      .post('/api/employee')
      .send(employeeObject)
      .end((err, res)=> {
        expect(res.statusCode).to.equal(400);
        done(); 
      })
    });
  it('Should throw error if field is missing in request object',(done)=>{
    request(app)
    .post('/api/employee')
    .send(mobileMissingObject)
    .end((err, res)=> {
      expect(res.statusCode).to.equal(400);
      done(); 
    })
  })
});


describe('update existing employee by employee id',()=> {
  it('should update existing employee',(done) =>{
    request(app)
      .put('/api/employee/BK00001')
      .send(updateEmployeeObject)
      .end((err, res)=> {
        expect(res.statusCode).to.equal(200);
        expect(res.body._id).to.not.be.null;
        expect(res.body.mobileNumber).to.equal('8765432190')
        expect(res.body.personalEmail).to.equal('raunakkhatri@example.com')
        done(); 
      })
    });
  it('Should throw error if user does not exist',(done) =>{
    request(app)
      .put('/api/employee/BK00002')
      .send(updateEmployeeObject)
      .end((err, res)=> {
        expect(res.statusCode).to.equal(404);
        expect(res.body.message).to.equal('Employee does not exist')
        done(); 
      })
    });
  it('Should throw error if employee id not passed',(done)=>{
    request(app)
    .post('/api/employee')
    .send(updateEmployeeObject)
    .end((err, res)=> {
      expect(res.statusCode).to.equal(400);
      done(); 
    })
  })
});



describe('Delete existing user by employee ID',()=> {
  it('Should delete existing user by employee id',(done)=>{
    request(app)
    .delete('/api/employee/BK00001')
    .end((err, res)=> {
      expect(res.statusCode).to.equal(200);
      done(); 
    })
  })
  it('Should throw error if user do not exist',(done)=>{
    request(app)
    .delete('/api/employee/BK00001')
    .end((err, res)=> {
      expect(res.statusCode).to.equal(404);
      expect(res.body.deletedCount).to.equal(0)
      done(); 
    })
  })
  it('Should throw error if employee not passed',(done)=>{
    request(app)
    .delete('/api/employee/')
    .end((err, res)=> {
      expect(res.statusCode).to.equal(404);
      done(); 
    })
  })
});

describe('Check if application healthy',()=> {
  it('should return statusCode 200 with message "healthy" in the body',(done) =>{
    request(app)
    .get('/api/healthcheck')
    .end((err, res)=> {
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object'); 
      expect(res.body.application).to.equal('ok')
      expect(res.body.mongoDB).to.equal('ok')
      mongoose.connection.close()
      done(); 
    })
  });
  it('should through error if mongoDB connection break',(done) =>{
    request(app)
    .get('/api/healthcheck')
    .end((err, res)=> {
      expect(res.statusCode).to.equal(500);
      expect(res.body.message).to.equal('Something is wrong with the application');
      done(); 
    })
  });
});