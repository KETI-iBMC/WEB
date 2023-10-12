app.controller('HomeController', [
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
        $location
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function getServerPowerControl() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.REMOTE_CONTROL.SERVER_POWER_CONTROL).then(
                function (response) {
                    return $q.resolve(response);
                }
            ).catch(function () {
                return $q.reject(CONST_MESSAGE.SYSTEM.E001);
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

        function getMainInfo(index) {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.MAIN_INFO, 'GET', {
                INDEX: index
            }).then(
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


        function getCommand1() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_1).then(
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

        function getCommand2() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_2).then(
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

        function getCommand3() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_KVM).then(
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

        function getCommand4() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_4).then(
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

        function getCommand5() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_5).then(
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

        function getCommand6() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_6).then(
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

        function getCommand7() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_7).then(
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

        function getCommand8() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_8).then(
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

        function getPowerConsumptionData() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.POWER_USAGE, 'GET', {
                INDEX: 3
            }).then(
                function (response) {
                    $scope.pcData = response.data;

                    setPowerConsumptionData();

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

        function setPowerConsumptionData() {
            var labeldata = [];
            var dateData = [];
            var seriesdata = [
                [],
                []
            ];
            var wattLength = 0;
            var sortedWattInfo_1, sortedWattInfo_2;

            var psuInfo_1 = $scope.pcData.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH;
            var psuInfo_2 = $scope.pcData.POWER_USAGE.GRAPH_DATA.PSU2.MIN_GRAPH;

            if (psuInfo_1.length < psuInfo_2.length)
                wattLength = psuInfo_1.length;
            else
                wattLength = psuInfo_2.length;

            sortedWattInfo_1 = psuInfo_1.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            sortedWattInfo_2 = psuInfo_2.sort(function (a, b) {
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

            }

            new Chartist.Line('#home_graph_min', {
                labels: labeldata,
                series: seriesdata
            }, {
                height: '195px',
                low: 0,
                showArea: true,
                axisX: {
                    showGrid: true
                },
                axisY: {
                    showGrid: true
                }
            });
        }

        function setMainInfo(response, index) {
            if (index === undefined) {
                setAllInfo(response);
            } else {
                setInfo(response, index)
            }
        }

        function refreshAllMainInfo() {
            $timeout.cancel($scope.timer);
            getPowerConsumptionData();
            getAllMainInfo();
            $scope.timer = $timeout(refreshAllMainInfo, $scope.interval);
        }

        function initChartOption() {
            $scope.chart = {};
            $scope.chart.data = {};
            $scope.chart.data.labels = ['FAN1', 'FAN2', 'FAN3', 'FAN4', 'FAN5'];
            $scope.chart.data.series = [
                [5000, 4000, 4500, 8000, 6000]
            ];
            $scope.chart.barOptions = {
                low: 0,
                high: 10000,
                seriesBarDistance: 15,
                axisY: {
                    showGrid: true,
                    onlyInteger: true
                },
                axisX: {
                    showGrid: false,
                    labelOffset: {
                        y: 10
                    }
                }
            };
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


            $scope.eventList = response.data.MAIN.EVENT_LIST;

            $scope.systemInfo = response.data.MAIN.SYS_INFO;

            $scope.power1Vol = parseInt(response.data.MAIN.POWER.POWER1_VOLTAGE);
            $scope.power1Fan = parseInt(response.data.MAIN.POWER.POWER1_FAN);
            $scope.power2Vol = parseInt(response.data.MAIN.POWER.POWER2_VOLTAGE);
            $scope.power2Fan = parseInt(response.data.MAIN.POWER.POWER2_FAN);
            setPowerUsage();

            $scope.cpu1Temp = parseInt(response.data.MAIN.CPU1_TEMP.VALUE);

            $scope.cpu2Temp = parseInt(response.data.MAIN.CPU2_TEMP.VALUE);

            if (response.data.MAIN.BOARD_TEMP && response.data.MAIN.BOARD_TEMP.VALUE) {
                $scope.systemBoardTemp = parseInt(response.data.MAIN.BOARD_TEMP.VALUE);
            } else {
                $scope.systemBoardTemp = 30;
            }

            $scope.chart.data.series = [
                [
                    parseInt(response.data.MAIN.FANS.FAN1),
                    parseInt(response.data.MAIN.FANS.FAN2),
                    parseInt(response.data.MAIN.FANS.FAN3),
                    parseInt(response.data.MAIN.FANS.FAN4),
                    parseInt(response.data.MAIN.FANS.FAN5) //,
                ]
            ];

            checkImageFile().then(function () {
                getServerPowerControl().then(function (response) {
                    if (response.data.POWER.STATUS == '1') {
                        $scope.kvmImage = "./images/keti.jpeg?" + new Date().getTime();
                    } else {
                        $scope.kvmImage = "./images/poweroff.png?" + new Date().getTime();
                    }
                }).catch(function () {
                    $scope.kvmImage = "./images/no-img.png?" + new Date().getTime();
                });
            }, function () {
                $scope.kvmImage = "./images/no-img.png?" + new Date().getTime();
            });
        }





        function setInfo(response, index) {
            switch (index) {
                case '1':
                    $scope.eventList = response.data.MAIN.EVENT_LIST;
                    break;

                case '2':
                case '3':
                case '4':

                    if (response.data.MAIN.CPU1_TEMP && response.data.MAIN.CPU1_TEMP.VALUE) {
                        $scope.cpu1Temp = parseInt(response.data.MAIN.CPU1_TEMP.VALUE);
                    } else {
                        $scope.cpu1Temp = 0;
                    }

                    if (response.data.MAIN.CPU2_TEMP && response.data.MAIN.CPU2_TEMP.VALUE) {
                        $scope.cpu2Temp = parseInt(response.data.MAIN.CPU2_TEMP.VALUE);
                    } else {
                        $scope.cpu2Temp = 0;
                    }

                    if (response.data.MAIN.BOARD_TEMP && response.data.MAIN.BOARD_TEMP.VALUE) {
                        $scope.systemBoardTemp = parseInt(response.data.MAIN.BOARD_TEMP.VALUE);
                    } else {
                        $scope.systemBoardTemp = 30;
                    }
                    break;


                case '5':

                    $scope.power1Vol = parseInt(response.data.MAIN.POWER.POWER1_VOLTAGE);
                    $scope.power1Fan = parseInt(response.data.MAIN.POWER.POWER1_FAN);
                    $scope.power2Vol = parseInt(response.data.MAIN.POWER.POWER2_VOLTAGE);
                    $scope.power2Fan = parseInt(response.data.MAIN.POWER.POWER2_FAN);
                    setPowerUsage();
                    break;

                case '6':
                    $scope.chart.data.series = [
                        [
                            parseInt(response.data.MAIN.FANS.FAN1),
                            parseInt(response.data.MAIN.FANS.FAN2),
                            parseInt(response.data.MAIN.FANS.FAN3),
                            parseInt(response.data.MAIN.FANS.FAN4),
                            parseInt(response.data.MAIN.FANS.FAN5) //,
                        ]
                    ];
                    break;

                case '7':
                    $scope.systemInfo = response.data.MAIN.SYS_INFO;
                    break;

                case '8':
                    $scope.healthSummary = response.data.MAIN.HEALTH_SUMMARY;
                    $scope.healthSummary.DIMM1_CH_A = response.data.MAIN.HEALTH_SUMMARY.DIMM1_CH_A;
                    $scope.healthSummary.DIMM1_CH_B = response.data.MAIN.HEALTH_SUMMARY.DIMM1_CH_B;
                    $scope.healthSummary.DIMM2_CH_A = response.data.MAIN.HEALTH_SUMMARY.DIMM2_CH_A;
                    $scope.healthSummary.DIMM2_CH_B = response.data.MAIN.HEALTH_SUMMARY.DIMM2_CH_B;
                    $scope.healthSummary.Temperature = response.data.MAIN.HEALTH_SUMMARY.Temperature;

                    applyHardwareStatus();
                    refreshSensorInfo();
                    break;

            }
        }

        getComponentMembers();

        function getComponentMembers() {
            var url = CONST_RESTFUL_API.HOME.TEMP;
            return dataFactory.httpRequest(CONST_RESTFUL_API.HOME.TEMP).then(
                function (response) {
                    $scope.pcData = response.data;

                    setComponentMembers();

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

        function setComponentMembers() {
            var labeldata = [];
            var dateData = [];
            var seriesdata = [
                [],
                [],
                [],
                [],
                []
            ];
            var wattLength = 0;
            var sortedTempInfo_0, sortedTempInfo_1, sortedTempInfo_2, sortedTempInfo_3, sortedTempInfo_4;

            var tempInfo_0 = $scope.pcData.TEMP.GRAPH_DATA.LM75_TEMP0.MIN_GRAPH;
            var tempInfo_1 = $scope.pcData.TEMP.GRAPH_DATA.LM75_TEMP1.MIN_GRAPH;
            var tempInfo_2 = $scope.pcData.TEMP.GRAPH_DATA.LM75_TEMP2.MIN_GRAPH;
            var tempInfo_3 = $scope.pcData.TEMP.GRAPH_DATA.LM75_TEMP3.MIN_GRAPH;
            var tempInfo_4 = $scope.pcData.TEMP.GRAPH_DATA.LM75_TEMP4.MIN_GRAPH;

            wattLength = Math.min(tempInfo_0.length, tempInfo_1.length, tempInfo_2.length, tempInfo_3.length, tempInfo_4.length);


            sortedTempInfo_0 = tempInfo_0.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            sortedTempInfo_1 = tempInfo_1.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            sortedTempInfo_2 = tempInfo_2.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            sortedTempInfo_3 = tempInfo_3.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            sortedTempInfo_4 = tempInfo_4.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });

            for (var i = 0; i < wattLength; i++) {
                var tempUsage_0 = sortedTempInfo_0[i];
                var tempUsage_1 = sortedTempInfo_1[i];
                var tempUsage_2 = sortedTempInfo_2[i];
                var tempUsage_3 = sortedTempInfo_3[i];
                var tempUsage_4 = sortedTempInfo_4[i];

                var tempValue_0 = parseInt(tempUsage_0.WATT);
                var tempValue_1 = parseInt(tempUsage_1.WATT);
                var tempValue_2 = parseInt(tempUsage_2.WATT);
                var tempValue_3 = parseInt(tempUsage_3.WATT);
                var tempValue_4 = parseInt(tempUsage_4.WATT);

                var wattDate = tempUsage_0.DATETIME;
                dateData.push(Date.parse(wattDate));
                seriesdata[0].push(tempValue_0);
                seriesdata[1].push(tempValue_1);
                seriesdata[2].push(tempValue_2);
                seriesdata[3].push(tempValue_3);
                seriesdata[4].push(tempValue_4);
            }

            new Chartist.Line('#temperatureChart', {
                labels: labeldata,
                series: seriesdata
            }, {
                height: '195px',
                low: 0,
                showArea: true,
                axisX: {
                    showGrid: true
                },
                axisY: {
                    showGrid: true
                }
            });
        }


        function checkImageFile() {
            return $http.get('./images/keti.jpeg');
        }

        function setPowerUsage() {
            var type = ['lightGreen', 'green', 'yellow', 'orange', 'red'];
            var array = [$scope.power1Vol, $scope.power1Fan, $scope.power2Vol, $scope.power2Fan];
            $scope.powerUsageType = [];
            for (var i = 0; i < array.length; i++) {
                switch (i) {
                    case 0:
                    case 2:
                        $scope.powerUsageType.push(type[parseInt(array[i] / 120)]);
                        break;

                    case 1:
                    case 3:
                        $scope.powerUsageType.push(type[parseInt(array[i] / 4000)]);
                        break;
                }
            }
        }

        function getUsbRedirectionInfo() {
            $rootScope.showSpinner = true;

            dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_REDIRECTION).then(
                function (response) {

                    var tmpList = [];
                    tmpList = response.data.VM;

                    $scope.homefileList = [];
                    $scope.homefileList = tmpList.sort(function (a, b) {
                        var sub_a = a.ID.substring(3);
                        var sub_b = b.ID.substring(3);
                        if (sub_a < sub_b)
                            return -1;
                        else if (sub_a > sub_b)
                            return 1;
                        return 0;
                    });
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.SYSTEM.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function toggleButton(item, state) {
            if (state === 'on') {
                console.log("USB ON");
            } else if (state === 'off') {
                console.log("USB OFF");
            }
        }


        function initScopeData() {

            $scope.selectedCmSmIndex = 0;
            $scope.selectedCmSm = {};
            $scope.selectedCmSmRamInsert = "0000";

            $scope.chassisCollection = {};
            $scope.currentKVMImageFileName = [
                './images/kvm_image/kvm_image_CM1.jpeg',
                './images/poweroff.png',
                './images/poweroff.png',
                './images/poweroff.png'
            ];

        }
        function mountedButton(item) {
            var params = {
                ID: item.ID,
                INSERTED: item.MOUNTED
            };

            if (item.MOUNTED === 'X') {
                dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_REDIRECTION, 'POST', undefined, params).then(
                    function (response) {
                        if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                            $scope.fileList = [];
                            getUsbRedirectionInfo();
                            logger.logSuccess(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.S002);
                        } else {
                            logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E002);

                        }
                    }
                ).catch(function () {
                    logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E002);
                });
            } else if (item.MOUNTED === 'O') {
                dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_REDIRECTION, 'DELETE', undefined, params).then(
                    function (response) {
                        if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                            $scope.fileList = [];
                            getUsbRedirectionInfo();
                            logger.logSuccess(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.S003);
                        } else {
                            logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E003);
                        }
                    }
                ).catch(function () {
                    logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E003);
                });
            }
        }


        getSensorInfo();

        function getSensorInfo() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.SENSOR_INFO).then(
                function (response) {
                    console.log('Sensor info. getting done');
                    $scope.sensorInfo = response.data.SENSOR_INFO;

                    if (!$scope.selectedSensor) {
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
            var criticalCount = 0; 

            for (var i = 0; i < $scope.sensorInfo.SENSOR.length; i++) {
                setSensorStatus($scope.sensorInfo.SENSOR[i]);
        
                if ($scope.sensorInfo.SENSOR[i].STATUS === 'Critical') {
                    criticalCount++;
                }
            }

            var imageElement = document.getElementById("status-img");
            var statusTextElement = document.querySelector(".img-title");
            var criticalCountElement = document.getElementById("critical-count");

            console.log('criticalCount :' + criticalCount);
            
            if (imageElement) {
                if (criticalCount <= 10) {
                    imageElement.src = './images/status.png';
                    statusTextElement.textContent = "Normal";
                    criticalCountElement.textContent = criticalCount;

                    console.log('criticalCount - normal');

                } else {
                    imageElement.src = './images/warring.png';
                    statusTextElement.textContent = "Warring";
                    statusTextElement.classList.add("warning-text");
                    criticalCountElement.textContent = criticalCount;

                    console.log('criticalCount - warring');
                }
            }
        }

        function setSensorStatus(sensor) {

            if ((parseFloat(sensor.READING) < parseFloat(sensor.LC)) ||
                (parseFloat(sensor.READING) > parseFloat(sensor.UC))) {
                sensor.STATUS = 'Critical';
                sensor.THRESHOLD = 'Critical';
            } else {
                sensor.STATUS = 'Normal';
                sensor.THRESHOLD = 'Normal';
            }


            if (parseFloat(sensor.READING) == 0) {
                sensor.STATUS = 'Normal';
                sensor.THRESHOLD = 'Normal';
            }
        }

        function refreshSensorInfo() {
            $timeout.cancel($scope.timer);
            getSensorInfo();
            $scope.timer = $timeout(refreshSensorInfo, $scope.interval);
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

            $scope.timer = null;
            $scope.interval = 60 * 1000;
            $rootScope.showSpinner = true;

            $scope.indicatorOption = {
                fontWeight: 'bold',
                fontSize: 20,
                initValue: 30,
                fontColor: '#555',
                barColor: {
                    20: '#00b000',
                    40: '#80d701',
                    60: '#f4f001',
                    80: '#f48000',
                    100: '#f40000'
                },
            };


            initChartOption();
            $rootScope.showSpinner = true;
            getPowerConsumptionData();
            getAllMainInfo().then(
                function () {
                    $scope.timer = $timeout(refreshAllMainInfo, $scope.interval);
                },
                function () {
                    $timeout.cancel($scope.timer);
                }
            );

            getSensorInfo().then(
                function () {
                    $scope.timer = $timeout(refreshSensorInfo, $scope.interval);
                },
                function () {
                    logger.logError(CONST_MESSAGE.SERVER_HEALTH.SENSOR_READINGS.E001);
                    $timeout.cancel($scope.timer);
                }
            );


            $scope.homefileList = [];
            getUsbRedirectionInfo();

            initScopeData();

            tempchartinitScopeData();

            printRefreshTime();

            getComponentMembers();
            toggleButton();
            mountedButton();

            setTestChart();


        };

        $scope.refresh = function () {
            $scope.homefileList = [];
            getUsbRedirectionInfo();

            getCommand1();
            getCommand2();
            getCommand3();
            getCommand4();
            getCommand5();
            getCommand6();
            getCommand7();
            getCommand8();


        };

        $scope.onRefresh = function (index) {
            getMainInfo(index).then(
                function (response) {
                    setMainInfo(response, index);
                },
                function () {
                }
            )
        };

        $scope.onClick_com3 = function () {
            if (!$rootScope.kvmRef) {
                $rootScope.kvmRef = $window.open(window.location.protocol + "//" + window.location.hostname + ":7681", '_blank', 'height=768' + ',width=1024');
            } else if ($rootScope.kvmRef.closed == false) {
                var agent = navigator.userAgent.toLowerCase();

                if (agent.indexOf("chrome") != -1) {
                    logger.log(CONST_MESSAGE.REMOTE_CONTROL.KVM.I001);
                } else {
                    $rootScope.kvmRef.focus();
                }

            } else {
                $rootScope.kvmRef = $window.open(window.location.protocol + "//" + window.location.hostname + ":7681", '_blank', 'height=768' + ',width=1024');
            }
        };




        $scope.onClick_com1 = function () {
            dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_1).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {

                    }
                })
        };

        $scope.onClick_com2 = function () {
            dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_2).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {

                    }
                })
        };

        $scope.onClick_com4 = function () {
            dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_4).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {

                    }
                })
        };

        $scope.onClick_com5 = function () {
            dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_5).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {

                    }
                })
        };

        $scope.onClick_com6 = function () {
            dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_6).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {

                    }
                })
        };

        $scope.onClick_com7 = function () {
            dataFactory.httpRequest(CONST_RESTFUL_API.HOME.COMMAND_7).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {

                    }
                })
        };






        $scope.$on("$destroy", function () {
            console.log('Home $destroy !!!!');
            $timeout.cancel($scope.timer);
            $window.onresize = undefined;
        });


        $scope.onClick_com3 = function () {
            if (!$rootScope.kvmRef) {
                $rootScope.kvmRef = $window.open(window.location.protocol + "//" + window.location.hostname + ":7681", '_blank', 'height=768' + ',width=1024');
            } else if ($rootScope.kvmRef.closed == false) {
                var agent = navigator.userAgent.toLowerCase();

                if (agent.indexOf("chrome") != -1) {
                    logger.log(CONST_MESSAGE.REMOTE_CONTROL.KVM.I001);
                } else {
                    $rootScope.kvmRef.focus();
                }

            } else {
                $rootScope.kvmRef = $window.open(window.location.protocol + "//" + window.location.hostname + ":7681", '_blank', 'height=768' + ',width=1024');
            }
        };

        $scope.onChangeMember = function () {
            console.log('onChangeMember called');
            getThermalChartData();
        }


        $scope.didClickSensor = function (sensor) {
            $scope.selectedSensor = sensor;
        };

        $scope.$on("$destroy", function () {
            console.log('SensorReadingsController $destroy !!!!')
            $timeout.cancel($scope.timer);
        });

        $scope.toggleInserted = function (item) {
            var params = {
                ID: item.ID,
                INSERTED: item.INSERTED
            };

            if (item.INSERTED === 'X') {
                dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_REDIRECTION, 'POST', undefined, params).then(
                    function (response) {
                        if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                            $scope.fileList = [];
                            item.INSERTED = 'O'
                            getUsbRedirectionInfo();

                            logger.logSuccess(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.S002);
                        } else {
                            logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E002);
                        }
                    }
                ).catch(function () {
                    logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E002);
                });
            } else if (item.INSERTED === 'O') {
                dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_REDIRECTION, 'DELETE', undefined, params).then(
                    function (response) {
                        if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                            $scope.fileList = [];
                            item.INSERTED = 'X'
                            getUsbRedirectionInfo();
                            logger.logSuccess(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.S003);
                        } else {
                            logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E003);
                        }
                    }
                ).catch(function () {
                    logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E003);
                });
            }
        };

        $scope.extractDate = function(input) {
            if (!input) return '-';
            
            var dateParts = input.split(' UTC ');
            if (dateParts.length < 2) return '-';
            
            return dateParts[0];
        };


    }

]);
