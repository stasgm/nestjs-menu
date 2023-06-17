#!/bin/bash

# logout
docker logout

# Remove image from local registry
docker rmi stanislau2020/nestjs-menu:latest

# Remove unused images
docker rmi $(docker images --filter "dangling=true" -q --no-trunc) 2>/dev/null || true
