app.controller('PowerUsageController', [
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

        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/


        function setTodayTotalChartData(totalData) {
            var seriesData = [[], []];
            var minTotal = [0, 0];
            var hourTotal = [0, 0];

            minTotal[0] = totalData.PSU1.LAST60MIN / 24;
            minTotal[1] = totalData.PSU2.LAST60MIN / 24;
            hourTotal[0] = totalData.PSU1.LAST24HOUR;
            hourTotal[1] = totalData.PSU2.LAST24HOUR;

            seriesData[0].push(minTotal[0]);
            seriesData[0].push(hourTotal[0]);
            seriesData[1].push(minTotal[1]);
            seriesData[1].push(hourTotal[1]);

            m_total = minTotal[0] + minTotal[1];
            m_per = m_total;
            h_total = hourTotal[0] + hourTotal[1];
            h_per = h_total;
            $scope.Total_lastmin = m_per.toFixed(2);
            $scope.Total_lasthour = h_per.toFixed(2);

            //Today total graph
            $scope.powerTodayTotalData = seriesData;
            $scope.powerTodaySeries = ['PSU1', 'PSU2'];
            $scope.powerTodayTotalLabels = ['Last Hour', 'Last Day']; // 레이블
            $scope.powerTodayTotalColors = [
                {
                    backgroundColor: '#FFA1B5',
                    borderColor: '#FFA1B5',
                    hoverBackgroundColor: '#FFA1B5',
                    hoverBorderColor: '#FFA1B5'
                },
                {
                    backgroundColor: '#86C7F3',
                    borderColor: '#86C7F3',
                    hoverBackgroundColor: '#86C7F3',
                    hoverBorderColor: '#86C7F3'
                }
            ]

	$scope.powerTodayOtions = {
	    maintainAspectRatio: false,
                responsive: false,
	};

        }

        function setWattChartData(index, wattChartInfo_1, wattChartInfo_2) {
            if (!wattChartInfo_1) {
                return;
            }

            // sort 변수
            var sortedWattInfo_1, sortedWattInfo_2;
            var labeldata = [];
            var dateData = [];
            var seriesdata = [[], []];
            var wattLength = 0;
            var minString = " Sec";
            var hourString = " Min";
            var dayString = " Hour";
            $scope.Colors = [
                {
                    backgroundColor: 'rgba(148, 159, 177, 0.2)',
                    borderColor: 'rgba(148, 159, 177, 1)'

                },
                {
                    backgroundColor: 'rgba(24, 255, 109, 0.7)',
                    borderColor: 'rgba(24, 255, 109, 1)'

                }
            ]
            if (wattChartInfo_1.length < wattChartInfo_2.length) {
                wattLength = wattChartInfo_1.length;
            }
            else {
                wattLength = wattChartInfo_2.length;
            }


            // sort 수행
            sortedWattInfo_1 = wattChartInfo_1.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            sortedWattInfo_2 = wattChartInfo_2.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });

            for (var i = 0; i < wattLength; i++) {

                var wattUsage_1 = sortedWattInfo_1[i];
                var wattUsage_2 = sortedWattInfo_2[i];
                var wattValue_1 = parseInt(wattUsage_1.WATT);
                var wattValue_2 = parseInt(wattUsage_2.WATT);
                var wattDate = wattUsage_1.DATETIME;
                dateData.push(Date.parse(wattDate));
                seriesdata[0].push(wattValue_1);
                seriesdata[1].push(wattValue_2);

                var timeValue;

                if (index == 1)// || index == 2)
                    timeValue = sortedWattInfo_1[i].DATETIME.slice(11, sortedWattInfo_1[i].DATETIME.length);
                else if (index == 3 || index == 2)
                    timeValue = sortedWattInfo_1[i].DATETIME;

                labeldata.push(timeValue);
            }

            if (index == 1) {
                $scope.realTimeSeries = ['PSU 1', 'PSU 2'];
                $scope.realTimeData = seriesdata;
                $scope.realTimeLabels = labeldata; // 레이블
            }
            else if (index == 2) {
                $scope.lastHourSeries = ['PSU 1', 'PSU 2'];
                $scope.lastHourData = seriesdata;
                $scope.lastHourLabels = labeldata;

            }
            else if (index == 3) {
                $scope.lastDaySeries = ['PSU 1', 'PSU 2'];
                $scope.lastDayData = seriesdata;
                $scope.lastDayLabels = labeldata; // 레이블
            }
        }
        function getWattInfoIndex(index) {
            return dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.POWER_USAGE, 'GET', { INDEX: index }).then(
                function (response) {
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

        function getAllWattInfo() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.POWER_USAGE, 'GET', { INDEX: 0 }).then(
                function (response) {
                    $scope.wattInfo = response.data.POWER_USAGE;

                    if ((response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH.length > 0) || (response.data.POWER_USAGE.GRAPH_DATA.PSU2.MIN_GRAPH.length > 0)) {
                        setWattChartData(1, response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.MIN_GRAPH);
                    }
                    if ((response.data.POWER_USAGE.GRAPH_DATA.PSU1.HOUR_GRAPH.length > 0) || (response.data.POWER_USAGE.GRAPH_DATA.PSU2.HOUR_GRAPH.length > 0)) {
                        setWattChartData(2, response.data.POWER_USAGE.GRAPH_DATA.PSU1.HOUR_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.HOUR_GRAPH);
                    }
                    if ((response.data.POWER_USAGE.GRAPH_DATA.PSU1.DAY_GRAPH.length > 0) || (response.data.POWER_USAGE.GRAPH_DATA.PSU2.DAY_GRAPH.length > 0)) {
                        setWattChartData(3, response.data.POWER_USAGE.GRAPH_DATA.PSU1.DAY_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.DAY_GRAPH);
                    }
                    setTodayTotalChartData(response.data.POWER_USAGE.TODAY_TOTAL);

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

        $scope.onRefresh = function (index) {
            $scope.selectedTab = index;
            getWattInfoIndex(index).then(
                function (response) {
                    if (index == 3) {
                        setWattChartData(1, response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.MIN_GRAPH);
                    }
                    else if (index == 4) {
                        setWattChartData(2, response.data.POWER_USAGE.GRAPH_DATA.PSU1.HOUR_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.HOUR_GRAPH);
                    }
                    else if (index == 5) {
                        setWattChartData(3, response.data.POWER_USAGE.GRAPH_DATA.PSU1.DAY_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.DAY_GRAPH);
                    }
                },
                function () {
                    logger.logError(CONST_MESSAGE.SERVER_HEALTH.POWER_USAGE.E001);
                }
            )
        };
        $scope.init = function () {
            if (!$rootScope.isLogin) {
                $location.url('/login');
                return;
            }
            $scope.selectedTab = '3'; // 초기 선택 탭 설정
            $rootScope.showSpinner = true;

            getAllWattInfo().then(
                function () {

                },
                function () {
                    logger.logError(CONST_MESSAGE.SERVER_HEALTH.POWER_USAGE.E001);

                }
            );

        };
        $scope.$on("$destroy", function () {
            console.log('powerUsageController  $destroy !!!!');

        });

    }
]);
