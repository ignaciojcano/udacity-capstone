#!/usr/bin/env bash

dockerpath=icano/udacity-capstone

kubectl create deployment udacity-capstone --image=$dockerpath:latest

kubectl get pods

kubectl port-forward deployment/udacity-capstone 8000:80
