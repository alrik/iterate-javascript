const { assert } = require('chai');
const iterate = require('../index');

describe('iterate string', function () {
  it('should iterate all chars in a primative string', function() {
    const steps = [];
    const testStr = 'abcde';

    iterate(testStr, (char, index, str) => steps.push([char, index, str]));

    assert.deepEqual(steps, [
      ['a', 0, testStr],
      ['b', 1, testStr],
      ['c', 2, testStr],
      ['d', 3, testStr],
      ['e', 4, testStr],
    ]);
  });

  it('should iterate all chars in a string instance', function() {
    const steps = [];
    const testStr = new String('abcde');

    iterate(testStr, (char, index, str) => steps.push([char, index, str]));

    assert.deepEqual(steps, [
      ['a', 0, testStr],
      ['b', 1, testStr],
      ['c', 2, testStr],
      ['d', 3, testStr],
      ['e', 4, testStr],
    ]);
  });
});
