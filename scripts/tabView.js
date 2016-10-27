//  Configure a view object, to hold all our functions for dynamic updates and article-related event handlers.
var tabView = {};

tabView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {

    $('.tab-content').hide();
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
