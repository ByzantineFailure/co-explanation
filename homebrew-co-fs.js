var fs = require('fs');

module.exports = { writeFile: writeFile };

function writeFile(file, data) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(file, data, function(e) { 
            if(e) { 
                reject(e);
            } else {
                resolve(e); 
            } 
        });
    });
};
