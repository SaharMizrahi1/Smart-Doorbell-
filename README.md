# Smart Doorbell Project

## 📖 Overview
The **Smart Doorbell** upgrades a traditional doorbell with features like facial recognition, cloud storage, and instant Telegram notifications. It uses a **Raspberry Pi**, a camera, and IoT technology for remote accessibility and enhanced security.

---

## 🔧 Features
- **Button-Triggered Photos**: Captures an image when the doorbell button is pressed.
- **Facial Recognition**: Uses a machine learning model to analyze and identify visitors by studying pre-uploaded family member photos stored in AWS S3.
- **Instant Alerts**: Sends Telegram notifications for recognized and unrecognized visitors.
- **Family Member Management**: Allows users to add family members via a React-based interface.

---

## 🛠️ Technologies

### **Hardware**:
- **Raspberry Pi**: Central processing unit.
- **Camera**: Captures visitor images.
- **Button**: Triggers photo capture.
- **Indicator Light**: Confirms button press and image capture.

### **Software**:
- **Backend**: 
  - **Python**, **Flask**, and **DeepFace** for API and facial recognition.
  - **AWS S3** for image storage.
- **Frontend**:
  - **React** for user management and notifications.
