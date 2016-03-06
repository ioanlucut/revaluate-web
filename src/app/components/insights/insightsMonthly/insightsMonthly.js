export default

function InsightsMonthlyFactory(InsightsAbstract) {

  /**
   * Monthly factory function.
   */
  function insightsMonthly(data) {

    return _.extend(InsightsAbstract.build(data), {
      totalPerDayDTOs: data.totalPerDayDTOs,
      biggestExpense: data.biggestExpense,
      categoryWithTheMostTransactionsInsightsDTO: data.categoryWithTheMostTransactionsInsightsDTO,
      highestAmountCategory: data.highestAmountCategory,
      totalPerCategoryInsightsDTOs: data.totalPerCategoryInsightsDTOs,

      // ---
      // Methods.
      // ---
      isEmpty() {
        return this.totalPerCategoryInsightsDTOs.length === 0;
      },

      isTransactionsEmpty() {
        return this.numberOfTransactions === 0;
      },

      isManyTransactions() {
        return this.numberOfTransactions > 5;
      },
    });
  }

  return {
    build: insightsMonthly,
  };
}

