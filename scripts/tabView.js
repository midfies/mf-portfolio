var tabView = {};
$(window).trigger('resize');
tabView.handleMainNav = function () {
  $(window).resize(function() {
      // This will fire each time the window is resized:
    if($(window).width() <= 760) {
      $('.main-nav').on('mouseenter', function(){
        $('.main-nav ul').show();
      });
      $('.main-nav').on('mouseleave', function(){
        $('.main-nav ul').hide();
      });
    } else {
      $('.main-nav ul').show();
    }
    $(window).trigger('resize');
  });


  $('.main-nav').on('click', '.tab', function() {

    $('.tab-content').hide();
    $('.main-nav ul').hide();
    var $tab = $(this).attr('data-content');
    if($tab === 'homeSection'){
      $('.tab-content').fadeIn();
      $(window).trigger('resize');
    }
    console.log($tab);
    $('#' + $tab).fadeIn();
    $(window).trigger('resize');
  });
  $('.main-nav .tab:first').click();
  // $(window).trigger('resize');
};

tabView.handleMainNav();
