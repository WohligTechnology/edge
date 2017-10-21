var mySwiper;
myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();

    $scope.nominaton = [{
            img: 'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
            value: '',
        },
        {
            img: 'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
            value: '',
        },
        {
            img: 'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
            value: '',
        },
        {
            img: 'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg',
            value: '',
        },
    ];
    var abc = _.times(100, function (n) {
        return n;
    });

    var i = 0;
    $scope.buttonClick = function () {
        i++;
        console.log("This is a button Click");
    };



    $scope.section = {
        one: "views/content/home/main.html",
        two: "views/content/home/about.html",
        three: "views/content/home/leader-board.html",
        four: "views/content/home/category.html",
        five: "views/content/home/nomination.html",
        six: "views/content/home/partner.html",
    };


    $scope.$on('$viewContentLoaded', function (event) {

        $timeout(function () {
            mySwiper = new Swiper('.swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 4,
                paginationClickable: true,
                loop: true,
                autoplay: 2500,
                grabCursor: true
            });
            $(".swiper-container").hover(function () {
                mySwiper.stopAutoplay();
            }, function () {
                mySwiper.startAutoplay();
            });
        }, 300)
    });

})