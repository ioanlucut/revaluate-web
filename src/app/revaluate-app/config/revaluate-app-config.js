angular.module("config", [])

.constant("ENV", {
	"name": "localhost",
	"apiEndpoint": "http://localhost:8080",
	"mixPanelId": "216177bcdddef0cf2edd1650e63a3449",
	"intercomAppId": "c509geda",
	"OAUTH2_CLIENT_IDS": {
		"FACEBOOK": "933591903328760",
		"GOOGLE": "997617697610-sl7dselm1osn67p84ks5vvupbui2nhlb.apps.googleusercontent.com"
	},
	"isProduction": false
})

;