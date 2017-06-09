#!/usr/bin/env node

require('../../Promise.any')

const assert = require('assert')

var functions = []
var promises = []
var fails=0
var count

functions.push(() => {
  // example: run 2 concurrent Promises. 1st resolves after 5 seconds. 2nd rejects after 1 second.
  // comparison:
  //   - Promise.race() would reject after 1 second, when the 2nd Promise is rejected
  //   - Promise.any() should resolve after 5 seconds, when the 1st Promise is resolved
  return Promise.any([
    new Promise((resolve, reject) => { setTimeout(() => {resolve('yes')}, 5000) }),
    new Promise((resolve, reject) => { setTimeout(() => {reject(  'no')}, 1000) })
  ])
  .catch((result) => {
    return result
  })
  .then((result) => {
    assert.strictEqual(
      result,
      'yes',
      'should resolve after 5 seconds'
    )
  })
})

functions.push(() => {
  // example: run 2 concurrent Promises. 1st rejects after 2 seconds. 2nd rejects after 1 second.
  // comparison:
  //   - Promise.race() would reject after 1 second, when the 2nd Promise is rejected.   value=String
  //   - Promise.any() should reject after 2 seconds, after both Promises have rejected. value=[String]
  return Promise.any([
    new Promise((resolve, reject) => { setTimeout(() => {reject('no #1')}, 2000) }),
    new Promise((resolve, reject) => { setTimeout(() => {reject('no #2')}, 1000) })
  ])
  .catch((result) => {
    return result
  })
  .then((result) => {
    assert.deepStrictEqual(
      result,
      ['no #1','no #2'],
      'should reject after 2 seconds: Array[String]'
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
      console.log('[Promise.any] All tests completed.')
    }
    else {
      console.log('[Promise.any] All tests passed.')
    }
  }
}

promises.forEach((p) => {
  Promise.resolve(p)
  .catch((error) => {
    fails++
    console.log('[Promise.any] fail:', error.message)
  })
  .then(done)
})
