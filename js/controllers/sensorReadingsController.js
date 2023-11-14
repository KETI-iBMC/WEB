app.controller('SensorReadingsController', [
    '$scope',
    '$q',
    '$timeout',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$rootScope',
    '$location',
    function (
        $scope,
        $q,
        $timeout,
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
        function getSensorInfo() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.SENSOR_INFO).then(
                function (response) {
                    console.log('Sensor info. getting done');
                    $scope.sensorInfo = response.data.SENSOR_INFO;

                    if(!$scope.selectedSensor) {
                        $scope.selectedSensor = $scope.sensorInfo.SENSOR[0];
                    }

                    setAllSensorStatus();

                    return $q.resolve(response);
                },
                function (error) {
                    console.log(error);
                    return $q.reject(error);
                }
            ).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setAllSensorStatus() {
            for (var i = 0; i < $scope.sensorInfo.SENSOR.length; i++) {
                setSensorStatus($scope.sensorInfo.SENSOR[i]);
            }
        }

        function setSensorStatus(sensor) {

            if((parseFloat(sensor.READING) < parseFloat(sensor.LC))
            || (parseFloat(sensor.READING) > parseFloat(sensor.UC)))
            {
                sensor.STATUS = 'Critical';
                sensor.THRESHOLD = 'Critical';
            }
            else
            {
                sensor.STATUS = 'Normal';
                sensor.THRESHOLD = 'Normal';
            }

            if(parseFloat(sensor.READING) == 0)
            {
                sensor.STATUS = 'Normal';
                sensor.THRESHOLD = 'Normal';
            }
            
        }

        function refreshSensorInfo() {
            $timeout.cancel($scope.timer);
            getSensorInfo();
            $scope.timer = $timeout(refreshSensorInfo, $scope.interval);
        }

        function saveThresholdInfo() {
            var params = {
                SENSOR: $scope.ethName,
                LNR: $scope.ethLNR,
                UNR: $scope.ethUNR,
                LC: $scope.ethLC,
                UC: $scope.ethUC,
                LNC: $scope.ethLNC,
                UNC: $scope.ethUNC
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.SENSOR_INFO, 'PUT', undefined, params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.SERVER_HEALTH.SENSOR_READINGS.S001);
                        getSensorInfo();
                        angular.element("#editThresholdModal").modal('hide');
                    } else {
                        logger.logError(CONST_MESSAGE.SERVER_HEALTH.SENSOR_READINGS.E002);
                    }
                },
                function (error) {
                    console.log(error);
                    logger.logError(CONST_MESSAGE.SERVER_HEALTH.SENSOR_READINGS.E003);
                }
            );
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

            $scope.timer = null;
            $scope.interval = 3000;
            $rootScope.showSpinner = true;
            getSensorInfo().then(
                function () {
                    $scope.timer = $timeout(refreshSensorInfo, $scope.interval);
                },
                function () {
                    logger.logError(CONST_MESSAGE.SERVER_HEALTH.SENSOR_READINGS.E001);
                    $timeout.cancel($scope.timer);
                }
            );
        };

        $scope.didClickSensor = function (sensor) {
            $scope.selectedSensor = sensor;
            $scope.selectedSensorName = sensor.NAME;
        };

        $scope.editThreshold = function (sensor) {
            $scope.ethName = sensor.NAME;
            $scope.ethLNR = sensor.LNR;
            $scope.ethUNR = sensor.UNR;
            $scope.ethLC = sensor.LC;
            $scope.ethUC = sensor.UC;
            $scope.ethLNC = sensor.LNC;
            $scope.ethUNC = sensor.UNC;
        };

        $scope.saveThreshold = function () {
            saveThresholdInfo();
        };

        $scope.$on("$destroy", function () {
            console.log('SensorReadingsController $destroy !!!!')
            $timeout.cancel($scope.timer);
        });
    }
]);