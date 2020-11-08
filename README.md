# Employee Management

Employee management backend service to perform CRUD

## Setup


```bash
git clone https://github.com/raunakkhatri/employee-management.git
```

There are 3 options to run the application setup the code

### First option: 
```bash
sudo npm start
```
### Second option: 
```bash
docker-compose up
```

### Third option: 

#### Step 1: Build the image locally 
```bash
docker build . -t node_berkadia 
```
#### Step 2: Deploy mongoDB
```bash
kubectl apply -f mongo-deploy.yaml 
```
#### Step 2: Deploy CRUD service
```bash
kubectl apply -f application-deployment.yaml 
```
## Run API Tests

```bash
sudo npm run test
```

## Generate code coverage
```bash
sudo npm run coverage
```
