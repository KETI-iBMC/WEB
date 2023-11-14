app.controller('energySavingSmartFanController', [
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
    '$http',
    'radialIndicatorInstance',
    '$window',
    '$rootScope',
    '$location',
    '$cookies',
    'echartSupport',
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
        $location,
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
                new Chartist.Line('#graph_min', {
                    labels: labeldata,
                    series: seriesdata

                }, {
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
                    }

                });
            }
            else if (index == 2) {
                new Chartist.Line('#graph_hour', {
                    labels: labeldata,
                    series: seriesdata
                }, {
                    height: '500px',
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
            else if (index == 3) {
                new Chartist.Line('#graph_day', {
                    labels: labeldata,
                    series: seriesdata
                }, {
                    height: '500px',
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
        }

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
            m_per = m_total / 24;
            h_total = hourTotal[0] + hourTotal[1];
            h_per = h_total;
            $scope.Total_lastmin = m_per.toFixed(2);
            $scope.Total_lasthour = h_per.toFixed(2);


            new Chartist.Bar('#graph_today_total',
                {
                    series: seriesData,
                    //labels: ['Last 60 Min', 'Last 24 Hour']
                    labels: ['Last Hour', 'Last Day']

                }, {
                seriesBarDistance: 20,
                reverseData: true,
                horizontalBars: true,
                height: '200px',
                axisY: {
                    showGrid: false,
                    offset: 70
                }
            });
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

        function saveRPMTempChart() {

            for (i = 0; i < 9; i++) {
                $scope.fanTempRPMList[i].data = Chart.instances[0].data.datasets[0].data;
            }

            $scope.TempRPMChart.data.datasets[0].data = $scope.fanTempRPMList[0].data;

            // $scope.TempRPMChart.hide(0);
            $scope.TempRPMChart.show(0);
            $scope.TempRPMChart.update('none');
            var url;
            if ($scope.selectedCoolingAlgo == "Default Manual") {
                url = "/redfish/v1/FanRPMTempSet";
            }
            // Default Auto, BFC
            else if ($scope.selectedCoolingAlgo == "Default Auto" || $scope.selectedCoolingAlgo == "BFC") {
                url = "/redfish/v1/FanRPMTempSetAuto";
                // // Criteria Patch
                // var body = {fanTempRPMList: forBody};
                // console.log('body: ', body);

                // var header = {"Content-Type": "application/json"};
                // dataFactory.httpRequest("http://" + $scope.cmmIP + ":8000" + url, 'PATCH', undefined, body, undefined, header).then(
                // function (response) {
                //     if (response.status == CONST_CODE.REST_SUCCESS_CODE) {
                //         return response.data;
                //     } else {
                //         console.error("error");
                //     }
                // }
                // ).catch(
                //     function (reason) {
                //         console.log(reason.data.Error);
                //     }
                // ).finally(function () {
                //     // $rootScope.showSpinnerCount = $rootScope.showSpinnerCount - 1;
                // });
            }
            else if ($scope.selectedCoolingAlgo == "LFC") {
                url = "/redfish/v1/FanRPMTempSetAuto";
                // Criteria Patch
            }

            var forBody = $scope.fanTempRPMList;

            // for(var i = 0; i < $scope.fanTempRPMList.length; i++){
            //     forBody[i].criteria = "LFC";
            // }

            var body = { fanTempRPMList: forBody };
            console.log('body: ', body);

            var header = { "Content-Type": "application/json" };
            dataFactory.httpRequest("http://" + $scope.cmmIP + ":8000" + url, 'PATCH', undefined, body, undefined, header).then(
                function (response) {
                    if (response.status == CONST_CODE.REST_SUCCESS_CODE) {
                        return response.data;
                    } else {
                        console.error("error");
                    }
                }
            ).catch(
                function (reason) {
                    console.log(reason.data.Error);
                }
            ).finally(function () {
                // $rootScope.showSpinnerCount = $rootScope.showSpinnerCount - 1;
            });


        }

        function saveFanConfig() {
            const coolingurl = "/CoolingAlgorithm";
            var body = { "CoolingAlgorithm": $scope.selectedCoolingAlgo };

            console.log('body: ', body);

            var header = { "Content-Type": "application/json" };
            dataFactory.httpRequest(CONST_RESTFUL_API.ROOT_DOMAIN + coolingurl, 'PUT', undefined, body, undefined, header).then(
                function (response) {
                    if (response.status == CONST_CODE.REST_SUCCESS_CODE) {
                        return response.data;
                    } else {
                        console.error("error");
                    }
                }
            ).catch(
                function (reason) {
                    console.log(reason.data.Error);
                }
            ).finally(function () {
                // $rootScope.showSpinnerCount = $rootScope.showSpinnerCount - 1;
            });
        }

        function saveTargetedTemperature() {
            const targettempurl = "/redfish/v1/Chassis/CMM1/Thermal/Fans";
            var body = { "FanSpeed": $scope.TempRPMDict[$scope.selectedTargetTemperature] };

            console.log('body: ', body);

            var header = { "Content-Type": "application/json" };
            dataFactory.httpRequest("http://" + $scope.cmmIP + ":8000" + targettempurl, 'PATCH', undefined, body, undefined, header).then(
                function (response) {
                    if (response.status == CONST_CODE.REST_SUCCESS_CODE) {
                        return response.data;
                    } else {
                        console.error("error");
                    }
                }
            ).catch(
                function (reason) {
                    console.log(reason.data.Error);
                }
            ).finally(function () {
                // setTargetedTempEvaluator();
            });
        }

        function setTargetedTempEvaluator() {
            const targettempevalurl = "/redfish/v1/TargetedTempEvaluate";
            var body = {
                "TargetedTemp": $scope.selectedTargetTemperature,
                "BMCIP": CONST_RESTFUL_API.ROOT_DOMAIN
            };
            console.log('body: ', body);

            var header = {"Content-Type": "application/json"};
            dataFactory.httpRequest("http://" + $scope.cmmIP + ":8000" + targettempevalurl, 'POST', undefined, body, undefined, header).then(
                function (response) {
                    if (response.status == CONST_CODE.REST_SUCCESS_CODE) {
                        return response.data;
                    } else {
                        console.error("error");
                    }
                }
            ).catch(
                function (reason) {
                    // console.log(reason.data.Error);
                }
            ).finally(function () {
                // setInterval(getElapsedTime, 1000);
                // setInterval(() => console.log("aaa"), 1000);
                console.log("bb");
                // 시작시간 타임스탬프 돌려주기
            });
        }
        
        function getElapsedTime(){
            const targettempevalurl = "/redfish/v1/TargetedTempElapsedTime";
            dataFactory.httpRequest("http://" + $scope.cmmIP + ":8000" + targettempevalurl, 'GET').then(
                function (response) {
                    if (response.status == CONST_CODE.REST_SUCCESS_CODE) {
                        return response.data;
                    } else {
                        console.error("error");
                    }
                }
            ).catch(
                function (reason) {
                    console.log(reason.data.Error);
                }
            ).finally(function () {
            });
        }

        function getCMMIP() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.ROOT_DOMAIN + "/CMMIP", 'GET').then(
                function (response) {
                    $scope.cmmIP = response.data.CMMIP;
                }
            ).finally(function () {

            });
        }

        function setChart() {
            $scope.TempRPMChart.show(0);
        }

        function getChartData() {
            return dataFactory.httpRequest("http://" + $scope.cmmIP + ":8000/redfish/v1/FanRPMTempInfo", 'GET').then(
                function (response) {
                    console.log(response.data);
                    for (var i = 0; i < response.data.FanTempRPM.length; i++) {
                        var dataarr = [];
                        var labelarr = [];
                        for (var j = 0; j <= 10; j++) {
                            dataarr.push(response.data.FanTempRPM[i].Data[j * 10]);
                            labelarr.push(j * 10);
                        }
                        $scope.fanTempRPMList[i].data = dataarr;
                        $scope.fanTempRPMList[i].label = labelarr;
                        $scope.fanTempRPMList[i].algo = response.data.FanTempRPM[i].Algorithm;
                        $scope.fanTempRPMList[i].tempsource = response.data.FanTempRPM[i].TempSource;
                    }
                }
            ).finally(function () {
                initFanTempRPM();
            });
        }

        function initFanTempRPM() {
            $scope.TempRPMChart.data.datasets[0].data = $scope.fanTempRPMList[0].data;
            $scope.TempRPMChart.show(0);
            $scope.TempRPMChart.update('none');
            $scope.nonBFCChartData = $scope.TempRPMChart.data.datasets;
        }

        function BFCFanTempRPM() {
            $scope.nonBFCChartData = $scope.TempRPMChart.data.datasets;
            for (var i = 0; i < $scope.fanTempRPMList.length; i++) {
                var oneData = new Object();

                // var _dataarr = [10, 10, 10, 10, 10, 10, 90, 90, 90, 90, 90];
                var _dataarr = [30, 30, 30, 30, 30, 30, 90, 90, 90, 90, 90];
                var _label = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
                oneData.data = _dataarr;
                oneData.label = _label;
                $scope.BFCChartData[i] = oneData;
            }

            $scope.TempRPMChart.data.datasets[0].data = $scope.BFCChartData[0].data;
            $scope.TempRPMChart.show(0);
            $scope.TempRPMChart.update('none');
        }

        function resumeFanTempRPM() {
            //$scope.TempRPMChart.data.datasets[0].data = $scope.nonBFCChartData;
            $scope.TempRPMChart.data.datasets[0].data = $scope.nonBFCChartData[0].data;
            //$scope.TempRPMChart.hide(0);
            $scope.TempRPMChart.hide(0);
            $scope.TempRPMChart.show(0);
            $scope.TempRPMChart.update('none');
        }

        function foo(){
            console.log("aaa");
        }

        function getFanspeed() {
            dataFactory.httpRequest(CONST_RESTFUL_API.SMART_FAN_CONTROL.RPMDATA, 'GET').then(
                function (response) {
                    const fans = response.data.Fans;

                    fans.sort((a, b) => a.MemberId.localeCompare(b.MemberId));

                    const fanReadingsElement = document.getElementById("fan-readings");
            	    fanReadingsElement.innerHTML = '';


                    fans.forEach((fan, index) => {
                        const reading = fan.Reading;
                        //$scope.fanSpeed = fans[4].OEM.Percentage;


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

        dataFactory.httpRequest(CONST_RESTFUL_API.SMART_FAN_CONTROL.RPMDATA, 'GET').then(
            function (response) {
                getAllWattInfo();
                // setTodayTotalChartData(totalData);
                angular.element("#TotalGraph").modal('hide');
            },
            function (error) {
                console.log(error);
            }
        );


        function setWattChartData2(cpuChartInfo_1, cpuChartInfo_2, cpuChartInfo_3) {
            if (!cpuChartInfo_1) {
                return;
            }

            var sorteCpuInfo_1, sorteCpuInfo_2, sorteCpuInfo_3;
            var cpulabeldata = [];
            var cpudateData = [];
            var cpuseriesdata = [[], [], []];
            //var cpuLength = 0;
            var cpuLength = Math.min(cpuChartInfo_1.length, cpuChartInfo_2.length, cpuChartInfo_3.length);



            sorteCpuInfo_1 = cpuChartInfo_1.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            sorteCpuInfo_2 = cpuChartInfo_2.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            sorteCpuInfo_3 = cpuChartInfo_3.sort(function (a, b) {
                if (a.DATETIME < b.DATETIME) return -1;
                if (a.DATETIME > b.DATETIME) return 1;
                return 0;
            });


            for (var i = 0; i < cpuLength; i++) {

                var cpuUsage_1 = sorteCpuInfo_1[i];
                var cpuValue_1 = parseInt(cpuUsage_1.WATT);
                var cpuUsage_2 = sorteCpuInfo_2[i];
                var cpuValue_2 = parseInt(cpuUsage_2.WATT);
                var cpuUsage_3 = sorteCpuInfo_3[i];
                var cpuValue_3 = parseInt(cpuUsage_3.WATT);
                var cpuDate = cpuUsage_1.DATETIME;
                cpudateData.push(Date.parse(cpuDate));
                cpuseriesdata[0].push(cpuValue_1);
                cpuseriesdata[1].push(cpuValue_2);
                cpuseriesdata[2].push(cpuValue_3);

                var cputimeValue;
                cputimeValue = sorteCpuInfo_1[i].DATETIME.slice(11, sorteCpuInfo_1[i].DATETIME.length);

                cpulabeldata.push(cputimeValue);

            }


            new Chartist.Line('#graph_test', {
                labels: cpulabeldata,
                series: cpuseriesdata

            }, {
                height: '500px',
                width: '550px',
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
                }

            })

        }

        function getTemp() {
            var temp;
            dataFactory.httpRequest(CONST_RESTFUL_API.SMART_FAN_CONTROL.BFCTEMP, 'GET').then(
                function (response) {
                    $scope.temperature = response.data.TEMP.GRAPH_DATA.CPU0_TEMP.MIN_GRAPH[0].WATT;
                }
            ).finally(function () {
            });
        }


        getgraphdata();
        function getgraphdata() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.CPU_POEWR_CAPPING.TOTAL_GRAPH, 'GET').then(
                function (response) {
                    $scope.cpuInfo = response.data.POWER_USAGE;
                    setWattChartData2(response.data.POWER_USAGE.GRAPH_DATA.BFS, response.data.POWER_USAGE.GRAPH_DATA.Default, response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH);

                    // return $q.resolve(response);
                },
                function (error) {
                    console.log(error);
                    return $q.reject(error);
                }
            ).finally(function () {
                $rootScope.showcpuSpinner = false;
            });
        }
        $rootScope.showcpuSpinner = true;


        function refreshGraph() {
            setInterval(function() {
                getAllWattInfo();
                getFanspeed();
                getTemp();
                saveRPMTempChart();
                getgraphdata();
                console.log("aaa");
            }, 2000);
        }
        
        window.onload = function() {
            refreshGraph();
        };


        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/

        $scope.init = function () {
            $scope.cpuInfo = {
                MODEL_NAME: 'Example Model',
                CPU_CURRENT: 5.0,
                CPU_POWER: 150
            };
            $scope.CpuLabelList = [
                { label: "CPU 1" },
                { label: "CPU 2" },
                { label: "CPU 3" },
                { label: "CPU 4" },
                { label: "CPU 5" }
            ];

            $scope.CpuSpeedList = [ // 가상의 CPU 속도 리스트
                "10%",
                "20%",
                "30%",
                "40%",
                "50%",
                "60%"
            ];
            // 가상의 CPU 데이터 예시
            $scope.CpuChartData = {
                labels: ["CPU 1", "CPU 2", "CPU 3", "CPU 4", "CPU 5", "CPU 6", "CPU 7", "CPU 8"],
                series: [
                    [80, 75, 60, 45, 70, 85, 50, 65] // 각 CPU에 대한 가상의 데이터, 백분율로 표시
                ]
            };


            $scope.cmmIP = "10.0.4.123";
            getCMMIP();


            // Chartist.js 그래프 설정
            var options = {
                axisY: {
                    labelInterpolationFnc: function (value) {
                        return value + "%"; // Y 축에 백분율 표시
                    }
                }
            };

            var responsiveOptions = [
                ['screen and (max-width: 640px)', {
                    seriesBarDistance: 10,
                    axisX: {
                        labelInterpolationFnc: function (value) {
                            return value[0]; // 화면 너비에 따른 라벨 표시 조정
                        }
                    }
                }]
            ];
            new Chartist.Bar('#CpuChart', $scope.CpuChartData, options, responsiveOptions);

            var chartOptions = {
                type: 'line',
                data: {
                    labels: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                    datasets: [
                        {
                            data: [0, 17.5, 35, 52.5, 70, 75, 80, 85, 90, 95, 100],
                            fill: true,
                            borderWidth: 1,
                            pointHitRadius: 25,
                            backgroundColor: createGradient(), // 적절한 색상으로 변경

                            borderColor: 'rgba(162, 222, 208, 1)', // 적절한 색상으로 변경
                            hidden: false
                        }
                    ]
                },
                options: {
                    scales: {
                        x: {
                            type: "linear",
                            min: 0,
                            max: 100,
                            position: "bottom",
                            ticks: {
                                stepSize: 10
                            },
                            grid: {
                                display: true
                            }
                        },
                        y: {
                            type: "linear",
                            min: 0,
                            max: 100,
                            position: "left",
                            ticks: {
                                stepSize: 10
                            },
                            grid: {
                                display: true
                            }
                        }
                    },
                    onHover: function (e) {
                        const point = e.chart.getElementsAtEventForMode(e, 'nearest', { intersect: true }, false)
                        if (point.length) e.native.target.style.cursor = 'grab'
                        else e.native.target.style.cursor = 'default'
                    },
                    plugins: {
                        legend: {
                            display: false
                        },
                        dragData: {
                            round: 1,
                            showTooltip: true,
                            onDragStart: function (e, datasetIndex, index, value) {

                            },
                            onDrag: function (e, datasetIndex, index, value) {
                                e.target.style.cursor = 'grabbing'
                            },
                            onDragEnd: function (e, datasetIndex, index, value) {
                                e.target.style.cursor = 'default'
                                console.log(datasetIndex, index, value);
                            }
                        },

                    },
                    title: {
                        display: false
                    },
                    responsive: false
                }
            }

            function createGradient() {
                var ctx = document.getElementById("lineChart").getContext("2d");
                var gradient = ctx.createLinearGradient(0, 0, 400, 0); // x 좌표의 범위를 변경하여 왼쪽에서 오른쪽으로 그라데이션 적용
                gradient.addColorStop(0, 'rgba(54,162,235,0.7)'); // 시작 색상
                gradient.addColorStop(1, 'rgba(255,99,132,0.7)'); // 끝 색상
                return gradient;
            }

            $scope.RPMchartOption = chartOptions;

            $scope.chartCtx = document.getElementById("lineChart").getContext("2d");
            $scope.TempRPMChart = new Chart($scope.chartCtx, $scope.RPMchartOption);

            $scope.fanTempRPMList = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

            // $scope.source = "CPU";
            $scope.selectedTempSource = "CPU";
            $scope.selectedCoolingAlgo = "Default Manual";
            $scope.selectedTargetTemperature = "Disabled";
            $scope.selectedCriteria = "Max";

            $scope.fanSpeed = "";
            $scope.tempSource = "CPU";
            $scope.temperature = "";
            $scope.criteria = "CPU temp max";
            $scope.tempSourceList = ["CPU"]; // BackPlane, ...
            $scope.coolingAlgoList = ["Default Manual", "Default Auto", "LFC", "BFC"];
            $scope.targetTemperatureList = ["Disabled", "45", "47", "49", "51", "54", "58", "65"];

            // max rpm 7200기준
            $scope.TempRPMDict = { "45": "100%", "47": "90%", "49": "80%", "51": "70%", "54": "60%", "58": "50%", "65": "40%" };

            $scope.criteriaList = ["Max"]; // Max, Average, ...

            $scope.BFCChartData = [{}, {}, {}, {}, {}, {}, {}, {}, {}];
            $scope.nonBFCChartData = [{}, {}, {}, {}, {}, {}, {}, {}, {}];

            $scope.onChangeTempSource = function () {
                console.log($scope.selectedTempSource);
            };

            $scope.onChangeCoolingAlgo = function () {
                if ($scope.selectedCoolingAlgo == "LFC") {
                    $scope.criteria = "[LFC] CPU next temp";
                    //resumeFanTempRPM();
                }
                else {
                    if ($scope.selectedCoolingAlgo == "Default Manual") {
                        $scope.criteria = "CPU temp max";
                    }
                    else {
                        $scope.criteria = "CPU temp";
                    }
                    if ($scope.selectedCoolingAlgo == "BFC") {
                        // 프리셋으로 지정된 데디터셋을 집어넣으면 될듯
                        BFCFanTempRPM();
                    }
                }
                console.log($scope.selectedCoolingAlgo);
            };

            $scope.onChangeTargetTemperature = function () {
                console.log($scope.selectedTargetTemperature);
            };

            $scope.onChangeCriteria = function () {
                console.log($scope.selectedCriteria);
            };

            $scope.onClickFanSave = function () {
                console.log("save");

                if ($scope.selectedTargetTemperature == "Disabled") {
                    saveFanConfig();
                    saveRPMTempChart();
                }
                else {
                    saveTargetedTemperature();
                }


                // var body = {
                //     TempSource: $scope.selectedTempSource,
                //     CoolingAlgo: $scope.selectedCoolingAlgo,
                //     Criteria: $scope.selectedCriteria
                // };
                // console.log(body);
                // CONST_RESTFUL_API.SMART_FAN_CONTROL.ENERGY, 'POST'
                // dataFactory.httpRequest(CONST_RESTFUL_API.ROOT_DOMAIN + url, 'PATCH', undefined, body, undefined, header).then(
                //     function (response) {
                //         if (response.status === CONST_CODE.REST_SUCCESS_CODE) {

                //             return response.data;
                //         } else {
                //             console.error("All Fan Control Failed");
                //         }
                //     }
                // ).catch(
                //     function (reason) {
                //         console.log(reason.data.Error);
                //     }
                // ).finally(function () {
                //     $rootScope.showSpinnerCount = $rootScope.showSpinnerCount - 1;
                // });
                // 여기에 request로 source, algo, criteria 던져주기
            }

            $scope.onChangeCpuLabel = function (selectedCpuLabel) {
                console.log(selectedCpuLabel);
            };

            $scope.onChangeCpuSpeed = function (selectedCpuSpeed) {
                console.log(selectedCpuLabel);
            };

            $scope.onClickModifyCpuSpeed = function () {
            };

            $scope.onRefresh = function (index) {
                getWattInfoIndex(index).then(
                    function (response) {
                        if (index == 3) {
                            // setWattChartData(1, response.data.LAST_MIN_GRAPH_1, response.data.LAST_MIN_GRAPH_2);
                            setWattChartData(1, response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.MIN_GRAPH);
                        }
                        else if (index == 4) {
                            // setWattChartData(2, response.data.LAST_HOUR_GRAPH_1, response.data.LAST_HOUR_GRAPH_2);
                            setWattChartData(2, response.data.POWER_USAGE.GRAPH_DATA.PSU1.HOUR_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.HOUR_GRAPH);
                        }
                        else if (index == 5) {
                            // setWattChartData(3, response.data.LAST_DAY_GRAPH_1, response.data.LAST_DAY_GRAPH_2);
                            setWattChartData(3, response.data.POWER_USAGE.GRAPH_DATA.PSU1.DAY_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.DAY_GRAPH);
                        }
                    },
                    function () {
                        logger.logError(CONST_MESSAGE.SERVER_HEALTH.POWER_USAGE.E001);
                    }
                )
            };

            $scope.openTotalGraph = function (cpuChartInfo_1) {
                getgraphdata();
                setWattChartData2(cpuChartInfo_1);
            };

            $scope.graphData = {
                // Real Time 데이터
                realTime: {
                    labels: ["1 min", "2 min", "3 min", "4 min", "5 min", "6 min", "7 min", "8 min"],
                    series: [
                        {
                            name: "Server Load",
                            data: [10, 15, 12, 20, 18, 22, 25, 30]
                        },
                    ]
                },

                lastHour: {
                    labels: ["10 min", "20 min", "30 min", "40 min", "50 min", "60 min"],
                    series: [
                        {
                            name: "Server Load",
                            data: [25, 30, 35, 40, 45, 50]
                        },
                    ]
                },

                lastDay: {
                    labels: ["1 hour", "2 hours", "3 hours", "4 hours", "5 hours", "6 hours", "7 hours", "8 hours"],
                    series: [
                        {
                            name: "Server Load",
                            data: [40, 45, 50, 55, 60, 65, 70, 75]
                        },
                    ]
                }
            };
            $rootScope.showSpinner = true;

            getAllWattInfo().then();

            getTemp();
            // setRPMTempChart();
            getChartData();
            // saveFanConfig();

            // setChart();
            // initScopeData();
            // sendTempRPMData();
            // getFanTempRPMData();
            setInterval(foo, 1000);
        };


    }
]);