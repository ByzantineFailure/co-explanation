module.exports = co;

function co(routine) {
    return new Promise(function(resolve, reject) {
        var gen = routine();
        try {
            next(gen.next());
        } catch(e) {
            reject(e);
        }

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
            if(val.done) {
                resolve(val.value);
            }
            if(val.value) {
                val.value.then(fulfilled).catch(err);
            }
        }
    });
}
