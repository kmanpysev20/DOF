//데이터 저장
function writeBorder() {
    let title = $('.input-tit').val();
    let writer = $('.input-name').val();
    let content = $('.input-cont').val();
    let password = $('.input-password').val();
    let ymd = $('.ymd').text();

    let formData = new FormData()
    formData.append("title_give", title)
    formData.append("writer_give", writer)
    formData.append("content_give", content)
    formData.append("password_give", password)
    formData.append("ymd_give", ymd)

    fetch('/post', { method: "POST", body: formData }).then(res => res.json()).then(data => {
        alert(data["msg"])
        $(location).attr("href", "../subpage/border.html")
        // window.location.reload()
    })
}

//글쓰기 조건 코드
function isRegist() {
    //제목란에 값이 없다면 팝업 노출 시키고 return false라 아래 작성자명 if문으로 가지 않음
    //반대로, 제목란에 값이 있다면 참이니깐 > 아래 작성자명 if문이 실행
    if ($.trim($('.input-tit').val()) == '') {
        alert("제목 입력해주세요")
        return false;
    }
    if ($.trim($('.input-name').val()) == '') {
        alert("작성자명 입력해주세요")
        return false;
    }
    if ($.trim($('.input-cont').val()) == '') {
        alert("내용 입력해주세요")
        return false;
    }
    if ($.trim($('.input-password').val()) == '') {
        alert("비밀번호 입력해주세요")
        return false;
    }
    //이렇게 참일 때 쭉가서 return true를 만나면 함수 종료
    return true;
}

//날짜
$(function ymd() {
    let today = new Date();   
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1;  // 월
    let date = today.getDate();  // 날짜

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