app.controller('ConfigSmtpController', [
    '$scope',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$rootScope',
    '$location',
    function (
        $scope,
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
        function getSmtpInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.SMTP).then(
                function (response) {
                    $scope.smtpInfo = response.data.SMTP_INFO;

                    $scope.senderAddress = $scope.smtpInfo.DEVICE.SENDER_ADDRESS;
                    $scope.machineName = $scope.smtpInfo.DEVICE.MACHINE_NAME;

                    $scope.primaryServerAddress = $scope.smtpInfo.PRIMARY.PRIMARY_SERVER_ADDRESS;
                    $scope.primaryUserName = $scope.smtpInfo.PRIMARY.PRIMARY_USER_NAME;
                    $scope.primaryUserPassword = $scope.smtpInfo.PRIMARY.PRIMARY_USER_PASSWORD;

                    $scope.secondaryServerAddress = $scope.smtpInfo.SECONDARY.SECONDARY_SERVER_ADDRESS;
                    $scope.secondaryUserName = $scope.smtpInfo.SECONDARY.SECONDARY_USER_NAME;
                    $scope.secondaryUserPassword = $scope.smtpInfo.SECONDARY.SECONDARY_USER_PASSWORD;
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.SMTP.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setSmtpInfo() {
            var params = {
                SENDER_ADDRESS: $scope.senderAddress,
                MACHINE_NAME: $scope.machineName,
                PRIMARY_SERVER_ADDRESS: $scope.primaryServerAddress,
                PRIMARY_USER_NAME: $scope.primaryUserName,
                PRIMARY_USER_PASSWORD: $scope.primaryUserPassword,
                SECONDARY_SERVER_ADDRESS: $scope.secondaryServerAddress,
                SECONDARY_USER_NAME: $scope.secondaryUserName,
                SECONDARY_USER_PASSWORD: $scope.secondaryUserPassword
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.SMTP, 'POST', params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.SMTP.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.SMTP.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.SMTP.E003);
            });
        }

        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/
        $scope.init = function () {
            if(!$rootScope.isLogin) {
                $location.url('/login');
                return;
            }

            getSmtpInfo();
        };

        $scope.save = function () {
            setSmtpInfo();
        };

        $scope.reset = function () {
            getSmtpInfo();
        };

    }
]);