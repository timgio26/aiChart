from flask import Flask,request,jsonify,send_from_directory
from werkzeug.utils import secure_filename
import uuid
import os
app = Flask(__name__)

os.makedirs("uploads",exist_ok=True)
ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}

@app.route("/version")
def version():
    return "0.0.1"

@app.route("/upload",methods=["POST"])
def upload_image():
    file = request.files['image']
    ext= os.path.splitext(file.filename)[1]
    if(ext not in ALLOWED_EXTENSIONS):
        return jsonify({"error":"wrong image format"}),400
    newfilename = secure_filename(f"{uuid.uuid4().hex}{ext}")
    savepath=os.path.join('uploads',newfilename)
    file.save(savepath)
    return jsonify({"filename":savepath}),200

@app.route("/clearmemory")
def clear_memory():
    list= os.listdir('uploads')
    for i in list:
        os.remove(f"uploads/{i}")
    return jsonify({"status":"success"}),200

@app.route('/uploads/<filename>')
def serve_image(filename):
    return send_from_directory("uploads", filename)


    