angular.module("config", [])

.constant("ENV", {
	"name": "development",
	"apiEndpoint": "https://revaluate-api-dev.herokuapp.com",
	"mixPanelId": "216177bcdddef0cf2edd1650e63a3449",
	"intercomAppId": "z2mfyywv",
	"OAUTH2_CLIENT_IDS": {
		"FACEBOOK": "933591903328760",
		"GOOGLE": ""
	},
	"isProduction": false
})

;