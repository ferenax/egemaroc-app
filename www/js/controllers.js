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

    $scope.$on('$ionicView.afterEnter', function () {
        setTimeout(function () {
            document.getElementById("swiffycontainer").style.display = "none";
        }, 8000);
    });

})




.controller('HomeCtrl', function ($scope, $stateParams, $rootScope) {



    $scope.options = {

        loop: false
        , effect: 'fade'
        , speed: 500
        , autoplay: 3000

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

.controller('MetiersController', function ($scope, $rootScope) {
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.viewColor = '#079cff';
        $rootScope.viewBorder = '#079cff';
    });
})


.controller('RealisationsController', function ($scope, $rootScope, $http, $ionicScrollDelegate) {
    $scope.link = 1;
    $scope.filtText = '';
    $scope.$on('$ionicView.beforeEnter', function () {
        $rootScope.viewColor = '#e20000';
        $rootScope.viewBorder = '#e20000';
    });

    $scope.scrollTop = function () {
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
        loop: false
        , effect: 'fade'
        , speed: 500
        , autoplay: 3000
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
        $rootScope.viewColor = '#6ec33f';
        $rootScope.viewBorder = '#6ec33f';
    });


})


.controller('IntroController', function ($scope, $rootScope, $timeout, $state) {
    $timeout(function () {
        $state.go('app.home');
    }, 3000);


});