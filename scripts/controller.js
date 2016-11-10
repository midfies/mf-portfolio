(function(module){
  var controller = {};

  controller.homeReveal = function() {
    $('.tab-content').hide();
    $('#introSection').fadeIn();
  };

  controller.aboutReveal = function() {
    $('.tab-content').hide();
    $('#aboutSection').fadeIn();
  };

  controller.projectReveal = function() {
    $('.tab-content').hide();
    $('#projectSection').fadeIn();
  };

  controller.contactReveal = function() {
    $('.tab-content').hide();
    $('#contactSection').fadeIn();
  };

  module.controller = controller;
})(window);
