
myApp.controller('FormCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
        $scope.template = TemplateService.getHTML("content/form.html");
        TemplateService.title = "Form"; //This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
        $scope.formSubmitted = false;
        // $scope.data = {
        //     name: "Chintan",
        //     "age": 20,
        //     "email": "chinyan@wohlig.com",
        //     "query": "query"
        // };
        $scope.submitForm = function (data) {
            console.log("This is it");
            return new Promise(function (callback) {
                $timeout(function () {
                    callback();
                }, 5000);
            });
        };
    })
    .controller('LoginCtrl', function ($scope, TemplateService, NavigationService, $timeout, $stateParams, $state, toastr) {
        //Used to name the .html file
      
      
        $scope.template = TemplateService;
        $scope.currentHost = window.location.origin;
        console.log($state.current.name);
        console.log('Inside controller',$stateParams.id);
        if ($stateParams.id) {
            if ($stateParams.id === "AccessNotAvailable") {
                toastr.error("You do not have access for the Backend.");
            } else {
                console.log($stateParams.id);
                NavigationService.parseAccessToken($stateParams.id, function () {
                    NavigationService.profile(function () {
                        $state.go("home");
                    }, function () {
                        $state.go("login");
                    });
                });
            }
        } else {
            NavigationService.removeAccessToken();
        }

    })
    .controller('GridCtrl', function ($scope, TemplateService, NavigationService, $timeout, toastr, $http) {
        $scope.template = TemplateService.getHTML("content/grid.html");
        TemplateService.title = "Grid"; // This is the Title of the Website
        $scope.navigation = NavigationService.getNavigation();
    })
    .controller('AccessController', function ($scope, TemplateService, NavigationService, $timeout, $state) {
        // console.log($.jStorage);
        console.log($.jStorage.get("accessToken"));
        if ($.jStorage.get("accessToken")) {
            
        } else {
            $state.go("login");
        }
    })
    // Example API Controller
    .controller('DemoAPICtrl', function ($scope, TemplateService, apiService, NavigationService, $timeout) {
        apiService.getDemo($scope.formData, function (data) {
            console.log(data);
        });
    });