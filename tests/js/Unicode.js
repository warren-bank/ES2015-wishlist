#!/usr/bin/env node

const Unicode = require('../../Unicode')
const assert = require('assert')

const strings = {
  astral_char: '\uD83D\uDCA9',
  many_marks: '\\u{5A}\\u{351}\\u{36B}\\u{343}\\u{36A}\\u{302}\\u{36B}\\u{33D}\\u{34F}\\u{334}\\u{319}\\u{324}\\u{31E}\\u{349}\\u{35A}\\u{32F}\\u{31E}\\u{320}\\u{34D}\\u{41}\\u{36B}\\u{357}\\u{334}\\u{362}\\u{335}\\u{31C}\\u{330}\\u{354}\\u{4C}\\u{368}\\u{367}\\u{369}\\u{358}\\u{320}\\u{47}\\u{311}\\u{357}\\u{30E}\\u{305}\\u{35B}\\u{341}\\u{334}\\u{33B}\\u{348}\\u{34D}\\u{354}\\u{339}\\u{4F}\\u{342}\\u{30C}\\u{30C}\\u{358}\\u{328}\\u{335}\\u{339}\\u{33B}\\u{31D}\\u{333}\\u{21}\\u{33F}\\u{30B}\\u{365}\\u{365}\\u{302}\\u{363}\\u{310}\\u{301}\\u{301}\\u{35E}\\u{35C}\\u{356}\\u{32C}\\u{330}\\u{319}\\u{317}'
}

var fails=0

var functions = []

functions.push(() => {
  var str = strings.astral_char
  assert.strictEqual(
    Unicode.parse( Unicode.stringify(str) ),
    str,
    'Unicode string retains its original value after being encoded and subsequently decoded.'
  )
})

functions.push(() => {
  var str = strings.many_marks
  assert.strictEqual(
    Unicode.normalize( Unicode.parse(str), 'strip' ),
    'ZALGO!',
    'Unicode string containing 6 ascii characters, each decorated by MANY combining marks, is normalized (using only the "strip" method) to the original 6 ascii characters.'
  )
  assert.strictEqual(
    Unicode.normalize( Unicode.parse(str), ['normalize','strip'] ),
    'ZALGǪ!',
    'Unicode string containing 6 ascii characters, each decorated by MANY combining marks, is normalized (1st using the "normalize" method, then using the "strip" method) to a 6 character string that contains non-ascii characters.'
  )
})

functions.push(() => {
  var str
  str = strings.astral_char
  assert.strictEqual(
    Unicode.length(str),
    1,
    'Unicode string containing a single code point comprised of multiple code units has a length of 1.'
  )
  str = strings.many_marks
  assert.strictEqual(
    Unicode.length( Unicode.parse(str) ),
    6,
    'Unicode string containing 6 ascii characters, each decorated by MANY combining marks, is normalized (1st using the "normalize" method, then using the "strip" method) to a string having a length of 6 (code points).'
  )
})

functions.push(() => {
  var str = strings.many_marks
  assert.strictEqual(
    Unicode.charAt( Unicode.parse(str), 0 ),
    '\u{5a}',
    'Unicode string containing 6 ascii characters, each decorated by MANY combining marks, is normalized (1st using the "normalize" method, then using the "strip" method) to a string having the code point at position #0 equal to the ascii character "Z").'
  )
  assert.strictEqual(
    Unicode.charAt( Unicode.parse(str), 1 ),
    '\u{41}',
    'Unicode string containing 6 ascii characters, each decorated by MANY combining marks, is normalized (1st using the "normalize" method, then using the "strip" method) to a string having the code point at position #1 equal to the ascii character "A").'
  )
  assert.strictEqual(
    String.fromCharCode(0x005a),
    '\u{5a}',
    'Unicode representation of ascii character "Z" is the same as a string constructed from its ascii character code (hex notation used to make the 2 representations appear similar).'
  )
  assert.strictEqual(
    String.fromCharCode(0x0041),
    '\u{41}',
    'Unicode representation of ascii character "A" is the same as a string constructed from its ascii character code (hex notation used to make the 2 representations appear similar).'
  )
  assert.strictEqual(
    'Z',
    '\u{5a}',
    'Unicode representation of ascii character "Z" is the same as a string constructed from its literal notation.'
  )
  assert.strictEqual(
    'A',
    '\u{41}',
    'Unicode representation of ascii character "A" is the same as a string constructed from its literal notation.'
  )
})

functions.forEach((f) => {
  try {
    f()
  }
  catch(error){
    fails++
    console.log('[Unicode] fail:', error.message)
  }
})

if (fails){
  console.log('[Unicode] All tests completed.')
}
else {
  console.log('[Unicode] All tests passed.')
}
