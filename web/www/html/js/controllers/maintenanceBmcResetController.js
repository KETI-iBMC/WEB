app.controller('MaintenanceBmcResetController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$rootScope',
    '$location',
    function (
        $scope,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        CONST_CODE,
        $rootScope,
        $location
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
        };

        $scope.reset = function () {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.MAINTENANCE.BMC_RESET, 'POST').then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.MAINTENANCE.BMC_RESET.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.MAINTENANCE.BMC_RESET.E001);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.MAINTENANCE.BMC_RESET.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        };

        $scope.warm_reset = function () {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.MAINTENANCE.BMC_WARM_RESET, 'POST').then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.MAINTENANCE.BMC_WARM_RESET.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.MAINTENANCE.BMC_WARM_RESET.E001);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.MAINTENANCE.BMC_WARM_RESET.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        };        
    }
]);