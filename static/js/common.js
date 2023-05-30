// 게시글 비밀번호 체크
function boarderClick() {
    $('.table-wrap').on('click', '.list', function () {
        const row = $(this).find('td');
        let password = row.eq(4).text()
        console.log(password);
        listClick(password)
    });
}

function listClick(password) {
    $('.title').on('click', function () {
        let prom = prompt("비밀번호 입력")
        console.log(prom)

        if (prom === password) {
            $(location).attr("href",
                `../subpage/border-modify.html?
        &password=${encodeURIComponent(password)}`)
        } else {
            alert("취소")
        }
    })
}

//글쓰기 유효성 코드
function Checkform() {
    if (form.title.value == "") {
        form.title.focus();
        alert("제목을 입력해주세요")
        return false;
    }
    if (form.name.value == "") {
        form.name.focus();
        alert("이름을 입력해주세요")
        return false;
    }
    if (form.contents.value == "") {
        form.contents.focus();
        alert("내용을 입력해주세요")
        return false;
    }
    if (form.password.value == "") {
        form.password.focus();
        alert("비밀번호를 입력해주세요")
        return false;
    }
}

// //border 등록
// function borderlist() {
//     fetch("/borderlist").then(res => res.json()).then(data => {
//         let rows = data['result'];
//         // $('.list').empty();
//         rows.forEach((row, index) => {
//             let idSum = index + 1;
//             let title = row['title'];
//             let writer = row['writer'];
//             let content = row['content'];
//             let password = row['password'];
//             let ymd = row['ymd'];
//             let _id = row['_id'];
//             let page = row['page'];

//             let temp_html = `<tr class="list">
//                             <td>${idSum}</td>
//                             <td>${title}</td>
//                             <td>${writer}</td>
//                             <td style="display:none;">${content}</td>
//                             <td style="display:none;">${password}</td>
//                             <td>${ymd}</td>
//                             <td style="display:none;">${_id}</td>
//                             </tr>`
//             $('.table-wrap').append(temp_html);

//         })
//         $('.table-wrap').on('click', '.list', function () {
//             const row = $(this).find('td');
//             listClick(row)
//         });
//     })
// }

// //border 게시물 클릭
// function listClick(row) {
//     let ymd = row.eq(0).text()
//     let title = row.eq(1).text()
//     let writer = row.eq(2).text()
//     let content = row.eq(3).text()
//     let password = row.eq(4).text()
//     let _id = row.eq(6).text()
//     console.log(password)

//     let promPasss = prompt('비밀번호룰 입력하세요', '숫자만 입력');
//     console.log(promPasss);

//     if(promPasss === password) {
//         $(location).attr("href",
//         `../subpage/border-modify.html?
//     ymd=${encodeURIComponent(ymd)}
//     &title=${encodeURIComponent(title)}
//     &writer=${encodeURIComponent(writer)}
//     &content=${encodeURIComponent(content)}
//     &password=${encodeURIComponent(password)}
//     &_id=${encodeURIComponent(_id)}`)
//     } else {
//         alert("비밀번호가 틀리거나 취소를 하였습니다.")
//     }
// }

// //글등록 데이터 저장
// function writeBorder() {
//     let title = $('.input-tit').val();
//     let writer = $('.input-name').val();
//     let content = $('.input-cont').val();
//     let password = $('.input-password').val();
//     let ymd = $('.ymd').text();

//     let formData = new FormData()
//     formData.append("title_give", title)
//     formData.append("writer_give", writer)
//     formData.append("content_give", content)
//     formData.append("password_give", password)
//     formData.append("ymd_give", ymd)

//     fetch('/post', { method: "POST", body: formData }).then(res => res.json()).then(data => {
//         alert(data["msg"])
//         $(location).attr("href", "../subpage/border.html")
//         // window.location.reload()
//     })
// }

// // 수정 코드
// function modifylist() {
//     const queryString = window.location.search;
//     const searchParams = new URLSearchParams(decodeURIComponent(queryString));
//     console.log(searchParams);
//     let _id = searchParams.get("_id");
//     let title = searchParams.get("title");
//     let writer = searchParams.get("writer");
//     let content = searchParams.get("content");
//     let password = searchParams.get("password");
//     console.log("_id : " + _id);
//     console.log("타이틀: " + title);
//     console.log("작성자 : " + writer);
//     console.log("내용 : " + content);
//     console.log("비밀번호 : " + password);
//     $(".board-read-wrap").attr("id", _id);
//     $(".input-tit").val(title).attr("id", _id);
//     $(".input-name").val(writer).attr("id", _id);
//     $(".input-cont").val(content).attr("id", _id);
//     $(".input-password").val(password).attr("id", _id);

//     return _id;
//   }

// function modifyBorder(_id) {
//     let title = $(".input-tit").val();
//     let content = $(".input-cont").val();

//     console.log("_id : " + _id);
//     console.log("타이틀: " + title);
//     console.log("작성자 : " + content);

//     let formData = new FormData();
//     formData.append("id_give", _id);
//     formData.append("title_give", title);
//     formData.append("content_give", content);

//     fetch("/modify", { method: "POST", body: formData })
//       .then((res) => res.json())
//       .then((data) => {
//         alert(data["msg"]);
//         $(location).attr("href", "../subpage/border.html");
//       });
//   }


//글수정 삭제
function deleteBorder(_id) {
    let formData = new FormData()
    formData.append("id_give", _id)

    fetch('/delete', { method: "POST", body: formData })
        .then((res) => res.json())
        .then((data) => {
            alert(data["msg"]);
            $(location).attr("href", "../subpage/border.html")
            // window.location.reload()
        })
}


//취소
function cancle() {
    //YES
    if (confirm("정말 취소할까요?")) {
        $(location).attr("pathname", "boarder-list")
        //NO
    } else {
    }
}


//날짜
$(function ymd() {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    month = month >= 10 ? month : '0' + month;
    let date = today.getDate();  // 날짜
    date = date >= 10 ? date : '0' + date;

    $('.ymd').text(`${year}-${month}-${date}`)
});

// gnb menu click event 
$(function () {
    $('.btn-gnb').on('click', function () {
        $('.main-header').toggleClass('is-gnb');
        $('#gnb').toggleClass('is-gnb');
    });
    $('.ic-gnb-close').on('click', function () {
        $('.main-header').removeClass('is-gnb');
        $('#gnb').removeClass('is-gnb');
    });

});

// record-wrap
$(function () {
    $(".ic-arrow").click(function () {
        $(this).parents('.record').next('.detail').toggleClass('is-open');
        $(this).toggleClass('is-open');
    });
});


//비밀번호 표시 클릭 이벤트
$(function () {
    $(".pw-check").click(function () {
        $('.pw-check').toggleClass('is-click')
        $('.input-password').toggleClass('is-click')
    });
});


//popupCancle
function popupCancle() {
    $('.popupCancle').on('click', function () {
        $('.is-popup').removeClass('is-open');
    });
}

// popup
// function popupControl() {
//     $(".popup-open").on('click', function () {
//         const popId = $(this).data('popup');
//         $("#" + popId).css('display', 'flex').hide().fadeIn('fast');
//         console.log(popId);
//     });
//     $(".pop-close-btn").on('click', function () {
//         $(this).parents('.pop-wrap').fadeOut();
//     });
// };
// popupControl();