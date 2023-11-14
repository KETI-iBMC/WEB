app.controller('CommonController', [
    '$rootScope',
    '$scope',
    '$cookies',
    '$window',
    '$location',
    'logger',
    'CONST_MESSAGE',
    '$translate',
    function (
        $rootScope,
        $scope,
        $cookies,
        $window,
        $location,
        logger,
        CONST_MESSAGE,
        $translate
    ) {

        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function setPathString() {
            var path = $rootScope.activeState;
            if (path.indexOf('/home') === 0) {
                $rootScope.mainName = '';
                $rootScope.subName = '';
            } else if (path.indexOf('/systemInformation') === 0) {
                $rootScope.mainName = 'System Information';
                $rootScope.subName = '';
            } else if (path.indexOf('/fruInformation') === 0) {
                $rootScope.mainName = 'FRU Information';
                $rootScope.subName = '';
            } else if (path.indexOf('/serverHealth') === 0) {
                $rootScope.mainName = 'Server Health';
                if (path === '/serverHealthSensorReadings') {
                    $rootScope.subName = 'Sensor Readings';
                } else if (path === '/serverHealthEventLogs') {
                    $rootScope.subName = 'Event Logs';
                } else if (path === '/serverHealthPowerUsage') {
                    $rootScope.subName = 'Power Usage';
                } else {
                    $rootScope.subName = '';
                }
            } else if (path.indexOf('/config') === 0) {
                $rootScope.mainName = 'Configuration';
                if (path === '/configDns') {
                    $rootScope.subName = 'DNS';
                } else if (path === '/configNetwork') {
                    $rootScope.subName = 'Network';
                } else if (path === '/configNtp') {
                    $rootScope.subName = 'NTP';
                } else if (path === '/configSmtp') {
                    $rootScope.subName = 'SMTP';
                } else if (path === '/configGenerateSsl') {
                    $rootScope.subName = 'SSL';
                } else if (path === '/configActiveDirectory') {
                    $rootScope.subName = 'Active Directory';
                } else if (path === '/configLdap') {
                    $rootScope.subName = 'LDAP';
                } else if (path === '/configRadius') {
                    $rootScope.subName = 'RADIUS';
                } else if (path === '/configUsers') {
                    $rootScope.subName = 'Users';
                } else {
                    $rootScope.subName = '';
                }
            } else if (path.indexOf('/virtualMedia') === 0) {
                $rootScope.mainName = 'Virtual Media';
                if (path === '/virtualMediaUsb') {
                    $rootScope.subName = 'USB Redirection';
                } else {
                    $rootScope.subName = '';
                }
            } else if (path.indexOf('/remoteControl') === 0) {
                $rootScope.mainName = 'Remote Control';
                if (path === '/remoteControlSol') {
                    $rootScope.subName = 'SOL';
                } else if (path === '/remoteControlConsoleRedirection') {
                    $rootScope.subName = 'KVM';
                } else if (path === '/remoteControlServerPowerControl') {
                    $rootScope.subName = 'Server Power Control';
                } else {
                    $rootScope.subName = '';
                }
            } else if (path.indexOf('/maintenance') === 0) {
                $rootScope.mainName = 'Maintenance';
                if (path === '/maintenanceFirmwareUpdate') {
                    $rootScope.subName = 'Firmware Update';
                } else if (path === '/maintenanceBmcReset') {
                    $rootScope.subName = 'BMC Reset';
                } else if (path === '/maintenanceAiDataLoad'){
		    $rootScope.subName = 'AI Data Load';
		} else {
                    $rootScope.subName = '';
                }
            }else if (path.indexOf('/faultAnalysis') === 0){
	        $rootScope.mainName = 'Fault Analysis';
		if (path === '/faultAnalysisOverallMonitoring'){
		    $rootScope.subName = 'Overall Monitoring';
		} else if (path === '/faultAnalysisFoflPolicy'){
		    $rootScope.subName = 'FOFL Policy';
		} else if (path === '/faultAnalysisDiskReport'){	
		    $rootScope.subName = 'Disk Report';
		} else if (path === '/faultAnalysisLogMonitoring'){
		    $rootScope.subName = 'Log Monitoring';
		} else if (path === '/faultAnalysisHardwareReport'){
		    $rootScope.subName = 'Hardware Report';
		} else{
		    $rootScope.subName = '';
		}
            } 
	     else if (path.indexOf('/settings') === 0) {
                $rootScope.mainName = 'Settings';
                if (path === '/settingsServices') {
                    $rootScope.subName = 'Services';
                } else {
                    $rootScope.subName = '';
                }
            }
            else {
                $rootScope.mainName = '';
                $rootScope.subName = '';
            }
        }
        
        
        function convertUserPrivilege(privilege) {
            if (privilege === "4") {
                return 'Administrator';
            } else if (privilege === "3") {
                return 'Operator';
            } else if (privilege === "2") {
                return 'User';
            } else if (privilege === "1") {
                return 'Callback';
            } else {
                return '';
            }
        }

        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/
        $scope.init = function () {
            var isFromCmm = window.localStorage.getItem("isSendFromCmm");
            var userName = window.localStorage.getItem('userName');
            var userPassword = window.localStorage.getItem('userPassword');
            if (isFromCmm && userName && userPassword) {
                window.localStorage.removeItem("isSendFromCmm");
                userName = CryptoJS.AES.decrypt(userName, 'keit_cmm_to_bmc_encrypt').toString(CryptoJS.enc.Utf8);
                userPassword = CryptoJS.AES.decrypt(userPassword, 'keit_cmm_to_bmc_encrypt').toString(CryptoJS.enc.Utf8);
                $cookies.put('userName', userName);
                $cookies.put('userPassword', userPassword);
                $cookies.put('userPrivilege', '4');
                console.log('from CMM Data');
                console.log('userName :', userName);
                console.log('userPassword :', userPassword);
            }

            $scope.language = window.localStorage.getItem("language") || 'en_US';
            $rootScope.userName = $cookies.get('userName');
            $rootScope.userPrivilege = $cookies.get('userPrivilege') || '4';
            $rootScope.userPrivilegeConverted = convertUserPrivilege($cookies.get('userPrivilege')) || 'User';

            if ($rootScope.userName) {
                $rootScope.isLogin = true;
            }

            setPathString();

        };

        $scope.logout = function () {
            $rootScope.isLogin = false;
            $cookies.remove('userName');
            $cookies.remove('userPrivilege');
            $location.url('/login');
            logger.logSuccess(CONST_MESSAGE.LONIN.S002);
        };

        $scope.reloadRoute = function () {
            $window.location.reload();
        };

        $scope.$on('$routeChangeStart', function ($event, next, current) {
            setPathString();
        });

        $scope.$on('login', function () {
            $rootScope.userName = $cookies.get('userName');
            $rootScope.userPrivilege = $cookies.get('userPrivilege') || '4';
            $rootScope.userPrivilegeConverted = convertUserPrivilege($cookies.get('userPrivilege')) || 'User';
            $rootScope.isLogin = true;
        });

        $scope.changeLanguage = function () {
            $translate.use($scope.language);
            window.localStorage.setItem("language", $scope.language);
            logger.logSuccess(CONST_MESSAGE.LONIN.S001);


        };
    }
]);
