var mySwiper;
myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
    $scope.template = TemplateService.getHTML("content/home.html");
    TemplateService.title = "Home"; //This is the Title of the Website
    $scope.navigation = NavigationService.getNavigation();
    $scope.companyView = true;
    $scope.company = [];
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
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            // console.log(data.data.data.description);
            $scope.catDesc = data.data.data.description;
            // console.log(data.data.data.company);
            $scope.companyView = false;
            $scope.categoryId = categoryId;
            $scope.company = data.data.data.company;
            $scope.categoryName = data.data.data.name;
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
    $scope.scrollData();
    $scope.companyvote = [];
    $scope.getCompanyData = function (categoryId) {
        // console.log(categoryId);
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            $scope.companyView = false;
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

    $scope.getCompanyDescription = function (categoryId) {
        // console.log(categoryId);
        $scope.company = [];
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            // console.log(data.data.data.description);
            $scope.catDesc = data.data.data.description;
            $scope.companyView = false;

        });
    }
    $scope.changeCompany = function (company) {
        // console.log(company.companyObj);
        $scope.compDesc = company.description;
        $scope.companyId = company._id;
        $scope.companyname = company.companyObj.name;
        // console.log($scope.companyname);
        $scope.facebookurl = "https://www.facebook.com/sharer/sharer.php?u=www.moneycontrol.com/rubique/&quote='I have voted for " + $scope.companyname + " company for the FintechEdge Awards. Every vote counts, vote now –www.moneycontrol.com/rubique/'";
        $scope.twitterurl = "http://www.twitter.com/share?url=http%3A%2F%2Fwww.moneycontrol.com%2Frubique%2F&text=I have voted for " + $scope.companyname + " company for the FintechEdge Awards. Every vote counts, vote now&hashtags=FintechEdgeAwards";
      
    }
    $scope.submitVote = function () {
        // console.log($scope.companyId)
        if (!$scope.companyId) {
            $scope.errormessage = {
                name: "Please select a option"
            };
            // console.log($scope.errormessage);
        } else {
            NavigationService.callApiWithData('VoteLog/AddVoteLog', {
                category: $scope.categoryId,
                company: $scope.companyId,
            }, function (data) {
                // console.log(data);
                $("<a>").attr("href", $scope.facebookurl).attr("target", "_blank")[0].click();
                // console.log($scope.companyname);
                  $uibModal.open({
                    animation: true,
                    templateUrl: 'views/modal/success.html',
                    scope: $scope,
                    size: 'lg',
                });

            });
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