app.controller('SolController', [
    '$scope',
    '$rootScope',
    '$window',
    '$location',
    'logger',
    'CONST_MESSAGE',
    function (
        $scope,
        $rootScope,
        $window,
        $location,
        logger,
        CONST_MESSAGE
    ) {
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
        };

        $scope.onClick = function () {
            var w = 1024, h = 768;
            var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
            var dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;
            var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;

            if(!$rootScope.solRef) {
                $rootScope.solRef = $window.open('sol.html', '_blank', 'height=' + h + ', width=' + w + ', top=' + top + ', left=' + left);
            } else if($rootScope.solRef.closed == false) {
                var agent = navigator.userAgent.toLowerCase();

                if (agent.indexOf("chrome") != -1) {
                    logger.log(CONST_MESSAGE.REMOTE_CONTROL.SOL.I001);
                }
                else {
                    $rootScope.solRef.focus();
                }
            } else {
                $rootScope.solRef = $window.open('sol.html', '_blank', 'height=' + h + ', width=' + w + ', top=' + top + ', left=' + left);
            }
        }
    }
]);