from flask import Flask, render_template, request, jsonify, send_file

from pymongo import MongoClient

client = MongoClient("mongodb+srv://kmanpysev20:test@cluster0.cknzfkt.mongodb.net/test")
db = client.DOFBorder

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route("/borderlist", methods=["GET"])
def borderlist():
    contents = list(db.Border.find({}, {'_id':False}))
    return jsonify({"result": contents})

@app.route('/post', methods=["POST"])
def post_todo():
    title_receive = request.form["title_give"]
    writer_receive = request.form["writer_give"]
    content_receive = request.form["content_give"]
    password_receive = request.form["password_give"]
    ymd_receive = request.form["ymd_give"]
    doc = {
        'title' : title_receive,
        'writer' : writer_receive,
        'content' : content_receive,
        'password' : password_receive,
        'ymd' : ymd_receive
    }
    db.Border.insert_one(doc)
    return jsonify({"msg": "등록 완료!"})

if __name__ == "__main__":
    app.run(debug=True, port=5000)