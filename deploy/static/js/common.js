// gnb menu click event 
$(function () {
    $('.btn-gnb').on('click', function() {
        $('.main-header').toggleClass('is-gnb');
        $('#gnb').toggleClass('is-gnb');
    });
    $('.ic-gnb-close').on('click', function() {
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
