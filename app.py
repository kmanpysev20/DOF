from flask import Flask, render_template, request, jsonify, send_file

from bson.objectid import ObjectId

from pymongo import MongoClient

client = MongoClient("mongodb+srv://kmanpysev20:test@cluster0.cknzfkt.mongodb.net/test")
db = client.DOFBorder

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

# 삭제하는 코드
@app.route('/delete', methods=["POST"])
def delete():   
    id_receive = request.form["id_give"]
    id_receive = ObjectId(id_receive)
    db.Border.delete_one({'_id':id_receive})
    return jsonify({"msg": "삭제 완료!"})
    
# 수정하는 코드
@app.route('/modify', methods=["POST"])
def modify():
    id_receive = request.form["id_give"]
    id_receive = ObjectId(id_receive)

    title_receive = request.form["title_give"]
    content_receive = request.form["content_give"]
    db.Border.update_one({'_id' : id_receive}, {'$set':{title_receive}})
    db.Border.update_one({'_id' : id_receive}, {'$set':{content_receive}})
    return jsonify({"msg": "수정 완료!"})


# 각 리스트 ID 값 저장하는 코드
@app.route("/borderlist", methods=["GET"])
def borderlist():
    contents = list(db.Border.find({}))
    for content in contents:
        content['_id'] = str(content['_id'])
    return jsonify({"result": contents})

# 데이터 저장하기 코드
@app.route('/post', methods=["POST"])
def post():
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
    # app.run(debug=True, port=5000)
    app.run()