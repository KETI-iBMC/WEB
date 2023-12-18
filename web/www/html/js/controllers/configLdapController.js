app.controller('ConfigLdapController', [
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
        function getLdapInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.LDAP).then(
                function (response) {
                    var ldapInfo = response.data.LDAP_INFO;

                    $scope.ldapEnable = ldapInfo.LDAP.LDAP_EN === "1";
                    $scope.ldapPort = ldapInfo.LDAP.LDAP_PORT;
                    $scope.ldapIpAddress = ldapInfo.LDAP.LDAP_IP;
                    $scope.ldapTimeout = ldapInfo.LDAP.TIMEOUT;
                    $scope.ldapBaseDn = ldapInfo.LDAP.BASE_DN;
                    $scope.ldapBindDn = ldapInfo.LDAP.BIND_DN;
                    $scope.ldapBindPw = ldapInfo.LDAP.BIND_PW;
                    $scope.ldapSsl = ldapInfo.LDAP.LDAP_SSL;

                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.LDAP.E001);
            });
        }

        function getLdapAdInfo() {
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.ACTIVEDIR).then(
                function (response) {
                    $scope.adEnable = response.data.ACTIVE_DIRECTORY.ENABLE === "1";
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.ACTIVEDIR.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setLdapInfo() {
            var params = {
                LDAP_EN: $scope.ldapEnable ? "1" : "0",
                BIND_DN: $scope.ldapBindDn,
                LDAP_IP: $scope.ldapIpAddress,
                LDAP_PORT: $scope.ldapPort,
                LDAP_SSL: $scope.ldapSsl,
                BASE_DN: $scope.ldapBaseDn,
                BIND_PW: $scope.ldapBindPw,
                TIMEOUT: $scope.ldapTimeout
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

        function setLdapAdInfo() {
            var params = {
                ENABLE: $scope.adEnable ? "1" : "0",
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

        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/
        $scope.init = function () {
            getLdapInfo();
            getLdapAdInfo();
        };

        $scope.save = function () {
            if ($scope.ldapEnable && $scope.adEnable) {
                $scope.adEnable = false;
                setLdapAdInfo();
            }

            setLdapInfo();
        };

        $scope.reset = function () {
            getLdapInfo();
        };

    }
]);