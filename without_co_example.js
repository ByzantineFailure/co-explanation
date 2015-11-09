/**
 * Let's do a simple thing:  Write to a file once, then write to it again
 **/
var fs = require('fs');

var write1 = { thing: 'stuff', stuff: { thing: 'thing' } };
var write2 = { oh: 'noes' };

fs.writeFile('data.dat', write1, function() {
    fs.writeFile('data.dat', write2, function() { 
        console.log('done!');
    });
}
