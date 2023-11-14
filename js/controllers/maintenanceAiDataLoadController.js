app.controller('MaintenanceAiDataLoadController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$translate',
    '$rootScope',
    '$location', function (
        $scope,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        CONST_CODE,
        $translate,
        $rootScope,
        $location) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function sendAiData() {
            dataFactory.httpRequest(CONST_RESTFUL_API.MAINTENANCE.AI_DATA_LOAD).then(
                function (response) {
                    if (response.data.CODE == CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.MAINTENANCE.AI_DATA_LOAD.S002);
                    } else {
                        logger.logError(CONST_MESSAGE.MAINTENANCE.AI_DATA_LOAD.E002);
                    }
                }
            );
        }
        function setAiData() {
            var categoryUrl;
            if ($scope.selectedCategory === 'All')
                categoryUrl = 'all';
            else if ($scope.selectedCategory === 'Inference')
                categoryUrl = 'inference';
            else if ($scope.selectedCategory === 'Prediction')
                categoryUrl = 'prediction';

            var uploadUrl = CONST_RESTFUL_API.MAINTENANCE.AI_DATA_LOAD + '/' + categoryUrl;

            var params = {
                YEAR: $scope.year,

                HOUR: $scope.hour,
                MIN: $scope.min,
                AUTO_SYNC: $scope.autoSync ? "1" : "0"
            };

            if ($scope.month < 10)
                params.MONTH = ('0' + $scope.month).substring(0, 2);
            else
                params.MONTH = $scope.month.toString().substring(0, 2);

            if ($scope.day < 10)
                params.DAY = ('0' + $scope.day).substring(0, 2);
            else
                params.DAY = $scope.day.toString().substring(0, 2);

            dataFactory.httpRequest(CONST_RESTFUL_API.MAINTENANCE.AI_DATA_LOAD, 'POST', params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.MAINTENANCE.AI_DATA_LOAD.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.MAINTENANCE.AI_DATA_LOAD.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.MAINTENANCE.AI_DATA_LOAD.E003);
            });
        }
        function getAiDataSize() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.MAINTENANCE.AI_DATA_SIZE_LOAD).then(
                function (response) {
                    $scope.aiDataSizeInfo = response.data.AI_DATA_SIZE_INFO;
                    $scope.autoSync = $scope.ntpInfo.NTP.AUTO_SYNC === "1";
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.MAINTENANCE.AI_DATA.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }
        /***************************************************************************************************************
         *
         * scope
         *
         ***************************************************************************************************************/
        $scope.init = function () {
            if (!$rootScope.isLogin) {
                $location.url('/login');
                return;
            }
            $scope.categoryList = ['All', 'Inference', 'Prediction'];
            $scope.selectedCategory = "";

            $scope.monthList = [
                { n: 1, s: $translate.instant('CONFIGURATION.JANUARY') },
                { n: 2, s: $translate.instant('CONFIGURATION.FEBRUARY') },
                { n: 3, s: $translate.instant('CONFIGURATION.MARCH') },
                { n: 4, s: $translate.instant('CONFIGURATION.APRIL') },
                { n: 5, s: $translate.instant('CONFIGURATION.MAY') },
                { n: 6, s: $translate.instant('CONFIGURATION.JUNE') },
                { n: 7, s: $translate.instant('CONFIGURATION.JULY') },
                { n: 8, s: $translate.instant('CONFIGURATION.AUGUST') },
                { n: 9, s: $translate.instant('CONFIGURATION.SEPTEMBER') },
                { n: 10, s: $translate.instant('CONFIGURATION.OCTOBER') },
                { n: 11, s: $translate.instant('CONFIGURATION.NOVEMBER') },
                { n: 12, s: $translate.instant('CONFIGURATION.DECEMBER') }
            ];

            $scope.dayList = [];
            for (var i = 1; i <= 31; i++) {
                $scope.dayList.push(i);
            }

            $scope.yearList = [];
            for (var i = 2000; i <= 2040; i++) {
                $scope.yearList.push(i);
            }


        };
        $scope.onChangeCategory = function (selectedCategory) {

            console.log('Selected category: ' + selectedCategory);
        };
        $scope.send = function () {
            sendAiData();
        };

        $scope.cancel = function () {
            setAiData();
        };

    }

]);