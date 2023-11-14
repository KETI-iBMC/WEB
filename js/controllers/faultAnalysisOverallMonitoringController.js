app.controller('FaultAnalysisOverallMonitoringController', [
    '$scope',
    '$filter',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_CODE',
    'CONST_MESSAGE',
    '$timeout',
    '$q',
    '$http',
    'radialIndicatorInstance',
    '$window',
    '$rootScope',
    '$location',
    '$cookies',
    'echartSupport',
    function (
        $scope,
        $filter,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_CODE,
        CONST_MESSAGE,
        $timeout,
        $q,
        $http,
        radialIndicatorInstance,
        $window,
        $rootScope,
        $location,
        $cookies,
        echartSupport
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/

        function getAllMainInfo() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.MAIN_INFO, 'GET', {
                INDEX: 0
            }).then(
                function (response) {
                    setMainInfo(response);
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

        function setMainInfo(response, index) {
            if (index === undefined) {
                setAllInfo(response);
            }
        }

        function getSlotInfo() {
            dataFactory.httpRequest(CONST_RESTFUL_API.CPU_MONITORING.SLOT, 'GET').then(
                function (response) {
                    $scope.slot = response.data.slot;

                    var cm1button = document.getElementById("cm1button");
                    var cm2button = document.getElementById("cm2button");
                    var cm3button = document.getElementById("cm3button");
                    var cm4button = document.getElementById("cm4button");

                    if ($scope.slot === "1") {
                        cm1button.classList.remove("button");
                        cm1button.classList.add("button-active");

                        cm2button.classList.add("button");
                        cm3button.classList.add("button");
                        cm4button.classList.add("button");
                    }else if ($scope.slot === "2") {
                        cm2button.classList.remove("button");
                        cm2button.classList.add("button-active");

                        cm1button.classList.add("button");
                        cm3button.classList.add("button");
                        cm4button.classList.add("button");
                    } else if ($scope.slot === "3") {
                        cm3button.classList.remove("button");
                        cm3button.classList.add("button-active");

                        cm2button.classList.add("button");
                        cm1button.classList.add("button");
                        cm4button.classList.add("button");

                    } else if ($scope.slot === "4") {
                        cm4button.classList.remove("button");
                        cm4button.classList.add("button-active");

                        cm2button.classList.add("button");
                        cm3button.classList.add("button");
                        cm1button.classList.add("button");

                    }

		 }
            ).finally(function () { });
        }

        function getStorageInfo() {
            dataFactory.httpRequest(CONST_RESTFUL_API.CPU_MONITORING.STORAGE, 'GET').then(
                function (response) {
                    $scope.score = parseInt(response.data.SCORE);

                    $scope.getBackgroundColor = function (score) {
                        if (score >= 0 && score <= 10) {
                            return '#FEF9A5';
                        } else if (score >= 11 && score <= 89) {
                            // Calculate the color based on the score range
                            var range = 89 - 11;
                            var ratio = (score - 11) / range;
                            var color1 = [254, 249, 165];
                            var color2 = [170, 255, 155];
                            var color = color1.map((channel, index) =>
                                Math.round(channel + (color2[index] - channel) * ratio)
                            );
                            return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                        } else if (score >= 90 && score <= 100) {
                            return '#AAFF9B';
                        } else {
                            return 'transparent';
                        }
                    };
                }
            ).finally(function () {

            });
        }

        getFanspeed();
        function getFanspeed() {
            dataFactory.httpRequest(CONST_RESTFUL_API.SMART_FAN_CONTROL.RPMDATA, 'GET').then(
                function (response) {
                    const fans = response.data.Fans;

                    fans.sort((a, b) => a.MemberId.localeCompare(b.MemberId));

                    const fanReadingsElement = document.getElementById("fan-readings");

                    fans.forEach((fan, index) => {
                        const reading = fan.Reading;

                        const fanElement = document.createElement("div");
                        fanElement.className = "circle";

                        if (reading === 0 || reading >= 15001) {
                            fanElement.style.backgroundColor = "#FFA500";
                        } else if (reading >= 1 && reading <= 1000) {
                            fanElement.style.backgroundColor = "#FFD209";
                        } else if (reading >= 1001 && reading <= 17000) {

                            const range = 10000 - 1001;
                            const ratio = (reading - 1001) / range;
                            const color1 = [255, 210, 9];
                            const color2 = [88, 213, 43];
                            const color = color1.map((channel, index) =>
                                Math.round(channel + (color2[index] - channel) * ratio)
                            );
                            fanElement.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                        } else {
                            fanElement.style.backgroundColor = "#58D52B";
                        }

                        if (reading >= 15000) {
                            fanElement.innerHTML = "<span class='rpm-text'>0</span> rpm";

                        } else {
                            fanElement.innerHTML = `<span class="rpm-text">${reading}</span> rpm`;
                        }

                        fanReadingsElement.appendChild(fanElement);
                    });

                    console.log(response.data.Fans.MemberId);
                }
            ).finally(function () {

            });
        }


        function setAllInfo(response) {
            $scope.healthSummary = response.data.MAIN.HEALTH_SUMMARY;

            $scope.healthSummary.DIMM1_CH_A = response.data.MAIN.HEALTH_SUMMARY.DIMM1_CH_A;
            $scope.healthSummary.DIMM1_CH_B = response.data.MAIN.HEALTH_SUMMARY.DIMM1_CH_B;
            $scope.healthSummary.DIMM2_CH_A = response.data.MAIN.HEALTH_SUMMARY.DIMM2_CH_A;
            $scope.healthSummary.DIMM2_CH_B = response.data.MAIN.HEALTH_SUMMARY.DIMM2_CH_B;
            $scope.healthSummary.Temperature = response.data.MAIN.HEALTH_SUMMARY.Temperature;

            if (response.data.MAIN.BOARD_TEMP && response.data.MAIN.BOARD_TEMP.VALUE) {
                $scope.systemBoardTemp = parseInt(response.data.MAIN.BOARD_TEMP.VALUE);
            } else {
                $scope.systemBoardTemp = 30;
            }

            console.log(systemBoardTemp);

            $scope.cpu1Temp = parseInt(response.data.MAIN.CPU1_TEMP.VALUE);

            $scope.cpu2Temp = parseInt(response.data.MAIN.CPU2_TEMP.VALUE);

        }
        function getDiskInfo() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.FAULT_ANALYSIS.DISK_REPORT, 'GET').then(
                function (response) {
                    return response.data; // 데이터 반환
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.FAULT_ANALYSIS.DISK_REPORT.E001);
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

            getAllMainInfo().then(
                function () {
                    $scope.timer = $timeout(refreshAllMainInfo, $scope.interval);
                },
                function () {
                    $timeout.cancel($scope.timer);
                }
            );
            getDiskInfo() // getDiskInfo 호출
                .then(function (data) {
                    $scope.selectedDiskInfo = data;
                })
                .catch(function (error) {
                    console.error(error);
                });
            getSlotInfo();
            getStorageInfo();

            initScopeData();

            getTemperatureChartData();
            getStatusData();
            getFanSpeedListData();
            getFanInitData();

            getCmmha();
            getFanspeed();
            getcmmIPLocation();
            $scope.Math = window.Math;

        };

    }
]);