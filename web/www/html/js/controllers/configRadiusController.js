app.controller('ConfigRadiusController', [
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
         * functions
         *
         ***************************************************************************************************************/
        function getRadiusInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.RADIUS).then(
                function (response) {
                    var radiusInfo = response.data.RADIUS_INFO;

                    $scope.radiusEnable = radiusInfo.RADIUS.RADIUS_ENABLE === "1";
                    $scope.radiusPort = radiusInfo.RADIUS.PORT;
                    $scope.radiusIp = radiusInfo.RADIUS.IP;
                    $scope.radiusSecret = radiusInfo.RADIUS.SECRET;
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.RADIUS.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setRadiusInfo() {
            var params = {
                RADIUS_ENABLE: $scope.radiusEnable ? "1" : "0",
                PORT: $scope.radiusPort,
                IP: $scope.radiusIp,
                SECRET: $scope.radiusSecret
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.RADIUS, 'POST', params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.RADIUS.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.RADIUS.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.RADIUS.E003);
            });
        }

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

            getRadiusInfo();
        };

        $scope.save = function () {
            setRadiusInfo();
        };

        $scope.reset = function () {
            getRadiusInfo();
        };
    }
]);