angular.module('egemaroc.controllers', [])


.controller('AppCtrl', function ($scope, $ionicModal, $timeout, $ImageCacheFactory, $http) {


    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    var images = [];

    $scope.go = function (path) {
      $location.path(path);
    };

    $http.get('js/data/partners.json')
        .success(function (data) {
            // The json data will now be in scope.
            $scope.partners = data;



            for (var i = 0; i < $scope.partners.length; i++) {
                images.push($scope.partners[i].pictureUrl);
            }

            $ImageCacheFactory.Cache(images).then(function () {
                console.log("worked");

            }, function (failed) {
                console.log("An image filed: " + failed);
            });


        });

})



  .controller('HomeCtrl', function ($scope, $stateParams, $rootScope) {


    $scope.options = {

      loop: false,
      effect: 'fade',
      speed: 500,
      autoplay: 3000

    };

    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
      // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
      console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
      // note: the indexes are 0-based
      $scope.activeIndex = data.activeIndex;
      $scope.previousIndex = data.previousIndex;
    });

    $scope.$on('$ionicView.beforeEnter', function () {
      $rootScope.viewColor = '#000';
      $rootScope.viewBorder = '#000';
    });

  })

  .controller('AboutController', function ($scope, $rootScope) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $rootScope.viewColor = '#ffc107';
      $rootScope.viewBorder = '#ffc107';
    })
  })

  .controller('MetiersController', function ($scope, $rootScope, $ionicScrollDelegate, $window) {
    $scope.$on('$ionicView.beforeEnter', function () {
      $rootScope.viewColor = '#079cff';
      $rootScope.viewBorder = '#079cff';
    });

    $scope.$on("$ionicView.loaded", function() {
      $scope.doOnOrientationChange();
      console.log('1st play');
      $window.addEventListener('orientationchange', $scope.doOnOrientationChange);
      console.log('listenerAdded');
    });

    $scope.doOnOrientationChange = function() {
      $scope.sequentialPlay();
      $scope.myScroll();
    };

    $scope.sequentialPlay = function() {
      if(ionic.Platform.platform() !== 'ios') {
        var videos = document.getElementsByTagName("video");
        for(var i = 0; i < videos.length; i++) {
          videos[i].play();
        }
      }

      else if(ionic.Platform.platform() == 'ios' && $window.innerWidth > 567)
      {
        video = document.getElementsByTagName("video")[0];
        currentVid = 1;
        video.play();
        video.addEventListener('ended', function () {
          myFunction(video, currentVid);
        });

        function myFunction(video, currentVid) {
          video = document.getElementsByTagName("video")[currentVid];
          currentVid = currentVid + 1;
          if (currentVid == 4) currentVid = 0;
          video.play();
          video.addEventListener('ended', function () {
            myFunction(video, currentVid);
          });
        }
      }
    }


    $scope.myScroll = function() {
      if(ionic.Platform.platform() == 'ios' && $window.innerWidth < 568 )
      {
        var videos = document.getElementsByTagName("video"),
          fraction = 0.9;

        for(var i = 0; i < videos.length; i++) {

          var video = videos[i];

          var x = video.offsetLeft, y = video.offsetTop, w = video.offsetWidth, h = video.offsetHeight, r = x + w, //right
            b = y + h, //bottom
            visibleX, visibleY, visible;

          visibleX = Math.max(0, Math.min(w, $ionicScrollDelegate.$getByHandle('scrollItem').getScrollPosition().left + $window.innerWidth - x, r - $ionicScrollDelegate.$getByHandle('scrollItem').getScrollPosition().left));
          visibleY = Math.max(0, Math.min(h, $ionicScrollDelegate.$getByHandle('scrollItem').getScrollPosition().top + $window.innerHeight - y, b - $ionicScrollDelegate.$getByHandle('scrollItem').getScrollPosition().top));

          visible = visibleX * visibleY / (w * h);

          if (visible > fraction) {
            video.play();
            break;
          } else {
            video.pause();
          }
        }
      }

    };



  })


  .controller('RealisationsController', function ($scope, $rootScope, $http, $ionicScrollDelegate) {
    $scope.link = 1;
    $scope.filtText = '';
    $scope.$on('$ionicView.beforeEnter', function () {
      $rootScope.viewColor = '#e20000';
      $rootScope.viewBorder = '#e20000';
    });

    $scope.scrollTop = function() {
      $ionicScrollDelegate.scrollTop();
    };

    $http.get('js/data/partners.json')
      .success(function (data) {
        // The json data will now be in scope.
        $scope.partners = data;
        $scope.partner = $scope.partners[0];
        console.log($scope.partners[0].name);

      });
    $scope.select = function (setLink) {

      $scope.link = setLink;
      if (setLink == 2) {
        $scope.filtText = "energie";
      } else if (setLink == 3) {
        $scope.filtText = "touristique";
      } else if (setLink == 4) {
        $scope.filtText = "habitation";
      } else if (setLink == 5) {
        $scope.filtText = "industriel";
      } else if (setLink == 6) {
        $scope.filtText = "bureaux";
      } else if (setLink == 7) {
        $scope.filtText = "hospitalier";
      } else if (setLink == 8) {
        $scope.filtText = "restaurants";

      } else {
        $scope.filtText = "";
      }
    };

    $scope.isSelected = function (checkLink) {

      return ($scope.link = checkLink);
    }

  })


  .controller('EngagementsController', function ($scope, $stateParams, $rootScope) {


    $scope.options = {
      loop: false,
      effect: 'fade',
      speed: 500,
      autoplay: 3000
    };

    $scope.$on("$ionicSlides.sliderInitialized", function (event, data) {
      // data.slider is the instance of Swiper
      $scope.slider = data.slider;
    });

    $scope.$on("$ionicSlides.slideChangeStart", function (event, data) {
      console.log('Slide change is beginning');
    });

    $scope.$on("$ionicSlides.slideChangeEnd", function (event, data) {
      // note: the indexes are 0-based
      $scope.activeIndex = data.activeIndex;
      $scope.previousIndex = data.previousIndex;
    });


    $scope.$on('$ionicView.loaded', function () {
      var mySwiper = new Swiper ('.swiper-container', {
        // Optional parameters
        direction: 'horizontal',
        loop: true,
        effect: 'coverflow',

        // If we need pagination
        pagination: '.swiper-pagination',

        // Navigation arrows
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',

        // And if we need scrollbar
        scrollbar: '.swiper-scrollbar',
      })
    });

    $scope.$on('$ionicView.beforeEnter', function () {
      $rootScope.viewColor = '#6ec33f';
      $rootScope.viewBorder = '#6ec33f';
    });


})

.controller('IntroController', function ($scope, $rootScope) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.viewColor = '#ffc107';
        $rootScope.viewBorder = '#ffc107';
    })
});

