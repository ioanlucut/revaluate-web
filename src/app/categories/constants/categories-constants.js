/**
 * Categories constants.
 */
angular
    .module("categories")
    .constant("CATEGORY_URLS", {
        isUnique: "categories/isUniqueCategory",
        create: "categories",
        update: "categories",
        delete: "categories/:id",
        allCategories: "categories/retrieve"
    })
    .constant("CATEGORY_EVENTS", {
        isErrorOccurred: "category-error-occurred",
        isCreated: "category-is-created",
        isDeleted: "category-is-deleted",
        isUpdated: "category-is-updated"
    });