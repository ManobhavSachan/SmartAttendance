import os
from flask import Flask, request, send_file, jsonify
from PIL import Image
import numpy as np
import face_recognition
from io import BytesIO  # Import BytesIO
import cv2
import base64
from flask_cors import CORS

# import subprocess
# subprocess.run(["pip", "install", "pymongo"])

from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# uri = 
# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))
# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)

client = MongoClient('')
db = client['SmartAttendance']
collection = db['ECE']

# Fetch all documents from the MongoDB collection
cursor = collection.find({})
known_face_encodings = []
known_face_names = []

for document in cursor:
    known_face_encodings.append(np.frombuffer(document['face_encoding']))
    known_face_names.append(document['name'])

def process_image(image, upscaling, threshold):
    unknown_image = face_recognition.load_image_file(image)
    face_locations = face_recognition.face_locations(unknown_image, number_of_times_to_upsample=upscaling)
    face_encodings = face_recognition.face_encodings(unknown_image, face_locations)
    unknown_image = cv2.cvtColor(unknown_image, cv2.COLOR_RGB2BGR)

    for (top, right, bottom, left), face_encoding in zip(face_locations, face_encodings):
        matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
        name = "Unknown"

        face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)
        best_match_index = np.argmin(face_distances)
        if matches[best_match_index] and face_distances[best_match_index] < threshold:
            name = known_face_names[best_match_index]

        cv2.rectangle(unknown_image, (left, top), (right, bottom), (0, 0, 255), 2)
        cv2.rectangle(unknown_image, (left, bottom + 20), (right, bottom), (0, 0, 255), cv2.FILLED)
        cv2.putText(unknown_image, name, (left + 6, bottom + 13), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 1, cv2.LINE_AA)

    return cv2.cvtColor(unknown_image, cv2.COLOR_BGR2RGB)

@app.route('/')
def index():
    return "This is the root path and it's working!"

@app.route('/add_face', methods=['POST'])
def upload_face_encoding():
    if 'roll_no' not in request.form:
        return jsonify({'error': 'Roll number not provided'}), 400
    if 'name' not in request.form:
        return jsonify({'error': 'Name not provided'}), 400
    if 'image' not in request.files:
        return "No image part"

    image_file = request.files['image']

    if image_file.filename == '':
        return "No selected image file"

    roll_no = request.form['roll_no']
    name = request.form['name']

    image = face_recognition.load_image_file(image_file)
    face_encodings = face_recognition.face_encodings(image)

    if not face_encodings:
        return jsonify({'error': 'No face found in the provided image'}), 400

    face_encoding_bytes = face_encodings[0].tobytes()

    # Store face encoding in MongoDB
    encoding_data = {
        'roll_no': roll_no,
        'name': name,
        'face_encoding': face_encoding_bytes
    }
    collection.insert_one(encoding_data)

    # Update known_face_encodings and known_face_names
    known_face_encodings.append(np.frombuffer(face_encoding_bytes))
    known_face_names.append(name)

    return jsonify({'message': 'Face encoding uploaded successfully'}), 200

@app.route('/take_attendance', methods=['POST'])
def annotate_image():
    if 'image' not in request.files:
        return "No image part"

    image_file = request.files['image']

    if image_file.filename == '':
        return "No selected image file"

    upscaling = int(request.form['upscaling'])
    threshold = float(request.form['threshold'])

    annotated_image = process_image(image_file, upscaling, threshold)

    # Convert annotated image to base64 string
    img_pil = Image.fromarray(annotated_image)
    buffered = BytesIO()
    img_pil.save(buffered, format="JPEG")
    img_str = base64.b64encode(buffered.getvalue()).decode('utf-8')

    return jsonify({'image': img_str})

if __name__ == '__main__':
    app.run(host='0.0.0.0')
