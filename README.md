# Udacity Capstone Project

## The App
The app created is a simple TODO API implemented in NodeJS + MongoDB.

It has the following endpoints:
- `GET /todos` - Lists all existing todos
- `POST /todos` - Creates a todo `{ text: 'an todo item' }`
- `GET /todos/:id` - Gets a todo from a given id
- `PUT /todos/:id` - Updates a todo `{ text: 'an updated todo item', complete: true }`
- `DELETE /todos/:id` - Deletes a todo

The project uses eslint & prettier for linting purposes, a jest + supertest for testing
- `npm run lint`
- `npm test` 

For local development a `docker` environment has been created using `docker-compose`,
a `Makefile` is provided for ease of use 
- `make build` - Builds the docker images
- `make start` - Starts the containers (node & mongo)
- `make stop` - Stops the containers

## Kubernetes configuration
This project runs on Kubernetes as well, to apply it to a cluster run
```sh
kubectl apply -f .kube
```
It has 2 deployments and 2 services created
- `todos` - The deployment and service for the app
- `mongo` - The deployment and service for the mongo database

## Cloudformation Scripts
AWS Cloudformation Scripts are provided to create an EKS cluster.
The scripts have been separated into 2, the first one to create the underlying network,
and the second one to create the cluster and node group. The scripts are in the `.aws` dir.

To create the network stack you would run the following command:
```sh
aws cloudformation create-stack \
    --stack-name=capacity-capstone-network \
    --template-body file://.aws/network.yml \
    --parameters file://.aws/network-params.json
```

After the network is created, create the eks stack:
To create the network you would run the following command:
```sh
aws cloudformation create-stack \
    --stack-name=capacity-capstone-eks \
    --template-body file://.aws/eks.yml \
    --parameters file://.aws/eks-params.json \
    --capabilities "CAPABILITY_NAMED_IAM"
```

## Jenkins pipeline
The project uses Jenkins for CI and CD, below are the steps and a brief description of each:
- `Linting` - Step that lints the projects code (`npm run lint`)
- `Testing` - Step that runs our test suites (`npm test`)
- `Build docker image` - Step that builds our docker image from our Dockerfile
- `Push docker image` - Step that tags and pushes our docker image to dockerhub
- `Clean up local docker images` - Step that cleans up local images (clear space in our jenkins server)
- `Deploy to EKS` - Step that configures kubectl and deploys our configuration to EKS
