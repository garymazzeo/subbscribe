/**
 * Subbscribe.js (http://www.subbscribe.com)
 * Copyright (c) 2014 (v2.0) Shlomi Nissan, 1ByteBeta (http://www.1bytebeta.com)
 * Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 */

(function($) {

    $.fn.subbscribe = function( options ) {

        var obj = this;

        // Default settings
        var settings = $.extend({

	    list	 : 'MailChimp',
            url           : '',
            title         : 'Never miss a post!',
            text          : 'Get our latest posts and announcements in your inbox. You won\'t regret it!',
            name          : 'Subbscribe',
            color         : '#ee6262',
            thumbnail     : 'https://s3-ap-southeast-2.amazonaws.com/subbscribe/img/avatar.png',
            emailonly	  : false,
            cm_mail_field : '',
            delay         : 0,
            button        : 'Learn More',

	}, options);

	var _name 	= '';
	var _email 	= '';
	var _url 	= '';

	// Separate the input fields from the HTML
	// if emailonly is set, nameInput should be blank

	var nameInput 	= '';
	var emailInput 	= '<input type="email" name="' + _email + '" id="subb-EMAIL" placeholder="Email Address" />';

	if( !settings.emailonly ) {

		nameInput = ' <input type="text" name="' + _name + '" id="subb-NAME" placeholder="Name" />';

	}


	// HTML
        var html = '<div id="subbscribe" style="display: none"><div class="subb-title" style="color: ' + settings.title_color + '">' + settings.title + ' <span class="close-x">&times;</span>  </div> <div class="subb-body"> <p>' + settings.text + '</p>  <div class="subb-hidden"><div class="subb-thumbnail"> <img src="' + settings.thumbnail + '" /> </div> <div class="subb-hidden"> <a href="https://shop.zingtrain.com/collections/digital-learning"><button class="subb-button show-form">' + settings.button + '</button></a> </div> </div> </div> </div> ;'

        if(getCookie('subbscribe-hidden') != 1) {

            this.append(html);

             setTimeout(function(){

               $('#subbscribe').css('display', 'block');
               $('#subbscribe').css('width', '300px' );
               $('#subbscribe').addClass('animated slideInRight');

             }, settings.delay * 1000);

        }

        // Update CSS classes
        $('#subbscribe .subb-button').css('background-color', settings.color);

        /*
        ===============================================================================
          Events
        ===============================================================================
        */

        $('#subbscribe .close-x').click(function(){

            $('#subbscribe').toggleClass('slideInRight fadeOut');
            $('#subbscribe').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

                $('#subbscribe').remove();
                setCookie('subbscribe-hidden', 1, 1); // Hide for a day

            });

            settings.onClose.call();

        });

        // $('#subbscribe .show-form').click(function(){

        //     $('#subbscribe .subb-hidden').hide();
        //     $('#subbscribe .subb-form').show();

        // });

        // $('#mc-embedded-subbscribe-form').submit(function(e){

        //    e.preventDefault();

        //    if( formValidation() ) {

        //         $('#subbscribe .subbscribe-error').slideUp();
        //         $('#subbscribe .submit-form').attr('disabled', 'disabled');

        //         $.ajax({

        //             url: _action,
        //             type: 'post',
        //             data: $(this).serialize(),
        //             dataType: 'json',
        //             contentType: "application/json; charset=utf-8",

        //             success: function (data) {

        //                if ( isError(data) ) {

        //                    	console.log('Subbscribe Error: submission failed.');

        //                }
		      //  else {

        //                     //SUCCESS
        //                     resetFormFields()
        //                     $('.subbscribe-success').slideDown();

        //                     setTimeout(function(){ $('#subbscribe').addClass('animated fadeOut'); }, 2000);
        //                     $('#subbscribe').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){

        //                         $('#subbscribe').remove();
        //                         setCookie('subbscribe-hidden', 1, 365); // Hide for a year

        //                         if(typeof settings.onSubbscribe === 'function'){
        //                             settings.onSubbscribe.call();
        //                         }

        //                     });

        //                }
        //             }

        //         });

        //    } else {

        //         $('#subbscribe .subbscribe-error').slideDown();

        //    }

        // });

        /*
        ===============================================================================
          Helpers
        ===============================================================================
        */


        function setCookie(cname, cvalue, exdays) {

            var d = new Date();
            d.setTime(d.getTime() + (exdays*24*60*60*1000));
            var expires = "expires="+d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/";

        }

        function getCookie(cname) {

            var name = cname + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)==' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
            }

            return "";

        }

    }

}(jQuery));
