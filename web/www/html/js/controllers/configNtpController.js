app.controller('ConfigNtpController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$translate',
    '$rootScope',
    '$location',
    function (
        $scope,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        CONST_CODE,
        $translate,
        $rootScope,
        $location
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function getNtpInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.NTP).then(
                function (response) {
                    $scope.ntpInfo = response.data.NTP_INFO;

                    $scope.month = parseInt($scope.ntpInfo.NTP.MONTH);
                    $scope.day = parseInt($scope.ntpInfo.NTP.DAY);
                    $scope.year = parseInt($scope.ntpInfo.NTP.YEAR);
                    $scope.hour = $scope.ntpInfo.NTP.HOUR;
                    $scope.min = $scope.ntpInfo.NTP.MIN;
                    $scope.sec = $scope.ntpInfo.NTP.SEC;

                    $scope.timezone = decodeURIComponent($scope.ntpInfo.NTP.TIME_ZONE);
                    $scope.ntpServer = $scope.ntpInfo.NTP.NTP_SERVER;
                    $scope.autoSync = $scope.ntpInfo.NTP.AUTO_SYNC === "1";
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.NTP.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setNtpInfo() {
            // [수정3] parameter 오류: Month, Day
            var params = {
                YEAR: $scope.year,
                // MONTH: ('0' + $scope.month).substring(0, 2),
                // DAY: ('0' + $scope.day).substring(0, 2),
                HOUR: $scope.hour,
                MIN: $scope.min,
                SEC: $scope.sec,
                TIME_ZONE: $scope.timezone,
                NTP_SERVER: $scope.ntpServer,
                AUTO_SYNC: $scope.autoSync ? "1" : "0"
            };

            // [수정3] parameter 오류: Month, Day
            if ($scope.month < 10)
                params.MONTH = ('0' + $scope.month).substring(0, 2);
            else
                params.MONTH = $scope.month.toString().substring(0, 2);

            if ($scope.day < 10)
                params.DAY = ('0' + $scope.day).substring(0, 2);
            else
                params.DAY = $scope.day.toString().substring(0, 2);

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.NTP, 'POST', params).then(
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

            $scope.timezoneList = [];
            for (var i = -12; i <= 12; i++) {
                // if (i < 0) {
                //     $scope.timezoneList.push({n: i, s: 'GMT' + i.toString()});
                // }
                // else if (i >= 0) {
                //     $scope.timezoneList.push({n: i, s: 'GMT+' + i.toString()});
                // }

                // [수정3] NTP UTC Timezone: +-HH:MM 형태로
                if (i < 0) {
                    if (i.toString().length < 3)
                        $scope.timezoneList.push({ n: i, s: '-0' + (-i).toString() + ':00' })
                    else
                        $scope.timezoneList.push({ n: i, s: i.toString() + ':00' })
                }
                else if (i >= 0) {
                    if (i.toString().length < 2)
                        $scope.timezoneList.push({ n: i, s: '+0' + i.toString() + ':00' })
                    else
                        $scope.timezoneList.push({ n: i, s: '+' + i.toString() + ':00' })
                }
            }

            getNtpInfo();
        };

        $scope.save = function () {
            setNtpInfo();
        };

        $scope.reset = function () {
            getNtpInfo();
        };
        //request http 요청 수행
        $scope.onClick_Country = function (country) {
            dataFactory.httpRequest(CONST_RESTFUL_API.NTPMAP[country]).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {

                    }
                })
        }

    }
]);