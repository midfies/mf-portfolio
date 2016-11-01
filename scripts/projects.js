var projects = [];

function Project (projectsList) {
  for (var keys in projectsList) {
    this[keys] = projectsList[keys];
  }
};

Project.allProjects = [];

Project.prototype.toHtml = function(scriptTemplate) {
  var templateRender = Handlebars.compile($(scriptTemplate).text());
  this.daysAgo = parseInt((new Date() - new Date(this.date)) / 60 / 60 / 24 / 1000);
  this.postedDate = this.date ? 'Posted ' + this.daysAgo + ' days ago' : '(draft)';
  return templateRender(this);
};

Project.loadAll = function(inputData) {;
  inputData.sort(function(a,b) {
    return (new Date(b.date)) - (new Date(a.date));
  })
  .forEach(function(ele) {
    Project.allProjects.push(new Project(ele));
  });
};


// Project.fetchAll = function() {
//   if (localStorage.projects) {
//     var dataFromStorage = localStorage.getItem('projects');
//     var parseData = JSON.parse(dataFromStorage);
//     Project.loadAll(parseData);
//     tabView.renderProjectPage();
//   } else {
//     $.getJSON('data/portfolioProjects.json', function(json) {
//       var dataString = JSON.stringify(json);
//       localStorage.setItem('projects', dataString);
//       Project.loadAll(json);
//       tabView.renderProjectPage();
//     });
//   }
// };
Project.fetchAll = function() {

  if (localStorage.projects) {
    var storedETag = localStorage.getItem('etag-portfolio');
    $.ajax({
      type: 'HEAD',
      url: 'data/portfolioProjects.json',
      success: function (result, message, xhr) {
        var etags = xhr.getResponseHeader('ETag');
        console.log(storedETag, 'storedETag');
        console.log(etags, 'etags');
        if(storedETag !== etags){
          localStorage.setItem('etag-portfolio', etags);
          $.ajax({
            type: 'GET',
            url: 'data/portfolioProjects.json',
            success: function (result) {
              localStorage.setItem('projects', JSON.stringify(result));
              Project.display();
            }
          });
        } else {
          Project.display();
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
        Project.display();
      }
    });
  }
};

Project.display = function(){
  var dataFromStorage = localStorage.getItem('projects');
  var parseData = JSON.parse(dataFromStorage);
  Project.loadAll(parseData);
  tabView.renderProjectPage();
};
