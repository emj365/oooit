/***
 * Gallery
 */
$(document).ready(function() {
  var opt = {
    delegate: 'a', // child items selector, by clicking on it popup will open
    type: 'image',
    // other options
    gallery: {
      // options for gallery
      enabled: true
    }
  }
  $('.gallery1').magnificPopup(opt);
  $('.gallery2').magnificPopup(opt);
  $('.gallery3').magnificPopup(opt);
});

/***
 * contact form
 */
jQuery(document).ready(function ($) {
  // ajax submit form
  var contact_form = $('form#message_form');
  var submit_btn = $('input#submit_btn');
  var validEmail = function(v) {
    var r = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?");
    return (v.match(r) == null) ? false : true;
  }
  var showSendError = function() {
    submit_btn.val('Error').css('background', 'red').css('color', 'white');
    alert('Sorry, failed to send message.\nPlease contact info@oooit.com.');
  };
  var checkFrom = function() {
    var email = $('#contact_email');
    if (email.val().trim() === '') {
      email.next().css('color', 'red');
      email.focus();
      return false;
    }
    if (!validEmail(email.val())) {
      email.next().text('please check email format.').css('color', 'red');
      email.focus();
      return false;
    }
    email.next().text('*').css('color', '');
    return true;
  };

  contact_form.submit(function() {
    if (!checkFrom()) {
      return false;
    }
    submit_btn.val('Sending...').css('background', 'yellow').attr('disabled', 'disabled');
    $.ajax({
      url:  contact_form.attr('action'),
      type: 'post',
      data: contact_form.serialize(),
      success: function(data) {
                 if ( data.trim() === 'ok' ) {
                   submit_btn.val('Sent').css('background', 'LightBlue');
                 } else {
                   showSendError();
                 }
               }
    }).fail(showSendError);
    return false;
  });
});

/***
 * smooth scroll
 */
jQuery(document).ready(function ($) {
  $('a').click(function(){
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 200);
      return false;
  });
});
