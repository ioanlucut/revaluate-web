angular.module("config", [])

.constant("ENV", {
	"name": "production",
	"apiEndpoint": "https://revaluate-api-prod.herokuapp.com",
	"mixPanelId": "1e6d81ba283c1393b2dee527e165013f",
	"intercomAppId": "qy0w35xm",
	"cacheResetKey": "a3jonsnow",
	"OAUTH2_CLIENT_IDS": {
		"FACEBOOK": "933591903328760",
		"GOOGLE": "997617697610-sl7dselm1osn67p84ks5vvupbui2nhlb.apps.googleusercontent.com",
		"SLACK": "2151987168.10687444405"
	},
	"redirectUri": "https://www.revaluate.io",
	"isProduction": true,
	"isMaintenanceMode": false,
	"AWS": {
		"params": {
			"Bucket": "revaluate-web-prod"
		},
		"accessKeyId": "AKIAJIPPTKHKJD2XFEBA",
		"secretAccessKey": "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",
		"distributionId": "E20NR4VDPE1BSZ",
		"region": "us-west-2"
	},
	"CDN_DOMAIN": "d2l41wngd03v97.cloudfront.net"
})

;