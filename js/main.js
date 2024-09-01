/* ===================================================================
 * Count - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    var cfg = {
        scrollDuration : 800, // smoothscroll duration
        mailChimpURL   : 'https://cinezapiens.us9.list-manage.com/subscribe/post?u=8e15b88dca0e0c502faa92e4f&amp;id=425d4b01c1&amp;f_id=00dfc2e1f0'   // mailchimp url
    },

    $WIN = $(window);

    // Add the User Agent to the <html>
    // will be used for IE10 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0))
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);

    // svg fallback
    if (!Modernizr.svg) {
        $(".home-logo img").attr("src", "images/logo.png");
    }


   /* Preloader
    * -------------------------------------------------- */
    var ssPreloader = function() {
        
        $("html").addClass('ss-preload');

        $WIN.on('load', function() {

            // will first fade out the loading animation 
            $("#loader").fadeOut("slow", function() {
                // will fade out the whole DIV that covers the website.
                $("#preloader").delay(300).fadeOut("slow");
            }); 
            
            // for hero content animations 
            $("html").removeClass('ss-preload');
            $("html").addClass('ss-loaded');
        
        });
    };


   /* info toggle
    * ------------------------------------------------------ */
    var ssInfoToggle = function() {

        //open/close lateral navigation
        $('.info-toggle').on('click', function(event) {

            event.preventDefault();
            $('body').toggleClass('info-is-visible');

        });

    };


   /* slick slider
    * ------------------------------------------------------ */
    var ssSlickSlider = function() {
        
        $('.home-slider').slick({
            arrows: false,
            dots: false,
            autoplay: true,
            autoplaySpeed: 3000,
            fade: true,
            speed: 3000
        });

    };


   /* placeholder plugin settings
    * ------------------------------------------------------ */
    var ssPlaceholder = function() {
        $('input, textarea, select').placeholder();
    };


   /* final countdown
    * ------------------------------------------------------ */
    var ssFinalCountdown = function() {

        var finalDate =  new Date("January 01, 2025 00:00:00").getTime();
        //-date: "Jan 01 2025",

        $('.home-content__clock').countdown(finalDate)
        .on('update.countdown finish.countdown', function(event) {

            var str = '<div class=\"top\"><div class=\"time days\">' +
                      '%D <span>day%!D</span>' + 
                      '</div></div>' +
                      '<div class=\"time hours\">' +
                      '%H <span>H</span></div>' +
                      '<div class=\"time minutes\">' +
                      '%M <span>M</span></div>' +
                      '<div class=\"time seconds\">' +
                      '%S <span>S</span></div>';

            $(this)
            .html(event.strftime(str));

        });
    };


   /* AjaxChimp
    * ------------------------------------------------------ */
    var ssAjaxChimp = function() {
        
        $('#mc-form').ajaxChimp({
            language: 'es',
            url: cfg.mailChimpURL
        });

        // Mailchimp translation
        //
        //  Defaults:
        //	 'submit': 'Submitting...',
        //  0: 'We have sent you a confirmation email',
        //  1: 'Please enter a value',
        //  2: 'An email address must contain a single @',
        //  3: 'The domain portion of the email address is invalid (the portion after the @: )',
        //  4: 'The username portion of the email address is invalid (the portion before the @: )',
        //  5: 'This email address looks fake or invalid. Please enter a real email address'

        $.ajaxChimp.translations.es = {
            'submit': 'Submitting...',
            0: '<i class="fas fa-check"></i> We have sent you a confirmation email',
            1: '<i class="fas fa-exclamation-triangle"></i> You must enter a valid e-mail address.',
            2: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
            3: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
            4: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.',
            5: '<i class="fas fa-exclamation-triangle"></i> E-mail address is not valid.'
        }
    };


   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {
        
        ssPreloader();
        ssInfoToggle();
        ssSlickSlider();
        ssPlaceholder();
        ssFinalCountdown();
        ssAjaxChimp();

    })();



   /* Gform
    * ------------------------------------------------------ */

    var submitted = false;
    
    $('#gform').on('submit', function(e) {
        $('#gform *').fadeOut(2000);
        $('#gform').prepend('Your submission has been processed...');
    });

   /* Mail Protection
    * ------------------------------------------------------ */
	
    // Function to decode HTML entities
    var decodeHtmlEntities = function(encodedStr) {
        return $('<textarea/>').html(encodedStr).text();
    }; 
	
    $(document).ready(function() {
        var email_amal_username = "&#97;&#109;&#97;&#108;";
        var email_abhi_username = "&#97;&#98;&#104;&#105;&#106;&#105;&#116;&#104;";
        var domain = "&#99;&#105;&#110;&#101;&#122;&#97;&#112;&#105;&#101;&#110;&#115;&#46;&#99;&#111;&#109;";
        
        // Decode each part
        var email_amal = decodeHtmlEntities(email_amal_username) + "@" + decodeHtmlEntities(domain);
        var email_abhi = decodeHtmlEntities(email_abhi_username) + "@" + decodeHtmlEntities(domain);
		
        $('.info-email-amal').attr('href', 'mailto:' + email_amal).html(email_amal_username + "@" + domain);
        $('.info-email-abhi').attr('href', 'mailto:' + email_abhi).html(email_abhi_username + "@" + domain);
    });




    /*$(document).ready(function() {
        var amalUser = "amal";
        var amalDomain = "cinezapiens.com";
        var amalEmail = amalUser + "@" + amalDomain;
        var amalEncoded = {
            user: amalUser.split('').map(function(c) { return '&#' + c.charCodeAt(0) + ';'; }).join(''),
            domain: amalDomain.split('').map(function(c) { return '&#' + c.charCodeAt(0) + ';'; }).join('')
        };
        $('.info-email-user1').attr('href', 'mailto:' + amalEmail)
                             .html(amalEncoded.user + '&#64;' + amalEncoded.domain);

        var abhijithUser = "abhijith";
        var abhijithDomain = "cinezapiens.com";
        var abhijithEmail = abhijithUser + "@" + abhijithDomain;
        var abhijithEncoded = {
            user: abhijithUser.split('').map(function(c) { return '&#' + c.charCodeAt(0) + ';'; }).join(''),
            domain: abhijithDomain.split('').map(function(c) { return '&#' + c.charCodeAt(0) + ';'; }).join('')
        };
        $('.info-email-user2').attr('href', 'mailto:' + abhijithEmail)
                                .html(abhijithEncoded.user + '&#64;' + abhijithEncoded.domain);
    });*/
})(jQuery);