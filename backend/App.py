import uuid
import requests
from io import BytesIO
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS
from backend.ImageProcessing import find_matching_face, send_telegram_message
from datetime import timedelta
from datetime import datetime
#import boto3
from Const import VISITOR_LOG_PATH,ALLOWED_EXTENSIONS,s3,bucket_name

app = Flask(__name__)
CORS(app)


# Endpoint to handle file uploads from user
@app.route('/files/upload', methods=['POST'])
def upload_file():
    if 'visitor_name' not in request.form:
        return jsonify({"error": "No visitor name provided"}), 400

    visitor_name = request.form['visitor_name']
    file = request.files['file']

    unique_id = uuid.uuid4().hex
    s3_key = f"Family/{visitor_name}/visitor_{unique_id}.jpg"

    # Upload to S3
    try:
        s3.upload_fileobj(file, bucket_name, s3_key)
        return jsonify({"message": f"File uploaded successfully to S3 as {s3_key}"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500



# Endpoint to list files for each family member in the S3 bucket
@app.route('/files/', methods=['GET'])
def list_files():
    try:
        response = s3.list_objects_v2(Bucket=bucket_name, Prefix="Family/") #Family is the directory name in s3
        family_files = {}

        if 'Contents' in response:
            for obj in response['Contents']:
                key = obj['Key']
                parts = key.split('/')
                if len(parts) > 2:
                    family_member = parts[1]
                    signed_url = s3.generate_presigned_url(
                        'get_object',
                        Params={'Bucket': bucket_name, 'Key': key},
                        ExpiresIn=timedelta(minutes=15).total_seconds()
                    )

                    if family_member not in family_files:
                        family_files[family_member] = []

                    family_files[family_member].append(signed_url)

        return jsonify({"family_files": family_files}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500





def allowed_file(filename):
    # Check if the file has an allowed extension
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def download_image_from_url(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        img = Image.open(BytesIO(response.content))
        return img
    except Exception as e:
        print(f"Failed to download image from {url}: {e}")
        return None


def log_visitor(visitor_name, match_name):
    """Logs visitor information with their arrival time and match status."""
    arrival_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')

    if match_name == "Unknown":
        log_entry = f"{arrival_time} - Unknown visitor arrived.\n"
    else:
        log_entry = f"{arrival_time} - Family member has arrived: {match_name}.\n"

    with open(VISITOR_LOG_PATH, 'a') as log_file:
        log_file.write(log_entry)

@app.route('/check', methods=['POST'])
def check():
    if 'file' not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files['file']
    visitor_name = request.form.get('visitor_name', 'Unknown Visitor')

    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file format. Please upload a .jpg, .jpeg, or .png file."}), 400

    # Load visitor image in memory
    visitor_img = Image.open(file)

    # Retrieve family files and download them in memory
    response, status_code = list_files()
    if status_code != 200:
        return jsonify({"error": "Failed to retrieve family files"}), 500

    family_files = response.get_json().get('family_files')
    local_family_images = {
        name: [download_image_from_url(url) for url in urls if download_image_from_url(url)]
        for name, urls in family_files.items()
    }

    local_family_images = {k: [img for img in v if img] for k, v in local_family_images.items()}
    match_name = find_matching_face(visitor_img, local_family_images)
    message = (
        f"We would like to inform you that {match_name} is currently waiting at the front entrance."
        if match_name != "Unknown" else "We would like to inform you that an unknown visitor is currently waiting at the front entrance."
    )

    log_visitor(visitor_name, match_name)
    send_telegram_message(message)
    return jsonify({"message": message}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, threaded=True)
