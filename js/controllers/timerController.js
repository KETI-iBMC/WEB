app.controller('TimerController', [
    '$scope',
    '$interval',
    function (
        $scope,
        $interval
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
    }
]);