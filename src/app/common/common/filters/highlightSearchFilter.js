function highlightSearchFilter($sce) {
  'ngInject';

  return (text, phrase) => {
    if (phrase) {
      const sanitized = text.replace(new RegExp(`(${phrase})`, 'gi'),
        '<span class="expense__found--highlight">$1</span>');

      return $sce.trustAsHtml(sanitized);
    }

    return $sce.trustAsHtml(text);
  };
}

export default highlightSearchFilter;
