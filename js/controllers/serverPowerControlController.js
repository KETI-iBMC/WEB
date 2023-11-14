app.controller('ServerPowerControlController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$rootScope',
    '$q',
    '$location',
    function (
        $scope,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        CONST_CODE,
        $rootScope,
        $q,
        $location
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
         function getServerPowerStatus() {
             return dataFactory.httpRequest(CONST_RESTFUL_API.REMOTE_CONTROL.SERVER_POWER_CONTROL).then(
                 function (response) {
                    return $q.resolve(response);
             }).catch(function (error) {
                 return $q.reject(error);
             });
        }

        function setServerPowerControl(status) {
             return dataFactory.httpRequest(CONST_RESTFUL_API.REMOTE_CONTROL.SERVER_POWER_CONTROL, 'PUT', undefined, {STATUS: status}).then(
                 function (response) {
                    return $q.resolve(response);
             }).catch(
                 function (error) {
                    return $q.reject(error);
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

            $scope.status = 0;
            $rootScope.showSpinner = true;
            getServerPowerStatus().then(
                function (response) {
                    console.log(response.data);
                    $scope.statusName = response.data.POWER.STATUS === "1" ? 'on' : 'off';
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.SYSTEM.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        };

        $scope.onClick = function () {
            if ($scope.status <= 0) {
                logger.logError(CONST_MESSAGE.SYSTEM.E001);
                return;
            }

            setServerPowerControl($scope.status).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.REMOTE_CONTROL.SERVER_POWER_CONTROL.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.REMOTE_CONTROL.SERVER_POWER_CONTROL.E001);
                    }
                },
                function (error) {
                    console.log(error);
                    logger.logError(CONST_MESSAGE.REMOTE_CONTROL.SERVER_POWER_CONTROL.E001);
                }
            );
        }
    }
]);