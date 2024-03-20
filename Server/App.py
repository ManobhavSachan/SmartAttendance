import os
from flask import Flask, request, send_file, jsonify
from PIL import Image
import numpy as np
import face_recognition
from io import BytesIO  # Import BytesIO
import cv2
import base64
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Assuming known_face_encodings and known_face_names are loaded somewhere

folder_path = "C:/Users/DELL/Downloads/GitHub Photos/Single Photo"
known_face_encodings = []
known_face_names = []

for filename in os.listdir(folder_path):
    image_path = os.path.join(folder_path, filename)
    image = face_recognition.load_image_file(image_path)
    face_encodings = face_recognition.face_encodings(image)

    if len(face_encodings) > 0:
        name = os.path.splitext(filename)[0]
        known_face_encodings.append(face_encodings[0])
        known_face_names.append(name)

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

@app.route('/annotate_image', methods=['POST'])
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
