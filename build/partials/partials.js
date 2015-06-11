angular.module('partials', ['app/site/partials/404.html', 'app/site/partials/500.html', 'app/site/partials/home.html', 'app/site/partials/pricing.html', 'app/site/partials/privacy.html', 'app/categories/partials/add-category-directive-template.html', 'app/categories/partials/categories.html', 'app/categories/partials/color-picker-directive-template.html', 'app/categories/partials/edit-remove-category-directive-template.html', 'app/import/partials/howto/settings.import.howto.mint.html', 'app/import/partials/howto/settings.import.howto.spendee.html', 'app/import/partials/settings.import.abstract.html', 'app/import/partials/settings.import.choose.html', 'app/import/partials/settings.import.import.html', 'app/expenses/partials/expense/expenses.abstract.html', 'app/expenses/partials/expense/expenses.entry.template.html', 'app/expenses/partials/expense/expenses.html', 'app/expenses/partials/expense/expenses.list.template.html', 'app/account/partials/account.html', 'app/account/partials/account_close.html', 'app/account/partials/email_confirmation_send_abstract.html', 'app/account/partials/email_confirmation_send_invalid.html', 'app/account/partials/email_confirmation_send_send.html', 'app/account/partials/email_confirmation_send_valid.html', 'app/account/partials/logout.html', 'app/account/partials/signup_confirm_abstract.html', 'app/account/partials/signup_confirm_invalid.html', 'app/account/partials/signup_confirm_valid.html', 'app/account/partials/signup_setup.html', 'app/account/partials/trial_period_countdown.html', 'app/account/partials/validate_password_reset_token_abstract.html', 'app/account/partials/validate_password_reset_token_invalid.html', 'app/account/partials/validate_password_reset_token_valid.html', 'app/settings/partials/settings.abstract.html', 'app/settings/partials/settings.admin.abstract.html', 'app/settings/partials/settings.admin.cancelAccount.html', 'app/settings/partials/settings.admin.updatePassword.html', 'app/settings/partials/settings.payment.abstract.html', 'app/settings/partials/settings.payment.add.html', 'app/settings/partials/settings.payment.customer.html', 'app/settings/partials/settings.payment.insights.html', 'app/settings/partials/settings.payment.method.html', 'app/settings/partials/settings.preferences.abstract.html', 'app/settings/partials/settings.preferences.updateCurrency.html', 'app/settings/partials/settings.profile.html', 'app/insight/partials/insight.html', 'app/feedback/partials/feedback-modal.html', 'app/common/partials/flash-messages.html', 'app/common/partials/footer-home.html', 'app/common/partials/footer.html', 'app/common/partials/header-home.html', 'app/common/partials/header.html', 'app/common/partials/inline.confirmation.html', 'app/common/partials/timepickerPopup/timepickerPopup.html', 'template/accordion/accordion-group.html', 'template/accordion/accordion.html', 'template/alert/alert.html', 'template/carousel/carousel.html', 'template/carousel/slide.html', 'template/datepicker/datepicker.html', 'template/datepicker/day.html', 'template/datepicker/month.html', 'template/datepicker/popup.html', 'template/datepicker/year.html', 'template/modal/backdrop.html', 'template/modal/window.html', 'template/pagination/pager.html', 'template/pagination/pagination.html', 'template/popover/popover.html', 'template/progressbar/bar.html', 'template/progressbar/progress.html', 'template/progressbar/progressbar.html', 'template/rating/rating.html', 'template/tabs/tab.html', 'template/tabs/tabset.html', 'template/timepicker/timepicker.html', 'template/tooltip/tooltip-html-unsafe-popup.html', 'template/tooltip/tooltip-popup.html', 'template/typeahead/typeahead-match.html', 'template/typeahead/typeahead-popup.html']);

angular.module("app/site/partials/404.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/404.html",
    "<div class=\"error__sections\">\n" +
    "    <h1 class=\"error__sections__heading\">You found a glitch...</h1>\n" +
    "\n" +
    "    <div class=\"error__sections__reason\">We know this is not what you were looking for.</div>\n" +
    "    <div class=\"error__sections__reason error__sections__reason--last\">Probably a typo or the page may have moved.</div>\n" +
    "\n" +
    "    <a class=\"error__sections__link\" href=\"javascript:void(0)\" ng-click=\"goToHomePage()\">Go to homepage</a>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/site/partials/500.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/500.html",
    "<div class=\"error__sections\">\n" +
    "    <h1 class=\"error__sections__heading\">Ooops.. little stumble on the server.</h1>\n" +
    "\n" +
    "    <div class=\"error__sections__reason\">Nothing you did. It seems like an internal problem on the server.</div>\n" +
    "    <div class=\"error__sections__reason error__sections__reason--last\">If this seems like an ongoing problem please let us know at <a class=\"link-primary\" href=\"mailto:hello@revaluate.io\">hello@revaluate.io</a></div>\n" +
    "\n" +
    "    <a class=\"error__sections__link\" href=\"javascript:void(0)\" ng-click=\"goToHomePage()\">Go to homepage</a>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/site/partials/home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/home.html",
    "<div header-home></div>\n" +
    "\n" +
    "<div class=\"site__container site__container--brand\">\n" +
    "\n" +
    "    <div class=\"site__container__section\">\n" +
    "\n" +
    "        <h1 class=\"home__title\" translate=\"HOME.TITLE_TEXT\"></h1>\n" +
    "\n" +
    "        <h3 class=\"home__description\" translate=\"HOME.DESCRIPTION_TEXT\"></h3>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"site__container__section\">\n" +
    "        <div class=\"home__section__features\">\n" +
    "            <ul class=\"home__section__features--list\">\n" +
    "                <li><span class=\"icon-checkmark\"></span>Easy and fast input of your expenses</li>\n" +
    "                <li><span class=\"icon-checkmark\"></span>Easily import your expenses from other apps</li>\n" +
    "                <li><span class=\"icon-checkmark\"></span>Simple, meaningfull visual insights</li>\n" +
    "                <li><span class=\"icon-checkmark\"></span>Clear, achievable goals</li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"home__section__signup\" ng-controller=\"HomeSignUpRegistrationController\">\n" +
    "\n" +
    "            <!-- Sign-up form -->\n" +
    "            <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error>\n" +
    "\n" +
    "                <!-- Title -->\n" +
    "                <h1 class=\"account__title\">Sign Up</h1>\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <div class=\"form-group-input__message\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</div>\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" name=\"firstName\" placeholder=\"First Name\" ng-model=\"signUpData.firstName\" required />\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <div class=\"form-group-input__message\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</div>\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" name=\"lastName\" placeholder=\"Last Name\" ng-model=\"signUpData.lastName\" required />\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Email input -->\n" +
    "                <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"form-group-input__message\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\" ng-messages=\"signUpForm.email.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please add your email address.</div>\n" +
    "                        <div ng-message=\"validEmail\">Missed a letter? It looks like an invalid email address.</div>\n" +
    "                        <div ng-message=\"uniqueEmail\">This email address is already used. <a href=\"javascript:void(0)\" account-modal-toggle=\"forgotPassword\">Forgot your password?</a></div>\n" +
    "                    </div>\n" +
    "                    <input class=\"form-group-input__input\" type=\"email\" name=\"email\" placeholder=\"Email\" ng-model=\"signUpData.email\" required valid-email unique-email />\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"form-group-input__message\" ng-class=\"{'has-error': signUpForm.$submitted && signUpForm.password.$invalid}\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                        <div ng-message=\"strongPassword\">Please choose a password with at least 7 characters.</div>\n" +
    "                    </div>\n" +
    "                    <input class=\"form-group-input__input\" type=\"password\" name=\"password\" placeholder=\"Password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"home__section__signup__btn\" type=\"submit\">{{isRequestPending ? 'Signing up..' : 'Start my 21 day free trial'}}</button>\n" +
    "            </form>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("app/site/partials/pricing.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/pricing.html",
    "<div header-home></div>\n" +
    "\n" +
    "<div class=\"site__container site__container--brand\">\n" +
    "\n" +
    "    <div class=\"site__container__section\">\n" +
    "\n" +
    "        <h1>Simple pricing</h1>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"site__container__section\">\n" +
    "\n" +
    "        <div class=\"pricing__box\">\n" +
    "\n" +
    "            <div class=\"pricing__box__amount\">\n" +
    "                <span>$5</span>/month\n" +
    "            </div>\n" +
    "\n" +
    "            <ul>\n" +
    "                <li>Everything included</li>\n" +
    "                <li>No hidden fees, no catch</li>\n" +
    "                <li></li>\n" +
    "            </ul>\n" +
    "\n" +
    "            <button class=\"pricing__box__btn\" type=\"submit\">Start 21 day free trial</button>\n" +
    "\n" +
    "            <div class=\"pricing__box__info\">No credit card needed</div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<div class=\"site__container\">\n" +
    "\n" +
    "    <div class=\"site__container__section\">\n" +
    "        <h1>FAQ</h1>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer\"></div>\n" +
    "\n" +
    "");
}]);

angular.module("app/site/partials/privacy.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/site/partials/privacy.html",
    "<div header-home class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container--terms\">\n" +
    "\n" +
    "    <div class=\"privacy__sections\">\n" +
    "\n" +
    "        <h1>Terms of use</h1>\n" +
    "        <ul>\n" +
    "            <li>Reme is a tool created in the sole purpose of helping people get organized by creating expenses which will be sent to the provided e-mail address(es) at a specific date and time. Reme is not responsible for the content entered by the user.</li>\n" +
    "            <li>Reme uses e-mail as the only notification method. Reme is not responsible for missed dead-lines, appointments or other time-critical events.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h3>What personal data do we collect?</h3>\n" +
    "        <ul>\n" +
    "            <li>By registering or authenticating, you allow Reme to identify you and give you access to its services.</li>\n" +
    "            <li>We store your name and email address used for registration.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h3>Third party service that use personal data</h3>\n" +
    "        <ul>\n" +
    "            <li>Mandrill (from Mailchimp) - the mail server used to send the expenses</li>\n" +
    "            <li>Mixpanel - used to track actions with the purpose of improving the application&#39;s user experience</li>\n" +
    "            <li>Reamaze - used to manage the conversations with our users</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <h1>Privacy Policy</h1>\n" +
    "        <ul>\n" +
    "            <li>The information Reme stores is the subject of the expense and the e-mail address(es) the user enters for the expense recipient.</li>\n" +
    "            <li>We use local storage to save expense related data for better user-experience. We do not collect anonymous data of any kind.</li>\n" +
    "            <li>The only e-mail Reme will send to the provided address(es) as recipients will be the expense which the user creates.</li>\n" +
    "            <li>We will only use your email address(es) to send the expenses you create or for Reme related notifications.</li>\n" +
    "            <li>We will not use your email address to send newsletters or advertising that you didn&#39;t subscribe to.</li>\n" +
    "            <li>We will not share your e-mail address or the e-mail address(es) you used for other recipients with 3rd party entities in the scope of advertising or spam.</li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <p>We may change the Privacy policy and/or the Terms of use without notice.</p>\n" +
    "\n" +
    "        <h3>Contact</h3>\n" +
    "\n" +
    "        <p>Please feel free to contact us at hello@reme.io for any questions or concerns you may have regarding the terms of use or the privacy policy.</p>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div footer-home class=\"view-container__footer footer-about\"></div>");
}]);

angular.module("app/categories/partials/add-category-directive-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/categories/partials/add-category-directive-template.html",
    "<!--Show content-->\n" +
    "<div class=\"categories__add__controls\" ng-if=\"! showContent\">\n" +
    "    <button class=\"categories__add__controls__btn\" ng-click=\"toggleContent()\">Add category</button>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Add category form -->\n" +
    "<form name=\"categoryForm\" class=\"categories__add__form\" ng-if=\"showContent\" ng-submit=\"saveCategory(categoryForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <!--Content left-->\n" +
    "    <div class=\"categories__add__form__content__left\">\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.color.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <input class=\"categories__form__input-group__color\" type=\"hidden\" placeholder=\"Category color\" name=\"color\" ng-model=\"category.model.color.color\" required valid-category-color />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.color.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.color.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Color is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryColor\">Color is not valid.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.name.$invalid || badPostSubmitResponse)}\">\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.name.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.name.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Name is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryName\">Name is not valid.</div>\n" +
    "                <div ng-message=\"uniqueCategoryName\">Name is already used.</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Color preview-->\n" +
    "            <label class=\"categories__form__color__preview\" ng-style=\"{'background':category.model.color.color}\"></label>\n" +
    "\n" +
    "            <input type=\"text\"\n" +
    "                   name=\"name\"\n" +
    "                   class=\"categories__form__input-group__name\"\n" +
    "                   placeholder=\"Category name\"\n" +
    "                   ng-maxlength=\"20\"\n" +
    "                   maxlength=\"20\"\n" +
    "                   ng-model=\"category.model.name\"\n" +
    "                   auto-focus required valid-category-name unique-category-name />\n" +
    "\n" +
    "            <div class=\"categories__form__input-group__count\">{{20 - category.model.name.length}}</div>\n" +
    "\n" +
    "            <div color-picker colors=\"colors\" category-color=\"category.model.color\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Content right-->\n" +
    "    <div class=\"categories__add__form__content__right\">\n" +
    "        <!--Reset-->\n" +
    "        <button type=\"button\" class=\"categories__add__form__content__right__cancel\" ng-click=\"toggleContent();initOrReset(categoryForm)\">Nevermind</button>\n" +
    "        <!-- Submit button container -->\n" +
    "        <button class=\"categories__add__form__content__right__add\" type=\"submit\">{{isSaving ? 'Saving...' : 'Save category'}}</button>\n" +
    "    </div>\n" +
    "</form>");
}]);

