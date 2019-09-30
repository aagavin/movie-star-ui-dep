SENDGRID_API_KEY=${SENDGRID_API_KEY:-default}
ls
pwd
CONTENT = $(base64 ./android/app/build/outputs/apk/debug/app-debug.apk)

curl --request POST \
	--url https://api.sendgrid.com/v3/mail/send \
	--header 'authorization: Bearer ${SENDGRID_API_KEY}' \
	--header 'content-type: application/json' \
	--data '{
	"personalizations": [
		{
			"to": [
				{
					"email": "${TO_SENDGRID_EMAIL}"
				}
			]
		}
	],
	"from": {
		"email": "${FROM_SENDGRID_EMAIL}"
	},
	"subject": "new APK",
	"content": [
		{
			"type": "text/plain",
			"value": "new APK test file"
		}
	],
	"attachments": [{"content": "${CONTENT}", "filename": "app-debug.apk"}]
}'
