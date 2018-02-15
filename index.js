function iterateArrayLike(array, onEach) {
  const itemCount = array.length;
  let index = 0;

  while (index < itemCount && onEach(array[index], index, array) !== false) {
    ++index;
  }

  return { complete: index === itemCount };
}

function getIterateIterator(iteratable) {
  if(iteratable[Symbol.iterator]) {
    return iteratable[Symbol.iterator]();
  }

  if (iteratable.constructor === Object) {
    return Object.entries(iteratable)[Symbol.iterator]();
  }

  return null;
}

function iterateIterator(iterator, iteratable, onEach) {
  let step = iterator.next();

  while (!step.done && onEach(step.value[1], step.value[0], iteratable) !== false) {
    step = iterator.next();
  }

  return { complete: step.done };
}

function iterateSetIterator(iterator, set, onEach) {
  let step = iterator.next();

  while (!step.done && onEach(step.value, step.value, set) !== false) {
    step = iterator.next();
  }

  return { complete: step.done };
}

module.exports = function iterate(iteratable, onEach) {
  // array likes (eg. strings)
  if (iteratable.length && iteratable[Symbol.iterator]) {
    return iterateArrayLike(iteratable, onEach);
  } else {
    const iterator = getIterateIterator(iteratable);

    if (!iterator || !iterator.next) {
      throw new Error('First parameter needs to be plain Object or an iteratable.');
    }

    if (iteratable instanceof Set) {
      return iterateSetIterator(iterator, iteratable, onEach);
    } else {
      return iterateIterator(iterator, iteratable, onEach);
    }
  }
};
