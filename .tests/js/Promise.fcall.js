#!/usr/bin/env node

require('../../Promise.fcall')

const assert = require('assert')

var functions = []
var promises = []
var fails=0
var count

functions.push(() => {
  // example: fcall a Function that throws an Error
  return Promise.fcall(() => {
    throw true
  })
  .then(() => {
    throw false
  })
  .catch((error) => {
    assert.strictEqual(
      error,
      true,
      'should throw an Error'
    )
  })
})

functions.push(() => {
  // example: fcall a Function that returns a Promise that will reject
  return Promise.fcall(() => {
    return new Promise((resolve, reject) => {
      setTimeout(
        function(){
          reject(true)
        },
        1000
      )
    })
  })
  .then(() => {
    throw false
  })
  .catch((error) => {
    assert.strictEqual(
      error,
      true,
      'Promise should be rejected'
    )
  })
})

functions.push(() => {
  // example: fcall a Function that returns a Promise that will resolve
  return Promise.fcall(() => {
    return new Promise((resolve, reject) => {
      setTimeout(
        function(){
          resolve(true)
        },
        1000
      )
    })
  })
  .then((result) => {
    assert.strictEqual(
      result,
      true,
      'Promise should be resolved'
    )
  })
})

functions.forEach((f) => {
  promises.push( f() )
})

count = promises.length

const done = function(){
  count--
  if (count === 0){
    if (fails){
      console.log('[Promise.fcall] All tests completed.')
    }
    else {
      console.log('[Promise.fcall] All tests passed.')
    }
  }
}

promises.forEach((p) => {
  Promise.resolve(p)
  .catch((error) => {
    fails++
    console.log('[Promise.fcall] fail:', error.message)
  })
  .then(done)
})
