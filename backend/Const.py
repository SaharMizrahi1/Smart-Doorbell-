
import boto3
#Replace the "XXX" with your personal tokens / names
#Telegram
TELEGRAM_TOKEN = "XXX"
CLIENT1_CHAT_ID = "XXX"
CLIENT2_CHAT_ID="XXX"
VISITOR_LOG_PATH = 'visitors_log.txt'
# Allowed extensions
ALLOWED_EXTENSIONS = {'jpg', 'jpeg', 'png'}
s3 = boto3.client('s3')
bucket_name = 'XXX'