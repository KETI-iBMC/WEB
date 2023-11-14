app.controller('FaultAnalysisDiskReportController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$rootScope',
    function (
        $scope,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        CONST_CODE,
        $rootScope
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        //url을 일단 받아온다 
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
            $rootScope.showSpinner = true;
            getDiskInfo() // getDiskInfo 호출
                .then(function (data) {
                    $scope.selectedDiskInfo = data;
                })
                .catch(function (error) {
                    console.error(error);
                });

        }

    }]);