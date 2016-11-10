(function(module) {
  var projects = [];

  function Project (opts) {
    Object.keys(opts).forEach(function(prop) {
      this[prop] = opts[prop];
    }, this);
  };

  Project.allProjects = [];

  Project.prototype.toHtml = function(scriptTemplate) {
    var templateRender = Handlebars.compile($(scriptTemplate).text());
    this.daysAgo = parseInt((new Date() - new Date(this.date)) / 60 / 60 / 24 / 1000);
    this.postedDate = this.date ? 'Posted ' + this.daysAgo + ' days ago' : '(draft)';
    return templateRender(this);
  };

  Project.loadAll = function(inputData) {
    Project.allProjects = inputData.sort(function(a,b) {
      return (new Date(b.date)) - (new Date(a.date));
    }).map(function(ele) {
      return new Project(ele);
    });
  };

  Project.fetchAll = function() {

    if (localStorage.projects) {
      var storedETag = localStorage.getItem('etag-portfolio');
      $.ajax({
        type: 'HEAD',
        url: 'data/portfolioProjects.json',
        success: function (result, message, xhr) {
          var etags = xhr.getResponseHeader('ETag');
          if(storedETag !== etags){
            localStorage.setItem('etag-portfolio', etags);
            $.ajax({
              type: 'GET',
              url: 'data/portfolioProjects.json',
              success: function (result) {
                localStorage.setItem('projects', JSON.stringify(result));
                Project.displayProjects();
              }
            });
          } else {
            Project.displayProjects();
          }
        }
      });

    } else {
      $.ajax({
        type: 'GET',
        url: 'data/portfolioProjects.json',
        success: function (result, message, xhr) {
          var etags = xhr.getResponseHeader('ETag');
          localStorage.setItem('etag-portfolio', etags);
          var data = JSON.stringify(result);
          localStorage.setItem('projects', data);
          Project.displayProjects();
        }
      });
    }
  };

  Project.displayProjects = function(){
    var dataFromStorage = localStorage.getItem('projects');
    var parseData = JSON.parse(dataFromStorage);
    Project.loadAll(repos.allRepos);
    projectView.handleLanguageFilter();
    projectView.show(Project.getFromProject('languages'), 'li', 'languageList');
    //projectView.show(Project.getFromProject('libraries'), 'li', 'libraryList');
    projectView.show(Project.getFromProject('languages'), 'option', 'language-filter');
  //  projectView.show(Project.getFromProject('libraries'), 'option', 'library-filter');
  };

  Project.getFromProject = function(projectKey) {
    return function() {
      return repos.allRepos
        .map(function(p) {
          return p[projectKey];
        })
        .reduce(function(a, b) {
          return a.concat(b);
        },[])
        .reduce(function(acc, cur){
          if (acc.indexOf(cur) === -1) {
            acc.push(cur);
          }
          return acc;
        },[]);
    };
  };


  module.Project = Project;
})(window);
