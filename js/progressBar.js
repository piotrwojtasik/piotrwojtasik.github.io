

$(document).on("scroll", function(){
    var pixels = $(document).scrollTop();
    var pageHeight = $(document).height() - $(window).height();
    var progress = 100 * pixels / pageHeight;

    $("div.progress").css("width", progress + "%")
})