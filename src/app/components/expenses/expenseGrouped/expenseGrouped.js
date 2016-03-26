function expenseGroupedFactory() {

  /**
   * Expense grouped class.
   */
  function ExpenseGrouped(data) {

    /**
     * The expenses.
     */
    this.expenseDTOs = data.expenseDTOs;

    /**
     * The expense description.
     */
    this.localDate = data.localDate;
  }

  return ExpenseGrouped;
}

export default expenseGroupedFactory;
