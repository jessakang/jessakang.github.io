(function($){
  $(function(){

    $('.button-collapse').sideNav();
    $('.parallax').parallax();

  }); // end of document ready
})(jQuery); // end of jQuery name space

$("#about-nav").click(function() {
    $('html, body').animate({
        scrollTop: $("#about").offset().top
    }, 1500);
});

$("#projects-nav").click(function() {
    $('html, body').animate({
        scrollTop: $("#projects").offset().top
    }, 1500);
});

$("#resume-nav").click(function() {
    $('html, body').animate({
        scrollTop: $("#resume").offset().top
    }, 1500);
});

$("#contact-nav").click(function() {
    $('html, body').animate({
        scrollTop: $("#contactme").offset().top
    }, 1500);
});
