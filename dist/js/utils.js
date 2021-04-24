var fs = require('fs');
var base = __dirname
function readTrackFiles(path){ //_song
    // console.log(ReadData())
     //console.log(base + '/dist/data/trackdata.txt')
     
    let data
    if(checkPath(path)){
        data = fs.readFileSync(path, 
              {encoding:'utf8', flag:'r'}).toString().split("\n"); 
    }
    /*fs.writeFile(base + '/data/trackdata.txt', "IN", function (err) {
                
    });*/
    return data
 
}

function writeTrackFiles(path, _data){ //_song
    // console.log(ReadData())
     //console.log(base + '/dist/data/trackdata.txt')
     
    
    if(checkPath(path)){
        fs.appendFileSync(path, _data + "\n"); 
    }
    /*fs.writeFile(base + '/data/trackdata.txt', "IN", function (err) {
                
    });*/

 
}

function checkPath(path){
    if (fs.existsSync(path)) {
        // Do something
        return true;
    }
    return false;
}

function each(arr, callback){
    if (typeof callback == "function"){
        for(let i = 0; i < arr.length; i++){
            callback(arr[i])
        }
    }
}

export {readTrackFiles, writeTrackFiles, each}