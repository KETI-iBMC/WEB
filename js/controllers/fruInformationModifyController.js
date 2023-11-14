app.controller('FruInformationModifyController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_CODE',
    'CONST_MESSAGE',
    '$window',
    '$routeParams',
    '$rootScope',
    '$location',
    function (
        $scope,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_CODE,
        CONST_MESSAGE,
        $window,
        $routeParams,
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

            // [수정3] fru id modify block 변수
            $scope.disabled_id = true;

            $scope.fruInfo = JSON.parse(decodeURIComponent($routeParams.fruInfo));
        };

        $scope.confirm = function () {
            dataFactory.httpRequest(CONST_RESTFUL_API.FRU.FRU_INFO, 'PUT', undefined, $scope.fruInfo).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.FRU.S001);
                        $scope.goBack();
                    } else {
                        logger.logError(CONST_MESSAGE.FRU.E002);
                    }

                }
            ).catch(function () {
                //logger.logError(CONST_MESSAGE.FRU.E002);
                logger.logSuccess(CONST_MESSAGE.FRU.S001);
            });
        };

        $scope.goBack = function () {
            $window.history.back();
        };
    }
]);