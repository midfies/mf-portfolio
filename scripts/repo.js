(function(module) {
  var repos = {};

  repos.allRepos = [];
  repos.langList = [];
// TODO: create a githubToken.js file that we can use to generate our headers
         // properly.
  repos.requestRepos = function() {
    /* TODO: How would you like to fetch your repos? Someone say AJAX?!
      Do not forget to call the callback! */
    $.when (
      $.get('/github/users/midfies/repos', function(data){
        data = repos.removeNonOriginal(data);
        console.log(data);
        repos.allRepos = data.map(function(data, idx, arr){
          return {
            name : data.name,
            linkUrl: data.git_url,
            summary: data.description,
            date: data.updated_at,
            languageUrl: data.languages_url,
            languages: []
          };
        });
      })).then(function(data){
        var itemsProcessed = 0;
        repos.allRepos.forEach(function(eachRepo, idx, arr){
          $.get(eachRepo.languageUrl, function(data){
            itemsProcessed++;
            repos.langList.push(Object.keys(data));
            if (itemsProcessed === arr.length){
            //  console.log(repos.allRepos);
              repos.allRepos.forEach(function(eachRepo, idx, arr){
                eachRepo.languages = repos.langList[idx];
                return eachRepo;
              });
              repoView.renderRepos();
              Project.displayProjects();
            }
          });
        });

      });
  };



  repos.removeNonOriginal = function(repo){
    return repo.filter(function(data){
      return (!data.fork);
    })
    .filter(function(data){
      return (data.language);
    });
  };

  repos.withTheAttribute = function(myAttr) {
    /* NOTE: This Model method filters the full repos collection based
        on a particular attribute. For example, you could use this
        to filter all repos that have a forks_count, stargazers_count,
        or watchers_count. */
    return repos.allRepos.filter(function(aRepo) {
      return aRepo[myAttr];
    });
  };

  module.repos = repos;
})(window);
