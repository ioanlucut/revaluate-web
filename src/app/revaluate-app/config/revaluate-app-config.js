angular.module("config", [])

.constant("ENV", {
	"name": "development",
	"apiEndpoint": "https://revaluate-api-dev.herokuapp.com",
	"mixPanelId": "216177bcdddef0cf2edd1650e63a3449",
	"intercomAppId": "z2mfyywv",
	"cacheResetKey": "a1jonsnow",
	"OAUTH2_CLIENT_IDS": {
		"FACEBOOK": "943425629012054",
		"GOOGLE": "997617697610-sl7dselm1osn67p84ks5vvupbui2nhlb.apps.googleusercontent.com",
		"SLACK": "2151987168.10687444405"
	},
	"redirectUri": "http://dev.revaluate.io",
	"frontEndUri": "http://dev.revaluate.io",
	"isProduction": false,
	"isMaintenanceMode": false,
	"AWS": {
		"params": {
			"Bucket": "revaluate-web-prod"
		},
		"accessKeyId": "AKIAJIPPTKHKJD2XFEBA",
		"secretAccessKey": "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",
		"distributionId": "E20NR4VDPE1BSZ",
		"region": "us-west-2"
	}
})

;
