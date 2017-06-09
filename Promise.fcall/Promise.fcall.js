/**
 * overview:
 * =========
 * Q.fcall():
 *   - not included in ES6
 *   - input value is a Function
 *   - output value is a Promise
 *   - behavior:
 *     - the input Function is evaluated
 *     - any thrown Error is caught and rejected by the Promise
 *     - the result of the Function is resolved by the Promise
 *
 * summary:
 * ========
 * Promise.fcall():
 *   - same behavior as Q.fcall()
 **/
Promise.fcall = function(f, ...args) {
  return new Promise((resolve, reject) => {
    var result
    try {
      result = f(...args)
      Promise.resolve(result)
      .then((final_result) => {
        resolve(final_result)
      })
      .catch((error) => {
        reject(error)
      })
    }
    catch(error){
      reject(error)
    }
  })
}

// ----------------------------------------------------------------------

/**
 * references:
 *     http://documentup.com/kriskowal/q/
 **/

// ----------------------------------------------------------------------
