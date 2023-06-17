#!/bin/bash

# login
echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
if [ $? -ne 0 ]
then
   echo "An error occurred during docker log in."
   exit 2
fi

# push image
docker build . -t stanislau2020/nestjs-menu:latest

if [ $? -ne 0 ]
then
   echo "An error occurred during image pushing."
   exit 2
fi
