function pluralisationFilter() {
  return (value, text, textPluralised) => {
    const MIN_PLURALISATION_VALUE = 1, valueAsInt = parseInt(value, 10);

    if (valueAsInt > MIN_PLURALISATION_VALUE) {
      return textPluralised;
    }

    return text;
  };
}

export default pluralisationFilter;