angular.module("app/categories/partials/categories.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/categories/partials/categories.html",
    "<div class=\"settings__box\">\n" +
    "    <h1 class=\"settings__title\">Categories</h1>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Add category-->\n" +
    "    <div class=\"categories__add\" add-category colors=\"colors\"></div>\n" +
    "\n" +
    "    <!--List all categories-->\n" +
    "    <div class=\"categories__edit\">\n" +
    "\n" +
    "        <div class=\"categories__edit__category\" ng-repeat=\"category in categories | orderObjectBy : 'model.id' : true track by category.model.name\">\n" +
    "\n" +
    "            <!--Edit/remove category-->\n" +
    "            <div edit-remove-category colors=\"colors\" category=\"category\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("app/categories/partials/color-picker-directive-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/categories/partials/color-picker-directive-template.html",
    "<div class=\"color-picker-box\">\n" +
    "\n" +
    "    <div class=\"color-picker__popover\">\n" +
    "\n" +
    "        <div class=\"color-picker__popover__colors\">\n" +
    "\n" +
    "            <div class=\"color-picker__popover__colors__color\" ng-repeat=\"color in colors | orderBy : 'priority' track by color.id \">\n" +
    "\n" +
    "                <!--Color picker-->\n" +
    "                <div class=\"color-picker__popover__colors__color__name\" ng-style=\"{'background':color.color}\" ng-click=\"select(color)\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/categories/partials/edit-remove-category-directive-template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/categories/partials/edit-remove-category-directive-template.html",
    "<!--Category group-->\n" +
    "<div class=\"categories__edit__category__name\" ng-if=\"! showContent\">\n" +
    "    <span class=\"categories__edit__category__color\" ng-style=\"{'background':category.model.color.color}\">C</span>\n" +
    "    <span class=\"categories__edit__category__label\">{{category.model.name}}</span>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"categories__edit__category__controls\" ng-if=\"! showContent\">\n" +
    "    <!--Show content-->\n" +
    "    <div inline-confirmation toggle=\"! isDeleting\" confirm=\"deleteCategory(category)\" message=\"Are you sure?\" style=\"float: right\">\n" +
    "        <button class=\"categories__edit__category__delete\">{{isDeleting ? 'Deleting..' : 'Delete'}}</button>\n" +
    "    </div>\n" +
    "    <button class=\"categories__edit__category__edit\" ng-click=\"toggleContent()\">Edit</button>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Update category form -->\n" +
    "<form name=\"categoryForm\" class=\"categories__edit__form\" ng-if=\"showContent\" ng-submit=\"updateCategory(categoryForm, category)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <!--Content left-->\n" +
    "    <div class=\"categories__edit__form__content__left\">\n" +
    "\n" +
    "        <!-- Category color form group -->\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.color.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <input class=\"categories__form__input-group__color\" type=\"hidden\" placeholder=\"Category color\" name=\"color\" ng-model=\"category.model.color.color\" required valid-category-color />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.color.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.color.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Color is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryColor\">Color is not valid.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Category label form group-->\n" +
    "        <div class=\"categories__form__input-group\" ng-class=\"{'has-error': categoryForm.$submitted && (categoryForm.name.$invalid || badPostSubmitResponse)}\">\n" +
    "            <!--Color preview-->\n" +
    "            <label class=\"categories__form__color__preview\" ng-style=\"{'background':category.model.color.color}\"></label>\n" +
    "            <input class=\"categories__form__input-group__name\"\n" +
    "                   type=\"text\"\n" +
    "                   ng-maxlength=\"20\"\n" +
    "                   maxlength=\"20\"\n" +
    "                   placeholder=\"Category name\"\n" +
    "                   name=\"name\"\n" +
    "                   ng-model=\"category.model.name\"\n" +
    "                   auto-focus\n" +
    "                   required\n" +
    "                   valid-category-name\n" +
    "                   unique-category-name\n" +
    "                   except=\"masterCategory.model.name\" />\n" +
    "\n" +
    "            <div class=\"categories__form__input-group__count\">{{20 - category.model.name.length}}</div>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryForm.name.$invalid && categoryForm.$submitted}\" ng-messages=\"categoryForm.name.$error\" ng-if=\"categoryForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Name is mandatory.</div>\n" +
    "                <div ng-message=\"validCategoryName\">Name is not valid.</div>\n" +
    "                <div ng-message=\"uniqueCategoryName\">Name is already used.</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div color-picker colors=\"colors\" category-color=\"category.model.color\"></div>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Content right-->\n" +
    "    <div class=\"categories__edit__form__content__right\">\n" +
    "        <!--Reset-->\n" +
    "        <button type=\"button\" class=\"categories__edit__form__content__right__cancel\" ng-click=\"cancel();\">Nevermind</button>\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"categories__edit__form__content__right__update\" type=\"submit\">{{isUpdating ? 'Saving..' : 'Save changes'}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>");
}]);

angular.module("app/import/partials/howto/settings.import.howto.mint.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/howto/settings.import.howto.mint.html",
    "<div class=\"section-text\">\n" +
    "    Here's how you can export your expenses from <strong>Mint</strong>.\n" +
    "\n" +
    "    <iframe src=\"//fast.wistia.net/embed/iframe/yu4eurkxc0\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\" class=\"wistia_embed\" name=\"wistia_embed\" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width=\"640\" height=\"360\">\n" +
    "    </iframe>\n" +
    "    <script src=\"//fast.wistia.net/assets/external/E-v1.js\" async></script>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/import/partials/howto/settings.import.howto.spendee.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/howto/settings.import.howto.spendee.html",
    "<div class=\"section-text\">\n" +
    "    Here's how you can export your expenses from <strong>Spendee</strong>.\n" +
    "\n" +
    "    <iframe src=\"//fast.wistia.net/embed/iframe/yu4eurkxc0\" allowtransparency=\"true\" frameborder=\"0\" scrolling=\"no\" class=\"wistia_embed\" name=\"wistia_embed\" allowfullscreen mozallowfullscreen webkitallowfullscreen oallowfullscreen msallowfullscreen width=\"640\" height=\"360\">\n" +
    "    </iframe>\n" +
    "    <script src=\"//fast.wistia.net/assets/external/E-v1.js\" async></script>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/import/partials/settings.import.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/settings.import.abstract.html",
    "<div class=\"settings__box\" ui-view></div>");
}]);

angular.module("app/import/partials/settings.import.choose.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/settings.import.choose.html",
    "<h1 class=\"settings__title\">Import</h1>\n" +
    "\n" +
    "<div class=\"section-text\">Select the app you want to import from:</div>\n" +
    "\n" +
    "<ul class=\"settings__import__choose\">\n" +
    "    <li class=\"settings__import__choose__source\" ui-sref=\"settings.import.import({type: 'mint'})\">\n" +
    "        <span class=\"settings__import__choose__source__logo--mint\">LG</span>\n" +
    "        <span class=\"settings__import__choose__source__label\">Mint</span>\n" +
    "        <span class=\"settings__import__choose__source__arrow\"> &rang; </span>\n" +
    "    </li>\n" +
    "    <li class=\"settings__import__choose__source\" ui-sref=\"settings.import.import({type: 'spendee'})\">\n" +
    "        <span class=\"settings__import__choose__source__logo--spendee\">LG</span>\n" +
    "        <span class=\"settings__import__choose__source__label\">Spendee</span>\n" +
    "        <span class=\"settings__import__choose__source__arrow\"> &rang; </span>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "\n" +
    "<div class=\"section-text\">Coming soon:</div>\n" +
    "<ul class=\"settings__import__choose\">\n" +
    "    <li class=\"settings__import__choose__source settings__import__choose__source--soon\">\n" +
    "        <span class=\"settings__import__choose__source__logo--wally\">LG</span>\n" +
    "        <span class=\"settings__import__choose__source__label\">Wally</span>\n" +
    "        <span class=\"settings__import__choose__source__arrow\"> &rang; </span>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "\n" +
    "<div class=\"section-text\">\n" +
    "    If you'd like to import your expenses from another app,\n" +
    "    <a href=\"#\" ng-controller=\"FeedbackModalController\" ng-click=\"openFeedbackModal()\">let us know</a>\n" +
    "    .\n" +
    "</div>");
}]);

angular.module("app/import/partials/settings.import.import.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/import/partials/settings.import.import.html",
    "<!-- Flash messages. -->\n" +
    "<div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "<!--Upload section form-->\n" +
    "<div class=\"import__upload\" ng-if=\"! isUploadSuccessful\">\n" +
    "\n" +
    "    <div class=\"import__upload__area\" over-class=\"import__upload__area--over\" nv-file-drop=\"\" nv-file-over=\"\" uploader=\"uploader\" filters=\"queueLimit, csvFilter\">\n" +
    "        <div class=\"import__upload__btn\">\n" +
    "            <div class=\"section-text\">Drop the CSV file exported from\n" +
    "                <strong>{{importDescription}}</strong> here, or <span class=\"text-underlined\">browse</span> to select it.\n" +
    "            </div>\n" +
    "            <input class=\"import__upload__btn__input\" type=\"file\" nv-file-select=\"\" uploader=\"uploader\" />\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--How to content-->\n" +
    "    <ul class=\"section-text\" ng-if=\"! showHowToContent\">\n" +
    "        <li>\n" +
    "            <a href=\"javascript:void(0)\" ng-click=\"toggleHowToContent()\"> How do I export my expenses from {{importDescription}}?</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "    <div ng-show=\"showHowToContent\" ng-include src=\"'app/import/partials/howto/settings.import.howto.' + importType + '.html'\"></div>\n" +
    "</div>\n" +
    "\n" +
    "<!--Expenses import form-->\n" +
    "<form name=\"expensesImportForm\" ng-submit=\"submitPerformImport(expensesImportForm)\" novalidate ng-if=\"isUploadSuccessful && ! importFinished\">\n" +
    "\n" +
    "    <div class=\"import__edit\">\n" +
    "\n" +
    "        <div class=\"section-text\">\n" +
    "            Awesome! We found <strong>{{expensesImportAnswer.model.totalCategoriesFound}} expenses</strong> in\n" +
    "            <strong>{{expensesImportAnswer.model.expenseCategoryMatchingProfileDTOs.length}} categories</strong>.\n" +
    "            Please tell us where each category from {{importDescription}} should be imported to.\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"import__edit__categories__header\">\n" +
    "            <div class=\"import__edit__categories__header__src\">Import this category from {{importDescription}}</div>\n" +
    "            <div class=\"import__edit__categories__header__dest\">Into this category in Revaluate</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"import__edit__categories\" ng-repeat=\"categoryMatchCandidate in expensesImportAnswer.model.expenseCategoryMatchingProfileDTOs track by categoryMatchCandidate.categoryCandidateName\">\n" +
    "\n" +
    "            <!--Category candidate name preview-->\n" +
    "            <div class=\"import__edit__categories__src\">\n" +
    "\n" +
    "                <div class=\"import__edit__categories__src__toggle\">\n" +
    "                    <input class='tgl tgl-flat' id='toggle_{{$index}}' type='checkbox' ng-model=\"categoryMatchCandidate.selected\">\n" +
    "                    <label class='tgl-btn' for='toggle_{{$index}}'></label>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"import__edit__categories__src__name\">{{categoryMatchCandidate.categoryCandidateName}}</div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Category select-->\n" +
    "            <ng-form class=\"import__edit__categories__dest\" name=\"expensesImportCategoryMatchEntryForm\" ng-if=\"categoryMatchCandidate.selected\">\n" +
    "\n" +
    "                <div class=\"import__edit__categories__dest__category\" ng-class=\"{'has-error': expensesImportForm.$submitted && (expensesImportCategoryMatchEntryForm.category.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "                    <ui-select name=\"category\" class=\"category-select__input\" ng-style=\"{'background':$select.selected.model.color.color}\" required ng-model=\"categoryMatchCandidate.category.selected\" theme=\"selectize\">\n" +
    "                        <ui-select-match ng-style=\"{'background':$select.selected.model.color.color}\" placeholder=\"Select a category\">{{$select.selected.model.name}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"categoryEntry in categories | orderObjectBy : 'model.name' : false | filter:{model:{name:$select.search}} track by categoryEntry.model.id\">\n" +
    "                            <span class=\"category__color__preview\" ng-style=\"{'background':categoryEntry.model.color.color}\">C</span>\n" +
    "                            <span class=\"\" ng-bind-html=\"categoryEntry.model.name | highlight: $select.search\"></span>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"form-group-input__message\" ng-class=\"{'has-error': expensesImportCategoryMatchEntryForm.category.$invalid && expensesImportForm.$submitted}\" ng-messages=\"expensesImportCategoryMatchEntryForm.$error\" ng-if=\"expensesImportForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please add a category.</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "            </ng-form>\n" +
    "\n" +
    "            <!--Category not selected-->\n" +
    "            <div class=\"import__edit__categories__ignored\" ng-if=\"! categoryMatchCandidate.selected\">\n" +
    "                Expenses in <strong>{{categoryMatchCandidate.categoryCandidateName}}</strong> will be ignored.\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"import__edit__categories__arrow\">&#8594;</div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Perform import submit -->\n" +
    "        <button class=\"import__save__btn\" ng-disabled=\"! isEnoughSelectedMatchingCategories()\" type=\"submit\">{{isImporting ? 'Importing...' : 'Import expenses'}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>\n" +
    "\n" +
    "<!--After import-->\n" +
    "<a ng-if=\"importFinished\" ui-sref=\"settings.import.import({type: importType})\" ui-sref-opts=\"{reload:true}\">Let me try again!</a>");
}]);

