'use strict';

// ---
// Provide APP_CONFIG.
// ---
export function mockAppConfig($provide) {
  $provide.constant('APP_CONFIG', {
    SETUP_MIN_CATEGORIES_TO_SELECT: 3,
    PREDEFINED_CATEGORIES: ['Bills', 'Food'],
    CURRENCIES: [{
      currencyCode: 'AED',
      displayName: 'United Arab Emirates Dirham',
      symbol: 'د.إ.‏',
      numericCode: 784,
      fractionSize: 2,
    }, ],
    VERSION: '1.0.0',
    MAX_ALLOWED_CATEGORIES: 20,
    IMPORT_MIN_CATEGORIES_TO_SELECT: 1,
    TRIAL_DAYS: 15,
    MIN_ALLOWED_CATEGORIES: 3,
    MIN_EXPENSES_TO_ENABLE_BULK_ACTION: 1,
    ALL_COLORS: [{ id: 1, color: '#DD5440', colorName: 'red', priority: 1 }, {
      id: 2,
      color: '#E29C45',
      colorName: 'orange',
      priority: 2,
    }, ],
  });
}

export function getDefaultMockUser() {
  const UserMock = jasmine.createSpyObj('User', ['$new']);

  UserMock.$new.and.returnValue({
    loadFromSession() {
      return {
        isInitiated() {
          return true;
        },

        isTrialPeriodExpired() {
          return false;
        },
      };
    },
  });

  return UserMock;
}
