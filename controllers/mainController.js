(function() {
    var isLocal = window.location.hostname === 'localhost',
        url = isLocal ? 'https://upload.wistia.com/?api_password=cf9cb9f3870df3d962510e1edfd486cafd918fdaaaae1435d71537de5091814e' : '404.html';

    var app = angular.module('upload-wistia', ['blueimp.fileupload'])
        .config([
            '$httpProvider', 'fileUploadProvider',
            function($httpProvider, fileUploadProvider) {
                angular.extend(fileUploadProvider.defaults, {
                    disableImageResize: /Android(?!.*Chrome)|Opera/
                        .test(window.navigator.userAgent)
                });
            }
        ]);

    app.controller('UploadController', ['$scope', '$http', '$filter', '$window',
        function($scope, $http) {
            $scope.options = {
                url: url
            };

            $scope.loadingFiles = true;
            $scope.$on('fileuploaddone', function(event, fileResult) {
                console.log("Uploaded - hashed_id:" + fileResult.result.hashed_id);
            });

            $http.post(url)
                .then(
                    function(response) {
                        $scope.loadingFiles = false;
                        $scope.queue = response.data.files || [];

                    },
                    function() {
                        $scope.loadingFiles = false;
                    }
                );
        }
    ]);

    app.controller('DeleteFileController', ['', function() {

    }]);

})();
