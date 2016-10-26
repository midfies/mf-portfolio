var projects = [];

function Project (projectsList) {
  this.title = projectsList.title;
  this.linkUrl = projectsList.linkUrl;
  this.image = projectsList.image;
  this.summary = projectsList.summary;
  this.date = projectsList.date;
};

Project.prototype.toHtml = function() {
  var $newProject = $('article.template').clone();
  $newProject.find('a').attr('href', this.linkUrl);
  $newProject.find('h2').html(this.title);
  $newProject.find('img').attr('src', this.image);
  $newProject.find('p.summaryOfProject').html(this.summary);
  $newProject.find('p.dateOfProject').html(this.date);
  $newProject.find('time[pubdate]').attr('title', this.date);
  $newProject.find('time').text('about ' + parseInt((new Date() - new Date(this.date))/60/60/24/1000) + ' days ago');
  $newProject.removeClass('template');
  $newProject.addClass('project');
  return $newProject;
};

/* This sort method is a standard JavaScript Array function
   that will iterate over an array and compare its values,
   and then arrange them in ascending or descending order
   according to the return value. We are comparing the
   publishedOn properties to arrange the blog posts in
   descending order (most recent first). */
portfolioProjects.sort(function(currentObject, nextObject) {
  return (new Date(nextObject.date)) - (new Date(currentObject.date));
});

portfolioProjects.forEach(function(ele) {
  projects.push(new Project(ele));
});

projects.forEach(function(project) {
  $('#projectSection').append(project.toHtml());
});