angular.module("app/expenses/partials/expense/expenses.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.abstract.html",
    "<div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container__content\">\n" +
    "\n" +
    "    <!--Trial period countdown-->\n" +
    "    <div ng-if=\"currentUser.showTrialRemainingDays()\">\n" +
    "        <div ng-include src=\"'app/account/partials/trial_period_countdown.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Account confirmation alert-->\n" +
    "    <div ng-if=\"! currentUser.model.emailConfirmed\" ng-controller=\"EmailConfirmationSendController\">\n" +
    "        <div ng-include src=\"'app/account/partials/email_confirmation_send_send.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"generalError\"></div>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <div ui-view=\"expenses\"></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer class=\"view-container__footer\"></div>");
}]);

angular.module("app/expenses/partials/expense/expenses.entry.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.entry.template.html",
    "<!--Display expense-->\n" +
    "<div class=\"expenses__list__entry__display\" ng-if=\"! showContent\" ng-class=\"expense.marked ? 'expense__bulk--marked' : ''\" ng-click=\"toggleContent();\">\n" +
    "\n" +
    "    <!--Actions on expense-->\n" +
    "    <div class=\"expenses__list__entry__select icon-checkmark-strong-unchecked\" ng-if=\"! expense.marked\" ng-click=\"toggleMark();$event.stopPropagation();\"></div>\n" +
    "    <div class=\"expenses__list__entry__select icon-checkmark-strong\" ng-if=\"expense.marked\" ng-click=\"toggleMark();$event.stopPropagation();\"></div>\n" +
    "\n" +
    "    <div class=\"expenses__list__entry__price\">\n" +
    "        {{expense.model.value | currency:user.model.currency.symbol}}\n" +
    "        <span class=\"expenses__list__entry__currency\">{{user.model.currency.symbol}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Expense category-->\n" +
    "    <div class=\"expenses__list__entry__category\" ng-style=\"{'background':expense.model.category.color.color}\" ng-bind-html=\"expense.model.category.name\"></div>\n" +
    "\n" +
    "    <!--Expense description-->\n" +
    "    <div class=\"expenses__list__entry__details\" ng-bind-html=\"expense.model.description | highlightSearch:searchByText\"></div>\n" +
    "\n" +
    "    <!--Expense date-->\n" +
    "    <div class=\"expenses__list__entry__date\">{{expense.model.spentDate | friendlyDate}}</div>\n" +
    "</div>\n" +
    "\n" +
    "<!-- Display expense in edit mode -->\n" +
    "<div class=\"expenses__form expenses__form--edit\" ng-if=\"showContent\">\n" +
    "\n" +
    "    <form name=\"expenseForm\" ng-submit=\"updateExpense(expenseForm, shownExpense, category)\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!-- Form groups -->\n" +
    "        <div class=\"expense__form__price\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.value.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__price__input\" type=\"text\" name=\"value\" placeholder=\"The value\" ng-model=\"shownExpense.model.value\" format-price format=\"number\" caret-price-position required valid-price />\n" +
    "            <span class=\"expense__form__price__currency\">{{user.model.currency.currencyCode}}</span>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.value.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a price.</div>\n" +
    "                <div ng-message=\"validPrice\">Price is invalid</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"expense__form__category\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.category.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <ui-select name=\"category\" class=\"category-select__input\" ng-style=\"{'background':$select.selected.model.color.color}\" required ng-model=\"category.selected\" theme=\"selectize\">\n" +
    "                <ui-select-match ng-style=\"{'background':$select.selected.model.color.color}\" placeholder=\"Select a category\">{{$select.selected.model.name}}</ui-select-match>\n" +
    "                <ui-select-choices repeat=\"categoryEntry in categories | orderObjectBy : 'model.name' : false | filter:{model:{name:$select.search}} track by categoryEntry.model.id\">\n" +
    "                    <span class=\"category__color__preview\" ng-style=\"{'background':categoryEntry.model.color.color}\">C</span>\n" +
    "                    <span class=\"\" ng-bind-html=\"categoryEntry.model.name | highlight: $select.search\"></span>\n" +
    "                </ui-select-choices>\n" +
    "            </ui-select>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.category.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a category.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Description input -->\n" +
    "        <div class=\"expense__form__details\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.description.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__details__input\" type=\"text\" name=\"description\" ng-maxlength=\"30\" maxlength=\"30\" placeholder=\"Add details (optional)\" ng-model=\"shownExpense.model.description\" escape-html />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.description.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"maxlength\">Hmm. Too long.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Date input -->\n" +
    "        <div class=\"expense__form__date\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\">\n" +
    "\n" +
    "            <!--Hidden input of the expense chosen date-->\n" +
    "            <input type=\"hidden\" name=\"spentDate\" ng-model=\"shownExpense.model.spentDate\" required valid-date />\n" +
    "\n" +
    "            <!--Expense date picker-->\n" +
    "            <div class=\"expense__form__date__input\">\n" +
    "                <button ng-click=\"openDatePicker($event)\" type=\"button\"\n" +
    "                        datepicker-popup is-open=\"datePickerStatus.opened\"\n" +
    "                        min-date=\"minDate\"\n" +
    "                        max-date=\"maxDate\"\n" +
    "                        ng-model=\"shownExpense.model.spentDate\"\n" +
    "                        datepicker-options=\"{startingDay:1,showWeeks:false}\">\n" +
    "                    {{shownExpense.model.spentDate | friendlyDate}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Error messages-->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a date.</div>\n" +
    "                <div ng-message=\"validDate\">Date should be in the past.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <div class=\"expense__form__submit__save\">\n" +
    "            <button class=\"expense__edit__form__savebtn\" type=\"submit\">Save</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"expense__form__submit__cancel\">\n" +
    "            <button class=\"expense__edit__form__cancelbtn\" type=\"button\" ng-click=\"cancel();\">Discard changes</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/expenses/partials/expense/expenses.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.html",
    "<!-- Add a new expense form -->\n" +
    "<div class=\"expenses__form\">\n" +
    "\n" +
    "    <form name=\"expenseForm\" ng-submit=\"saveExpense()\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <!-- Form groups -->\n" +
    "        <div class=\"expense__form__price\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.value.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__price__input\" type=\"text\" name=\"value\" placeholder=\"The value\" maxlength=\"14\" ng-model=\"expense.model.value\" format-price format=\"number\" caret-price-position required valid-price auto-focus />\n" +
    "            <span class=\"expense__form__price__currency\">{{user.model.currency.symbol}}</span>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.value.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Don't forget the price.</div>\n" +
    "                <div ng-message=\"validPrice\">Oops, you missed the price.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"expense__form__category\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.category.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "            <ui-select name=\"category\" class=\"category-select__input\" ng-style=\"{'background':$select.selected.model.color.color}\" required ng-model=\"category.selected\" theme=\"selectize\">\n" +
    "                <ui-select-match ng-style=\"{'background':$select.selected.model.color.color}\" placeholder=\"Select a category\">{{$select.selected.model.name}}</ui-select-match>\n" +
    "                <ui-select-choices repeat=\"categoryEntry in categories | orderObjectBy : 'model.name' : false | filter:{model:{name:$select.search}} track by categoryEntry.model.id\">\n" +
    "                    <span class=\"category__color__preview\" ng-style=\"{'background':categoryEntry.model.color.color}\">C</span>\n" +
    "                    <span class=\"\" ng-bind-html=\"categoryEntry.model.name | highlight: $select.search\"></span>\n" +
    "                </ui-select-choices>\n" +
    "            </ui-select>\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.category.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a category.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Description input -->\n" +
    "        <div class=\"expense__form__details\" ng-class=\"{'has-error': expenseForm.$submitted && (expenseForm.description.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"expense__form__details__input\" type=\"text\" name=\"description\" ng-maxlength=\"30\" maxlength=\"30\" placeholder=\"Add details (optional)\" ng-model=\"expense.model.description\" escape-html />\n" +
    "\n" +
    "            <!-- Error messages -->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.description.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"maxlength\">Hmm. Too long. Make it shorter.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Date input -->\n" +
    "        <div class=\"expense__form__date\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\">\n" +
    "\n" +
    "            <!--Hidden input of the expense chosen date-->\n" +
    "            <input type=\"hidden\" name=\"spentDate\" ng-model=\"expense.model.spentDate\" required valid-date />\n" +
    "\n" +
    "            <!--Expense date picker-->\n" +
    "            <div class=\"expense__form__date__input\">\n" +
    "                <button type=\"button\"\n" +
    "                        class=\"expense__form__date__input__btn\"\n" +
    "                        ng-click=\"openDatePicker($event)\"\n" +
    "                        ng-model=\"expense.model.spentDate\"\n" +
    "                        datepicker-popup\n" +
    "                        is-open=\"datePickerOpened\"\n" +
    "                        min-date=\"datePickerMinDate\"\n" +
    "                        max-date=\"datePickerMaxDate\"\n" +
    "                        datepicker-options=\"{startingDay:1,showWeeks:false}\">{{expense.model.spentDate | friendlyDate}}\n" +
    "                </button>\n" +
    "            </div>\n" +
    "\n" +
    "            <!--Error messages-->\n" +
    "            <div class=\"form-group-input__message\" ng-class=\"{'has-error': expenseForm.spentDate.$invalid && expenseForm.$submitted}\" ng-messages=\"expenseForm.$error\" ng-if=\"expenseForm.$submitted\">\n" +
    "                <div ng-message=\"required\">Please add a date.</div>\n" +
    "                <div ng-message=\"validDate\">Date should be in the past.</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <div class=\"expense__form__submit__save\">\n" +
    "            <button class=\"expense__edit__form__savebtn\" type=\"submit\">Save</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!--Expense bulk actions-->\n" +
    "<div class=\"expenses__bulk-actions\" ng-if=\"isBulkActionEnabled()\">\n" +
    "\n" +
    "    <div class=\"expenses__bulk-actions__buttons\">\n" +
    "\n" +
    "        <div class=\"expenses__bulk-actions__delete\">\n" +
    "            <button class=\"expenses__bulk-actions__delete__btn-delete\" ng-click=\"performBulkDelete()\">{{isBulkDeleting ? 'Deleting...' : 'Delete'}}</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"expenses__bulk-actions__cancel\">\n" +
    "            <button class=\"expenses__bulk-actions__delete__btn-cancel\" ng-click=\"cancelBulkAction()\">Nevermind</button>\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!--Empty state-->\n" +
    "<div class=\"expenses__empty-state\" ng-if=\"expenses.length === 0\">\n" +
    "    <div class=\"expenses__empty-state__icon\"></div>\n" +
    "    <h1>No expenses yet.</h1>\n" +
    "\n" +
    "    <div>Here's where your expenses will show up.</div>\n" +
    "</div>\n" +
    "\n" +
    "\n" +
    "<!--The expenses list-->\n" +
    "<div expense-list expenses=\"expenses\" categories=\"categories\" search-by-text=\"searchByText\" sort=\"desc\"></div>");
}]);

