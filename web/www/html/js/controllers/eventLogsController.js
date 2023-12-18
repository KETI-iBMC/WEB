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
        $location,
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
                    setChartjsData($scope.eventInfo);

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
            $scope.labels = []; // 날짜 배열 초기화
            $scope.series = []; // 시리즈 이름 초기화
            $scope.data = [[]];

        }


        function setChartjsData(eventInfo) {
            if (!eventInfo) {
                return;
            }

            $scope.dataset = [
                {
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: function (value, context) {
                            return value; // 이 부분에서 값 포매팅을 정의할 수 있습니다.
                        }
                    },
                    backgroundColor: 'rgba(255,99,132, 0.7)', // 빨간색 배경색
                    borderColor: 'rgba(255,99,132, 1)',

                }
            ];

            var data = [];
            var recentDate = null;

            var sortedEventInfo = eventInfo.sort(function (a, b) {
                if (a.TIME > b.TIME) return 1;
                else if (a.TIME < b.TIME) return -1;

                return 0;
            });

            for (var i = 0; i < sortedEventInfo.length; i++) {
                var event = sortedEventInfo[i];
                var date = event.TIME.substr(0, 10);

                if (recentDate !== date) {
                    var item = {};
                    item.date = date;
                    item.count = 1;
                    data.push(item);
                    recentDate = date;
                } else {
                    var item = data[data.length - 1];
                    item.count++;
                }
            }

            $scope.labels = [];
            $scope.series = ['Count'];
            $scope.data = [[]];
            $scope.options = {
                maintainAspectRatio: false,
                aspectRatio: 50, // 원하는 비율로 설정 (height / width)
                scales: {

                    yAxes: [{
                        ticks: {
                            stepSize: 32,
                            beginAtZero: true,
                            max: 256
                        }
                    }]
                }

            };
            for (i = 0; i < data.length; i++) {
                $scope.labels.push(data[i].date);
                $scope.data[0].push(data[i].count);
            }
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