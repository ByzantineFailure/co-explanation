/**
 * Generator functions create iterators, objects that maintain an internal state and respond
 * to various function calls.  Generators are special because they allow a function to have 
 * *paused execution*.  More on that later.
 *
 * Basic generators usually iterate over a list of some sort and `yield` values.  When a
 * `yield` statement is encountered in a generator, it halts its execution and awaits a
 * `next` call to its iterator before continuing.  `next` will return an object of the 
 * following form:
 *    { value: (`yield`ed value), done: false }
 *
 * Calls to `next` after execution stops will return:
 *    { value: undefined, done: true }
 */
function* basicGenerator() {
    var values = ['yield', 'this', 'then', 'yield', 'this'];
    while(values.length > 0) {
        yield values.shift();
    }
}

/**
 * Generator functions may also `return`.  A `return` in a generator function stops execution
 * and causes the following call to next to return:
 *    { value: (`return`ed value), done: true }
 *
 * Subsequent calls to `next` will return:
 *    { value: undefined, done: true }
 **/
function* generatorWithReturn() {
    var values = ['yield', 'this', 'then', 'yield', 'this'];
    while(values.length > 0) {
        var val = values.shift();
        if (val === 'then') {
            return val;
        } else {
            yield val;
        }
    }
}

function logValue(value) {
    console.log(JSON.stringify(value));
}

var //gen = basicGenerator(),
    gen = generatorWithReturn(),
    val = gen.next();

while(!val.done) {
    logValue(val);
    val = gen.next();
}
logValue(val);

