@echo off
setlocal

REM Check if argument is provided
if "%1" == "" (
    echo Please provide a folder name as an argument.
    exit /b 1
)

REM Set the argument as a variable
set FOLDER_NAME=%~1
echo %FOLDER_NAME%

REM Create folders with error suppression
mkdir ".\src\%FOLDER_NAME%\commands"
mkdir ".\src\%FOLDER_NAME%\queries"

# create a files for CRUD SQRS
echo. > ".\src\%FOLDER_NAME%\commands\create-%FOLDER_NAME%.command.ts"
echo. > ".\src\%FOLDER_NAME%\commands\delete-%FOLDER_NAME%.command.ts"
echo. > ".\src\%FOLDER_NAME%\commands\update-%FOLDER_NAME%.command.ts"
echo. > ".\src\%FOLDER_NAME%\queries\get-all-%FOLDER_NAME%.query.ts"
echo. > ".\src\%FOLDER_NAME%\queries\get-%FOLDER_NAME%.query.ts"

echo. > ".\src\%FOLDER_NAME%\commands\handlers\create-%FOLDER_NAME%.handler.ts"
echo. > ".\src\%FOLDER_NAME%\commands\handlers\delete-%FOLDER_NAME%.handler.ts"
echo. > ".\src\%FOLDER_NAME%\commands\handlers\update-%FOLDER_NAME%.handler.ts"
echo. > ".\src\%FOLDER_NAME%\queries\handlers\get-all-%FOLDER_NAME%.handler.ts"
echo. > ".\src\%FOLDER_NAME%\queries\handlers\get-%FOLDER_NAME%.handler.ts"

echo. > ".\src\%FOLDER_NAME%\%FOLDER_NAME%.module.ts"
echo. > ".\src\%FOLDER_NAME%\%FOLDER_NAME%.controller.ts"


echo Folders created successfully in .\src\%FOLDER_NAME%\
exit /b 0
