app.controller('SystemInformationController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    '$rootScope',
    '$location',
    function (
        $scope,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        $rootScope,
        $location
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/

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
            dataFactory.httpRequest(CONST_RESTFUL_API.SYSTEM.SYSTEM_INFO).then(
                function (response) {
                    $scope.genericInfo = response.data.GENERIC_INFO;
                    $scope.powerInfo = response.data.POWER_INFO;
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.SYSTEM.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        };


    }
]);