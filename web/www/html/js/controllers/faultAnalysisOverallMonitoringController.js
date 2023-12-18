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
    '$interval',
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
        echartSupport,
        $interval
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function drawDiskReadGraph(readData) {
            // console.log(readData);
            var ctx = document.getElementById("readLineChart").getContext("2d");

            if ($scope.readDiskChart) {
                $scope.readDiskChart.destroy();

            }

            var readDiskData = {

                datasets: [
                    {
                        label: 'Disk Usage(%)',
                        data: readData.map(item => ({ x: item.datetime, y: parseFloat(item.speed) })),
                        borderColor: 'rgba(250, 184, 20, 1)',
                        backgroundColor: 'rgba(250, 184, 20, 0.8)',
                        borderWidth: 2,
                        fill: true,
                    },

                ],
            };
            var options = {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100, // y 축 최대 값 설정
                        ticks: {
                            stepSize: 10, // y 축 간격 설정
                        },
                    },
                },
            };
            $scope.readDiskChart = new Chart(ctx, {
                type: 'line',
                data: readDiskData,
                options: options,
            });

        }
        function drawDiskWriteGraph(writeData) {
            // console.log(writeData);
            var ctx = document.getElementById("writeLineChart").getContext("2d");

            if ($scope.writeDiskChart) {
                $scope.writeDiskChart.destroy();

            }
            var writeDiskData = {

                datasets: [

                    {
                        label: 'Disk Read/Write Speed(MB/s)',
                        data: writeData.map(item => ({ x: item.datetime, y: parseFloat(item.speed) })),
                        borderColor: 'rgba(20, 154, 250,  1)',
                        backgroundColor: 'rgba(20, 154, 250, 0.8)',
                        borderWidth: 2,
                        fill: true,
                    },
                ],
            };

            var options = {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 500, // y 축 최대 값 설정
                        ticks: {
                            stepSize: 50, // y 축 간격 설정
                        },
                    },
                },

            };
            $scope.writeDiskChart = new Chart(ctx, {
                type: 'line',
                data: writeDiskData,
                options: options,
            });
        }
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
                    } else if ($scope.slot === "2") {
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
                        //이상값 
                        if (reading === 0 || reading >= 8001) {
                            fanElement.style.backgroundColor = "#FF9F40"; //주황
                        } else if (reading >= 1 && reading <= 1000) {
                            fanElement.style.backgroundColor = "#BDE1F9"; // 연파랑
                        } else if (reading >= 1001 && reading <= 8000) {

                            const range = 8000 - 1001;
                            const ratio = (reading - 1001) / range;
                            const color1 = [189, 225, 249]; //연파랑
                            const color2 = [54, 162, 235]; //파랑
                            const color = color1.map((channel, index) =>
                                Math.round(channel + (color2[index] - channel) * ratio)
                            );
                            fanElement.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                        } else {
                            fanElement.style.backgroundColor = "#36A2EB";//파랑
                        }

                        if (reading >= 15000) {
                            fanElement.innerHTML = "<span class='rpm-text'>0</span> rpm";

                        } else {
                            fanElement.innerHTML = `<span class="rpm-text">${reading}</span> rpm`;
                        }

                        fanReadingsElement.appendChild(fanElement);
                    });

                    // console.log(response.data.Fans.MemberId);
                }
            ).finally(function () {

            });
        }

        function applyHardwareStatus() {
            var statusIconDOM = document.getElementById('hwstatus-p1');
            if ($scope.healthSummary.DIMM1_CH_A === 1)
                statusIconDOM.className = "normal";
            else if ($scope.healthSummary.DIMM1_CH_A === 0)
                statusIconDOM.className = "critical";

            statusIconDOM = document.getElementById('hwstatus-p2');
            if ($scope.healthSummary.DIMM1_CH_B === 1)
                statusIconDOM.className = "normal";
            else if ($scope.healthSummary.DIMM1_CH_B === 0)
                statusIconDOM.className = "critical";

            statusIconDOM = document.getElementById('hwstatus-p3');
            if ($scope.healthSummary.DIMM1_CH_C === 1)
                statusIconDOM.className = "normal";
            else if ($scope.healthSummary.DIMM1_CH_C === 0)
                statusIconDOM.className = "critical";

            statusIconDOM = document.getElementById('hwstatus-p4');
            if ($scope.healthSummary.DIMM1_CH_D === 1)
                statusIconDOM.className = "normal";
            else if ($scope.healthSummary.DIMM1_CH_D === 0)
                statusIconDOM.className = "critical";

            statusIconDOM = document.getElementById('hwstatus-p10');
            if ($scope.healthSummary.DIMM2_CH_A === 1)
                statusIconDOM.className = "normal";
            else if ($scope.healthSummary.DIMM2_CH_A === 0)
                statusIconDOM.className = "critical";

            statusIconDOM = document.getElementById('hwstatus-p11');
            if ($scope.healthSummary.DIMM2_CH_B === 1)
                statusIconDOM.className = "normal";
            else if ($scope.healthSummary.DIMM2_CH_B === 0)
                statusIconDOM.className = "critical";

            statusIconDOM = document.getElementById('hwstatus-p12');
            if ($scope.healthSummary.DIMM2_CH_C === 1)
                statusIconDOM.className = "normal";
            else if ($scope.healthSummary.DIMM2_CH_C === 0)
                statusIconDOM.className = "critical";

            statusIconDOM = document.getElementById('hwstatus-p13');
            if ($scope.healthSummary.DIMM2_CH_D === 1)
                statusIconDOM.className = "normal";
            else if ($scope.healthSummary.DIMM2_CH_D === 0)
                statusIconDOM.className = "critical";

            $scope.healthSummary.Temperature.forEach(function (element, index) {
                statusIconDOM = document.getElementById('hwstatus-p' + (index + 5).toString());
                if (element === 1)
                    statusIconDOM.className = "normal";
                else if (element === 0)
                    statusIconDOM.className = "critical";


            });

        }

        function setAllInfo(response) {
            $scope.healthSummary = response.data.MAIN.HEALTH_SUMMARY;

            $scope.healthSummary.DIMM1_CH_A = response.data.MAIN.HEALTH_SUMMARY.DIMM1_CH_A;
            $scope.healthSummary.DIMM1_CH_B = response.data.MAIN.HEALTH_SUMMARY.DIMM1_CH_B;
            $scope.healthSummary.DIMM2_CH_A = response.data.MAIN.HEALTH_SUMMARY.DIMM2_CH_A;
            $scope.healthSummary.DIMM2_CH_B = response.data.MAIN.HEALTH_SUMMARY.DIMM2_CH_B;
            $scope.healthSummary.Temperature = response.data.MAIN.HEALTH_SUMMARY.Temperature;

            applyHardwareStatus();

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
                // logger.logError(CONST_MESSAGE.FAULT_ANALYSIS.DISK_REPORT.E001);
            });
        }
        function getDiskGraphInfo() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.CPU_MONITORING.DISK_GRAPH, 'GET').then(

                function (response) {

                    drawDiskReadGraph(response.data.ReadData);
                    drawDiskWriteGraph(response.data.WriteData);

                }
            ).catch(function () {
                // logger.logError(CONST_MESSAGE.FAULT_ANALYSIS.DISK_REPORT.E001);
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
            getDiskGraphInfo();

            $scope.itv = $interval(function () {
                getDiskGraphInfo();
                console.log("cpu page value refresh, interval: " + "10 sec");
            }, 3000);

            $scope.$on("$destroy", function () {
                $interval.cancel($scope.itv);
                console.log("cpu page refresh disabled");
            });
        };

    }
]);