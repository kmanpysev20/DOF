from flask import Flask, render_template, request, jsonify
from bson.objectid import ObjectId
from pymongo import MongoClient
import math

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
    db.Border1.delete_one({'_id':id_receive})
    return jsonify({"msg": "삭제 완료!"})

# 수정하는 코드
@app.route('/modify', methods=["POST"])
def modify():
    id_receive = request.form["id_give"]
    id_receive = ObjectId(id_receive)

    title_receive = request.form["title_give"]
    content_receive = request.form["content_give"]
    db.Border1.update_one({'_id' : id_receive}, {'$set':{'title' : title_receive}})
    db.Border1.update_one({'_id' : id_receive}, {'$set':{'content' : content_receive}})
    return jsonify({"msg": "수정 완료!"})

# border.html 소스
@app.route("/borderlist", methods=["GET"])
def borderlist():
    # page의 값 (값이 없는 경우 기본값은 1)
    page = request.args.get('page', 1 , type=int)
    # 한 페이지당 몇 개의 게시물을 출력하는 코드
    limit = request.args.get('limit', 5 , type=int)

    # Object형식을 json에 필요한 str형식으로 바꿔주기 위한 decode (_id 값 찾는 코드)
    # contents 변수는 전체 data를 가져옴
    contents = list(db.Border1.find({}).skip((page-1) * limit).limit(limit))
    for content in contents:
        content['_id'] = str(content['_id'])                    
    return jsonify({"result": contents,
                    })

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
    db.Border1.insert_one(doc)
    return jsonify({"msg": "등록 완료!"})

if __name__ == "__main__":
    app.run(debug=True, port=9999)
    # app.run()