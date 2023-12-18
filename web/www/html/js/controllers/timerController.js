app.controller('TimerController', [
    '$scope',
    'CONST_RESTFUL_API',
    '$interval',
    '$filter',
    'dataFactory',
    function (
        $scope,
        CONST_RESTFUL_API,
        $interval,
        $filter,
        dataFactory
    ) {

        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function tick() {
            $scope.clock = Date.now();
        }

        tick();
        $interval(tick, 1000);

        displayUtcDate();
        $interval(displayUtcDate, 30000);

        function displayUtcDate() {
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.NTP).then(
                function (response) {

                    $scope.ntpInfo = response.data.NTP_INFO;

                    if ($scope.ntpInfo) {
                        const { YEAR, MONTH, DAY, HOUR, MIN, SEC } = $scope.ntpInfo.NTP;
                        const utcDate = new Date(Date.UTC(YEAR, MONTH - 1, DAY, HOUR, MIN, SEC));

                        const formattedDay = $filter('date')(utcDate, 'yyyy-MM-dd');

                        const formattedTime = utcDate.toLocaleString('en-US', {
                            hour: 'numeric',
                            minute: 'numeric',
                            second: 'numeric',
                            hour12: false
                        });

                        document.getElementById('formattedDay').innerText = `${formattedDay}`;
                        document.getElementById('formattedTime').innerText = `${formattedTime}`;
                    }
                }

            )
        }
    }
]);