angular.module("app/expenses/partials/expense/expenses.list.template.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/expenses/partials/expense/expenses.list.template.html",
    "<!--Expense list content.-->\n" +
    "<div ng-show=\"showExpensesContent\" class=\"expense-list-box\" ng-class=\"{ 'expense-list-box--past-expenses': reverseOrder}\">\n" +
    "\n" +
    "    <div class=\"expenses__list\">\n" +
    "\n" +
    "        <!--Expense list-->\n" +
    "        <div class=\"expenses__list__entry\"\n" +
    "             ng-repeat=\"expense in expenses | orderObjectBy : 'model.spentDate' : reverseOrder | limitTo: expensesLimit | filter:{model:{description:searchByText}} as filteredExpenses track by expense.model.id\"\n" +
    "             expense-entry expense=\"expense\" categories=\"categories\">\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-if=\"isStillExpensesToBeLoaded()\">\n" +
    "        <button type=\"submit\" class=\"expenses__list__loadbtn\" ng-click=\"loadMoreExpenses()\">{{isLoadingMore ? 'Loading..' : 'Load more'}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/account.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/account.html",
    "<!-- Brand logo -->\n" +
    "<div class=\"brand-logo-block\"><a ui-sref=\"home\"></a></div>\n" +
    "\n" +
    "<!-- Account sections -->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <!--Sign in-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountModal.state === ACCOUNT_FORM_STATE.login\" ng-controller=\"LoginController\">\n" +
    "\n" +
    "        <!--Close-->\n" +
    "        <div account-modal-close></div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Welcome!</h1>\n" +
    "\n" +
    "        <!-- Login form -->\n" +
    "        <form name=\"loginForm\" ng-submit=\"login(loginData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': loginForm.$submitted && (loginForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"email\" placeholder=\"email\" name=\"email\" ng-model=\"loginData.email\" auto-focus required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"loginForm.email.$invalid && loginForm.$submitted\">Please enter your email address.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': loginForm.$submitted && (loginForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"password\" placeholder=\"password\" name=\"password\" ng-model=\"loginData.password\" required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"loginForm.password.$invalid && loginForm.$submitted\">Please enter your password.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Reset password -->\n" +
    "            <a class=\"link-navigation\" href=\"javascript:void(0)\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.forgotPassword)\">Forgot login details?</a>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"account__btn\" type=\"submit\">{{isRequestPending ? 'Logging in..' : isWaitingForCloseEvent ? 'Loading..' : 'Log in'}}</button>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-navigation\" href=\"javascript:void(0)\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.requestSignUpRegistration)\">Don't have an account yet? Sign up!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountModal.state == ACCOUNT_FORM_STATE.requestSignUpRegistration\" ng-controller=\"HomeSignUpRegistrationController\">\n" +
    "\n" +
    "        <!--Close-->\n" +
    "        <div account-modal-close></div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Let's get you started!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <div class=\"form-group-input__message\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</div>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" name=\"firstName\" placeholder=\"First Name\" ng-model=\"signUpData.firstName\" required />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <div class=\"form-group-input__message\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</div>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" name=\"lastName\" placeholder=\"Last Name\" ng-model=\"signUpData.lastName\" required />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Email input -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\" ng-messages=\"signUpForm.email.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please add your email address.</div>\n" +
    "                    <div ng-message=\"validEmail\">Missed a letter? It looks like an invalid email address.</div>\n" +
    "                    <div ng-message=\"uniqueEmail\">This email address is already used. <a href=\"javascript:void(0)\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.forgotPassword)\">Forgot your password?</a></div>\n" +
    "                </div>\n" +
    "                <input class=\"form-group-input__input\" type=\"email\" name=\"email\" placeholder=\"Email\" ng-model=\"signUpData.email\" required valid-email unique-email />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form groups -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message\" ng-class=\"{'has-error': signUpForm.$submitted && signUpForm.password.$invalid}\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                    <div ng-message=\"strongPassword\">Your password needs to be at least 7 characters long.</div>\n" +
    "                </div>\n" +
    "                <input class=\"form-group-input__input\" type=\"password\" name=\"password\" placeholder=\"Password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"home__section__signup__btn\" type=\"submit\">Start my 14 day free trial</button>\n" +
    "        </form>\n" +
    "\n" +
    "        <a class=\"link-navigation\" href=\"javascript:void(0)\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.login)\">Already have an account? Sign in here!</a>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Recover password section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountModal.state == ACCOUNT_FORM_STATE.forgotPassword\" ng-controller=\"ForgotPasswordController\">\n" +
    "\n" +
    "        <!--Close-->\n" +
    "        <div account-modal-close></div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Can't remember your password?</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            Please enter the e-mail you use to log in. We'll send you a link to reset your password.\n" +
    "        </span>\n" +
    "\n" +
    "        <!-- Forgot password form -->\n" +
    "        <form name=\"forgotPasswordForm\" ng-submit=\"requestPasswordReset(forgotPasswordData.email)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': forgotPasswordForm.$submitted && (forgotPasswordForm.email.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"email\" placeholder=\"Your email address\" name=\"email\" ng-model=\"forgotPasswordData.email\" auto-focus required valid-email />\n" +
    "\n" +
    "                <div class=\"form-group-input__message\" ng-messages=\"forgotPasswordForm.email.$error\" ng-if=\"forgotPasswordForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please enter your email address.</div>\n" +
    "                    <div ng-message=\"validEmail\">Missed a letter? It looks like an invalid email address.</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"account__btn\" type=\"submit\">Reset password</button>\n" +
    "        </form>\n" +
    "\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-navigation\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.login)\">Nevermind, let me log in!</a>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Password recovery email sent section -->\n" +
    "    <div class=\"account__section\" ng-if=\"AccountModal.state == ACCOUNT_FORM_STATE.forgotPasswordEmailSent\">\n" +
    "\n" +
    "        <!--Close-->\n" +
    "        <div account-modal-close></div>\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Email has been sent!</h1>\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">Please check your email. We've sent you a link to reset your password.</span>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-navigation\" ng-click=\"AccountModal.setState(ACCOUNT_FORM_STATE.login)\">Actually I remember the password</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/account_close.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/account_close.html",
    "<a class=\"account__close\" href=\"javascript:void(0)\">+</a>");
}]);

angular.module("app/account/partials/email_confirmation_send_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/email_confirmation_send_abstract.html",
    "<!--Validate password reset token section - abstract view-->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <div ui-view></div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/email_confirmation_send_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/email_confirmation_send_invalid.html",
    "<!-- Invalid token result view -->\n" +
    "<div class=\"alert alert-danger\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Sorry..</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        The token is invalid or expired.\n" +
    "    </span>\n" +
    "\n" +
    "    <br />\n" +
    "    <br />\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a class=\"link-navigation\" href=\"javascript:void(0)\" ui-sref=\"home\">Continue.</a>\n" +
    "    <br />\n" +
    "</div>");
}]);

angular.module("app/account/partials/email_confirmation_send_send.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/email_confirmation_send_send.html",
    "<!-- Send confirmation email section -->\n" +
    "<div class=\"account_send_email_section\">\n" +
    "\n" +
    "    <!-- Send confirmation email form -->\n" +
    "    <form name=\"sendConfirmationEmailForm\" ng-submit=\"sendConfirmationEmail(sendConfirmationEmailForm)\" novalidate>\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <div class=\"alert-info account_send_email_section__alert\">\n" +
    "            Please check your inbox at <strong>{{user.model.email}}</strong> to confirm your email address.\n" +
    "            <button type=\"submit\">Resend email</button>\n" +
    "        </div>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/email_confirmation_send_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/email_confirmation_send_valid.html",
    "<div class=\"account__section\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Success!</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        Your account was successfully validated.\n" +
    "    </span>\n" +
    "\n" +
    "    <br />\n" +
    "    <br />\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a class=\"link-navigation\" href=\"javascript:void(0)\" ui-sref=\"home\">Continue to Revaluate</a>\n" +
    "    <br />\n" +
    "</div>");
}]);

angular.module("app/account/partials/logout.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/logout.html",
    "<!-- Account sections -->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <!-- Logout section -->\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!--Message-->\n" +
    "        <div class=\"alert alert-success\">\n" +
    "            Logged out successfully.\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "");
}]);

angular.module("app/account/partials/signup_confirm_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_abstract.html",
    "<div ui-view></div>");
}]);

angular.module("app/account/partials/signup_confirm_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_invalid.html",
    "<!-- Registration confirmation invalid -->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Explain -->\n" +
    "        <span class=\"account__explain\">\n" +
    "            Sorry, we couldn't validate your email. Maybe the link in the email is too old..\n" +
    "        </span>\n" +
    "        <a href=\"javascript:void(0)\" class=\"link-navigation\" ng-click=\"goHome()\">Request the email again</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);

angular.module("app/account/partials/signup_confirm_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_confirm_valid.html",
    "<!-- Registration confirmation valid -->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <!--Sign up-->\n" +
    "    <div class=\"account__section\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"account__title\">Let's finalize your account!</h1>\n" +
    "\n" +
    "        <!-- Sign-up form -->\n" +
    "        <form name=\"signUpForm\" ng-submit=\"signUp(signUpData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Account controls -->\n" +
    "            <div class=\"account__controls\">\n" +
    "\n" +
    "                <!-- Flash messages. -->\n" +
    "                <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" placeholder=\"First Name\" name=\"firstName\" ng-model=\"signUpData.firstName\" auto-focus required />\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"signUpForm.firstName.$invalid && signUpForm.$submitted\">Please tell us your First Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form group -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Last Name\" name=\"lastName\" ng-model=\"signUpData.lastName\" required />\n" +
    "                    <span class=\"form-group-input__message\" ng-if=\"signUpForm.lastName.$invalid && signUpForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Email input -->\n" +
    "                <div class=\"form-group\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\">\n" +
    "                    <input class=\"form-group-input__input\" type=\"email\" placeholder=\"Email address\" name=\"email\" ng-model=\"signUpData.email\" required valid-email unique-email />\n" +
    "\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"home__signup__sections__section__validation-messages\" ng-class=\"{'has-error': signUpForm.email.$invalid && signUpForm.$submitted}\" ng-messages=\"signUpForm.email.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Your email address is mandatory.</div>\n" +
    "                        <div ng-message=\"validEmail\">This email address is not valid.</div>\n" +
    "                        <div ng-message=\"uniqueEmail\">This email address is already used.</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Form groups -->\n" +
    "                <div class=\"account__controls__form-groups--medium-offset\">\n" +
    "\n" +
    "                    <!-- Form group -->\n" +
    "                    <div class=\"form-group form-group--small-offset\" ng-class=\"{'has-error': signUpForm.$submitted && (signUpForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "                        <input class=\"form-group-input__input\" type=\"password\" placeholder=\"Choose a password\" name=\"password\" ng-model=\"signUpData.password\" required strong-password />\n" +
    "\n" +
    "                        <div class=\"form-group-input__message\" ng-messages=\"signUpForm.password.$error\" ng-if=\"signUpForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Please choose a password.</div>\n" +
    "                            <div ng-message=\"strongPassword\">Your password needs to be at least 7 characters long.</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"account__controls__form__info\">\n" +
    "                    <div class=\"account__controls__form__info__left\">Timezone</div>\n" +
    "                    <div class=\"account__controls__form__info__right simptip-position-bottom simptip-fade simptip-smooth simptip-multiline\" data-tooltip=\"We automatically detected your timezone. You can change this later in the Settings page.\">{{timezoneDetails.value}}</div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Button container -->\n" +
    "                <button class=\"btn account__button\" type=\"submit\">Create new account</button>\n" +
    "            </div>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"account__section__terms\">\n" +
    "        * By singing up you agree to our\n" +
    "        <a href=\"javascript:void(0)\" ui-sref=\"privacy\" class=\"account__section__terms__link\">Terms and Privacy policy</a>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/signup_setup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/signup_setup.html",
    "<div class=\"sign-up__setup\">\n" +
    "\n" +
    "    <div class=\"sign-up__setup__box\">\n" +
    "\n" +
    "        <h2 class=\"sign-up__setup__title\">Awesome! Let's set some basics!</h2>\n" +
    "\n" +
    "        <!-- Set up form -->\n" +
    "        <form name=\"setUpForm\" ng-submit=\"setUp()\" novalidate>\n" +
    "\n" +
    "            <div class=\"sign-up__setup__section\">\n" +
    "                Please choose your currency:\n" +
    "                <div class=\"currency-select\" ng-class=\"{'has-error': setUpForm.$submitted && (setUpForm.currency.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "                    <ui-select name=\"currency\" class=\"currency-select__input\" required ng-model=\"currency.selected\" theme=\"selectize\">\n" +
    "                        <ui-select-match placeholder=\"Start typing your currency...\">{{$select.selected.displayName}} - {{$select.selected.symbol}}</ui-select-match>\n" +
    "                        <ui-select-choices repeat=\"currencyEntry in currencies | orderObjectBy : 'displayName' : false | filter:{$:$select.search} track by currencyEntry.numericCode\">\n" +
    "                            <span ng-bind-html=\"currencyEntry.displayName | highlight: $select.search\"></span>\n" +
    "                            <span>-</span>\n" +
    "                            <span ng-bind-html=\"currencyEntry.symbol | highlight: $select.search\"></span>\n" +
    "                        </ui-select-choices>\n" +
    "                    </ui-select>\n" +
    "\n" +
    "                    <!-- Error messages -->\n" +
    "                    <div class=\"form-group-input__message form-group-input__message--currency\" ng-class=\"{'has-error': setUpForm.category.$invalid && setUpForm.$submitted}\" ng-messages=\"setUpForm.$error\" ng-if=\"setUpForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please add a currency.</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"sign-up__setup__tip\">\n" +
    "                Let's add some categories. <strong>Unselect or add another</strong>. You can change them later as well.\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"sign-up__box__categories\">\n" +
    "                <div class=\"sign-up__box__categories__category\" ng-repeat=\"category in categories track by category.name\">\n" +
    "                    <div class=\"category-name\" ng-style=\"{'background':category.color.color}\" ng-class=\"{ 'category-name--unselected': !category.selected }\" ng-click=\"toggleCategorySelection($index)\">\n" +
    "                        <span class=\"icon-checkmark-light\"></span>\n" +
    "                        {{category.name}}\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"sign-up__box__categories\">\n" +
    "\n" +
    "                <!--Toggle form-->\n" +
    "                <button ng-if=\"! showCategoryOnTheFlyInput\" class=\"sign-up__box__categories__addbtn\" ng-click=\"toggleContent()\">+ Add another</button>\n" +
    "\n" +
    "                <!--Add category on the fly form-->\n" +
    "                <ng-form class=\"sign-up__box__categories__category__form\"\n" +
    "                         name=\"categoryOnTheFlyForm\"\n" +
    "                         submit-on=\"add-category-on-the-fly-event\"\n" +
    "                         ng-submit=\"onSubmitted($event)\"\n" +
    "                         ng-if=\"showCategoryOnTheFlyInput\">\n" +
    "\n" +
    "                    <div ng-class=\"{'has-error': categoryOnTheFlyForm.$submitted && categoryOnTheFlyForm.name.$invalid}\">\n" +
    "\n" +
    "                        <!-- Error messages -->\n" +
    "                        <div class=\"form-group-input__message\" ng-class=\"{'has-error': categoryOnTheFlyForm.name.$invalid}\" ng-messages=\"categoryOnTheFlyForm.name.$error\" ng-if=\"categoryOnTheFlyForm.$submitted\">\n" +
    "                            <div ng-message=\"required\">Name is mandatory.</div>\n" +
    "                            <div ng-message=\"validCategoryName\">Name is not valid.</div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <!--The on the fly input category-->\n" +
    "                        <input class=\"sign-up__box__categories__addinput\" type=\"text\" name=\"name\"\n" +
    "                               maxlength=\"15\"\n" +
    "                               ng-model=\"$parent.categoryOnTheFly\"\n" +
    "                               ng-enter=\"triggerSubmit()\"\n" +
    "                               ng-blur=\"cancelAddCategoryOnTheFly()\"\n" +
    "                               auto-focus required valid-category-name />\n" +
    "\n" +
    "                    </div>\n" +
    "                </ng-form>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Button -->\n" +
    "            <button class=\"sign-up__setup__btn\" ng-disabled=\"! isEnoughSelectedCategories()\" type=\"submit\">{{isSaving ? 'Saving..' : 'Done! Let\\'s start!'}}</button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/trial_period_countdown.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/trial_period_countdown.html",
    "<!-- Trial period ending section -->\n" +
    "<div class=\"account_trial_period_section\">\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <div class=\"alert-error account_send_email_section__alert\">\n" +
    "        Your trial period will end in <strong>{{currentUser.getTrialRemainingDays()}} days</strong>.\n" +
    "        <a href=\"javascript:void(0)\" ui-sref=\"settings.payment.insights\">Add payment details</a>.\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_abstract.html",
    "<!--Validate password reset token section - abstract view-->\n" +
    "<div class=\"account\">\n" +
    "\n" +
    "    <div ui-view></div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_invalid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_invalid.html",
    "<!-- Invalid token result view -->\n" +
    "<div class=\"alert alert-danger\">\n" +
    "    The token is invalid or expired.\n" +
    "    <br />\n" +
    "    <br />\n" +
    "\n" +
    "    <!-- Button container -->\n" +
    "    <a href=\"javascript:void(0)\" ng-click=\"continueToResetPassword()\">Let me try again.</a>\n" +
    "    <br />\n" +
    "    <span ng-if=\"isUserAuthenticated\">\n" +
    "        You are authenticated. You will be logged off if you want to try again.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/account/partials/validate_password_reset_token_valid.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/account/partials/validate_password_reset_token_valid.html",
    "<!-- Validate password reset token section -->\n" +
    "<div class=\"account__section\" ng-hide=\"successfullyReseted\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Reset your password.</h1>\n" +
    "\n" +
    "    <!-- Reset password form -->\n" +
    "    <form name=\"resetPasswordForm\" ng-submit=\"resetPassword(resetPasswordData)\" novalidate>\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': resetPasswordForm.$submitted && (resetPasswordForm.password.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password\" name=\"password\" ng-model=\"resetPasswordData.password\" auto-focus required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"resetPasswordForm.password.$invalid && resetPasswordForm.$submitted\">Your new password is mandatory.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': resetPasswordForm.$submitted && (resetPasswordForm.passwordConfirmation.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password confirmation\" name=\"passwordConfirmation\" ng-model=\"resetPasswordData.passwordConfirmation\" required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"resetPasswordForm.passwordConfirmation.$invalid && resetPasswordForm.$submitted\">Your confirm password is mandatory.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"account__btn\" type=\"submit\">Reset password</button>\n" +
    "    </form>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!-- Change password section successfully-->\n" +
    "<div class=\"account__section\" ng-hide=\"!successfullyReseted\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"account__title\">Successfully</h1>\n" +
    "\n" +
    "    <!-- Explain -->\n" +
    "    <span class=\"account__explain\">\n" +
    "        We've successfully updated your password.\n" +
    "    </span>\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.abstract.html",
    "<div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container__content view-container__content--settings\">\n" +
    "\n" +
    "    <ul class=\"view-container__content__admin__aside\">\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.profile\">Profile</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.admin\">Account</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.preferences\">Preferences</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.categories\">Categories</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.import.choose\">Import</a>\n" +
    "        </li>\n" +
    "        <li ui-sref-active=\"tab__active\">\n" +
    "            <a href=\"javascript:void(0)\" ui-sref=\"settings.payment.insights\">Billing</a>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "\n" +
    "    <div class=\"view-container__content__admin__section\" ui-view></div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer class=\"view-container__footer\"></div>");
}]);

