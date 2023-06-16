#!/bin/bash

# login
echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
# push
docker build . -t stanislau2020/nestjs-menu:latest
