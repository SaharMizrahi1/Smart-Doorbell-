import boto3
import botocore
from picamera2 import Picamera2, Preview
from time import sleep
from gpiozero import Button
from gpiozero import LED
import requests
import os


button = Button(2)
led = LED(3)

# backend endpoint
url = "http://10.0.0.8:8000/check"

picam2 = Picamera2()

try:
    while True:
        button.wait_for_press()
        led.on()
        print("Button pressed, starting preview...")
        print("Capturing image...")
        try:
            picam2.start_preview(Preview.QTGL)
            picam2.start()

            sleep(3)
            picam2.capture_file("visitor.jpg")
            print("Image captured.")
        finally:
            picam2.stop()
            picam2.stop_preview()

        led.off()

        filename = 'visitor.jpg'
        print(f"File size on Raspberry Pi: {os.path.getsize(filename)} bytes")

        # Send the captured image via a POST request to the backend
        with open(filename, 'rb') as image_file:
            files = {'file': (filename, image_file)}
            try:
                response = requests.post(url, files=files)
                if response.status_code == 200:
                    print("Image uploaded successfully.")
                    print("Response:", response.json().get("message"))
                else:
                    print("Failed to upload image. Status code:", response.status_code)
                    print("Error:", response.json().get("error"))
            except requests.exceptions.RequestException as e:
                print("Error sending request:", e)
finally:
    picam2.close()
