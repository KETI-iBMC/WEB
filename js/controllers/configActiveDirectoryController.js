app.controller('ConfigActiveDirectoryController', [
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
        function getAdInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.ACTIVEDIR).then(
                function (response) {
                    var adInfo = response.data.ACTIVE_DIRECTORY;
                    $scope.adDomain = adInfo.DOMAIN;
                    $scope.adEnable = adInfo.ENABLE === "1";
                    $scope.adIpAddress = adInfo.IP;
                    $scope.adSecretName = adInfo.SECRET_NAME;
                    $scope.adSecretPw = adInfo.SECRET_PWD;
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.ACTIVEDIR.E001);
            });
        }

        function getAdLdapInfo() {
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.LDAP).then(
                function (response) {
                    $scope.ldapEnable = response.data.LDAP_INFO.LDAP_EN === "1";
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.DNS.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setAdInfo() {
            var params = {
                ENABLE: $scope.adEnable ? "1" : "0",
                IP: $scope.adIpAddress,
                DOMAIN: $scope.adDomain,
                SECRET_NAME: $scope.adSecretName,
                SECRET_PWD: $scope.adSecretPw
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.ACTIVEDIR, 'POST', undefined, params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.ACTIVEDIR.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.ACTIVEDIR.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.ACTIVEDIR.E003);
            });
        }

        function setAdLdapInfo() {
            var params = {
                LDAP_EN: $scope.ldapEnable ? "1" : "0",
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.LDAP, 'PUT', undefined, params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.LDAP.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.LDAP.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.LDAP.E003);
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

            getAdInfo();
            getAdLdapInfo();
        };

        $scope.save = function () {
            if ($scope.adEnable && $scope.ldapEnable) {
                $scope.ldapEnable = false;
                setAdLdapInfo();
            }

            setAdInfo();
        };

        $scope.reset = function () {
            getAdInfo();
        };
    }
]);