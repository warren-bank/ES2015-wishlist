#!/usr/bin/env bash

log='./run.log'

./js/Unicode.js      &>  "$log"
./js/Promise.any.js  &>> "$log"
