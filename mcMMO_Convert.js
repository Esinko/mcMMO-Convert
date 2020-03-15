/* Configuration */
const ConversionDataPath = "./conversion.json" //This is the conversion json data produced by the Esinko UUID convert tool. Please run that first and create this data table.
const McmmoUsersFile = "./mcmmo.users" //This is the mcmmo flatfile from 1.13.2 and/or offlineMode.
const ConvertedPath = "./mcmmo.users.converted" //This is the path where the produced data will be written in.
const NoUUIDConvert = false //Change this to true to skip the UUID conversion. If you did not change the server's online-mode, this is not recommended!
const OldVersion = true //Change this to true IF you are converting from something else than a 1.15.2 minecraft server.
const useMojangUUIDFormat = true //If the database is not working correctly, change this to true/false and try to convert again.
//End of configuration
/* Require */
const fs = require("fs");
/* Memory */
var time = new Date().getTime();
global.proc = 0
var UI_memory = ""
var state = 0
var dataLength = null;
/* Functons */
/**
 * Get the convert tool's conversion data.
 * @param {Function} callback Callback function.
 */
async function getConversionData(callback){
    fs.readFile(ConversionDataPath, async function(err, data){
        if(err != null){
            callback(null, err)
        }else {
            if(data != ""){
                callback(true, data)
            }else {
                callback(null, "The conversion file seems to be empty.")
            }
        }
    })
}
/**
 * Get the mcMMO user data flatfile.
 * @param {Function} callback Callback function.
 */
async function getMCMMOdata(callback){
    fs.readFile(McmmoUsersFile, async function(err, data){
        if(err != null){
            callback(null, err)
        }else {
            if(data != ""){
                callback(true, data)
            }else {
                callback(null, "The mcmmo.users file seems to be empty.")
            }
        }
    })
}
/**
 * Convert the UUIDs to online UUIDs.
 * @param {""} conversion The conversion data.
 * @param {""} data The mcmmo users data.
 * @param {Function} callback Callback function.
 */
async function processUUIDs(conversion, data, callback){
    data = data.toString().split("\n")
    let parsed = JSON.parse(conversion)
    let created = ""
    dataLength = data.length
    data.forEach(line => {
        global.proc = global.proc + 1
        logger(2)
        if(!line.split("").length == 0){
            let storedName = line.split(":")[0]
            let storedUUID = line.split(":")[41]
            if(OldVersion == true){
                //Reformat some stuff for the later mcmmo database format
                line = line.replace(storedUUID + ":0:0:", storedUUID + ":0:")
            }
            let once = false
            for(var element in parsed){
                let playerdata = parsed[element]
                let name = playerdata.name
                let uuid = playerdata.onlineUUID
                //Change the UUID format if required
                if(useMojangUUIDFormat == true){
                    if(!uuid.includes("-")){
                        uuid = uuid.split("")
                        uuid[7] = uuid[7] + "-"
                        uuid[11] = uuid[11] + "-"
                        uuid[15] = uuid[15] + "-"
                        uuid[19] = uuid[19] + "-"
                        uuid = uuid.join("")
                    }
                }
                if(storedName == name && once == false ){
                    once = true
                    if(NoUUIDConvert == true){
                        created = created + line + "\n"
                    }else {
                        created = created + line.replace(storedUUID, uuid) + "\n"
                    }
                }
            }
        }
        if(global.proc == data.length){
            callback(created)
        }
    })
}
/**
 * Write the converted data to a file.
 * @param {""} data The produced data.
 * @param {""} path Path to write the data.
 * @param {Function} callback Callback function.
 */
async function writeData(data, path, callback){
    fs.writeFile(path, data, async function(err){
        if(err != null){
            callback(err)
        }else {
            callback(null)
        }
    })
}
/**
 * The UI
 * @param {*} mode Mode setting.
 */
async function logger(mode){
    if(mode == 0){
        console.clear()
        console.log("mcMMO conversion tool by Esinko","-","Reading conversion data(1/4):")
        console.log("-------------------")
        console.log("Reading data files,")
        if(UI_memory == "...") UI_memory = ""
            else if(UI_memory == "..") UI_memory = "..."
            else if(UI_memory == ".") UI_memory = ".."
            else if(UI_memory == "") UI_memory = "."
        console.log("Please wait", UI_memory)
        console.log("-------------------")
        setTimeout(async function(){
            if(state == 0){
                logger(mode)
            }
        }, 100)
    }else if(mode == 1){
        console.clear()
        console.log("mcMMO conversion tool by Esinko","-","Reading mcMMO data(2/4):")
        console.log("-------------------")
        console.log("Reading data files,")
        if(UI_memory == "...") UI_memory = ""
            else if(UI_memory == "..") UI_memory = "..."
            else if(UI_memory == ".") UI_memory = ".."
            else if(UI_memory == "") UI_memory = "."
        console.log("Please wait", UI_memory)
        console.log("-------------------")
        setTimeout(async function(){
            if(state == 1){
                logger(mode)
            }
        }, 100)
    }else if(mode == 2){
        console.clear()
        console.log("mcMMO conversion tool by Esinko","-","Converting data(3/4):")
        var bars = dataLength / 125
        var downloadBars = ""
        for(var i = 0; i * bars < global.proc;++i){
            downloadBars = downloadBars + "="
        }
        for(var i = 0; downloadBars.length != 125;++i){
            downloadBars = downloadBars + " "
        }
        console.log("-------------------")
        console.log(global.proc + "/" + dataLength)
        console.log("0% [" + downloadBars + "] 100%")
        console.log("-------------------")
    }else if(mode == 3){
        console.clear()
        console.log("mcMMO conversion tool by Esinko","-","Writing data(4/4):")
        console.log("-------------------")
        console.log("Writing data file,")
        if(UI_memory == "...") UI_memory = ""
            else if(UI_memory == "..") UI_memory = "..."
            else if(UI_memory == ".") UI_memory = ".."
            else if(UI_memory == "") UI_memory = "."
        console.log("Please wait", UI_memory)
        console.log("-------------------")
        setTimeout(async function(){
            if(mode == 3){
                logger(mode)
            }
        }, 100)
    }else {
        console.log("Invalid logging mode.")
        process.exit()
    }
}
logger(0)
getConversionData(async function(res, data){
    if(res != null){
        state = 1
        logger(1)
        getMCMMOdata(async function(res, data2){
            if(res != null){
                setTimeout(async function(){
                    state = 2
                    logger(2)
                    processUUIDs(data, data2, async function(converted){
                        setTimeout(async function(){
                            state = 3
                            logger(3)
                            writeData(converted, ConvertedPath, async function(res){
                                if(res != null){
                                    console.log("An error occured: " + res)
                                    process.exit()
                                }else {
                                    state = 4
                                    setTimeout(async function(){
                                        console.clear()
                                        console.log("mcMMO conversion tool by Esinko","-","Writing data(4/4):")
                                        console.log("-------------------")
                                        console.log("Time taken: " + (new Date().getTime() - time) + "ms, Converted " + global.proc + " flatfile entries.")
                                        console.log("Program ran without errors. Produced data written in: " + ConvertedPath)
                                        process.exit()
                                    }, 1000)
                                }
                            })
                        }, 1000)
                    })
                }, 1000)
            }else {
                console.log("An error occured: " + res)
                process.exit()
            }
        })
    }else {
        console.log("An error occured: " + res)
        process.exit()
    }
})
