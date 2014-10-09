/***
 * slider
 */
jQuery(document).ready(function ($) {
  var _SlideshowTransitions = [
  //Zoom- in
  {$Duration: 1200, $Zoom: 1, $Easing: { $Zoom: $JssorEasing$.$EaseInCubic, $Opacity: $JssorEasing$.$EaseOutQuad }, $Opacity: 2 },
  ];

  var options = {
    $AutoPlay: true,                                    //[Optional] Whether to auto play, to enable slideshow, this option must be set to true, default value is false
    $AutoPlayInterval: 1500,                            //[Optional] Interval (in milliseconds) to go for next slide since the previous stopped if the slider is auto playing, default value is 3000
    $PauseOnHover: 1,                                //[Optional] Whether to pause when mouse over if a slider is auto playing, 0 no pause, 1 pause for desktop, 2 pause for touch device, 3 pause for desktop and touch device, 4 freeze for desktop, 8 freeze for touch device, 12 freeze for desktop and touch device, default value is 1

    $DragOrientation: 3,                                //[Optional] Orientation to drag slide, 0 no drag, 1 horizental, 2 vertical, 3 either, default value is 1 (Note that the $DragOrientation should be the same as $PlayOrientation when $DisplayPieces is greater than 1, or parking position is not 0)
    $ArrowKeyNavigation: true,                    //[Optional] Allows keyboard (arrow key) navigation or not, default value is false
    $SlideDuration: 600,                                //Specifies default duration (swipe) for slide in milliseconds

    $SlideshowOptions: {                     //[Optional] Options to specify and enable slideshow or not
      $Class: $JssorSlideshowRunner$,        //[Required] Class to create instance of slideshow
      $Transitions: _SlideshowTransitions,   //[Required] An array of slideshow transitions to play slideshow
      $TransitionsOrder: 1,                  //[Optional] The way to choose transition to play slide, 1 Sequence, 0 Random
      $ShowLink: true                        //[Optional] Whether to bring slide link on top of the slider when slideshow is running, default value is false
    },

    $ArrowNavigatorOptions: {              //[Optional] Options to specify and enable arrow navigator or not
      $Class: $JssorArrowNavigator$,       //[Requried] Class to create arrow navigator instance
      $ChanceToShow: 1,                    //[Required] 0 Never, 1 Mouse Over, 2 Always
      $AutoCenter: 2,                      //[Optional] Auto center navigator in parent container, 0 None, 1 Horizontal, 2 Vertical, 3 Both, default value is 0
      $Steps: 1                            //[Optional] Steps to go for each navigation request, default value is 1
    },

    $ThumbnailNavigatorOptions: {            //[Optional] Options to specify and enable thumbnail navigator or not
      $Class: $JssorThumbnailNavigator$,     //[Required] Class to create thumbnail navigator instance
      $ChanceToShow: 2,                      //[Required] 0 Never, 1 Mouse Over, 2 Always

      $ActionMode: 1,                        //[Optional] 0 None, 1 act by click, 2 act by mouse hover, 3 both, default value is 1
      $Lanes: 2,                             //[Optional] Specify lanes to arrange thumbnails, default value is 1
      $SpacingX: 14,                         //[Optional] Horizontal space between each thumbnail in pixel, default value is 0
      $SpacingY: 12,                         //[Optional] Vertical space between each thumbnail in pixel, default value is 0
      $DisplayPieces: 6,                     //[Optional] Number of pieces to display, default value is 1
      $ParkingPosition: 156,                 //[Optional] The offset position to park thumbnail
      $Orientation: 2                        //[Optional] Orientation to arrange thumbnails, 1 horizental, 2 vertical, default value is 1
    }
  };

  var jssor_slider1 = new $JssorSlider$("slider1_container", options);
  var jssor_slider2 = new $JssorSlider$("slider2_container", options);
  var jssor_slider3 = new $JssorSlider$("slider3_container", options);
  //responsive code begin
  //you can remove responsive code if you don't want the slider scales while window resizes
  function ScaleSlider(slider) {
    var parentWidth = slider.$Elmt.parentNode.clientWidth;
    if (parentWidth)
      slider.$ScaleWidth(Math.max(Math.min(parentWidth, 960), 300));
    else
      window.setTimeout(ScaleSlider, 30);
  }

  function ScaleSliders() {
    ScaleSlider(jssor_slider1);
    ScaleSlider(jssor_slider2);
    ScaleSlider(jssor_slider3);
  }

  ScaleSliders();

  if (!navigator.userAgent.match(/(iPhone|iPod|iPad|BlackBerry|IEMobile)/)) {
    $(window).bind('resize', ScaleSliders);
  }


  //if (navigator.userAgent.match(/(iPhone|iPod|iPad)/)) {
  //    $(window).bind("orientationchange", ScaleSlider);
  //}
  //responsive code end
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
                   submit_btn.val('Sent').css('background', 'none');
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