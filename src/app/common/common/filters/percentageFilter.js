function percentageFilter($filter) {
  'ngInject';

  return (input, decimals) => {
    return $filter('number')(input, decimals) + '%';
  };
}

export default percentageFilter;
