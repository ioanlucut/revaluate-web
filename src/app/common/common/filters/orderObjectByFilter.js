// See https://github.com/fmquaglia/ngOrderObjectB
function orderObjectByFilter() {
  return (items, field, reverse) => {
    const filtered = [];
    angular.forEach(items, item => {
      filtered.push(item);
    });

    function index(obj, i) {
      return obj[i];
    }

    filtered.sort((a, b) => {
      let comparator;
      const reducedA = field.split('.').reduce(index, a);
      const reducedB = field.split('.').reduce(index, b);
      if (reducedA === reducedB) {
        comparator = 0;
      } else {
        comparator = reducedA > reducedB ? 1 : -1;
      }

      return comparator;
    });

    if (reverse) {
      filtered.reverse();
    }

    return filtered;
  };
}

export default orderObjectByFilter;