angular.module("app/settings/partials/settings.admin.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.admin.abstract.html",
    "<div class=\"settings__box\" ui-view=\"updatePassword\"></div>\n" +
    "\n" +
    "<div class=\"settings__box\" ui-view=\"cancelAccount\"></div>");
}]);

angular.module("app/settings/partials/settings.admin.cancelAccount.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.admin.cancelAccount.html",
    "<div class=\"settings__box__section--50\">\n" +
    "\n" +
    "    <!-- Delete account -->\n" +
    "    <h1 class=\"settings__title\">Delete account</h1>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Cancel account-->\n" +
    "    <div inline-confirmation toggle=\"! isDeleting\" confirm=\"cancelAccount()\" message=\"Are you sure you want to delete your account?\">\n" +
    "        <button class=\"settings__cancel__btn\">{{isDeleting ? 'Deleting...' : 'Delete my account'}}</button>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.admin.updatePassword.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.admin.updatePassword.html",
    "<!-- Update password section -->\n" +
    "<div class=\"settings__box__section--50\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"settings__title\">Change password</h1>\n" +
    "\n" +
    "    <!-- Update password form -->\n" +
    "    <form name=\"updatePasswordForm\" ng-submit=\"updatePassword(updatePasswordData)\" novalidate focus-first-error>\n" +
    "\n" +
    "        <!-- Flash messages. -->\n" +
    "        <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.oldPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"Old password\" name=\"oldPassword\" ng-model=\"updatePasswordData.oldPassword\" required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"updatePasswordForm.oldPassword.$invalid && updatePasswordForm.$submitted\">Please enter your old password.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPassword.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password\" name=\"newPassword\" ng-model=\"updatePasswordData.newPassword\" required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"updatePasswordForm.newPassword.$invalid && updatePasswordForm.$submitted\">Please enter a new password.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Form group -->\n" +
    "        <div class=\"form-group-input\" ng-class=\"{'has-error': updatePasswordForm.$submitted && (updatePasswordForm.newPasswordConfirmation.$invalid || badPostSubmitResponse)}\">\n" +
    "            <input class=\"form-group-input__input\" type=\"password\" placeholder=\"New password confirmation\" name=\"newPasswordConfirmation\" ng-model=\"updatePasswordData.newPasswordConfirmation\" required />\n" +
    "            <span class=\"form-group-input__message\" ng-if=\"updatePasswordForm.newPasswordConfirmation.$invalid && updatePasswordForm.$submitted\">Please confirm your new password.</span>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Saving...' : 'Change password'}}</button>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.payment.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.abstract.html",
    "<!-- Flash messages. -->\n" +
    "<div flash-messages flash=\"flash\" identifier-id=\"generalError\"></div>\n" +
    "\n" +
    "<!--The view-->\n" +
    "<div class=\"settings__box\" ui-view></div>");
}]);

angular.module("app/settings/partials/settings.payment.add.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.add.html",
    "<!-- Payment section -->\n" +
    "<div class=\"settings__box\">\n" +
    "\n" +
    "    <!--Payment method section-->\n" +
    "    <div class=\"settings__box__section--50\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"settings__title\">Billing</h1>\n" +
    "\n" +
    "        <div class=\"section-text\">\n" +
    "            It seems that you have no payment info added yet. In order to subscribe to Revaluate, please add your credit\n" +
    "            card details below.\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Add payment method form -->\n" +
    "        <form class=\"payment__form__addcard\" name=\"addPaymentMethodForm\" ng-submit=\"addPaymentMethod()\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input payment__form__addcard__number\" ng-class=\"{'has-error': addPaymentMethodForm.$submitted && (addPaymentMethodForm.cardNumber.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>Credit Card Number</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"4111 1111 1111 1111\" name=\"cardNumber\" ng-model=\"paymentData.cardNumber\" payments-format=\"card\" payments-validate=\"card\" auto-focus required />\n" +
    "\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message\" ng-class=\"{'has-error': addPaymentMethodForm.cardNumber.$invalid && addPaymentMethodForm.$submitted}\" ng-messages=\"addPaymentMethodForm.cardNumber.$error\" ng-if=\"addPaymentMethodForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please enter your card number.</div>\n" +
    "                    <div ng-message=\"parse\">Please enter a valid card number.</div>\n" +
    "                    <div ng-message=\"card\">Please enter a valid card number.</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input payment__form__addcard__expiration\" ng-class=\"{'has-error': addPaymentMethodForm.$submitted && (addPaymentMethodForm.cardExpirationDate.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>Expiration</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"10 / 2018\" name=\"cardExpirationDate\" ng-model=\"paymentData.cardExpirationDate\" payments-format=\"expiry\" payments-validate=\"expiry\" required />\n" +
    "\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message\" ng-class=\"{'has-error': addPaymentMethodForm.cardExpirationDate.$invalid && addPaymentMethodForm.$submitted}\" ng-messages=\"addPaymentMethodForm.cardExpirationDate.$error\" ng-if=\"addPaymentMethodForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please enter card expiration date.</div>\n" +
    "                    <div ng-message=\"parse\">Please enter a valid expiration date.</div>\n" +
    "                    <div ng-message=\"expiry\">Please enter a valid expiration date.</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Saving...' : 'Add credit card'}}\n" +
    "            </button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.payment.customer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.customer.html",
    "<!-- Payment section -->\n" +
    "<div class=\"settings__box\">\n" +
    "\n" +
    "    <!--Payment customer section-->\n" +
    "    <div class=\"settings__box__section--50\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"settings__title\">Update customer information</h1>\n" +
    "\n" +
    "        <!-- Update customer information form -->\n" +
    "        <form name=\"updateCustomerForm\" ng-submit=\"updateCustomer()\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': updateCustomerForm.$submitted && (updateCustomerForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Last name\" name=\"cardNumber\" ng-model=\"paymentDetailsData.firstName\" auto-focus required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"updateCustomerForm.firstName.$invalid && updateCustomerForm.$submitted\">Please enter your first name.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': updateCustomerForm.$submitted && (updateCustomerForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"First name\" name=\"cardExpirationDate\" ng-model=\"paymentDetailsData.lastName\" required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"updateCustomerForm.lastName.$invalid && updateCustomerForm.$submitted\">Please enter your last name.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Updating...' : 'Update customer'}}</button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.payment.insights.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.insights.html",
    "<!--Payment profile section-->\n" +
    "\n" +
    "<!-- Title -->\n" +
    "<h1 class=\"settings__title\">Billing</h1>\n" +
    "\n" +
    "<!-- Flash messages. -->\n" +
    "<div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "<!--Subscription payment section-->\n" +
    "<div class=\"settings__box__section--50\">\n" +
    "\n" +
    "    <div class=\"settings__title__h2\">Subscription status</div>\n" +
    "\n" +
    "    <div ng-repeat=\"paymentMethodDTO in paymentInsights.paymentMethodDTOs\">\n" +
    "\n" +
    "        <!--Payment method subscriptions-->\n" +
    "        <div class=\"settings__box__payment-payment-method__subscription\" ng-repeat=\"paymentSubscription in paymentMethodDTO.paymentSubscriptionDTOList\">\n" +
    "\n" +
    "            <div class=\"settings__box__payment__subscription__status\" ng-if=\"paymentInsights.subscriptionActive\">\n" +
    "                <div>\n" +
    "                    <span class=\"settings__box__payment__subscription__status--active\">{{paymentSubscription.status}}</span>\n" +
    "                    <span class=\"settings__box__payment__subscription__status--info\"> - Next payment: ${{paymentSubscription.amount}} due {{paymentSubscription.billingPeriodEndDate | friendlyDate}}</span>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"settings__box__payment__subscription__status\" ng-if=\"! paymentInsights.subscriptionActive\">\n" +
    "        <div>\n" +
    "            <span class=\"settings__box__payment__subscription__status--trial\">Trial</span>\n" +
    "            <span class=\"settings__box__payment__subscription__status--info\">- First billing: $7.00 due 2015.05.25</span>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Payment form -->\n" +
    "    <form ng-if=\"! paymentInsights.subscriptionActive\" name=\"paymentSubscriptionForm\" ng-submit=\"performPaymentSubscription()\" novalidate>\n" +
    "\n" +
    "        <!-- Button container -->\n" +
    "        <button class=\"settings__box__payment__subscription__btn\" type=\"submit\">{{isRequestPending ? 'Activating...' : 'Activate'}}</button>\n" +
    "    </form>\n" +
    "</div>\n" +
    "\n" +
    "<!--Payment method-->\n" +
    "<div class=\"settings__box__section--50\">\n" +
    "\n" +
    "    <div class=\"settings__title__h2\">Payment method</div>\n" +
    "\n" +
    "    <div class=\"settings__box__payment__method\" ng-repeat=\"paymentMethodDTO in paymentInsights.paymentMethodDTOs\">\n" +
    "        <div class=\"settings__box__payment__method__cardno\">{{paymentMethodDTO.cardType}} ending with {{paymentMethodDTO.last4}}</div>\n" +
    "        <div class=\"settings__box__payment__method__cardexp\">Expiration: {{paymentMethodDTO.expirationMonth}} / {{paymentMethodDTO.expirationYear}}</div>\n" +
    "        <img ng-src=\"{{paymentMethodDTO.imageUrl}}\" />\n" +
    "        <a class=\"link-navigation\" href=\"javascript:void(0)\" ui-sref=\"settings.payment.method\">Update payment method</a>\n" +
    "\n" +
    "        <!-- Remove payment method form -->\n" +
    "        <form ng-if=\"paymentInsights.subscriptionActive\" name=\"paymentSubscriptionForm\" ng-submit=\"performRemovePayment()\" novalidate>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"settings__box__payment__subscription__btn\" type=\"submit\">{{isRequestPending ? 'Removing...' : 'Remove payment method'}}</button>\n" +
    "        </form>\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<!--Billing History-->\n" +
    "<div class=\"settings__box__section--100\">\n" +
    "\n" +
    "    <div class=\"settings__title__h2\">Billing History</div>\n" +
    "\n" +
    "    <table class=\"settings__box__payment__history\">\n" +
    "        <thead>\n" +
    "        <tr>\n" +
    "            <th>Status</th>\n" +
    "            <th>ID</th>\n" +
    "            <th>Amount</th>\n" +
    "            <th>Date</th>\n" +
    "        </tr>\n" +
    "        </thead>\n" +
    "        <tbody>\n" +
    "        <tr ng-repeat=\"paymentTransactionDTO in paymentInsights.paymentTransactionDTOs\">\n" +
    "            <td>\n" +
    "                <span class=\"icon-checkmark settings__box__payment__history__status--settled\" ng-if=\"paymentTransactionDTO.status == 'SETTLED'\"></span>\n" +
    "                <span class=\"icon-checkmark\" ng-if=\"paymentTransactionDTO.status != 'SETTLED'\"></span>\n" +
    "            </td>\n" +
    "            <td>\n" +
    "                <a href=\"javascript:void(0)\">{{paymentTransactionDTO.id}}</a>\n" +
    "            </td>\n" +
    "            <td>$ {{paymentTransactionDTO.amount}}</td>\n" +
    "            <td>{{paymentTransactionDTO.createdAt | friendlyDate}}</td>\n" +
    "        </tr>\n" +
    "        </tbody>\n" +
    "    </table>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.payment.method.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.payment.method.html",
    "<!-- Payment section -->\n" +
    "<div class=\"settings__box\">\n" +
    "\n" +
    "    <!--Payment method section-->\n" +
    "    <div class=\"settings__box__section--50\">\n" +
    "\n" +
    "        <!-- Title -->\n" +
    "        <h1 class=\"settings__title\">Update payment method</h1>\n" +
    "\n" +
    "        <!-- Update payment method form -->\n" +
    "        <form name=\"updatePaymentMethodForm\" ng-submit=\"updatePaymentMethod()\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Flash messages. -->\n" +
    "            <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': updatePaymentMethodForm.$submitted && (updatePaymentMethodForm.cardNumber.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>Credit Card Number</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"4111 1111 1111 1111\" name=\"cardNumber\" ng-model=\"paymentData.cardNumber\" payments-format=\"card\" payments-validate=\"card\" auto-focus required />\n" +
    "\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message\" ng-class=\"{'has-error': updatePaymentMethodForm.cardNumber.$invalid && updatePaymentMethodForm.$submitted}\" ng-messages=\"updatePaymentMethodForm.cardNumber.$error\" ng-if=\"updatePaymentMethodForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please enter your card number.</div>\n" +
    "                    <div ng-message=\"parse\">Please enter a valid card number.</div>\n" +
    "                    <div ng-message=\"card\">Please enter a valid card number.</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': updatePaymentMethodForm.$submitted && (updatePaymentMethodForm.cardExpirationDate.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>Expiration</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"10 / 2018\" name=\"cardExpirationDate\" ng-model=\"paymentData.cardExpirationDate\" payments-format=\"expiry\" payments-validate=\"expiry\" required />\n" +
    "\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message\" ng-class=\"{'has-error': updatePaymentMethodForm.cardExpirationDate.$invalid && updatePaymentMethodForm.$submitted}\" ng-messages=\"updatePaymentMethodForm.cardExpirationDate.$error\" ng-if=\"updatePaymentMethodForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please enter card expiration date.</div>\n" +
    "                    <div ng-message=\"parse\">Please enter a valid expiration date.</div>\n" +
    "                    <div ng-message=\"expiry\">Please enter a valid expiration date.</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Updating...' : 'Update payment'}}</button>\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.preferences.abstract.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.preferences.abstract.html",
    "<div class=\"settings__box\" ui-view=\"updateCurrency\"></div>");
}]);

