var co = require('./homebrew-co'),
    fs = require('./homebrew-co-fs');
//var co = require('co'),
//    fs = require('co-fs');

var write1 = JSON.stringify({ thing: 'stuff', stuff: { thing: 'thing' } }, null, '  ');
var write2 = JSON.stringify({ oh: 'noes' }, null, '  ');

co(function* () {
    yield fs.writeFile('data.dat', write1);
    yield fs.writeFile('data.dat', write2);
    //throw new Error("God why");
    return 'done!';
})
.then(function(v) { console.log(v); })
//Disadvantage -- co requires we catch and handle all errors
.catch(function(e) { console.log(e.stack); });

