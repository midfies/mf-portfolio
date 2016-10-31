var tabView = {};

tabView.handleMainNav = function () {
  $('.main-nav').on('mouseenter', function(){
    $('.main-nav ul').show();
  });
  $('.main-nav').on('mouseleave', function(){
    $('.main-nav ul').hide();
  });
  $('.main-nav').on('click', '.tab', function() {

    $('.tab-content').hide();
    $('.main-nav ul').hide();
    var $tab = $(this).attr('data-content');
    if($tab === 'homeSection'){
      $('.tab-content').fadeIn();
    }
    console.log($tab);
    $('#' + $tab).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

tabView.handleMainNav();
