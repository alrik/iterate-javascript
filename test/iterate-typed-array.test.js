const { assert } = require('chai');
const iterate = require('../index');

describe('iterate typed arrays', function () {
  it('should iterate all items in a typed array', function() {
    const steps = [];
    const testArr = new Int32Array([1, 2, 3, 4, 5]);

    iterate(testArr, (number, index, arr) => steps.push([number, index, arr]));

    assert.deepEqual(steps, [
      [1, 0, testArr],
      [2, 1, testArr],
      [3, 2, testArr],
      [4, 3, testArr],
      [5, 4, testArr],
    ]);
  });
});
