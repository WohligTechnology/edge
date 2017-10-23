myApp.factory('NavigationService', function ($http) {
    var navigation = [{
            name: "Home",
            classis: "active",
            anchor: "home",
            subnav: [{
                name: "Subnav1",
                classis: "active",
                anchor: "home"
            }]
        }, {
            name: "Form",
            classis: "active",
            anchor: "form",
            subnav: []
        },
        {
            name: "Grid",
            classis: "active",
            anchor: "grid",
            subnav: []
        }
    ];
    return {
        getNavigation: function () {
            return navigation;
        },
        callApiWithData: function (url, data, callback) {
            $http.post(adminurl + url, data).then(function (data) {
                callback(data);
            });
        },
        callApi: function (url, callback) {
            console.log("data", url)
            $http.post(adminurl + url).then(function (data) {
                callback(data);
            });
        }

    };
});