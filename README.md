# mcMMO-Convert
Convert 1.13.2 and/or offline mode mcMMO flatfiles 
# Requirements
You need Node.Js v10.15.3 or later. Other versions can work, but using older versions is not recommended.
You also need NPM (Node Package Manager) for this project. Please use version 6.10.3 or later.
# Usage
The file includes a configuration, It's the first 8 lines in the code. All fields are explained after the value and it should look something like this:
```/* Configuration */
const ConversionDataPath = "./conversion.json" //This is the conversion json data produced by the Esinko UUID convert tool. Please run that first and create this data table.
const McmmoUsersFile = "./mcmmo.users" //This is the mcmmo flatfile from 1.13.2 and/or offlineMode.
const ConvertedPath = "./mcmmo.users.converted" //This is the path where the produced data will be written in.
const NoUUIDConvert = false //Change this to true to skip the UUID conversion. If you did not change the server's online-mode, this is not recommended!
const OldVersion = true //Change this to true IF you are converting from something else than a 1.15.2 minecraft server.
const useMojangUUIDFormat = true //If the database is not working correctly, change this to true/false and try to convert again.```
