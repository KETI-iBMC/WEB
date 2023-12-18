app.controller('SettingsServicesController', [
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
        function getServicesInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.SETTINGS.SERVICES).then(
                function (response) {
                    $scope.services = response.data.SETTING_SERVICE;
                    $scope.services.ALERT_ENABLES = $scope.services.ALERT_ENABLES === '1';
                    $scope.services.SSH_ENABLES = $scope.services.SSH_ENABLES === '1';
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.SETTINGS.SERVICES.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setServicesInfo() {
            var params = {
                WEB_PORT: $scope.services.WEB_PORT,
                KVM_PORT: $scope.services.KVM_PORT,
                // [수정4] kvm proxy port 누락되어있음
                KVM_PROXY_PORT: $scope.services.KVM_PROXY_PORT,
                ALERT_ENABLES: $scope.services.ALERT_ENABLES ? "1" : "0",
                ALERT_PORT: $scope.services.ALERT_PORT,
                SSH_ENABLES: $scope.services.SSH_ENABLES ? "1" : "0",
                SSH_PORT: $scope.services.SSH_PORT
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.SETTINGS.SERVICES, 'PUT', undefined, params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.SETTINGS.SERVICES.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.SETTINGS.SERVICES.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.SETTINGS.SERVICES.E002);
            });

        }



        // Add DNS info data
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
                //logger.logError(CONST_MESSAGE.CONFIGURATION.DNS.E001);
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

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.DNS, 'POST', undefined, params).then(
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

        // Add Netwark info data
        function getNetworkInfo(index) {
            $rootScope.NetshowSpinner = true;
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
                //logger.logError(CONST_MESSAGE.CONFIGURATION.NETWORK.E001);
            }).finally(function () {
                $rootScope.NetshowSpinner = false;
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
        

        // Add Smtp data
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


        // Add Sll data
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
                //logger.logError(CONST_MESSAGE.CONFIGURATION.DNS.E001);
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




        //Add Active Directory data
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
                    $scope.adldapEnable = response.data.LDAP_INFO.LDAP_EN === "1";
                }
            ).catch(function () {
                //logger.logError(CONST_MESSAGE.CONFIGURATION.DNS.E001);
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
                LDAP_EN: $scope.adldapEnable ? "1" : "0",
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

        //Add Ldap data
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
                    $scope.ldapadEnable = response.data.ACTIVE_DIRECTORY.ENABLE === "1";
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
                ENABLE: $scope.ldapadEnable ? "1" : "0",
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

        //Add Radius data
        function getRadiusInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.RADIUS).then(
                function (response) {
                    var radiusInfo = response.data.RADIUS_INFO;

                    $scope.radiusEnable = radiusInfo.RADIUS.RADIUS_ENABLE === "1";
                    $scope.radiusPort = radiusInfo.RADIUS.PORT;
                    $scope.radiusIp = radiusInfo.RADIUS.IP;
                    $scope.radiusSecret = radiusInfo.RADIUS.SECRET;
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.RADIUS.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function setRadiusInfo() {
            var params = {
                RADIUS_ENABLE: $scope.radiusEnable ? "1" : "0",
                PORT: $scope.radiusPort,
                IP: $scope.radiusIp,
                SECRET: $scope.radiusSecret
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.RADIUS, 'POST', params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.RADIUS.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.RADIUS.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.RADIUS.E003);
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

            getServicesInfo();

            getDnsInfo();

            $scope.selectedIndex = 0;
            $scope.networkInfo = {};
            getNetworkInfo($scope.selectedIndex);

            getSmtpInfo();

            getSslInfo();

            getAdInfo();
            getAdLdapInfo();
            
            getLdapInfo();
            getLdapAdInfo();

            getRadiusInfo();
        };

        $scope.onChangeNetwork = function(network) {
            $scope.selectedIndex = network.index;
            setInfo(network);
        };
        
        $scope.save = function () {
            setServicesInfo();
        };

        $scope.Dnssave = function () {
            setDnsInfo();  
        }
        $scope.Dnsreset = function () {
            getDnsInfo();
        }

        $scope.Netsave = function () {
            setNetworkInfo();  
        }
        $scope.Netreset = function () {
            getNetworkInfo($scope.selectedIndex);
        }

        $scope.Smtsave = function () {
            setSmtpInfo();  
        }
        $scope.Smtreset = function () {
            getSmtpInfo();
        }

        $scope.Sslsave = function () {
            generateSsl();  
        }
        $scope.Sslreset = function () {
            $scope.commonName = "";
            $scope.organization = "";
            $scope.organizationUnit = "";
            $scope.cityOrLocality = "";
            $scope.stateOrProvince = "";
            $scope.country = "";
            $scope.emailAddress = "";
            $scope.validFor = "";
            $scope.keyLength = ""; 
        }

        $scope.adsave = function () {
            if ($scope.adEnable && $scope.ldapEnable) {
                $scope.ldapEnable = false;
                setAdLdapInfo();
            }
            setAdInfo();
        };
        $scope.adreset = function () {
            getAdInfo();
        }

        $scope.Ldapsave = function () {
            if ($scope.ldapEnable && $scope.adEnable) {
                $scope.adEnable = false;
                setLdapAdInfo();
            }
            setLdapInfo();
        };
        $scope.Ldapreset = function () {
            getLdapInfo();
        }

        $scope.Radiussave = function () {
            setRadiusInfo();
        };
        $scope.Radiusreset = function () {
            getRadiusInfo();
        }

        $scope.reset = function () {
            getServicesInfo();
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
        };
        
    }
]);