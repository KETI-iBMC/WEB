app.controller('EventLogsController', [
    '$scope',
    '$q',
    '$timeout',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    '$rootScope',
    '$translate',
    '$location',
    function (
        $scope,
        $q,
        $timeout,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        $rootScope,
        $translate,
        $location
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function getEventLog() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.EVENT_LOG).then(
                function (response) {
                    console.log('Event Logs getting done');

                    if ($scope.eventType === "sensor") {
                        $scope.eventInfo = response.data.EVENT_INFO.SEL;
                    } else if ($scope.eventType === "bios") {
                        $scope.eventInfo = response.data.EVENT_INFO.BIOS;
                    } else {
                        $scope.eventInfo = response.data.EVENT_INFO.SM;
                    }

                    initChartOption();
                    setChartData($scope.eventInfo);
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

        function refreshEventLog() {
            $timeout.cancel($scope.timer);
            getEventLog();
            $scope.timer = $timeout(refreshEventLog, $scope.interval);
        }

        function initChartOption() {
            $scope.chart = {};
            $scope.chart.data = {};
            $scope.chart.data.labels = [];
            $scope.chart.data.series = [[]];
            $scope.chart.barOptions = {
                // [수정3] 현재 샘플값이라 500은 너무 많고
                // 70으로 해놔서 bar 영역 사이즈 업
                high: 70,
                // high: 500,
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
                }
            };
        }

        function setChartData(eventInfo) {
            if(!eventInfo) {
                return;
            }

            var data = [];
            var recentYear = null, recentMonth = null;

            // [수정3] 로직 오류 고침
            // eventInfo를 우선 Time Stamp순 정렬
            var sortedEventInfo = eventInfo.sort(function(a, b) {
                if(a.TIME > b.TIME) return 1;
                else if(a.TIME < b.TIME) return -1;

                return 0;
            });

            
            // for(var i = 0; i < eventInfo.length; i++) {
            //     var event = eventInfo[i];
            for(var i = 0; i < sortedEventInfo.length; i++) {
                var event = sortedEventInfo[i];
                var year = event.TIME.substr(0, 4);
                var month = event.TIME.substr(5, 2);

                // [수정3] 덮어씌우는 오류발견 로직 변경
                // count 도 안맞음
                if(recentYear !== year)
                {
                    var item = {};
                    item.year = year;
                    item.month = month;
                    item.count = 1;
                    data.push(item);
                    recentYear = year;
                    recentMonth = month;
                }
                else
                {
                    if(recentMonth !== month)
                    {
                        var item = {};
                        item.year = year;
                        item.month = month;
                        item.count = 1;
                        data.push(item);
                        recentYear = year;
                        recentMonth = month;
                    }
                    else
                    {
                        var item = data[data.length - 1];
                        item.count++;
                    }
                }

                // if(recentYear !== year) {
                //     var item = {};
                //     item.year = year;
                //     item.count = 0;
                //     data.push(item);
                //     recentYear = year;
                //     recentMonth = null;
                // }

                // if(recentMonth !== month) {
                //     var item = data[data.length -1];
                //     item.month = month;
                //     item.count = 0;
                //     recentMonth = month;
                // } else {
                //     var item = data[data.length -1];
                //     item.count++;
                // }
            }

            // bar 그래프 역순출력(origin)
            // for(i = data.length - 1; i >= 0; i--) {
            //     var label = $scope.monthList[Number(data[i].month) - 1] + " " + data[i].year;
            //     $scope.chart.data.labels.push(label);
            //     $scope.chart.data.series[0].push(data[i].count);
            // }

            // [수정3] bar 그래프 정순출력(updated)
            for(i = 0; i < data.length; i++) {
                var label = $scope.monthList[Number(data[i].month) - 1] + " " + data[i].year;
                $scope.chart.data.labels.push(label);
                $scope.chart.data.series[0].push(data[i].count);
            }
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

            $scope.eventType = "sensor";
            $scope.timer = null;
            $scope.interval = 10000;
            initChartOption();
            $scope.monthList = [
                $translate.instant('CONFIGURATION.JANUARY'),
                $translate.instant('CONFIGURATION.FEBRUARY'),
                $translate.instant('CONFIGURATION.MARCH'),
                $translate.instant('CONFIGURATION.APRIL'),
                $translate.instant('CONFIGURATION.MAY'),
                $translate.instant('CONFIGURATION.JUNE'),
                $translate.instant('CONFIGURATION.JULY'),
                $translate.instant('CONFIGURATION.AUGUST'),
                $translate.instant('CONFIGURATION.SEPTEMBER'),
                $translate.instant('CONFIGURATION.OCTOBER'),
                $translate.instant('CONFIGURATION.NOVEMBER'),
                $translate.instant('CONFIGURATION.DECEMBER')
            ];
            $rootScope.showSpinner = true;
            getEventLog().then(
                function () {
                    $scope.timer = $timeout(refreshEventLog, $scope.interval);
                },
                function () {
                    logger.logError(CONST_MESSAGE.SERVER_HEALTH.EVENT_LOGS.E001);
                    $timeout.cancel($scope.timer);
                }
            );
        };

        $scope.onEventTypeChange = function () {
            refreshEventLog();
        };

        $scope.$on("$destroy", function () {
            console.log('EventLogsController  $destroy !!!!');
            $timeout.cancel($scope.timer);
        });
    }
]);