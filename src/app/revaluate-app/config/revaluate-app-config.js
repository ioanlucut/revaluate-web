angular.module("config", [])

.constant("ENV", {
	"name": "development",
	"apiEndpoint": "https://revaluate-api-dev.herokuapp.com",
	"mixPanelId": "216177bcdddef0cf2edd1650e63a3449",
	"intercomAppId": "z2mfyywv",
	"cacheResetKey": "a1jonsnow",
	"OAUTH2_CLIENT_IDS": {
		"FACEBOOK": "933608719993745",
		"GOOGLE": "997617697610-sl7dselm1osn67p84ks5vvupbui2nhlb.apps.googleusercontent.com"
	},
	"isProduction": false
})

;