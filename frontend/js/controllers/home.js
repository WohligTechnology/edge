var mySwiper;
myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout) {
    $scope.template = TemplateService.getHTML("content/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.companyView = true;
    NavigationService.callApiWithData('Category/search', {}, function (data) {
        var category = [];
        var logo = '../img/ge.png';


        // for (var i in data.data.data.results) {
        //     category.push({img: logo, value: data.data.data.results[i]._id});

        //   }
        $scope.category = data.data.data.results;
        console.log(category);

    });

    $scope.getCompany = function (categoryId) {
        console.log(categoryId);
        $scope.company = [];
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            console.log(data.data.data.description);
            $scope.catDesc = data.data.data.description;
            console.log(data.data.data.company);
            $scope.companyView = false;
            $scope.categoryId = categoryId;
            $scope.company = data.data.data.company;
            console.log(">>>>>>");
            console.log($scope.company);
            // var category = [];
            // var logo = '../img/ge.png';

            // for (var i in data.data.data.results) {
            //     category.push({img: logo, value: data.data.data.results[i]._id});

            //   }
            //   $scope.category = category;
            //   console.log(category);

        });
    }

    $scope.getCompanyDescription = function (categoryId) {
        console.log(categoryId);
        $scope.company = [];
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            console.log(data.data.data.description);
            $scope.catDesc = data.data.data.description;
            $scope.companyView = false;

        });
    }
    $scope.changeCompany = function (company) {
        console.log();
        $scope.compDesc = company.description;
        $scope.companyId = company._id;
    }
    $scope.submitVote = function () {
        NavigationService.callApiWithData('VoteLog/AddVoteLog', {
            category: $scope.categoryId,
            company: $scope.companyId
        }, function (data) {
            console.log(data);
        });
    }

    $scope.nominaton = [{
            img: '../img/ge.png',
            value: '',
        },
        {
            img: '../img/burger.png',
            value: '',
        },
        {
            img: '../img/fila.png',
            value: '',
        },
        {
            img: '../img/ge.png',
            value: '',
        },
    ];

    $scope.leaderBoard = [{
            img: '../img/ge.png',
            value: '50',
        },
        {
            img: '../img/burger.png',
            value: '60',
        },
        {
            img: '../img/fila.png',
            value: '90',
        },
        {
            img: '../img/ge.png',
            value: '30',
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
            mySwiper = new Swiper('.leader-board .swiper-container', {
                slidesPerView: 4,
                pagination: true,
                loop: true,
                autoplay: 2500,
                grabCursor: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
            mySwiper = new Swiper('.category .swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 4,
                paginationClickable: true,
                loop: true,
                autoplay: 2500,
                grabCursor: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
            mySwiper = new Swiper('.nomination .swiper-container', {
                pagination: '.swiper-pagination',
                slidesPerView: 4,
                paginationClickable: true,
                loop: true,
                autoplay: 2500,
                grabCursor: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }
            });
            // $(".swiper-container").hover(function () {
            //     mySwiper.stopAutoplay();
            // }, function () {
            //     mySwiper.startAutoplay();
            // });
        }, 300)
    });

})