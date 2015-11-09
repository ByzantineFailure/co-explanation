module.exports = co;

/**
 * Simple, non-robust homebrew co implementation that only supports yielded promises.
 *
 * Takes a generator function as input. Whenever the function yields a promise,
 * wait for the promise to be resolved, then call 'next' on the generator, 
 * resuming the function where it left off.  Discard the result unless it's
 * the final value of the generator, in which case use that as the resolution
 * value of our coroutine promise.
 **/

function co(routine) {
    return new Promise(function(resolve, reject) {
        //Start our iteration and get our first value
        var gen = routine();
        try {
            next(gen.next());
        } catch(e) {
            reject(e);
        }
        
        //When we've fulfilled a promise, continue iteration and retreive the next
        //promise/value
        function fulfilled(result) {
            try {
                var val = gen.next();
                next(val);
            } catch(e) {
                reject(e);
            }
        }

        function err(e) {
            reject(e);
        }

        function next(val) {
            //If our final value is a Promise, resolve it and return the value
            if(val.done && isPromise(val.value)) {
                val.value.then(function(v) { resolve(v); }).catch(err);
            //If it's not, return the value    
            } else if (val.done) {
                resolve(val.value);
            //Wait for the promise to resolve, then continue iteration/execution
            } else if (val.value) {
                val.value.then(fulfilled).catch(err);
            //We've yielded a non-promise.  Throw an error    
            } else {
                reject(new Error("Cannot yield non-promise in coroutine!")); 
            }
        }
    });
}

function isPromise(val) {
    return typeof val.then === 'function';
}
