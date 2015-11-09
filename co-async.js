/**
 * Enter 'coroutines', implemented by the library 'co'.  The general idea:
 * Declare your asynchronous routine as a generator function, then 'yield'
 * all asynchronous calls -- these calls should return promises or some other
 * async control flow object (like a thunk, etc.).
 *
 * co will then wait for the promise to resolve, then call 'next' on your
 * function, resuming control flow where it left off.  Even better, you can
 * do assignment from yield statements as well!
 *
 * You'll note this file has references to both 'co' and 'homebrew-co' as well
 * as 'fs' wrappers.  The wrappers just wrap fs functions to return promises
 * instead of requiring callbacks.
 *
 * The coroutine itself returns a promise when it completes!  Note the 
 * disadvantage at the bottom of the function.
 *
 * Feel free to use whichever version you like, both are present to demonstrate
 * that the simple implementation included here works
**/

//var co = require('co'),
//    fs = require('co-fs');
var co = require('./homebrew-co'),
    fs = require('./homebrew-co-fs');

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

