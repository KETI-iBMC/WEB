app.controller('LoginController', [
    '$scope',
    '$cookies',
    '$location',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    '$rootScope',
    '$translate',
    function (
        $scope,
        $cookies,
        $location,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        $rootScope,
        $translate
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/

        function setLoginCookie(userName, userPrivilege) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 7);
            $cookies.put('userName', userName);
            $cookies.put('userPrivilege', userPrivilege);
        }

        function showLoading() {
            document.getElementById("loading-overlay").style.display = "block";
        }
        
        function hideLoading() {
            document.getElementById("loading-overlay").style.display = "none";
        }
        /***************************************************************************************************************
         *
         * $scope functions
         *
         ***************************************************************************************************************/
		$scope.login = function () {
            // temporary code
          //  if ($scope.userName.toLowerCase() === 'administrator' && $scope.userPassword.toLowerCase() === '1234') {
            //    setLoginCookie($scope.userName, '4');
             //   $rootScope.$broadcast('login');
             //   $location.url('/home');
           // } else {
           //     logger.logWarning(CONST_MESSAGE.USER.W001);
           // }

             var params = {
                 USERNAME: $scope.userName,
                 PASSWORD: $scope.userPassword
             };
            
function performLogin() {
    // ·Î±×ÀÎ ¹öÆ°À» ´©¸¦ ¶§¸¸ ·Îµù ½ºÇÇ³Ê¸¦ È°¼ºÈ­
    if (!$rootScope.showSpinner) {
        $rootScope.showSpinner = false;
    }

    dataFactory.httpRequest(CONST_RESTFUL_API.LOGIN.LOGIN, "POST", undefined, params).then(
        function (response) {
            if (parseInt(response.data.PRIVILEGE) <= 0) {
                logger.logError(CONST_MESSAGE.USER.E001);
                return;
            }

            setLoginCookie($scope.userName, response.data.PRIVILEGE);
            $rootScope.$broadcast('login');
            $location.url('/home');
        }
    ).catch(function () {
        // ·Î±×ÀÎ ½ÇÆÐ ½Ã¿¡µµ ·Îµù ½ºÇÇ³Ê¸¦ ºñÈ°¼ºÈ­ÇÏÁö ¾ÊÀ½
        showLoading();
        setTimeout(function () {
            performLogin();
        }, 1000);
    }).finally(function () {
        // ·Î±×ÀÎ ½Ã¿¡¸¸ ·Îµù ½ºÇÇ³Ê¸¦ ºñÈ°¼ºÈ­
        if ($rootScope.showSpinner) {
            $rootScope.showSpinner = true;
        }
    });
}

    performLogin();
        };

        $scope.init = function () {
            $scope.language = window.localStorage.getItem("language") || 'en_US';

            $scope.userName = '';
            $scope.userPassword = '';

            if ($cookies.get('userName')) {
                $location.url('/home');
            }

            hideLoading();
        };

        //ï¿½Î±ï¿½ï¿½ï¿½ ï¿½ï¿½Æ°ï¿½ï¿½ ï¿½ï¿½ï¿½ï¿½ ï¿½Ã°ï¿½ ï¿½ï¿½ï¿½ï¿½
        $scope.recordLoginTime = function() {
            var loginTime = new Date(); // ï¿½ï¿½ï¿½ï¿½ ï¿½Ã°ï¿½
        };
        
        $scope.changeLanguage = function () {
            $translate.use($scope.language);
            window.localStorage.setItem("language", $scope.language);
            logger.logSuccess(CONST_MESSAGE.LONIN.S001);
        };

    }
]);