angular.module("app/settings/partials/settings.preferences.updateCurrency.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.preferences.updateCurrency.html",
    "<div class=\"settings__box__section--100\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"settings__title\">Change your currency</h1>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <form name=\"preferencesForm\" ng-submit=\"updatePreferences()\" novalidate>\n" +
    "\n" +
    "        <div class=\"settings__preferences__section\">\n" +
    "\n" +
    "            <div class=\"currency-select\" ng-class=\"{'has-error': preferencesForm.$submitted && (preferencesForm.currency.$invalid || badPostSubmitResponse)}\">\n" +
    "\n" +
    "                <ui-select name=\"currency\" class=\"currency-select__input\" required ng-model=\"currency.selected\" theme=\"selectize\">\n" +
    "                    <ui-select-match placeholder=\"Start typing your currency...\">{{$select.selected.displayName}} - {{$select.selected.symbol}}</ui-select-match>\n" +
    "                    <ui-select-choices repeat=\"currencyEntry in currencies | orderObjectBy : 'displayName' : false | filter:{$:$select.search} track by currencyEntry.numericCode\">\n" +
    "                        <span ng-bind-html=\"currencyEntry.displayName | highlight: $select.search\"></span>\n" +
    "                        <span>-</span>\n" +
    "                        <span ng-bind-html=\"currencyEntry.symbol | highlight: $select.search\"></span>\n" +
    "                    </ui-select-choices>\n" +
    "                </ui-select>\n" +
    "\n" +
    "                <!-- Error messages -->\n" +
    "                <div class=\"form-group-input__message form-group-input__message--currency\" ng-class=\"{'has-error': preferencesForm.category.$invalid && expenseForm.$submitted}\" ng-messages=\"preferencesForm.$error\" ng-if=\"preferencesForm.$submitted\">\n" +
    "                    <div ng-message=\"required\">Please add a currency.</div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <!-- Button -->\n" +
    "        <button class=\"settings__btn__save\" type=\"submit\">{{isSaving ? 'Saving...' : 'Save changes'}}</button>\n" +
    "    </form>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/settings/partials/settings.profile.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/settings/partials/settings.profile.html",
    "<!-- Profile section -->\n" +
    "<div class=\"settings__box\">\n" +
    "\n" +
    "    <!-- Title -->\n" +
    "    <h1 class=\"settings__title\">Edit profile</h1>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Update profile section-->\n" +
    "    <div class=\"settings__box__section--50\">\n" +
    "\n" +
    "        <!-- Profile form -->\n" +
    "        <form name=\"profileForm\" ng-submit=\"updateProfile(profileData)\" novalidate focus-first-error>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': profileForm.$submitted && (loginForm.firstName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>First Name</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"First name\" name=\"firstName\" ng-model=\"profileData.firstName\" required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"profileForm.firstName.$invalid && profileForm.$submitted\">Please tell us your First Name.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\" ng-class=\"{'has-error': profileForm.$submitted && (profileForm.lastName.$invalid || badPostSubmitResponse)}\">\n" +
    "                <label>Last Name</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Last name\" name=\"lastName\" ng-model=\"profileData.lastName\" required />\n" +
    "                <span class=\"form-group-input__message\" ng-if=\"profileForm.lastName.$invalid && profileForm.$submitted\">Please tell us your Last Name.</span>\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Form group -->\n" +
    "            <div class=\"form-group-input\">\n" +
    "                <label>Email</label>\n" +
    "                <input class=\"form-group-input__input\" type=\"text\" placeholder=\"Email\" name=\"email\" ng-value=\"user.model.email\" disabled />\n" +
    "            </div>\n" +
    "\n" +
    "            <!-- Button container -->\n" +
    "            <button class=\"settings__btn__save\" type=\"submit\">{{isRequestPending ? 'Saving..' : 'Save changes'}}</button>\n" +
    "\n" +
    "        </form>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"settings__box__section--50 settings__profile__avatar\">\n" +
    "        <img class=\"settings__profile__avatar--picture\" gravatar-src=\"'{{currentUser.model.email}}'\" />\n" +
    "        <div class=\"settings__profile__avatar--src\">Synced from Gravatar</div>\n" +
    "    </div>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/insight/partials/insight.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/insight/partials/insight.html",
    "<div header class=\"view-container__header\"></div>\n" +
    "\n" +
    "<div class=\"view-container__content\">\n" +
    "\n" +
    "    <!--Trial period countdown-->\n" +
    "    <div ng-if=\"currentUser.showTrialRemainingDays()\">\n" +
    "        <div ng-include src=\"'app/account/partials/trial_period_countdown.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!--Account confirmation alert-->\n" +
    "    <div ng-if=\"! currentUser.model.emailConfirmed\" ng-controller=\"EmailConfirmationSendController\">\n" +
    "        <div ng-include src=\"'app/account/partials/email_confirmation_send_send.html'\"></div>\n" +
    "    </div>\n" +
    "\n" +
    "    <!-- Flash messages. -->\n" +
    "    <div flash-messages flash=\"flash\" identifier-id=\"{{alertIdentifierId}}\"></div>\n" +
    "\n" +
    "    <!--Empty state if no expenses overall-->\n" +
    "    <div class=\"insights__empty-state\" ng-if=\"insight.model.totalNumberOfTransactions === 0\">\n" +
    "        <div class=\"insights__empty-state__icon\"></div>\n" +
    "        <h1>No data yet.</h1>\n" +
    "\n" +
    "        <div>Add some expenses to get insights.</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"insight.model.totalNumberOfTransactions !== 0\">\n" +
    "        <!-- Insight fetch form -->\n" +
    "        <div class=\"insights__controls\">\n" +
    "\n" +
    "            <form name=\"insightForm\" class=\"insights__controls__form\" ng-submit=\"submitLoadInsight()\" novalidate>\n" +
    "\n" +
    "                <!-- Select prev month -->\n" +
    "                <button type=\"button\" class=\"insights__controls__form__arrow icon-chevron-left\" ng-disabled=\"isLoading || ! canLoadPrevMonth()\" ng-click=\"prevMonth()\"></button>\n" +
    "\n" +
    "                <div class=\"insights__controls__form__month\" ng-class=\"{'has-error': insightForm.spentDate.$invalid && insightForm.$submitted}\">\n" +
    "\n" +
    "                    <!--Hidden input of the insight chosen date-->\n" +
    "                    <input type=\"hidden\" name=\"spentDate\" ng-model=\"insightData.spentDate\" required valid-date />\n" +
    "\n" +
    "                    <!--insight date picker-->\n" +
    "                    <div class=\"insight__form__date__input\">\n" +
    "                        <button type=\"button\"\n" +
    "                                class=\"insight__form__date__input__btn\"\n" +
    "                                ng-click=\"openDatePicker($event)\"\n" +
    "                                ng-model=\"insightData.spentDate\"\n" +
    "                                datepicker-popup\n" +
    "                                is-open=\"datePickerOpened\"\n" +
    "                                ng-change=\"onChange()\"\n" +
    "                                ng-disabled=\"isLoading\"\n" +
    "                                min-date=\"datePickerMinDate\"\n" +
    "                                max-date=\"datePickerMaxDate\"\n" +
    "                                datepicker-mode=\"'month'\" min-mode=\"month\"\n" +
    "                                show-button-bar=\"false\"\n" +
    "                                datepicker-options=\"{minMode: 'month',datepickerMode: 'month'}\">{{isLoading ? 'Loading'\n" +
    "                            : (insightData.spentDate | friendlyMonthDate)}}\n" +
    "                        </button>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <!--Error messages-->\n" +
    "                    <div class=\"form-group-input__message\" ng-class=\"{'has-error': insightForm.spentDate.$invalid && insightForm.$submitted}\" ng-messages=\"insightForm.$error\" ng-if=\"insightForm.$submitted\">\n" +
    "                        <div ng-message=\"required\">Please add a date.</div>\n" +
    "                        <div ng-message=\"validDate\">Date should be in the past.</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "\n" +
    "                <!-- Select next month -->\n" +
    "                <button type=\"button\" class=\"insights__controls__form__arrow icon-chevron-right\" ng-disabled=\"isLoading || ! canLoadNextMonth()\" ng-click=\"nextMonth()\"></button>\n" +
    "\n" +
    "            </form>\n" +
    "\n" +
    "            <div class=\"insights__controls__chart-toggle\">\n" +
    "                <a ng-class=\"{'insights__chart--active': activeChart === INSIGHTS_CHARTS.BAR}\" href=\"javascript:void(0)\" ng-click=\"setActiveChart(INSIGHTS_CHARTS.BAR)\">Bar</a>\n" +
    "                <a ng-class=\"{'insights__chart--active': activeChart === INSIGHTS_CHARTS.DOUGHNUT}\" href=\"javascript:void(0)\" ng-click=\"setActiveChart(INSIGHTS_CHARTS.DOUGHNUT)\">Pie</a>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "        <!--Empty state if no expenses for current month-->\n" +
    "        <div class=\"insights__empty-state\" ng-if=\"insight.model.numberOfTransactions === 0\">\n" +
    "            <div class=\"insights__empty-state__icon\"></div>\n" +
    "            <h1>No expenses on this month yet.</h1>\n" +
    "\n" +
    "            <div>You'll get some insights here.</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div ng-show=\"insight.model.numberOfTransactions !== 0\">\n" +
    "            <div class=\"insights__summary\">\n" +
    "                Hey, <span>{{currentUser.model.firstName}}</span>! In <span>{{(insightData.spentDate | friendlyMonthDate)}}</span>\n" +
    "                you've spent a total of <span>{{insight.model.totalAmountSpent | currency:user.model.currency.symbol}}</span>,\n" +
    "                which is <span>5% more</span> than the last month.\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"activeChart === INSIGHTS_CHARTS.BAR\" class=\"insights__chart__bar\">\n" +
    "                <canvas id=\"bar\"\n" +
    "                        class=\"chart chart-bar\"\n" +
    "                        data=\"insightLineData\"\n" +
    "                        series=\"insightLineSeries\"\n" +
    "                        legend=\"false\"\n" +
    "                        options=\"chartOptions\"\n" +
    "                        labels=\"insight.model.insightLabels\">\n" +
    "                </canvas>\n" +
    "            </div>\n" +
    "\n" +
    "            <div ng-if=\"activeChart === INSIGHTS_CHARTS.DOUGHNUT\" class=\"insights__chart__doughnut\">\n" +
    "                <canvas class=\"chart chart-doughnut\"\n" +
    "                        data=\"insight.model.insightData\"\n" +
    "                        labels=\"insight.model.insightLabels\"\n" +
    "                        legend=\"true\"\n" +
    "                        options=\"chartOptions\"\n" +
    "                        colours=\"insight.model.insightColors\">\n" +
    "                </canvas>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"insights__summary\">\n" +
    "                You had a total of <span>{{insight.model.numberOfTransactions}} transactions</span>, in\n" +
    "                <span>{{insight.model.totalPerCategoryInsightDTOs.length}} categories</span>.\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"insights__table\">\n" +
    "                <table>\n" +
    "                    <thead class=\"insights__table__header\">\n" +
    "                    <tr class=\"\">\n" +
    "                        <td>TOTAL</td>\n" +
    "                        <td class=\"insights__table__amount\">{{insight.model.totalAmountSpent | currency:user.model.currency.symbol}}<span>{{user.model.currency.currencyCode}}</span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    </thead>\n" +
    "                    <tbody>\n" +
    "                    <tr ng-repeat=\"totalPerCategory in insight.model.totalPerCategoryInsightDTOs\">\n" +
    "                        <td class=\"insights__table__category\">\n" +
    "                            <span class=\"insights__table__category__color\" ng-style=\"{'background':totalPerCategory.categoryDTO.color.color}\">C</span>\n" +
    "                            {{totalPerCategory.categoryDTO.name}}\n" +
    "                        </td>\n" +
    "                        <td class=\"insights__table__amount\">{{totalPerCategory.totalAmount | currency:user.model.currency.symbol}}<span>{{user.model.currency.currencyCode}}</span>\n" +
    "                        </td>\n" +
    "                    </tr>\n" +
    "                    </tbody>\n" +
    "                </table>\n" +
    "            </div>\n" +
    "\n" +
    "        </div>\n" +
    "\n" +
    "    </div>\n" +
    "\n" +
    "</div>\n" +
    "\n" +
    "<div footer class=\"view-container__footer\"></div>");
}]);

