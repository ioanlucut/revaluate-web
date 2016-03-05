export default

  function ExpenseFactory() {

    /**
     * Expense class.
     */
    function Expense(data) {

      /**
       * The expense id.
       */
      this.id = data.id;

      /**
       * The expense description.
       */
      this.category = data.category;

      /**
       * The expense value
       */
      this.value = data.value;

      /**
       * The expense description.
       */
      this.description = data.description;

      /**
       * Spent date of the expense.
       */
      this.spentDate = data.spentDate;

      /**
       * Created date of the expense.
       */
      this.createdDate = data.createdDate;

      /**
       * Created date of the expense.
       */
      this.modifiedData = data.modifiedData;

      /**
       * Shows if this expense is marked (can be used e.g. in a bulk list)
       */
      this.marked = false;
    }

    return Expense;
  }

  angular
    .module('revaluate.insights')
    .factory('Expense', ExpenseFactory);

