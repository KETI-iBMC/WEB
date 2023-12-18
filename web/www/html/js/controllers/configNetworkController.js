app.controller('ConfigNetworkController', [
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
        function getNetworkInfo(index) {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.NETWORK).then(
                function (response) {
                    $scope.priority = response.data.NETWORK_PRIORITY;
                    var networkDataList = response.data.NETWORK_INFO;

                    if(!networkDataList) {
                        throw "error";
                    }

                    $scope.networkInfos = networkDataList.map(function(v, i) {
                        v.index = i;
                        return v;
                    });

                    $scope.networkInfo = $scope.networkInfos[index];
                    setInfo($scope.networkInfo)
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.NETWORK.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setInfo(network) {
            $scope.lanInterface = network.LAN_INTERFACE;
            $scope.lanSettingEnable = network.GENERIC.LAN_SETTING_ENABLE === "1";
            $scope.macAddress = network.GENERIC.MAC_ADDRESS;
            $scope.ipv4DhcpEnable = network.IPV4.IPV4_DHCP_ENABLE === "1";

            if ($scope.ipv4DhcpEnable) {
                $scope.ipv4Address = "";
                $scope.ipv4Netmask = "";
                $scope.ipv4Gateway = "";
            } else {
                $scope.ipv4Address = network.IPV4.IPV4_ADDRESS;
                $scope.ipv4Netmask = network.IPV4.IPV4_NETMASK;
                $scope.ipv4Gateway = network.IPV4.IPV4_GATEWAY;
            }

            $scope.ipv6Enable = network.IPV6.IPV6_ENABLE === "1";
            $scope.ipv6DhcpEnable = network.IPV6.IPV6_DHCP_ENABLE === "1";

            if ($scope.ipv6DhcpEnable) {
                $scope.ipv6Address = "";
                $scope.ipv6SubnetPrefixLength = "";
                $scope.ipv6Gateway = "";
            } else {
                $scope.ipv6Address = network.IPV6.IPV6_ADDRESS;
                $scope.ipv6SubnetPrefixLength = network.IPV6.IPV6_SUBNET_PREFIX_LENGTH;
                $scope.ipv6Gateway = network.IPV6.IPV6_GATEWAY;
            }

            $scope.vlanSettingsEnable = network.VLAN.VLAN_SETTINGS_ENABLE === "1";
            $scope.vlanId = network.VLAN.VLAN_ID;
            $scope.vlanPriority = network.VLAN.VLAN_PRIORITY;
        }

        function setNetworkInfo() {
            var params = {
                NETWORK_PRIORITY: $scope.priority,
                LAN_INTERFACE: $scope.lanInterface,
                LAN_SETTING_ENABLE: $scope.lanSettingEnable ? "1" : "0",
                MAC_ADDRESS: $scope.macAddress,
                IPV4_DHCP_ENABLE: $scope.ipv4DhcpEnable ? "1" : "0",
                IPV4_ADDRESS: $scope.ipv4Address,
                IPV4_NETMASK: $scope.ipv4Netmask,
                IPV4_GATEWAY: $scope.ipv4Gateway,
                IPV6_ENABLE: $scope.ipv6Enable ? "1" : "0",
                IPV6_DHCP_ENABLE: $scope.ipv6DhcpEnable ? "1" : "0",
                IPV6_ADDRESS: $scope.ipv6Address,
                IPV6_SUBNET_PREFIX_LENGTH: $scope.ipv6SubnetPrefixLength,
                IPV6_GATEWAY: $scope.ipv6Gateway,
                VLAN_SETTINGS_ENABLE: $scope.vlanSettingsEnable ? "1" : "0",
                VLAN_ID: $scope.vlanId,
                VLAN_PRIORITY: $scope.vlanPriority
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.NETWORK, 'POST', params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.NETWORK.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.NETWORK.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.NETWORK.E003);
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

            $scope.selectedIndex = 0;
            $scope.networkInfo = {};
            getNetworkInfo($scope.selectedIndex);
        };

        $scope.onChangeNetwork = function(network) {
            $scope.selectedIndex = network.index;
            setInfo(network);
        };

        $scope.save = function () {
            setNetworkInfo();
        };

        $scope.reset = function () {
            getNetworkInfo($scope.selectedIndex);
        };

        $scope.ipv4UseDhcpChange = function () {
            if ($scope.ipv4DhcpEnable) {
                $scope.ipv4Address = "";
                $scope.ipv4Netmask = "";
                $scope.ipv4Gateway = "";
            } else {
                $scope.ipv4Address = $scope.networkInfo.IPV4.IPV4_ADDRESS;
                $scope.ipv4Netmask = $scope.networkInfo.IPV4.IPV4_NETMASK;
                $scope.ipv4Gateway = $scope.networkInfo.IPV4.IPV4_GATEWAY;
            }
        };

        $scope.ipv6UseDhcpChange = function () {
            if ($scope.ipv6DhcpEnable) {
                $scope.ipv6Address = "";
                $scope.ipv6SubnetPrefixLength = "";
                $scope.ipv6Gateway = "";
            } else {
                $scope.ipv6Address = $scope.networkInfo.IPV6.IPV6_ADDRESS;
                $scope.ipv6SubnetPrefixLength = $scope.networkInfo.IPV6.IPV6_SUBNET_PREFIX_LENGTH;
                $scope.ipv6Gateway = $scope.networkInfo.IPV6.IPV6_GATEWAY;
            }
        }
    }
]);