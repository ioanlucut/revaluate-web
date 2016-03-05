--------------------------
module('revaluate.account')
import accountFormStateConstants from 'src/app/components/account/account/accountFormStateConstants'
import authEventsConstants from 'src/app/components/account/account/authEventsConstants'
import authModalConstants from 'src/app/components/account/account/authModalConstants'
import authUrlsConstants from 'src/app/components/account/account/authUrlsConstants'
import userSubscriptionStatusConstants from 'src/app/components/account/account/userSubscriptionStatusConstants'
import socialConnectConstants from 'src/app/components/account/socialConnect/socialConnectConstants'
--------------------------
module('revaluate.account')
.constant('ACCOUNT_FORM_STATE', accountFormStateConstants)
.constant('AUTH_EVENTS', authEventsConstants)
.constant('AUTH_MODAL', authModalConstants)
.constant('AUTH_URLS', authUrlsConstants)
.constant('USER_SUBSCRIPTION_STATUS', userSubscriptionStatusConstants)
.constant('OAUTH2_URLS', socialConnectConstants)
