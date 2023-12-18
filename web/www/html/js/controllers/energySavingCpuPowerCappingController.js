app.controller('EnergySavingCpuPowerCappingController', [
    '$scope',
    '$q',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$rootScope',
    '$routeParams',
    '$interval',
    function (
        $scope,
        $q,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        CONST_CODE,
        $rootScope,
        $routeParams,
        $interval
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function getCpuValue() {
            dataFactory.httpRequest(CONST_RESTFUL_API.ENERGY_SAVING.CPU_POWER_CAPPING_CPU_VALUES_MONITORING).then(
                function (response) {
                    $scope.cpuInfo = response.data;
                }
            )
                .catch(function (error) {
                    console.error(error);
                    // $scope.cpuInfo = {
                    //     "1MinCpuUtil": "No GET",
                    //     "5MinCpuUtil": "No GET",
                    //     "15MinCpuUtil": "No GET",
                    //     "UserProcess": "No GET",
                    //     "SystemProcess": "No GET",
                    //     "Idle": "No GET"
                    // };
                    // return $scope.cpuInfo;
                })
                .finally(function () {
                    // $rootScope.showSpinner = false;
                });
        }

        function setCpuControl() {
            if ($scope.selectedCorecount === '1')
                $scope.selectedCorecount = 1;
            else if ($scope.selectedCorecount === '2')
                $scope.selectedCorecount = 2;
            else if ($scope.selectedCorecount === '3')
                $scope.selectedCorecount = 3;
            else if ($scope.selectedCorecount === '4')
                $scope.selectedCorecount = 4;
            else if ($scope.selectedCorecount === '5')
                $scope.selectedCorecount = 5;
            else if ($scope.selectedCorecount === '6')
                $scope.selectedCorecount = 6;
            else if ($scope.selectedCorecount === '7')
                $scope.selectedCorecount = 7;
            else if ($scope.selectedCorecount === '8')
                $scope.selectedCorecount = 8;
            else if ($scope.selectedCorecount === '0')
                $scope.selectedCorecount = 0;

            if ($scope.selectedCorecapping === '40%')
                $scope.selectedCorecapping = 40;
            else if ($scope.selectedCorecapping === '50%')
                $scope.selectedCorecapping = 50;
            else if ($scope.selectedCorecapping === '60%')
                $scope.selectedCorecapping = 60;
            else if ($scope.selectedCorecapping === '70%')
                $scope.selectedCorecapping = 70;
            else if ($scope.selectedCorecapping === '80%')
                $scope.selectedCorecapping = 80;
            else if ($scope.selectedCorecapping === '90%')
                $scope.selectedCorecapping = 90;
            else if ($scope.selectedCorecapping === '100%')
                $scope.selectedCorecapping = 100;
            else if ($scope.selectedCorecapping === '0%')
                $scope.selectedCorecapping = 0;

            var postData = {
                "core": $scope.selectedCorecount,
                "core_control": $scope.selectedCorecapping,
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.ENERGY_SAVING.CPU_POWER_CAPPING_CONTROL, 'PUT', undefined, postData).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.NTP.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.NTP.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.NTP.E003);
            });
        }



        function setWattChartData(cpuChartInfo_1) {
            if (!cpuChartInfo_1) {
                return;
            }

            var sorteCpuInfo_1;
            var cpulabeldata = [];
            // var cpudateData = [];
            var cpuseriesdata = [
                [],
                []
            ];
            var cpuLength = cpuChartInfo_1.length;


            sorteCpuInfo_1 = cpuChartInfo_1.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });

            for (var i = 0; i < cpuLength; i++) {

                var wattUsage_1 = sorteCpuInfo_1[i];
                var wattValue_1 = parseInt(wattUsage_1.WATT);
                // var wattDate = wattUsage_1.DATETIME;
                // cpudateData.push(Date.parse(wattDate));
                cpuseriesdata[0].push(wattValue_1);

                var timeValue;
                timeValue = sorteCpuInfo_1[i].DATETIME.slice(11, sorteCpuInfo_1[i].DATETIME.length);


                cpulabeldata.push(timeValue);

            }
            var data = {};

            data.series = [cpuseriesdata[0]];
            data.labels = cpulabeldata;
            if (cpuLength != 0)
                $scope.wattChart.update(data);
        }
        // getgraphdata();

        function getgraphdata() {
            dataFactory.httpRequest(CONST_RESTFUL_API.CPU_POEWR_CAPPING.ENERGYGRAPH, 'GET').then(
                function (response) {
                    if (response.status == CONST_CODE.REST_SUCCESS_CODE) {
                        // $scope.cpuchartInfo = response.data.POWER_USAGE;
                        setWattChartData(response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH);

                    }
                    else {
                        console.log('response', response.status);
                    }
                }).catch(function (response) {
                    console.log('response', response);
                }).finally(function () {
                });
        }
        // $rootScope.showSpinner = true;

        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/
        $scope.init = function () {
            $scope.refreshIntrevalList = ["3", "5"];
            $scope.selectedRefreshInterval = "3";

            $scope.itv = $interval(function () {
                getgraphdata();
                getCpuValue();
                console.log("cpu page value refresh, interval: " + $scope.selectedRefreshInterval + " sec");
            }, $scope.selectedRefreshInterval * 1000);

            $scope.$on("$destroy", function () {
                $interval.cancel($scope.itv);
                console.log("cpu page refresh disabled");
            });

            getCpuValue();
            getgraphdata();

            $scope.coreCountList = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];

            $scope.coreCappingList = [
                "0%",
                "40%",
                "50%",
                "60%",
                "70%",
                "80%",
                "90%",
                "100%"
            ];
            $scope.selectedCorecount = "";
            $scope.selectedCorecapping = "";



            $scope.cpuInfo = {};

            $scope.wattChart = new Chartist.Line('#graph_cpu',
                {
                    // labels: cpulabeldata,
                    // series: cpuseriesdata
                },
                {
                    height: '500px',
                    low: 0,

                    showArea: true,
                    axisX: {
                        showGrid: true,
                        offset: 30
                    },
                    axisY: {
                        showGrid: true,
                        labels: 'W',
                        showLabel: true
                    },
                    plugins: [
                        Chartist.plugins.ctAxisTitle({
                            axisX: {
                                axisTitle: 'Time (mins)',
                                axisClass: 'ct-axis-title',
                                offset: {
                                    x: 0,
                                    y: 50
                                },
                                textAnchor: 'middle'
                            },
                            axisY: {
                                axisTitle: 'Power (Watt)',
                                axisClass: 'ct-axis-title',
                                offset: {
                                    x: 0,
                                    y: 0
                                },
                                textAnchor: 'middle',
                                flipTitle: false
                            }
                        })
                    ]
                }
            );

            $scope.startTime = 0;
            $scope.seconds = 0;
            $scope.intervalId;

            //$scope.cappingInfo = JSON.parse(decodeURIComponent($routeParams.cappingInfo));

        };

        $scope.onClickModifyCpuSpeed = function () {
            setCpuControl();
            //$scope.selectedCorecount = coreCount;
            //$scope.selectedCorecapping = coreCapping;
        };

        $scope.onRefresh = function (parameter) {
            if (parameter === '3') {

            } else if (parameter === '4') {

            } else if (parameter === '5') {

            } else if (parameter === '6') {

            }
        };

        $scope.onChangeRefreshInterval = function () {
            $interval.cancel($scope.itv);
            console.log("cpu page refresh disabled");

            $scope.itv = $interval(function () {
                getgraphdata();
                getCpuValue();
                console.log("cpu page value refresh, interval: " + $scope.selectedRefreshInterval + " sec");
            }, $scope.selectedRefreshInterval * 1000);
        }

        $scope.graphData = {
            realTime: {
                labels: ["1 min", "2 min", "3 min", "4 min", "5 min", "6 min", "7 min", "8 min"],
                series: [{
                    name: "Server Load",
                    data: [10, 15, 12, 20, 18, 22, 25, 30]
                },]
            },
        };


    }
]);