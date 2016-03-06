function highlightSearchFilter($sce) {
  return function (text, phrase) {
    if (phrase) {
      text = text.replace(new RegExp('(' + phrase + ')', 'gi'), '<span class="expense__found--highlight">$1</span>');
    }

    return $sce.trustAsHtml(text);
  };
}

export default highlightSearchFilter;
