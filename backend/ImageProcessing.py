from Const import CLIENT1_CHAT_ID,CLIENT2_CHAT_ID, TELEGRAM_TOKEN
import numpy as np
from deepface import DeepFace
from PIL import Image
import requests
from io import BytesIO


def send_telegram_message(message):
    print(message)
    chat_ids = [CLIENT1_CHAT_ID,CLIENT2_CHAT_ID ]
    # Send the message via Telegram to each chat ID
    url = f"https://api.telegram.org/bot{TELEGRAM_TOKEN}/sendMessage"
    for chat_id in chat_ids:
        payload = {
            "chat_id": chat_id,
            "text": message
        }
        response = requests.post(url, data=payload)
        if response.status_code == 200:
            print(f"Notification sent successfully to {chat_id}.")
        else:
            print(f"Failed to send notification to {chat_id}. Error: {response.text}")

def find_matching_face(visitor_img, family_files):
    visitor_np = np.array(visitor_img)

    for name, images in family_files.items():
        for family_img in images:
            try:
                family_np = np.array(family_img)

                # Perform face verification
                result = DeepFace.verify(img1_path=visitor_np, img2_path=family_np, model_name="VGG-Face", enforce_detection=True)
                if result['verified']:
                    return name  # Return the matching family member's name
            except ValueError:
                print(f"No face detected in visitor image or family image for {name}, skipping comparison...")
            except Exception as e:
                print(f"Error comparing visitor image with {name}'s image: {e}")
    return "Unknown"
