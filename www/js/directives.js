angular.module('MyApp.directives', []);

angular.module('egemaroc.directives').directive('dynamicHeight', function() {
  return {
    require: ['^ionSlideBox'],
    link: function(scope, elem, attrs, slider) {
      scope.$watch(function() {
        return slider[0].__slider.selected();
      }, function(val) {
        //getting the height of viewport
        var newHeight = window.getComputedStyle(elem.parents('ion-content')[0], null).getPropertyValue("height");
        if (parseInt(newHeight) > 0) {
          var ionScrollTag = elem.find('ion-scroll')[0];
          ionScrollTag.style.height = newHeight;
        }
      });
    }
  };
});
