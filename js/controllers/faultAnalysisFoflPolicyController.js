app.controller('FaultAnalysisFoflPolicyController', [
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
        $location,

    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        //엣지에서
        function getSensorInfo() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.FAULT_ANALYSIS.FOFL_POLICY, 'GET').then(
                function (response) {
                    $scope.sensorInfo = response.data.SENSOR_INFO;

                    return response.data.SENSOR_INFO; // HTTP 응답을 그대로 반환
                },
                function (error) {
                    console.log(error);
                    return $q.reject(error);
                }
            ).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function saveThresholdInfo() {

            console.log($scope.sensor.GREEN_ACTIVATE);
            console.log($scope.sensor.YELLOW_ACTIVATE);
            console.log($scope.sensor.ORANGE_ACTIVATE);
            console.log($scope.sensor.RED_ACTIVATE);

            var params = {

                SENSOR: $scope.sensor.SENSOR.toString(),
                GREEN: $scope.sensor.GREEN.toString(),
                GREEN_ACTIVATE: $scope.sensor.GREEN_ACTIVATE,
                YELLOW: $scope.sensor.YELLOW.toString(),
                YELLOW_ACTIVATE: $scope.sensor.YELLOW_ACTIVATE,
                ORANGE: $scope.sensor.ORANGE.toString(),
                ORANGE_ACTIVATE: $scope.sensor.ORANGE_ACTIVATE,
                RED: $scope.sensor.RED.toString(),
                RED_ACTIVATE: $scope.sensor.RED_ACTIVATE
            };
            console.log(params);

            dataFactory.httpRequest(CONST_RESTFUL_API.FAULT_ANALYSIS.FOFL_POLICY, 'PUT', undefined, params).then(
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
        function calculateData(sensor) {
            // 데이터 계산
            var greenValue = sensor.GREEN;
            var yellowValue = sensor.YELLOW - sensor.GREEN;
            var orangeValue = sensor.ORANGE - sensor.YELLOW;
            var redValue = sensor.RED - sensor.ORANGE;

            return [greenValue, yellowValue, orangeValue, redValue];
        }
        function drawChart() {
            if ($scope.myChart) {
                $scope.myChart.destroy();
            }
            var ctx = document.getElementById("myChart");

            var labels = ['Temperature'];
            var data = {
                labels: labels,
                datasets: [
                    {
                        label: 'Green',
                        data: [calculateData($scope.selectedSensor)[0]],
                        borderColor: 'rgb(75, 192, 192)',
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderWidth: 2
                    },
                    {
                        label: 'Yellow',
                        data: [calculateData($scope.selectedSensor)[1]],
                        borderColor: 'rgb(255, 205, 86)',
                        backgroundColor: 'rgba(255, 205, 86, 0.2)',
                        borderWidth: 2
                    },
                    {
                        label: 'Orange',
                        data: [calculateData($scope.selectedSensor)[2]],
                        borderColor: 'rgb(255, 159, 64)',
                        backgroundColor: 'rgba(255, 159, 64, 0.2)',
                        borderWidth: 2
                    },
                    {
                        label: 'Red',
                        data: [calculateData($scope.selectedSensor)[3]],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderWidth: 2
                    }
                ]
            };
            var tooltipData = {
                mode: 'index',
                callbacks: {
                    label: function (tooltipItem, data) {
                        var label = data.datasets[tooltipItem.datasetIndex].label;
                        var value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                        var nextValue = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index + 1];
                        if (nextValue !== undefined) {
                            return label + ' ' + value;
                        }
                        return label + ' ' + value;
                    }
                }
            };

            $scope.myChart = new Chart(ctx, {
                type: 'bar',
                data: data,
                options: {
                    indexAxis: 'y',

                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'right',
                        },
                        title: {
                            display: true,
                            text: 'FOFL'
                        },
                        tooltip: {
                            tooltipData
                        },
                    },
                    scales: {
                        x: {
                            stacked: true
                        },
                        y: {
                            stacked: true
                        }
                    },
                   // responsive: false

                }
            });
        }

        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/
        $scope.init = function () {
            if (!$rootScope.isLogin) {
                $location.url('/login');
                return;
            }
            getSensorInfo().then(function (sensorInfo) {
                $scope.sensorInfo = sensorInfo;
                // 기본적으로 첫 번째 요소를 선택
                $scope.selectedSensor = sensorInfo.SENSOR[0];
                drawChart();
            });
        };

        $scope.didClickSensor = function (sensor) {
            $scope.selectedSensor = sensor;
            $scope.selectedSensorName = sensor.NAME;
            drawChart();
        };

        $scope.editThreshold = function (sensor) {
            $scope.sensor = {
                SENSOR: sensor.NAME,
                GREEN: sensor.GREEN,
                YELLOW: sensor.YELLOW,
                ORANGE: sensor.ORANGE,
                RED: sensor.RED,
                GREEN_ACTIVATE: sensor.GREEN_ACTIVATE,
                YELLOW_ACTIVATE: sensor.YELLOW_ACTIVATE,
                ORANGE_ACTIVATE: sensor.ORANGE_ACTIVATE,
                RED_ACTIVATE: sensor.RED_ACTIVATE,

                NEXT_STATE_TIME: sensor.NEXT_STATE_TIME,
                FEEDBACK_STATE: sensor.FEEDBACK_STATE,
                RED_STATE_CAUSE: sensor.RED_STATE_CAUSE,
                SUGGEST_OPTION: sensor.SUGGEST_OPTION,


            }
        };

        $scope.saveThreshold = function () {
            saveThresholdInfo();
        };



    }
]);