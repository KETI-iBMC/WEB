app.controller('ConfigSslController', [
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
        function getSslInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.SSL).then(
                function (response) {
                    $scope.sslInfo = response.data.SSL_INFO;

                    $scope.version = $scope.sslInfo.BASIC.VERSION;
                    $scope.serialNumber = $scope.sslInfo.BASIC.SERIAL_NUMBER;
                    $scope.signatureAlgorithm = $scope.sslInfo.BASIC.SIGNATURE_ALGORITHM;

                    $scope.commonName = $scope.sslInfo.ISSUED_FROM.COMMON_NAME;
                    $scope.organization = $scope.sslInfo.ISSUED_FROM.ORGANIZATION;
                    $scope.organizationUnit = $scope.sslInfo.ISSUED_FROM.ORGANIZATION_UNIT;
                    $scope.cityOrLocality = $scope.sslInfo.ISSUED_FROM.CITY_OR_LOCALITY;
                    $scope.stateOrProvince = $scope.sslInfo.ISSUED_FROM.STATE_OR_PROVINCE;
                    $scope.country = $scope.sslInfo.ISSUED_FROM.COUNTRY;
                    $scope.emailAddress = $scope.sslInfo.ISSUED_FROM.EMAIL_ADDRESS;
                    $scope.validFor = $scope.sslInfo.ISSUED_FROM.VALID_FOR;
                    $scope.keyLength = $scope.sslInfo.ISSUED_FROM.KEY_LENGTH;

                    $scope.validFrom = $scope.sslInfo.VALIDITY_INFORMATION.VALID_FROM;
                    $scope.validFor = $scope.sslInfo.VALIDITY_INFORMATION.VALID_FOR;

                    $scope.commonNameIssueedTo = $scope.sslInfo.ISSUED_TO.COMMON_NAME;
                    $scope.organizationIssueedTo = $scope.sslInfo.ISSUED_TO.ORGANIZATION;
                    $scope.organizationUnitIssueedTo = $scope.sslInfo.ISSUED_TO.ORGANIZATION_UNIT;
                    $scope.cityOrLocalityIssuedTo = $scope.sslInfo.ISSUED_TO.CITY_OR_LOCALITY;
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.DNS.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function generateSsl() {
            var params = {
                COMMON_NAME: $scope.commonName,
                ORGANIZATION: $scope.organization,
                ORGANIZATION_UNIT: $scope.organizationUnit,
                CITY_OR_LOCALITY: $scope.cityOrLocality,
                STATE_OR_PROVINCE: $scope.stateOrProvince,
                COUNTRY: $scope.country,
                EMAIL_ADDRESS: $scope.emailAddress,
                VALID_FOR: $scope.validFor,
                KEY_LENGTH: $scope.keyLength
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.SSL, 'POST', params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.SSL.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.SSL.E001);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.SSL.E002);
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

            getSslInfo();
        };

        $scope.save = function () {
            generateSsl();
        };

        $scope.reset = function () {
            $scope.commonName = "";
            $scope.organization = "";
            $scope.organizationUnit = "";
            $scope.cityOrLocality = "";
            $scope.stateOrProvince = "";
            $scope.country = "";
            $scope.emailAddress = "";
            $scope.validFor = "";
            $scope.keyLength = "";
        };

    }
]);