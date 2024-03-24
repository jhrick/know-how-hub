#!/bin/bash

### GET ###

## curl -v http://localhost:2242/

## curl -v http://localhost:2242/api/show_all

### POST ###

curl -d '{ "title": "", "content": [ {"paragraph": "", "image": ""} ] }' -H 'Content-Type: application/json' -v http://localhost:2242/api/content
