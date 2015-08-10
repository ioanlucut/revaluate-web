angular.module("config", [])

.constant("ENV", {
	"name": "local",
	"apiEndpoint": "http://localhost:8080",
	"mixPanelId": "216177bcdddef0cf2edd1650e63a3449",
	"intercomAppId": "c509geda",
	"cacheResetKey": "a2jonsnow",
	"OAUTH2_CLIENT_IDS": {
		"FACEBOOK": "933608719993745",
		"GOOGLE": "997617697610-sl7dselm1osn67p84ks5vvupbui2nhlb.apps.googleusercontent.com"
	},
	"redirectUri": "http://localhost:3000",
	"isProduction": false
})

;