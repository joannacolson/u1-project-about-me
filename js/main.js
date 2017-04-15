// function definitions
function slideHamburgerMenuClosed() {
    $(".menu").slideUp("slow", function() {
        $(".cross").hide();
        $(".hamburger").show();
    });
}

// js executed once page has finished loading
$(function() {
    console.log('JQuery loaded');
    // add smooth scrolling to the nav's anchors
    $("nav").on('click', 'a', function(event) {
        event.preventDefault();

        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
        slideHamburgerMenuClosed();
    });

    // add highlighting menu item when scrolling to each section
    $(window).on("scroll", function() {
        var position = $(this).scrollTop();
        // offset highlights the section before reaching the very top of the page.
        var offset = 1;

        $(".section").each(function() {
            var target = $(this).offset().top;
            var id = $(this).attr("id");
            if (position + offset >= target) {
                $(".navigation > ul > li > a").removeClass("active");
                $(".navigation > ul > li > a[href='#" + id + "']").addClass("active");
            }
        });
    });

    // Initialize the Slick slider carousel
    $(".autoplay").slick({
        dots: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        speed: 800,
        arrows: false,
        pauseOnDotsHover: true
    });

    // Make equal height slides from different height images
    // Set each '.slick-slide' to have the height of the '.slick-track' on page load
    var slickTrackHeight = $('.slick-track').height();
    $('.slick-slide').css('height', slickTrackHeight + 'px');

    // Set each '.slick-slide' to have the height of the '.slick-track' on slider resizing
    $('.autoplay').on('setPosition', function() {
        $(this).find('.slick-slide').height('auto');
        var slickTrack = $(this).find('.slick-track');
        var slickTrackHeight = $(slickTrack).height();
        $(this).find('.slick-slide').css('height', slickTrackHeight + 'px');
    });

    // Add the hamburger menu click event to show and hide the menu
    $(".hamburger").on("click", function() {
        $(".menu").slideDown("slow", function() {
            $(".hamburger").hide();
            $(".cross").show();
        });
    });

    $(".cross").on("click", slideHamburgerMenuClosed);

    // Edit the form fields for blank values
    $(".submit").on("click", function(event) {
        event.preventDefault();
        $(".edited-element").each(function() {
            if ($(this).val()) {
                // value is non-blank
                $(this).removeClass("error");
                $(this).siblings().hide();
            } else {
                // value is blank
                $(this).addClass("error");
                $(this).siblings().fadeIn(1000);
            }
        });
    });

    // Fade in & out text loop - jQuery
    var quotes = $(".quotes");
    var quoteIndex = -1;

    function showNextQuote() {
        ++quoteIndex;
        quotes.eq(quoteIndex % quotes.length)
            .fadeIn(2000)
            .delay(4000)
            .fadeOut(2000, showNextQuote);
    }
    showNextQuote();
});
