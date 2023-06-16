#!/bin/bash

yarn t-env:db-migrate && yarn t-env:db-seed
