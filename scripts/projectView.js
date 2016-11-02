// (function(module) {
  var projectView = {};

  projectView.handleMainNav = function () {
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

  projectView.renderProjectPage = function() {
    Project.allProjects.forEach(function(a){
      $('#projectSection').append(a.toHtml('#project-template'));
    });
    projectView.handleMainNav();
  };

  projectView.showLanguages = function(){
    var langList = Project.allLanguages();
    console.log(langList);
    langList.forEach(function(lang){
      $('#languageList').append('<li>' + lang + '</li>');
    });
  };
  projectView.showLibraries = function(){
    var libList = Project.allLibraries();
    console.log(libList);
    libList.forEach(function(lib){
      $('#libraryList').append('<li>' + lib + '</li>');
    });
  };


  Project.fetchAll();

  //
  // module.projectView = projectView;
// })(window);
