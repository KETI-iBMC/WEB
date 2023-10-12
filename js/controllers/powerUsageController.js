/*app.controller('powerUsageController', [
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
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        $rootScope,
        $location
    ) {
        */
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
        /*
        function getAllwattInfo() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.POWER_USAGE, 'GET', {INDEX: 0}).then(
                function (response) {
                    $scope.wattInfo = response.data.POWER_USAGE;
                    setWattChartData(response.data.POWER_USAGE.LAST_HOUR_GRAPH);
                },
                function (error) {
                    console.log(error);
                    return $q.reject(error);
                }
            ).finally(function () {
                $rootScope.showSpinner = false;
            });
        }
        function initChartOption() {
            $scope.chart = {};
            $scope.chart.data = {};
            $scope.chart.data.labels = [];
            $scope.chart.data.series = [];
            $scope.chart.barOptions = {
                high: 500,
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
        function setWattChartData(wattChartInfo) {
            if(!wattChartInfo) {
                return;
            }

            var labeldata = [];
            var seriesdata = [];

            for(var i = 0; i < wattChartInfo.length; i++) {
                var wattUsage = wattChartInfo[i];
                var wattValue = wattUsage.WATT;
                var wattId = wattUsage.ID;
                labeldata.push(wattId);
                seriesdata.push(wattId);
            }

            $scope.h_chart.data.labels.push(labeldata);
            $scope.h_chart.data.series[0].push(seriesdata);
        }

        $scope.init = function () {
            if(!$rootScope.isLogin) {
                $location.url('/login');
                return;
            }
            initChartOption();
            $rootScope.showSpinner = true;
            getEventLog().then(
                function () {
                    logger.logError(CONST_MESSAGE.SERVER_HEALTH.POWER_USAGE.E001);
                    $timeout.cancel($scope.timer);
                }
            );
        };


    }
]);*/
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
        function initChartOption() {
            $scope.h_chart = {};
            $scope.h_chart.data = {};
            $scope.h_chart.data.labels = [];
            $scope.h_chart.data.series = [[]];
        }
        function setTotalChartData(minData_1, minData_2, hourData_1, hourData_2){

            var minLength_1 = minData_1.length;
            var minLength_2 = minData_2.length;
            var hourLength_1 = hourData_1.length;
            var hourLength_2 = hourData_2.length;

            var seriesData = [[],[]];
            var minTotal = [0,0];
            var hourTotal = [0,0];
            var m_total = 0;
            var h_total = 0;
            for(var i = 0 ; i < minLength_1 ; i++){
                minTotal[0] += parseInt(minData_1[i].WATT);
            }
            for(var i = 0 ; i < minLength_2 ; i++){
                minTotal[1] += parseInt(minData_2[i].WATT);
            }
            for(var i = 0 ; i < hourLength_1 ; i++){
                hourTotal[0] += parseInt(hourData_1[i].WATT);
            }
            for(var i = 0 ; i < hourLength_2 ; i++){
                hourTotal[1] += parseInt(hourData_2[i].WATT);
            }
            m_total = minTotal[0] + minTotal[1];
            h_total = hourTotal[0] + hourTotal[1];
            $scope.Total_lastmin = m_total;
            $scope.Total_lasthour = h_total;
            seriesData[0].push(minTotal[0]);
            seriesData[0].push(hourTotal[0]);
            seriesData[1].push(minTotal[1]);
            seriesData[1].push(hourTotal[1]);

            new Chartist.Bar('#graph_today_total',
            {
                series: seriesData,
                labels: ['Last Min', 'Last Hour']
            },{
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
        
        // [수정6] power usage 화면 대 공사..
        function setTodayTotalChartData(totalData){
            var seriesData = [[], []];
            var minTotal = [0,0];
            var hourTotal = [0,0];

	    minTotal[0] = totalData.PSU1.LAST60MIN/24;
            minTotal[1] = totalData.PSU2.LAST60MIN/24;
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

            },{
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

        function setPeakChartData(peakData_1, peakData_2){
            var peakLength_1 = peakData_1.length;
            var peakLength_2 = peakData_2.length;
            var peakValue = parseInt(peakData_1[peakLength_1 - 1].WATT) + parseInt(peakData_2[peakLength_2 - 1].WATT);
            // [수정2] elsevalue 가 남은 걸 보여주려면 이렇게 바꿔야함 참고로 peak랑 object 색깔을 바꾸면 더좋을듯
            // 기존 목표값 1600을 임시로 700으로
            // var elseValue = 1600 - peakValue;
            var elseValue;
            if(peakValue < 7000)
                elseValue = 7000 - peakValue; // object - peak
            else
                elseValue = 0;

            var seriesData = [0,0];

            seriesData[0] = peakValue;
            seriesData[1] = elseValue;

            $scope.CurrentPeak = peakValue;


            new Chartist.Pie('#graph_current_peak',
            {
                series: seriesData,
                labels: ['', '']
            }, {
                // [수정] height 조정
                // height: '280px',
                height: '200px',
                donut: true,
                donutWidth: 20,
                // [수정4] angle 누락부분 수정
                startAngle: 0,
                // startAngle: 270,
                // total: 3200,
                // [수정2] elsevalue 가 남은 걸 보여주려면 이렇게 바꿔야함
                total: elseValue+peakValue,
                showLabel: false,

            });

/*
        chart.on('draw', function(data) {
            if(data.type === 'slice' && data.index == 0) {
                // Get the total path length in order to use for dash array animation
                var pathLength = data.element._node.getTotalLength();

                // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                data.element.attr({
                    'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                });

                // Create animation definition while also assigning an ID to the animation for later sync usage
                var animationDefinition = {
                    'stroke-dashoffset': {
                        id: 'anim' + data.index,
                        dur: 1200,
                        from: -pathLength + 'px',
                        to:  '0px',
                        easing: Chartist.Svg.Easing.easeOutQuint,
                        fill: 'freeze'
                    }
                };

                // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                data.element.attr({
                    'stroke-dashoffset': -pathLength + 'px'
                });

                // We can't use guided mode as the animations need to rely on setting begin manually
                // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                data.element.animate(animationDefinition, true);
            }
        });
        */
        }
        function setWattChartData(index, wattChartInfo_1, wattChartInfo_2) {
            if(!wattChartInfo_1) {
                return;
            }

            // sort 변수
            var sortedWattInfo_1, sortedWattInfo_2;
            var labeldata = [];
            var dateData = [];
            var seriesdata = [[],[]];
            var wattLength = 0;
            var minString = " Sec";
            var hourString = " Min";
            var dayString = " Hour";
            if(wattChartInfo_1.length < wattChartInfo_2.length){
                wattLength = wattChartInfo_1.length;
            }
            else{
                wattLength = wattChartInfo_2.length;
            }


            // sort 수행
            sortedWattInfo_1 = wattChartInfo_1.sort(function(a,b){
                if(a.DATETIME < b.DATETIME) return -1;
                if(a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            sortedWattInfo_2 = wattChartInfo_2.sort(function(a,b){
                if(a.DATETIME < b.DATETIME) return -1;
                if(a.DATETIME > b.DATETIME) return 1;
                return 0;
            });
            // console.log('SORT 1', sortedWattInfo_1);
            // console.log('SORT 2', sortedWattInfo_2);



            for(var i = 0; i < wattLength; i++) {
                // var wattUsage_1 = wattChartInfo_1[i];
                // var wattUsage_2 = wattChartInfo_2[i];
                var wattUsage_1 = sortedWattInfo_1[i];
                var wattUsage_2 = sortedWattInfo_2[i];
                var wattValue_1 = parseInt(wattUsage_1.WATT);
                var wattValue_2 = parseInt(wattUsage_2.WATT);
                var wattDate = wattUsage_1.DATETIME;
                dateData.push(Date.parse(wattDate));
                seriesdata[0].push(wattValue_1);
                seriesdata[1].push(wattValue_2);

                var timeValue; 

                if(index == 1)// || index == 2)
                    timeValue = sortedWattInfo_1[i].DATETIME.slice(11, sortedWattInfo_1[i].DATETIME.length);
                else if(index == 3 || index == 2)
                    timeValue = sortedWattInfo_1[i].DATETIME;

                labeldata.push(timeValue);
                
            }

            // for(var i = 0 ; i < wattLength ; i++){
            //     if(index == 1){
            //         if((i % 5) == 0){
            //             var timeValue = (dateData[i] - dateData[wattLength - 1]) / 1000;
            //             var timeString = timeValue.toString();
            //             timeString = timeString.replace(/\r/g, "");
            //             timeString = timeString.replace(/\n/g, "");
            //             var newString = timeValue + minString;
            //             labeldata.push(newString);
            //         }
            //         else
            //             labeldata.push(null);
            //     }
            //     else if(index == 2){
            //         if((i % 5) == 0){
            //             var timeValue = parseInt((dateData[i] - dateData[wattLength - 1]) / 60000);
            //             var timeString = timeValue.toString();
            //             timeString = timeString.replace(/\r/g, "");
            //             timeString = timeString.replace(/\n/g, "");
            //             var newString = timeValue + hourString;
            //             labeldata.push(newString);
            //         }
            //         else
            //             labeldata.push(null);
            //     }
            //     else if(index == 3){
            //         if((i % 5) == 0){
            //             var timeValue = parseInt((dateData[i] - dateData[wattLength - 1]) / (3600 * 1000));
            //             var timeString = timeValue.toString();
            //             timeString = timeString.replace(/\r/g, "");
            //             timeString = timeString.replace(/\n/g, "");
            //             var newString = timeValue + dayString;
            //             labeldata.push(newString);
            //         }
            //         else
            //             labeldata.push(null);
            //     }
            // }
            if(index == 1){
                new Chartist.Line('#graph_min', {
                    labels: labeldata,
                    series: seriesdata
                    // series: [
                    //     [
                    //         {meta: 'test1-1', value: 500},
                    //         {meta: 'test1-2', value: 1000},
                    //         {meta: 'test1-3', value: 1500},
                    //         {meta: 'test1-4', value: 2000},
                    //         {meta: 'test1-5', value: 2500}
                    //     ],
                    //     [
                    //         {meta: 'test2-1', value: 200},
                    //         {meta: 'test2-2', value: 400},
                    //         {meta: 'test2-3', value: 600},
                    //         {meta: 'test2-4', value: 800},
                    //         {meta: 'test2-5', value: 1000}
                    //     ]
                    // ]
                },{
                    height: '500px',
                    low: 0,
                    showArea: true,
                    axisX:{
                        showGrid: true,
                        // labelOffset:{
                        //     x:100
                        // },
                        offset:30
                    },
                    axisY:{
                        showGrid: true,
                        labels: 'W',
                        showLabel: true
                    }
                    
                    
                    // plugins: [
                    //     Chartist.plugins.tooltip()
                    // ]
                });
            }
            else if(index == 2){
                new Chartist.Line('#graph_hour', {
                    labels: labeldata,
                    series: seriesdata
                },{
                    height: '500px',
                    low: 0,
                    showArea: true,
                    axisX:{
                        showGrid: true
                    },
                    axisY:{
                        showGrid: true
                    }
                });
            }
            else if(index == 3){
                new Chartist.Line('#graph_day', {
                    labels: labeldata,
                    series: seriesdata
                },{
                    height: '500px',
                    low: 0,
                    showArea: true,
                    axisX:{
                        showGrid: true
                    },
                    axisY:{
                        showGrid: true
                    }
                });
            }
        }
        function getWattInfoIndex(index) {
            return dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.POWER_USAGE, 'GET', {INDEX: index}).then(
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
        function caculatePeakValue(powerInfo){

        }

        // [수정6] power usage 화면 대 공사..
        function getAllWattInfo() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.POWER_USAGE, 'GET', {INDEX: 0}).then(
                function (response) {
                    $scope.wattInfo = response.data.POWER_USAGE;
                    //initChartOption();

                    // if((response.data.POWER_USAGE.LAST_MIN_GRAPH_1.length > 0) || (response.data.POWER_USAGE.LAST_MIN_GRAPH_2.length > 0)){
                    //     setWattChartData(1, response.data.POWER_USAGE.LAST_MIN_GRAPH_1, response.data.POWER_USAGE.LAST_MIN_GRAPH_2);                       
                    // }
                    // if((response.data.POWER_USAGE.LAST_HOUR_GRAPH_1.length > 0) || (response.data.POWER_USAGE.LAST_HOUR_GRAPH_2.length > 0)){
                    //     setWattChartData(2, response.data.POWER_USAGE.LAST_HOUR_GRAPH_1, response.data.POWER_USAGE.LAST_HOUR_GRAPH_2);
                    // }
                    // if((response.data.POWER_USAGE.LAST_DAY_GRAPH_1.length > 0) || (response.data.POWER_USAGE.LAST_DAY_GRAPH_2.length > 0)){
                    //     setWattChartData(3, response.data.POWER_USAGE.LAST_DAY_GRAPH_1, response.data.POWER_USAGE.LAST_DAY_GRAPH_2);
                    // }
                    // setPeakChartData(response.data.POWER_USAGE.LAST_MIN_GRAPH_1, response.data.POWER_USAGE.LAST_MIN_GRAPH_2);
                    // setTotalChartData(response.data.POWER_USAGE.LAST_MIN_GRAPH_1, response.data.POWER_USAGE.LAST_MIN_GRAPH_2, response.data.POWER_USAGE.LAST_HOUR_GRAPH_1, response.data.POWER_USAGE.LAST_HOUR_GRAPH_2);

                    if((response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH.length > 0) || (response.data.POWER_USAGE.GRAPH_DATA.PSU2.MIN_GRAPH.length > 0))
                    {
                        setWattChartData(1, response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.MIN_GRAPH);
                    }
                    if((response.data.POWER_USAGE.GRAPH_DATA.PSU1.HOUR_GRAPH.length > 0) || (response.data.POWER_USAGE.GRAPH_DATA.PSU2.HOUR_GRAPH.length > 0))
                    {
                        setWattChartData(2, response.data.POWER_USAGE.GRAPH_DATA.PSU1.HOUR_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.HOUR_GRAPH);
                    }
                    if((response.data.POWER_USAGE.GRAPH_DATA.PSU1.DAY_GRAPH.length > 0) || (response.data.POWER_USAGE.GRAPH_DATA.PSU2.DAY_GRAPH.length > 0))
                    {
                        setWattChartData(3, response.data.POWER_USAGE.GRAPH_DATA.PSU1.DAY_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.DAY_GRAPH);
                    }

                    setTodayTotalChartData(response.data.POWER_USAGE.TODAY_TOTAL);
                    //setAllSensorStatus();

/*
                    new Chartist.Line('#graph_current_peak',{
                        labels: ['1','3'],
                        series: [120,110]
                    },
                    {
                        donut: true,
                        donutWidth: 30,
                        startAngle: 210,
                        total: 1600,
                        showLable: false,
                        plugins: [
                            Chartist.plugins.fillDonut({
                                items: [{
                                    content : '<div style="display:inline;font-size:32px"><p style="float:left;margin-right:10px" id="current_peak_id">0</p>W</div>'
                                }]
                            })
                        ]
                    });
                    chart.on('draw', function(data) {
                        if(data.type === 'slice' && data.index == 0) {
                            // Get the total path length in order to use for dash array animation
                            var pathLength = data.element._node.getTotalLength();

                            // Set a dasharray that matches the path length as prerequisite to animate dashoffset
                            data.element.attr({
                                'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
                            });

                            // Create animation definition while also assigning an ID to the animation for later sync usage
                            var animationDefinition = {
                                'stroke-dashoffset': {
                                    id: 'anim' + data.index,
                                    dur: 1200,
                                    from: -pathLength + 'px',
                                    to:  '0px',
                                    easing: Chartist.Svg.Easing.easeOutQuint,
                                    fill: 'freeze'
                                }
                            };

                            // We need to set an initial value before the animation starts as we are not in guided mode which would do that for us
                            data.element.attr({
                                'stroke-dashoffset': -pathLength + 'px'
                            });

                            // We can't use guided mode as the animations need to rely on setting begin manually
                            // See http://gionkunz.github.io/chartist-js/api-documentation.html#chartistsvg-function-animate
                            data.element.animate(animationDefinition, true);
                        }
                    });
*/
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

        function refreshWattInfo() {

            $timeout.cancel($scope.timer_all);
            getAllWattInfo();
            $scope.timer_all = $timeout(refreshWattInfo, $scope.interval_all);
        }
	function refreshRealtime() {
	    $timeout.cancel($scope.timer_realtime);
	    getWattInfoIndex(3).then(
		function (response) {
			// setWattChartData(1, response.data.LAST_MIN_GRAPH_1, response.data.LAST_MIN_GRAPH_2);
            setWattChartData(1, response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.MIN_GRAPH);
		},
		function () {
			logger.logError(CONST_MESSAGE.SERVER_HEALTH.POWER_USAGE.E001);
		}
	    )
	    $scope.timer_realtime = $timeout(refreshRealtime, $scope.interval_realtime);
	}
        $scope.onRefresh = function (index) {
            getWattInfoIndex(index).then(
                function (response) {
                    if(index == 3){
                        // setWattChartData(1, response.data.LAST_MIN_GRAPH_1, response.data.LAST_MIN_GRAPH_2);
                        setWattChartData(1, response.data.POWER_USAGE.GRAPH_DATA.PSU1.MIN_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.MIN_GRAPH);
                    }
                    else if(index == 4){
                        // setWattChartData(2, response.data.LAST_HOUR_GRAPH_1, response.data.LAST_HOUR_GRAPH_2);
                        setWattChartData(2, response.data.POWER_USAGE.GRAPH_DATA.PSU1.HOUR_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.HOUR_GRAPH);
                    }
                    else if(index == 5){
                        // setWattChartData(3, response.data.LAST_DAY_GRAPH_1, response.data.LAST_DAY_GRAPH_2);
                        setWattChartData(3, response.data.POWER_USAGE.GRAPH_DATA.PSU1.DAY_GRAPH, response.data.POWER_USAGE.GRAPH_DATA.PSU2.DAY_GRAPH);
                    }
                },
                function () {
                    logger.logError(CONST_MESSAGE.SERVER_HEALTH.POWER_USAGE.E001);
                }
            )
        };
        $scope.init = function () {
            if(!$rootScope.isLogin) {
                $location.url('/login');
                return;
            }

            //$scope.timer_all = null;
	    //$scope.timer_realtime = null;
            //$scope.interval_all = 6000 * 10;
	    //$scope.interval_realtime = 3000;
            $rootScope.showSpinner = true;
            //initChartOption();
            getAllWattInfo().then(
                function () {
                    //$scope.timer_all = $timeout(refreshWattInfo, $scope.interval_all);
		            //$scope.timer_realtime = $timeout(refreshRealtime, $scope.interval_realtime);
                },
                function () {
                    logger.logError(CONST_MESSAGE.SERVER_HEALTH.POWER_USAGE.E001);
                    //$timeout.cancel($scope.timer_all);
                    //$timeout.cancel($scope.timer_realtime);
                }
            );

        };
        $scope.$on("$destroy", function () {
            console.log('powerUsageController  $destroy !!!!');
            //$timeout.cancel($scope.timer_all);
            //$timeout.cancel($scope.timer_realtime);
        });
/*
        $scope.init = function () {
            if(!$rootScope.isLogin) {
                $location.url('/login');
                return;
            }

            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.SERVER_HEALTH.POWER_USAGE, 'GET', {INDEX: 0}).then(
                function (response) {
                    $scope.wattInfo = response.data.POWER_USAGE;
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.SYSTEM.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        };
*/

    }
]);