angular.module("app/feedback/partials/feedback-modal.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/feedback/partials/feedback-modal.html",
    "<form name=\"feedbackForm\" ng-submit=\"sendFeedbackAndClose(feedbackForm)\" novalidate focus-first-error>\n" +
    "\n" +
    "    <div class=\"feedback-modal__header\">Tell us something</div>\n" +
    "\n" +
    "    <div class=\"feedback-modal__form__close\">\n" +
    "        <button type=\"button\" class=\"close\" ng-click=\"dismissFeedbackModal()\" aria-label=\"Close\">\n" +
    "            <span aria-hidden=\"true\">×</span>\n" +
    "        </button>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"! isSending && ! isSent\">\n" +
    "        <div class=\"form-group form-group-input\" ng-class=\"{'has-error': feedbackForm.subject.$invalid && feedbackForm.$submitted}\">\n" +
    "            <input class=\"form-control\" type=\"text\" name=\"subject\" ng-model=\"feedback.model.subject\" placeholder=\"Subject\" required />\n" +
    "        </div>\n" +
    "        <div class=\"form-group\" ng-class=\"{'has-error': feedbackForm.message.$invalid && feedbackForm.$submitted}\">\n" +
    "            <textarea class=\"form-control\" rows=\"6\" name=\"message\" ng-model=\"feedback.model.message\" placeholder=\"Your message\" required></textarea>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSending\">\n" +
    "        <div class=\"sending-status\">Sending your message...</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-body\" ng-if=\"isSent\">\n" +
    "        <div class=\"sending-status\">Thanks! We'll get back to you.</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"modal-footer\">\n" +
    "        <button class=\"modal-footer__cancelbtn\" type=\"button\" ng-click=\"dismissFeedbackModal()\">Cancel</button>\n" +
    "        <button class=\"modal-footer__sendbtn\" type=\"submit\" ng-disabled=\"isSending || isSent\">Send</button>\n" +
    "    </div>\n" +
    "\n" +
    "</form>");
}]);

angular.module("app/common/partials/flash-messages.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/flash-messages.html",
    "<!-- Flash messages. -->\n" +
    "<div ng-attr-id=\"{{ identifierId }}\" flash-alert active-class=\"in alert\" class=\"alert--center fade\" duration=\"0\">\n" +
    "    <span class=\"close\" ng-click=\"hide()\">&times;</span>\n" +
    "    <span class=\"alert-message\">{{flash.message}}</span>\n" +
    "</div>");
}]);

angular.module("app/common/partials/footer-home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/footer-home.html",
    "<footer class=\"footer\">\n" +
    "    <div class=\"footer__wrapper\">\n" +
    "        <div class=\"footer__logo\">\n" +
    "            Revaluate.\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"footer__links\">\n" +
    "            <li>Follow us on <a href=\"https://twitter.com/revaluateapp\" target=\"_blank\">Twitter</a></li>\n" +
    "            <li>Follow us on <a href=\"https://instagram.com/revaluateapp\" target=\"_blank\">Instagram</a></li>\n" +
    "            <li>Like us on <a href=\"https://www.facebook.com/revaluateapp\" target=\"_blank\">Facebook</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</footer>");
}]);

angular.module("app/common/partials/footer.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/footer.html",
    "<footer class=\"footer\">\n" +
    "    <div class=\"footer__wrapper\">\n" +
    "        <div class=\"footer__logo\">\n" +
    "            Revaluate.\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"footer__links\">\n" +
    "            <li>Follow us on <a href=\"https://twitter.com/revaluateapp\" target=\"_blank\">Twitter</a></li>\n" +
    "            <li>Follow us on <a href=\"https://instagram.com/revaluateapp\" target=\"_blank\">Instagram</a></li>\n" +
    "            <li>Like us on <a href=\"https://www.facebook.com/revaluateapp\" target=\"_blank\">Facebook</a></li>\n" +
    "        </ul>\n" +
    "    </div>\n" +
    "</footer>");
}]);

angular.module("app/common/partials/header-home.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header-home.html",
    "<div class=\"header-home__wrapper\">\n" +
    "\n" +
    "    <header class=\"header-home\">\n" +
    "\n" +
    "        <div class=\"header-home__brand\">\n" +
    "            <div class=\"header-home__brand--logo\">Logo</div>\n" +
    "            <a class=\"header-home__brand--name\" href=\"javascript:void(0)\" ui-sref=\"home\">Revaluate</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"header-home__navigation\">\n" +
    "            <li><a href=\"javascript:void(0)\" ui-sref=\"pricing\">Pricing</a></li>\n" +
    "            <li><a href=\"javascript:void(0)\">Contact</a></li>\n" +
    "            <li>\n" +
    "                <button class=\"header-home__navigation--btn\" account-modal-toggle=\"login\">Log in</button>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "    </header>\n" +
    "\n" +
    "</div>");
}]);

angular.module("app/common/partials/header.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/header.html",
    "<div class=\"header__wrapper\">\n" +
    "    <header class=\"header\">\n" +
    "\n" +
    "        <div class=\"header__brand\">\n" +
    "            <a href=\"javascript:void(0)\" class=\"header__brand--name\">Revaluate</a>\n" +
    "        </div>\n" +
    "\n" +
    "        <ul class=\"header__navigation\">\n" +
    "            <li ui-sref-active=\"header__navigation--active\">\n" +
    "                <a href=\"javascript:void(0)\" ui-sref=\"expenses.regular\">Wallet</a>\n" +
    "            </li>\n" +
    "            <li ui-sref-active=\"header__navigation--active\">\n" +
    "                <a href=\"javascript:void(0)\" ui-sref=\"insights\">Insights</a>\n" +
    "            </li>\n" +
    "            <li ui-sref-active=\"header__navigation--active\">\n" +
    "                <a href=\"javascript:void(0)\">Goals</a>\n" +
    "                <span>Coming soon!</span>\n" +
    "            </li>\n" +
    "        </ul>\n" +
    "\n" +
    "        <div class=\"dropdown header__dropdown\" dropdown is-open=\"status.isopen\">\n" +
    "            <button class=\"dropdown-toggle header__dropdown__toggle\" ng-show=\"currentUser.model.firstName + currentUser.model.lastName\" dropdown-toggle data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">\n" +
    "                <img class=\"header__dropdown__avatar\" gravatar-src=\"'{{currentUser.model.email}}'\" />\n" +
    "                {{currentUser.model.firstName + \" \" + currentUser.model.lastName}}\n" +
    "                <span class=\"caret\"></span>\n" +
    "            </button>\n" +
    "            <ul class=\"dropdown-menu header__dropdown__menu\" role=\"menu\">\n" +
    "                <li><a href=\"javascript:void(0)\" ui-sref=\"settings.profile\">Preferences</a></li>\n" +
    "                <li>\n" +
    "                    <a href=\"javascript:void(0)\" id=\"feedback-trigger\" ng-controller=\"FeedbackModalController\" ng-click=\"openFeedbackModal()\">Send feedback</a>\n" +
    "                </li>\n" +
    "                <li><a href=\"javascript:void(0)\" ui-sref=\"account:logout\">Logout</a></li>\n" +
    "            </ul>\n" +
    "        </div>\n" +
    "\n" +
    "    </header>\n" +
    "</div>");
}]);

angular.module("app/common/partials/inline.confirmation.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/inline.confirmation.html",
    "<!--Show content-->\n" +
    "<div ng-if=\"showContent\">\n" +
    "\n" +
    "    <!--Message-->\n" +
    "    <div class=\"message\">{{message}}</div>\n" +
    "\n" +
    "    <button type=\"button\" ng-click=\"confirm();\">Ok</button>\n" +
    "    <button type=\"button\" ng-click=\"cancel();toggleContent();\">Cancel</button>\n" +
    "</div>\n" +
    "\n" +
    "<!--Transclude content-->\n" +
    "<div ng-transclude ng-if=\"! showContent\" ng-click=\"toggleContent()\"></div>");
}]);

angular.module("app/common/partials/timepickerPopup/timepickerPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("app/common/partials/timepickerPopup/timepickerPopup.html",
    "<button type=\"button\" class=\"btn btn--expense-popup bg-sprite dropdown-toggle\" animate animate-on=\"nlpDate:timeChange\" animate-class=\"highlight-button\" dropdown-toggle> {{date | friendlyHourTimePicker}}</button>\n" +
    "\n" +
    "<ul class=\"dropdown-menu dropdown-menu-time-picker\" perfect-scrollbar suppress-scroll-x=\"true\" wheel-speed=\"52\" update-on=\"perfectScrollbar:update\">\n" +
    "    <li ng-repeat=\"time in times\" ng-class=\"{selected: highlightSelected && time.index == selectedIndex}\">\n" +
    "        <a href ng-click=\"setTime(time)\">{{time.timestamp | friendlyHourTimePicker}}</a>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/accordion/accordion-group.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion-group.html",
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h4 class=\"panel-title\">\n" +
    "      <a href class=\"accordion-toggle\" ng-click=\"toggleOpen()\" accordion-transclude=\"heading\"><span ng-class=\"{'text-muted': isDisabled}\">{{heading}}</span></a>\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <div class=\"panel-collapse\" collapse=\"!isOpen\">\n" +
    "	  <div class=\"panel-body\" ng-transclude></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/accordion/accordion.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/accordion/accordion.html",
    "<div class=\"panel-group\" ng-transclude></div>");
}]);

