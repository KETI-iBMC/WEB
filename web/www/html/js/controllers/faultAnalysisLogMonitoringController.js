app.controller('FaultAnalysisLogMonitoringController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$rootScope',
    '$q',
    '$timeout',
    function (
        $scope,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        CONST_CODE,
        $rootScope,
        $q,
        $timeout
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function getFaultLatest() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.FAULT_ANALYSIS.FEEDBACKLOG_LATEST).then(
                function (response) {
                    $scope.eventInfo = response.data;
                    return response.data;
                },
                function (error) {
                    console.log(error);
                    return $q.reject(error);
                }
            ).finally(function () {
                $rootScope.showSpinner = false;
            });
        }
        function getFaultModule() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.FAULT_ANALYSIS.FEEDBACKLOG_MODULE).then(
                function (response) {
                    $scope.eventInfo = response.data;
                    initChartOption();
                    //$scope.eventInfo여기에 json데이터가 들어간다...
                    setModuleChartData($scope.eventInfo);
                    return response.data;

                },
                function (error) {
                    console.log(error);
                    return $q.reject(error);
                }
            ).finally(function () {
                $rootScope.showSpinner = false;
            });
        }
        function getFaultProceed() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.FAULT_ANALYSIS.FEEDBACKLOG_PROCEED).then(
                function (response) {
                    $scope.eventInfo = response.data;
                    initChartOption();
                    setProgressChartData($scope.eventInfo);
                    return response.data;

                },
                function (error) {
                    console.log(error);
                    return $q.reject(error);
                }
            ).finally(function () {
                $rootScope.showSpinner = false;
            });
        }
        function getFaultCause() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.FAULT_ANALYSIS.FEEDBACKLOG_CAUSE).then(
                function (response) {
                    $scope.eventInfo = response.data;
                    initChartOption();
                    setCauseChartData($scope.eventInfo);
                    return response.data;
                },
                function (error) {
                    console.log(error);
                    return $q.reject(error);
                }
            ).finally(function () {
                $rootScope.showSpinner = false;
            });
        }
        // function refreshEventLog() {
        //     $timeout.cancel($scope.timer);
        //     getEventLog();
        //     $scope.timer = $timeout(refreshEventLog, $scope.interval);
        // }
        //이게 그래프 
        function initChartOption() {
            $scope.chart = {};
            $scope.chart.data = {};
            $scope.chart.data.labels = [];
            $scope.chart.data.series = [[]];
            $scope.chart.barOptions = {
                high: 70,
                low: 0,
                seriesBarDistance: 15,
                axisY: {
                    showGrid: true,
                    onlyInteger: true,
                },
                axisX: {
                    showGrid: false,
                    labelOffset: {
                        y: 10
                    }
                },
            };
        }
        function setModuleChartData(eventInfo) {
            if (!eventInfo) {
                return;
            }
            //MODULE_NAME에 대해서 count함 
            var moduleCounts = {};
            for (var i = 0; i < eventInfo.length; i++) {
                var moduleName = eventInfo[i].MODULE_NAME;

                if (moduleCounts[moduleName]) {
                    moduleCounts[moduleName]++;
                } else {
                    moduleCounts[moduleName] = 1;
                }
            }

            // 차트 데이터를 업데이트합니다.
            var labels = Object.keys(moduleCounts); // MODULE_NAME
            var series = [Object.values(moduleCounts)]; // 각 MODULE_NAME 별 발생 횟수

            var flatSeries = series.reduce(function (acc, val) {
                return acc.concat(val);
            }, []);

            var data = {
                labels: labels,
                datasets: [{
                    data: flatSeries,
                    backgroundColor: ['#008FFB', '#f74d4d', '#00E396'],
                }]
            };

            var options = {
                responsive: true,
                cutoutPercentage: 60,
            };

            var ctx = document.getElementById('graph_module').getContext('2d');
            if ($scope.moduleChart) {
                $scope.moduleChart.destroy();
            }
            $scope.moduleChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options,
            });

            // $scope.$apply();

        }
        function setProgressChartData(eventInfo) {
            if (!eventInfo) {
                return;
            }
            //MODULE_NAME에 대해서 count함 
            var moduleCounts = {};
            for (var i = 0; i < eventInfo.length; i++) {
                var moduleName = eventInfo[i].PROGRESS;

                if (moduleCounts[moduleName]) {
                    moduleCounts[moduleName]++;
                } else {
                    moduleCounts[moduleName] = 1;
                }
            }

            // 차트 데이터를 업데이트합니다.
            var labels = Object.keys(moduleCounts); // MODULE_NAME
            var series = [Object.values(moduleCounts)]; // 각 MODULE_NAME 별 발생 횟수


            var flatSeries = series.reduce(function (acc, val) {
                return acc.concat(val);
            }, []);


            var data = {
                labels: labels,
                datasets: [{
                    data: flatSeries,
                    backgroundColor: ['#008FFB', '#f74d4d', '#00E396'],
                }]
            };

            var options = {
                responsive: true,
                cutoutPercentage: 60,
            };

            var ctx = document.getElementById('graph_cause').getContext('2d');
            if ($scope.progressChart) {
                $scope.progressChart.destroy();
            }
            $scope.progressChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options,
            });

            // 차트를 다시 그리도록 AngularJS에 알립니다.
            // $scope.$apply();

        }
        function setCauseChartData(eventInfo) {
            if (!eventInfo) {
                return;
            }
            //MODULE_NAME에 대해서 count함 
            var moduleCounts = {};
            for (var i = 0; i < eventInfo.length; i++) {
                var moduleName = eventInfo[i].CAUSE;

                if (moduleCounts[moduleName]) {
                    moduleCounts[moduleName]++;
                } else {
                    moduleCounts[moduleName] = 1;
                }
            }

            // 차트 데이터를 업데이트합니다.
            var labels = Object.keys(moduleCounts); // MODULE_NAME
            var series = [Object.values(moduleCounts)]; // 각 MODULE_NAME 별 발생 횟수


            var flatSeries = series.reduce(function (acc, val) {
                return acc.concat(val);
            }, []);


            var data = {
                labels: labels,
                datasets: [{
                    data: flatSeries,
                    backgroundColor: ['#008FFB', '#f74d4d', '#00E396'],
                }]
            };

            var options = {
                responsive: true,
                cutoutPercentage: 60,
            };

            var ctx = document.getElementById('graph_feedback_Progress').getContext('2d');
            if ($scope.causeChart) {
                $scope.causeChart.destroy();
            }
            $scope.causeChart = new Chart(ctx, {
                type: 'doughnut',
                data: data,
                options: options,
            });

            // 차트를 다시 그리도록 AngularJS에 알립니다.
            // $scope.$apply();

        }
        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/
        $scope.init = function () {
            $rootScope.showSpinner = true;
            initChartOption();
            getFaultModule();
            getFaultProceed();
            getFaultCause();


        };
        // $scope.onEventTypeChange = function () {
        //     refreshEventLog();
        // };
        $scope.onEventTypeChange = function () {
            if ($scope.eventType === 'latest') {
                getFaultLatest();
            } else if ($scope.eventType === 'module_name') {
                getFaultModule();
            } else if ($scope.eventType === 'cause_of_occurrence') {
                getFaultCause();
            } else if ($scope.eventType === 'handling_status') {
                getFaultProceed();
            }
        };
        $scope.$on("$destroy", function () {
            console.log('EventLogsController  $destroy !!!!');
            $timeout.cancel($scope.timer);
        });

    }
]);