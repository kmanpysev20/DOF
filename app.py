from flask import Flask, render_template, request, jsonify, abort, redirect, url_for, flash
from bson.objectid import ObjectId
from pymongo import MongoClient
from datetime import datetime
import math, time, os

app = Flask(__name__)
app.secret_key = os.urandom(24)

client = MongoClient("mongodb+srv://kmanpysev20:test@cluster0.cknzfkt.mongodb.net/test")
db = client.DOFBorder

@app.template_filter("formatdatetime")
def format_datetime(value):
    if value is None:
        return ""
    
    now_timestemp = time.time()
    offset = datetime.fromtimestamp(now_timestemp) - datetime.utcfromtimestamp(now_timestemp)
    value = datetime.fromtimestamp(int(value) / 1000) + offset
    return value.strftime('%Y-%m-%d')

# 시작 시 index.html 불러오기
@app.route('/')
def home():
    return render_template("index.html")

# intro page
@app.route('/intro')
def intro():
    return render_template("subpage/intro.html")

# member page
@app.route('/member')
def member():
    return render_template("subpage/member.html")

# service page
@app.route('/service')
def service():
    return render_template("subpage/service.html")

# boarder-list.html 소스
@app.route('/boarder-list')
def boarder_list():

    # page의 값 (값이 없는 경우 기본값은 1)
    page = request.args.get('page', 1 , type=int)

    # 한 페이지당 몇 개의 게시물을 출력하는 코드
    limit = request.args.get('limit', 5 , type=int)

    board = db.Boarder
    datas = board.find({}).skip((page-1) * limit).limit(limit)

    # 게시물의 총 갯수
    tot_count = board.count_documents({})

    # 마지막 페이지의 수를 구합니다.
    last_page_num = math.ceil(tot_count / limit)

    # 페이지 블록 5개씩 표기
    block_size = 5

    # 현재 블럭의 위치
    block_num = int((page - 1) / block_size)

    # 블럭의 시작 위치
    block_start = int((block_size * block_num) + 1)

    # 블럭의 끝 위치
    block_last = math.ceil(block_start + (block_size - 1))

    return render_template(
        "subpage/boarder-list.html", 
        datas = list(datas),
        limit = limit,
        page = page,
        block_start = block_start, 
        block_last = block_last,
        last_page_num = last_page_num
        )

# border-write.html 소스
@app.route("/boarder-write", methods=['GET', 'POST'])
def board_write():
    if request.method == 'POST':
        title = request.form.get('title')
        name = request.form.get('name')
        contents = request.form.get('contents')
        password = request.form.get('password')

        # 날짜 및 시간 구하기 소스
        current_utc_time = round(datetime.utcnow().timestamp() * 1000)

        board = db.Boarder
        post = {
            "title" : title,
            "name" : name,
            "contents" : contents,
            "password" : password,
            "pubdate" : current_utc_time,
            "view" : 0,
        }
        x = board.insert_one(post)
        return redirect(url_for("boarder_list", idx=x.inserted_id))
    else:
        return render_template("subpage/boarder-write.html")
    
# border-modify.html 소스
@app.route("/boarder_modify/<idx>")
def board_modify(idx):
    # idx = request.args.get("idx")
    if idx is not None:
        page = request.args.get("page")

        board = db.Boarder
        data = board.find_one({"_id":ObjectId(idx)})

        if data is not None:
            result = {
                "id": data.get("_id"),
                "title": data.get("title"),
                "name": data.get("name"),
                "contents": data.get("contents"),
                "password" : data.get("password"),
                "pubdate" : data.get("pubdate"),
                "view": data.get("view"),
            }
            return render_template("subpage/boarder-modify.html", result=result , page=page)
    return abort(404)

# 삭제하는 코드
@app.route('/delete', methods=["POST"])
def delete():   
    id_receive = request.form["id_give"]
    id_receive = ObjectId(id_receive)
    db.Border.delete_one({'_id':id_receive})
    return jsonify({"msg": "삭제 완료!"})
    
if __name__ == "__main__":
    app.run(debug=True, port=5000)

    app.secret_key = "****"
    app.debug = True