angular.module("template/alert/alert.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/alert/alert.html",
    "<div class=\"alert\" ng-class=\"['alert-' + (type || 'warning'), closeable ? 'alert-dismissable' : null]\" role=\"alert\">\n" +
    "    <button ng-show=\"closeable\" type=\"button\" class=\"close\" ng-click=\"close()\">\n" +
    "        <span aria-hidden=\"true\">&times;</span>\n" +
    "        <span class=\"sr-only\">Close</span>\n" +
    "    </button>\n" +
    "    <div ng-transclude></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/carousel.html",
    "<div ng-mouseenter=\"pause()\" ng-mouseleave=\"play()\" class=\"carousel\" ng-swipe-right=\"prev()\" ng-swipe-left=\"next()\">\n" +
    "    <ol class=\"carousel-indicators\" ng-show=\"slides.length > 1\">\n" +
    "        <li ng-repeat=\"slide in slides track by $index\" ng-class=\"{active: isActive(slide)}\" ng-click=\"select(slide)\"></li>\n" +
    "    </ol>\n" +
    "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
    "    <a class=\"left carousel-control\" ng-click=\"prev()\" ng-show=\"slides.length > 1\"><span class=\"glyphicon glyphicon-chevron-left\"></span></a>\n" +
    "    <a class=\"right carousel-control\" ng-click=\"next()\" ng-show=\"slides.length > 1\"><span class=\"glyphicon glyphicon-chevron-right\"></span></a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/slide.html",
    "<div ng-class=\"{\n" +
    "    'active': leaving || (active && !entering),\n" +
    "    'prev': (next || active) && direction=='prev',\n" +
    "    'next': (next || active) && direction=='next',\n" +
    "    'right': direction=='prev',\n" +
    "    'left': direction=='next'\n" +
    "  }\" class=\"item text-center\" ng-transclude></div>\n" +
    "");
}]);

angular.module("template/datepicker/datepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/datepicker.html",
    "<div ng-switch=\"datepickerMode\" role=\"application\" ng-keydown=\"keydown($event)\">\n" +
    "  <daypicker ng-switch-when=\"day\" tabindex=\"0\"></daypicker>\n" +
    "  <monthpicker ng-switch-when=\"month\" tabindex=\"0\"></monthpicker>\n" +
    "  <yearpicker ng-switch-when=\"year\" tabindex=\"0\"></yearpicker>\n" +
    "</div>");
}]);

angular.module("template/datepicker/day.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/day.html",
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"{{5 + showWeeks}}\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "    <tr>\n" +
    "      <th ng-show=\"showWeeks\" class=\"text-center\"></th>\n" +
    "      <th ng-repeat=\"label in labels track by $index\" class=\"text-center\"><small aria-label=\"{{label.full}}\">{{label.abbr}}</small></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-show=\"showWeeks\" class=\"text-center h6\"><em>{{ weekNumbers[$index] }}</em></td>\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default btn-sm\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-muted': dt.secondary, 'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/month.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/month.html",
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/datepicker/popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/popup.html",
    "<ul class=\"dropdown-menu\" ng-style=\"{display: (isOpen && 'block') || 'none', top: position.top+'px', left: position.left+'px'}\" ng-keydown=\"keydown($event)\">\n" +
    "	<li ng-transclude></li>\n" +
    "	<li ng-if=\"showButtonBar\" style=\"padding:10px 9px 2px\">\n" +
    "		<span class=\"btn-group pull-left\">\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-info\" ng-click=\"select('today')\">{{ getText('current') }}</button>\n" +
    "			<button type=\"button\" class=\"btn btn-sm btn-danger\" ng-click=\"select(null)\">{{ getText('clear') }}</button>\n" +
    "		</span>\n" +
    "		<button type=\"button\" class=\"btn btn-sm btn-success pull-right\" ng-click=\"close()\">{{ getText('close') }}</button>\n" +
    "	</li>\n" +
    "</ul>\n" +
    "");
}]);

angular.module("template/datepicker/year.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/datepicker/year.html",
    "<table role=\"grid\" aria-labelledby=\"{{uniqueId}}-title\" aria-activedescendant=\"{{activeDateId}}\">\n" +
    "  <thead>\n" +
    "    <tr>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-left\" ng-click=\"move(-1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-left\"></i></button></th>\n" +
    "      <th colspan=\"3\"><button id=\"{{uniqueId}}-title\" role=\"heading\" aria-live=\"assertive\" aria-atomic=\"true\" type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"toggleMode()\" tabindex=\"-1\" style=\"width:100%;\"><strong>{{title}}</strong></button></th>\n" +
    "      <th><button type=\"button\" class=\"btn btn-default btn-sm pull-right\" ng-click=\"move(1)\" tabindex=\"-1\"><i class=\"glyphicon glyphicon-chevron-right\"></i></button></th>\n" +
    "    </tr>\n" +
    "  </thead>\n" +
    "  <tbody>\n" +
    "    <tr ng-repeat=\"row in rows track by $index\">\n" +
    "      <td ng-repeat=\"dt in row track by dt.date\" class=\"text-center\" role=\"gridcell\" id=\"{{dt.uid}}\" aria-disabled=\"{{!!dt.disabled}}\">\n" +
    "        <button type=\"button\" style=\"width:100%;\" class=\"btn btn-default\" ng-class=\"{'btn-info': dt.selected, active: isActive(dt)}\" ng-click=\"select(dt.date)\" ng-disabled=\"dt.disabled\" tabindex=\"-1\"><span ng-class=\"{'text-info': dt.current}\">{{dt.label}}</span></button>\n" +
    "      </td>\n" +
    "    </tr>\n" +
    "  </tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/modal/backdrop.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/backdrop.html",
    "<div class=\"modal-backdrop fade {{ backdropClass }}\"\n" +
    "     ng-class=\"{in: animate}\"\n" +
    "     ng-style=\"{'z-index': 1040 + (index && 1 || 0) + index*10}\"\n" +
    "></div>\n" +
    "");
}]);

angular.module("template/modal/window.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/modal/window.html",
    "<div tabindex=\"-1\" role=\"dialog\" class=\"modal fade\" ng-class=\"{in: animate}\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\" ng-click=\"close($event)\">\n" +
    "    <div class=\"modal-dialog\" ng-class=\"{'modal-sm': size == 'sm', 'modal-lg': size == 'lg'}\"><div class=\"modal-content\" modal-transclude></div></div>\n" +
    "</div>");
}]);

angular.module("template/pagination/pager.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pager.html",
    "<ul class=\"pager\">\n" +
    "  <li ng-class=\"{disabled: noPrevious(), previous: align}\"><a href ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
    "  <li ng-class=\"{disabled: noNext(), next: align}\"><a href ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
    "</ul>");
}]);

angular.module("template/pagination/pagination.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/pagination/pagination.html",
    "<ul class=\"pagination\">\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(1)\">{{getText('first')}}</a></li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noPrevious()}\"><a href ng-click=\"selectPage(page - 1)\">{{getText('previous')}}</a></li>\n" +
    "  <li ng-repeat=\"page in pages track by $index\" ng-class=\"{active: page.active}\"><a href ng-click=\"selectPage(page.number)\">{{page.text}}</a></li>\n" +
    "  <li ng-if=\"directionLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(page + 1)\">{{getText('next')}}</a></li>\n" +
    "  <li ng-if=\"boundaryLinks\" ng-class=\"{disabled: noNext()}\"><a href ng-click=\"selectPage(totalPages)\">{{getText('last')}}</a></li>\n" +
    "</ul>");
}]);

angular.module("template/popover/popover.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/popover/popover.html",
    "<div class=\"popover {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"arrow\"></div>\n" +
    "\n" +
    "  <div class=\"popover-inner\">\n" +
    "      <h3 class=\"popover-title\" ng-bind=\"title\" ng-show=\"title\"></h3>\n" +
    "      <div class=\"popover-content\" ng-bind=\"content\"></div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/progressbar/bar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/bar.html",
    "<div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>");
}]);

angular.module("template/progressbar/progress.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/progress.html",
    "<div class=\"progress\" ng-transclude></div>");
}]);

angular.module("template/progressbar/progressbar.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/progressbar/progressbar.html",
    "<div class=\"progress\">\n" +
    "  <div class=\"progress-bar\" ng-class=\"type && 'progress-bar-' + type\" role=\"progressbar\" aria-valuenow=\"{{value}}\" aria-valuemin=\"0\" aria-valuemax=\"{{max}}\" ng-style=\"{width: percent + '%'}\" aria-valuetext=\"{{percent | number:0}}%\" ng-transclude></div>\n" +
    "</div>");
}]);

angular.module("template/rating/rating.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/rating/rating.html",
    "<span ng-mouseleave=\"reset()\" ng-keydown=\"onKeydown($event)\" tabindex=\"0\" role=\"slider\" aria-valuemin=\"0\" aria-valuemax=\"{{range.length}}\" aria-valuenow=\"{{value}}\">\n" +
    "    <i ng-repeat=\"r in range track by $index\" ng-mouseenter=\"enter($index + 1)\" ng-click=\"rate($index + 1)\" class=\"glyphicon\" ng-class=\"$index < value && (r.stateOn || 'glyphicon-star') || (r.stateOff || 'glyphicon-star-empty')\">\n" +
    "        <span class=\"sr-only\">({{ $index < value ? '*' : ' ' }})</span>\n" +
    "    </i>\n" +
    "</span>");
}]);

angular.module("template/tabs/tab.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tab.html",
    "<li ng-class=\"{active: active, disabled: disabled}\">\n" +
    "  <a href ng-click=\"select()\" tab-heading-transclude>{{heading}}</a>\n" +
    "</li>\n" +
    "");
}]);

angular.module("template/tabs/tabset.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tabs/tabset.html",
    "<div>\n" +
    "  <ul class=\"nav nav-{{type || 'tabs'}}\" ng-class=\"{'nav-stacked': vertical, 'nav-justified': justified}\" ng-transclude></ul>\n" +
    "  <div class=\"tab-content\">\n" +
    "    <div class=\"tab-pane\" \n" +
    "         ng-repeat=\"tab in tabs\" \n" +
    "         ng-class=\"{active: tab.active}\"\n" +
    "         tab-content-transclude=\"tab\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/timepicker/timepicker.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/timepicker/timepicker.html",
    "<table>\n" +
    "	<tbody>\n" +
    "		<tr class=\"text-center\">\n" +
    "			<td><a ng-click=\"incrementHours()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "			<td>&nbsp;</td>\n" +
    "			<td><a ng-click=\"incrementMinutes()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-up\"></span></a></td>\n" +
    "			<td ng-show=\"showMeridian\"></td>\n" +
    "		</tr>\n" +
    "		<tr>\n" +
    "			<td style=\"width:50px;\" class=\"form-group\" ng-class=\"{'has-error': invalidHours}\">\n" +
    "				<input type=\"text\" ng-model=\"hours\" ng-change=\"updateHours()\" class=\"form-control text-center\" ng-mousewheel=\"incrementHours()\" ng-readonly=\"readonlyInput\" maxlength=\"2\">\n" +
    "			</td>\n" +
    "			<td>:</td>\n" +
    "			<td style=\"width:50px;\" class=\"form-group\" ng-class=\"{'has-error': invalidMinutes}\">\n" +
    "				<input type=\"text\" ng-model=\"minutes\" ng-change=\"updateMinutes()\" class=\"form-control text-center\" ng-readonly=\"readonlyInput\" maxlength=\"2\">\n" +
    "			</td>\n" +
    "			<td ng-show=\"showMeridian\"><button type=\"button\" class=\"btn btn-default text-center\" ng-click=\"toggleMeridian()\">{{meridian}}</button></td>\n" +
    "		</tr>\n" +
    "		<tr class=\"text-center\">\n" +
    "			<td><a ng-click=\"decrementHours()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "			<td>&nbsp;</td>\n" +
    "			<td><a ng-click=\"decrementMinutes()\" class=\"btn btn-link\"><span class=\"glyphicon glyphicon-chevron-down\"></span></a></td>\n" +
    "			<td ng-show=\"showMeridian\"></td>\n" +
    "		</tr>\n" +
    "	</tbody>\n" +
    "</table>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-html-unsafe-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-html-unsafe-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" bind-html-unsafe=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/tooltip/tooltip-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/tooltip/tooltip-popup.html",
    "<div class=\"tooltip {{placement}}\" ng-class=\"{ in: isOpen(), fade: animation() }\">\n" +
    "  <div class=\"tooltip-arrow\"></div>\n" +
    "  <div class=\"tooltip-inner\" ng-bind=\"content\"></div>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/typeahead/typeahead-match.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-match.html",
    "<a tabindex=\"-1\" bind-html-unsafe=\"match.label | typeaheadHighlight:query\"></a>");
}]);

angular.module("template/typeahead/typeahead-popup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/typeahead/typeahead-popup.html",
    "<ul class=\"dropdown-menu\" ng-show=\"isOpen()\" ng-style=\"{top: position.top+'px', left: position.left+'px'}\" style=\"display: block;\" role=\"listbox\" aria-hidden=\"{{!isOpen()}}\">\n" +
    "    <li ng-repeat=\"match in matches track by $index\" ng-class=\"{active: isActive($index) }\" ng-mouseenter=\"selectActive($index)\" ng-click=\"selectMatch($index)\" role=\"option\" id=\"{{match.id}}\">\n" +
    "        <div typeahead-match index=\"$index\" match=\"match\" query=\"query\" template-url=\"templateUrl\"></div>\n" +
    "    </li>\n" +
    "</ul>\n" +
    "");
}]);
