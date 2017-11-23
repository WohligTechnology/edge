var mySwiper;
myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, $stateParams, $window) {
    $scope.template = TemplateService.getHTML("content/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.companyView = true;
    $scope.company = [];
    console.log($stateParams);
    console.log($state.current.name);
    $scope.category = function () {
        NavigationService.callApiWithData('Category/search', {}, function (data) {
            var category = [];
            var logo = '../img/ge.png';


            // for (var i in data.data.data.results) {
            //     category.push({img: logo, value: data.data.data.results[i]._id});

            //   }
            $scope.category = data.data.data.results;
            // console.log("category", $scope.category);

        });
    };
    $scope.category();
    $scope.getCompany = function (categoryId) {
        // console.log(categoryId);
        $scope.company = [];
        $scope.sideNavActiveMenu = categoryId;
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            // console.log(data.data.data.description);
            if ($.jStorage.get("accessToken")) {
                $scope.catDesc = data.data.data.description;
                // console.log(data.data.data.company);
                $scope.companyView = false;
                $scope.categoryId = categoryId;
                $scope.company = data.data.data.company;
                $scope.catActiveMenu = $scope.company[0]; // For active menu we need to set it to 1st
                $scope.categoryName = data.data.data.name;
            } else {
                $scope.companyView = true;
                $scope.currentHost = window.location.origin;
                // $uibModal.open({
                //     animation: true,
                //     templateUrl: 'views/content/login.html',
                //     scope: $scope,
                //     size: 'lg',
                // });
            }
            // console.log(">>>>>>");
            // console.log($scope.categoryName);


        });
    };

    $scope.scrollData = function () {
        $timeout(function () {
            $('html,body').animate({
                scrollTop: $(".vote-now").offset().top
            }, 'slow');
        }, 1000);
    };

    // $timeout(function () {
    //     $(window).scroll(function () {
    //         $(".scroll-top").css("display", "block");
    //         var scroll = $(window).scrollTop();
    //         if (scroll >= $(document).height() - ($(window).height() + 600)) {
    //             $(".scroll-top").css("display", "none");
    //         }
    //     })
    // }, 300);
    $scope.scrollData();
    $scope.companyvote = [];
    $scope.getCompanyData = function (categoryId) {
        // console.log(categoryId);
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            //  $scope.companyView = false;
            $scope.totalVoteCount = 0;
            $scope.companyvote = data.data.data.company;
            _.each($scope.companyvote, function (value) {
                $scope.totalVoteCount += value.voteCount;
            })
            // console.log("$scope.totalVoteCount", $scope.totalVoteCount);
            $scope.categoryName = data.data.data.name;
        });
        $scope.mySwiperData();
    };

    // $scope.getCompanyData();
    // Add to board modal
    $scope.categoryValue = {
        boardId: null,
        value: null
    };
    $scope.categoryConfig = {
        create: true,
        valueField: 'id',
        labelField: 'name',
        placeholder: 'Select a Category',
        searchField: ["name"],
        maxItems: 1,
        onInitialize: function () {
            $scope.category();
        },
    };

    $scope.mySwiperData = function () {
        $timeout(function () {
            if (screen.width < 767) {
                mySwiper = new Swiper('.leader-board .swiper-container', {
                    slidesPerView: 2,
                    pagination: true,
                    loop: true,
                    autoplay: 2500,
                    grabCursor: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                });
            } else {
                mySwiper = new Swiper('.leader-board .swiper-container', {
                    slidesPerView: 4,
                    pagination: true,
                    loop: true,
                    autoplay: 2500,
                    grabCursor: true,
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                });
            }

            $(".leader-board .swiper-container").hover(function () {
                mySwiper.stopAutoplay();
            }, function () {
                mySwiper.startAutoplay();
            });
        }, 600);
    }

    $scope.displayLogout = function () {
        if (_.isEmpty($.jStorage.get("profile"))) {
            return false;
        } else {
            return true;
        }
    }

    $scope.logout = function () {
        $.jStorage.flush();
        $window.location.reload();
    }

    $scope.getCompanyDescription = function (categoryId) {
        // console.log(categoryId);
        $scope.company = [];
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            // console.log(data.data.data.description);
            $scope.catDesc = data.data.data.description;
            // $scope.companyView = false;

        });
    }
    $scope.changeCompany = function (company) {
        // console.log(company.companyObj);
        $scope.catActiveMenu = company;
        $scope.compDesc = company.description;
        $scope.companyId = company.companyObj._id;
        $scope.companyname = company.companyObj.name;
        console.log($scope.companyname);
        $scope.facebookurl = "https://www.facebook.com/sharer/sharer.php?u=www.moneycontrol.com/rubique/&quote='I have voted for " + $scope.companyname + " company for the Fintech Edge Awards. Every vote counts, vote now –www.moneycontrol.com/rubique/'";
        $scope.twitterurl = "http://www.twitter.com/share?url=http%3A%2F%2Fwww.moneycontrol.com%2Frubique%2F&text=I have voted for " + $scope.companyname + " company for the Fintech Edge Awards. Every vote counts, vote now&hashtags=FintechEdgeAwards";
        $scope.linkedInurl = "http://www.linkedin.com/shareArticle?mini=true&amp;url=www.moneycontrol.com/rubique/";
    }
    $scope.submitVote = function () {
        console.log($scope.companyId);
        if (!$scope.companyId) {
            $scope.errormessage = {
                name: "Please select a option"
            };
            // console.log($scope.errormessage);
        } else {
            var userId = '';
            var profile = $.jStorage.get("profile");
            if (profile) {
                userId = profile._id
            }
            if (userId) {
                NavigationService.callApiWithData('VoteLog/AddVoteLog', {
                    category: $scope.categoryId,
                    company: $scope.companyId,
                    userId: userId
                }, function (data) {
                    // console.log(data);
                    if ($.jStorage.get("profile").loginProvider == 'facebook') {
                        $("<a>").attr("href", $scope.facebookurl).attr("target", "_blank")[0].click();
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modal/success.html',
                            scope: $scope,
                            size: 'lg',
                        });
                    } else if ($.jStorage.get("profile").loginProvider == 'twitter') {
                        $("<a>").attr("href", $scope.twitterurl).attr("target", "_blank")[0].click();
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modal/success.html',
                            scope: $scope,
                            size: 'lg',
                        });
                    } else if ($.jStorage.get("profile").loginProvider == 'linkedin') {
                        console.log($scope.linkedInurl);
                        $("<a>").attr("href", $scope.linkedInurl).attr("target", "_blank")[0].click();
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modal/success.html',
                            scope: $scope,
                            size: 'lg',
                        });
                    } else {
                        $uibModal.open({
                            animation: true,
                            templateUrl: 'views/modal/success.html',
                            scope: $scope,
                            size: 'lg',
                        });
                    }
                });
            } else {
                $scope.errormessage = {
                    name: "Please log in first"
                };
            }
        }
    }


    var abc = _.times(100, function (n) {
        return n;
    });

    var i = 0;
    $scope.buttonClick = function () {
        i++;
        // console.log("This is a button Click");
    };


    // $('html,body').animate({
    //     scrollTop: $(".vote-now").offset().top
    // }, 'slow');

    $scope.section = {
        one: "views/content/home/main.html",
        two: "views/content/home/about.html",
        three: "views/content/home/leader-board.html",
        four: "views/content/home/category.html",
        five: "views/content/home/nomination.html",
        six: "views/content/home/partner.html",
    };

    $scope.voteAgain = function () {
        $scope.company = [];
        $scope.compDesc = "";
    }
})