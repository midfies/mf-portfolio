(function(module) {
  var projectView = {};

  projectView.handleLanguageFilter = function() {
    var projectsWithLanguage = [];
    $('#language-filter').on('change', function() {
      if ($(this).val()) {
        $('.project').hide();
        var valToFind = $(this).val();
        Project.allProjects.map(function(data, idx, arr){
          data.languages.forEach(function(lang){
            if (lang === valToFind){
              projectsWithLanguage.push(arr[idx]);
            }
          });
          return projectsWithLanguage;
        });
        projectsWithLanguage.forEach(function(toDisplay){
          $('.project[data-id="' + toDisplay.title + '"]').fadeIn();
        });

      } else {
        $('.project').fadeIn();
      }
      $('#language-filter').val('');
      projectsWithLanguage = [];
    });
  };

  projectView.handleLibraryFilter = function() {
    var projectsWithLibrary = [];
    $('#library-filter').on('change', function() {
      if ($(this).val()) {
        $('.project').hide();
        var valToFind = $(this).val();
        Project.allProjects.map(function(data, idx, arr){
          data.libraries.forEach(function(lib){
            if (lib === valToFind){
              projectsWithLibrary.push(arr[idx]);
            }
          });
          return projectsWithLibrary;
        });
        projectsWithLibrary.forEach(function(toDisplay){
          $('.project[data-id="' + toDisplay.title + '"]').fadeIn();
        });

      } else {
        $('.project').fadeIn();
      }
      $('#library-filter').val('');
      projectsWithLibrary = [];
    });
  };

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
    projectView.handleLibraryFilter();
    projectView.handleLanguageFilter();
  };

  projectView.show = function(func,  tag, id){
    var list = func();
    list.forEach(function(item){
      $('#' + id).append('<' + tag + '>' + item + '</' + tag + '>');
    });
  };

  Project.fetchAll();

  module.projectView = projectView;
})(window);
