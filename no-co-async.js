/**
 * Let's do a simple thing:  Write to a file once, then write to it again.
 * This is ugly -- it requires a steadily-deepening callback stack, unaffectionately
 * refered to as "callback hell"
 **/
var fs = require('fs');

var write1 = JSON.stringify({ thing: 'stuff', stuff: { thing: 'thing' } }, null, '  ');
var write2 = JSON.stringify({ oh: 'noes' }, null, '  ');

fs.writeFile('data.dat', write1, function() {
    fs.writeFile('data.dat', write2, function() { 
        console.log('done!');
    });
});
