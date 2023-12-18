app.controller('ConfigDnsController', [
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
        function getDnsInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.DNS).then(
                function (response) {
                    $scope.dnsInfo = response.data.DNS_INFO;

                    $scope.hostName = $scope.dnsInfo.GENERIC.HOST_NAME;
                    $scope.registerBmc = $scope.dnsInfo.GENERIC.REGISTER_BMC === "1";
                    $scope.registerBmcMethod = $scope.dnsInfo.GENERIC.REGISTER_BMC_METHOD;
                    $scope.domainName = $scope.dnsInfo.GENERIC.DOMAIN_NAME;

                    $scope.ipv4PreferredDnsServer = $scope.dnsInfo.IPV4.IPV4_PREFERRED;
                    $scope.ipv4AlternateDnsServer = $scope.dnsInfo.IPV4.IPV4_ALTERNATE;

                    $scope.ipv6PreferredDnsServer = $scope.dnsInfo.IPV6.IPV6_PREFERRED;
                    $scope.ipv6AlternateDnsServer = $scope.dnsInfo.IPV6.IPV6_ALTERNATE;
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.DNS.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setDnsInfo() {
            var params = {
                HOST_NAME: $scope.hostName,
                REGISTER_BMC: $scope.registerBmc ? "1" : "0",
                REGISTER_BMC_METHOD: $scope.registerBmcMethod,
                DOMAIN_NAME: $scope.domainName,
                IPV4_PREFERRED: $scope.ipv4PreferredDnsServer,
                IPV4_ALTERNATE: $scope.ipv4AlternateDnsServer,
                IPV6_PREFERRED: $scope.ipv6PreferredDnsServer,
                IPV6_ALTERNATE: $scope.ipv6AlternateDnsServer
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.DNS, 'POST', params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.DNS.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.DNS.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.DNS.E003);
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

            getDnsInfo();
        };

        $scope.save = function () {
            setDnsInfo();
        };

        $scope.reset = function () {
            getDnsInfo();
        };

    }
]);