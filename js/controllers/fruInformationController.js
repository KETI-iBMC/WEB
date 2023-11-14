app.controller('FruInformationController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    '$location',
    '$rootScope',
    function (
        $scope,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        $location,
        $rootScope
    ) {
        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/
        $scope.init = function () {
            if(!$rootScope.isLogin) {
                $location.url('/login');
                return;
            }

            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.FRU.FRU_INFO).then(
                function (response) {
                    $scope.fruInfos = response.data.FRU_JSON;

                    if ($scope.fruInfos && $scope.fruInfos.length > 0) {
                        $scope.fruInfo = $scope.fruInfos[0];
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.FRU.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        };

        $scope.goModify = function () {
            $location.path('/fruInformationModify/' + encodeURIComponent(JSON.stringify($scope.fruInfo)));
        };

        $scope.update = function () {
            $scope.fruInfo = $scope.info;
        };
    }
]);