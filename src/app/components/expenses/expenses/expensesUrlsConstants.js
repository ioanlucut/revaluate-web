export default

/**
 * Expenses constants.
 */
{
  create: 'expenses',
  update: 'expenses',
  details: 'expenses/:id',
  delete: 'expenses/:id',
  bulkDelete: 'expenses/bulkDelete',
  allExpenses: 'expenses/retrieve',
  allExpensesGrouped: 'expenses/retrieve_grouped?page=:page&size=:size',
  allExpensesOfCategory: 'expenses/retrieve_from_to_of_category/:categoryId?from=:from&to=:to',
};

