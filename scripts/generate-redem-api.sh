#!/bin/bash

cd ../src/services/redem

npx @openapitools/openapi-generator-cli generate -i ./api-docs.yml -g typescript-axios -o .

rm .gitignore .npmignore git_push.sh openapitools.json
rm -rf .openapi-generator
