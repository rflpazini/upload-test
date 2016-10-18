(function() {
    var url = 'https://upload.wistia.com/?api_password=cf9cb9f3870df3d962510e1edfd486cafd918fdaaaae1435d71537de5091814e';

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
            $scope.added = false;
            $scope.showMovie = false;
            $scope.fileID = 0;

            $scope.options = {
                url: url
            };

            $scope.loadingFiles = true;
            $scope.$on('fileuploaddone', function(event, fileResult) {
                console.log("Uploaded - hashed_id:" + fileResult.result.hashed_id);
                $("form").addClass("load");
                fileID = fileResult.result.hashed_id;
                $scope.showMovie = true;
            });

            $scope.$on('fileuploadadd', function(event, argument) {
                console.log("ADDED - " + argument);
                $("section").removeClass("load");
                $scope.added = true;
            });

            $scope.$on('fileuploadfail', function(eventm, argument) {
            	$scope.added = false;
            });
        }
    ]);
})();
