#!/bin/bash

# Check if argument is provided
if [ -z "$1" ]; then
    echo "Please provide a folder name as an argument."
    exit 1
fi

# Set the argument as a variable
FOLDER_NAME="$1"

# Create folders
mkdir -p "./src/$FOLDER_NAME/commands"
mkdir -p "./src/$FOLDER_NAME/queries"
mkdir -p "./src/$FOLDER_NAME/commands/handlers"
mkdir -p "./src/$FOLDER_NAME/queries/handlers"

# Create files for CRUD CQRS
touch "./src/$FOLDER_NAME/commands/create-$FOLDER_NAME.command.ts"
touch "./src/$FOLDER_NAME/commands/delete-$FOLDER_NAME.command.ts"
touch "./src/$FOLDER_NAME/commands/update-$FOLDER_NAME.command.ts"
touch "./src/$FOLDER_NAME/queries/get-all-$FOLDER_NAME.query.ts"
touch "./src/$FOLDER_NAME/queries/get-$FOLDER_NAME.query.ts"

touch "./src/$FOLDER_NAME/commands/handlers/create-$FOLDER_NAME.handler.ts"
touch "./src/$FOLDER_NAME/commands/handlers/delete-$FOLDER_NAME.handler.ts"
touch "./src/$FOLDER_NAME/commands/handlers/update-$FOLDER_NAME.handler.ts"
touch "./src/$FOLDER_NAME/queries/handlers/get-all-$FOLDER_NAME.handler.ts"
touch "./src/$FOLDER_NAME/queries/handlers/get-$FOLDER_NAME.handler.ts"

touch "./src/$FOLDER_NAME/$FOLDER_NAME.module.ts"
touch "./src/$FOLDER_NAME/$FOLDER_NAME.controller.ts"


echo "Folders and files created successfully in ./src/$FOLDER_NAME/"
exit 0
