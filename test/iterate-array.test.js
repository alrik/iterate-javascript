const { assert } = require('chai');
const iterate = require('../index');

describe('iterate arrays', function () {
  it('should iterate all items in an array', function() {
    const steps = [];
    const testArr = ['a', 'b', 'c', 'd', 'e'];

    iterate(testArr, (item, index, arr) => steps.push([item, index, arr]));

    assert.deepEqual(steps, [
      ['a', 0, testArr],
      ['b', 1, testArr],
      ['c', 2, testArr],
      ['d', 3, testArr],
      ['e', 4, testArr],
    ]);
  });
});
