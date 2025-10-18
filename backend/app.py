from flask import Flask,request,jsonify,send_from_directory
from werkzeug.utils import secure_filename
import uuid,os
from pydantic import BaseModel
from aiTools import getAiResp

app = Flask(__name__)

os.makedirs("uploads",exist_ok=True)
ALLOWED_EXTENSIONS = {'.png', '.jpg', '.jpeg'}

class ChartInsightReqSchema(BaseModel):
    imgurl:str
    model:str

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

@app.route('/uploads/<filename>')
def serve_image(filename):
    return send_from_directory("uploads", filename)

@app.route('/generate-chart-insight',methods=["POST"])
def generate_chart_insight():
    req = ChartInsightReqSchema(**request.get_json())
    resp = getAiResp(model=req.model,imgurl=req.imgurl)
    return jsonify({"insight":resp.insight})

@app.route("/clearmemory")
def clear_memory():
    list= os.listdir('uploads')
    for i in list:
        os.remove(f"uploads/{i}")
    # print(resp)
    return jsonify({"status":"success"}),200



    