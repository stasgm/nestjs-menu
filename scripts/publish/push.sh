#!/bin/bash

# login
docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
# push
docker build . -t stanislau2020/nestjs-menu:latest
