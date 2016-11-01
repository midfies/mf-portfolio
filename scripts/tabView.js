var tabView = {};

tabView.handleMainNav = function () {
  $('.main-nav').on('click', '.tab', function() {

    $('.tab-content').hide();
    var $tab = $(this).attr('data-content');
    if($tab === 'homeSection'){
      $('.tab-content').fadeIn();
    }
    $('#' + $tab).fadeIn();
  });
  $('.main-nav .tab:first').click();
};

tabView.renderProjectPage = function() {
  Project.allProjects.forEach(function(a){
    $('#projectSection').append(a.toHtml('#project-template'));
  });
  tabView.handleMainNav();
};

Project.fetchAll();
