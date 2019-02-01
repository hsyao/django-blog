$(document).ready(function(){
    $(".nav ul li:has(ul)").hover(function(){
        $(this).children("a").css({color:"#fff"});
        0<$(this).find("li").length&&$(this).children("ul").stop(!0,!0).slideDown(100)},function(){$(this).children("a").css({color:"#FFF"});
        $(this).children("ul").stop(!0,!0).slideUp("fast")});
    $(".toggle-search").click(function(){$(".toggle-search").toggleClass("active");
        $(".search-expand").fadeToggle(300)});
    $(".navbar-toggle").click(function(){$(".navbar-toggle").toggleClass("active");
        $(".navbar-collapse").toggle(300);
        $(".nav ul li ul").show()});
    $(".viewimg a").hover(function(){$(this).find(".shine").stop();
        $(this).find(".shine").css("background-position","-160px 0");
        $(this).find(".shine").animate({backgroundPosition:"160px"},500)},function(){});
    $(".totop").hide();
    $(window).scroll(function(){
        0<$(window).scrollTop()?$(".totop").fadeIn(200):$(".totop").fadeOut(200)});
    $(".totop").click(function(){$("html,body").animate({scrollTop:"0px"},400)
    });


var s1 = '2018-01-01';//设置为你的建站时间
    s1 = new Date(s1.replace(/-/g, "/"));
    s2 = new Date();
    var days = s2.getTime() - s1.getTime();
    var number_of_days = parseInt(days / (1000 * 60 * 60 * 24));
    document.getElementById('days').innerHTML = number_of_days;

});

