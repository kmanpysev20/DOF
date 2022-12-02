// record-wrap
$(function () {
    $(".ic-arrow").click(function () {
        $(this).parents('.record').next('.record-detail').toggleClass('is-open');
    });
});