var mySwiper;
myApp.controller('HomeCtrl', function ($scope, TemplateService, NavigationService, $timeout, $uibModal) {
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
            console.log("category", $scope.category);

        });
    };
    $scope.category();
    $scope.getCompany = function (categoryId) {
        console.log(categoryId);
        $scope.company = [];
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            // console.log(data.data.data.description);
            $scope.catDesc = data.data.data.description;
            console.log(data.data.data.company);
            $scope.companyView = false;
            $scope.categoryId = categoryId;
            $scope.company = data.data.data.company;
            $scope.categoryName = data.data.data.name;
            console.log(">>>>>>");
            console.log($scope.categoryName);

        });
    };

    $scope.getCompanyData = function (categoryId) {
        console.log(categoryId);
        $scope.company = [];
        NavigationService.callApiWithData('Category/getOne', {
            _id: categoryId
        }, function (data) {
            $scope.companyView = false;
            $scope.totalVoteCount = 0;
            $scope.company = data.data.data.company;
            _.each($scope.company, function (value) {
                $scope.totalVoteCount += value.voteCount;
            })
            console.log("$scope.totalVoteCount", $scope.totalVoteCount);
            $scope.categoryName = data.data.data.name;
        });
        $timeout(function () {
            mySwiper = new Swiper('.leader-board .swiper-container', {
                slidesPerView: 4,
                pagination: true,
                loop: true,
                autoplay: 2500,
                grabCursor: true,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
            });
            $(".leader-board .swiper-container").hover(function () {
                mySwiper.stopAutoplay();
            }, function () {
                mySwiper.startAutoplay();
            });
        }, 1000);
    };
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
        console.log($scope.companyId)
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
})