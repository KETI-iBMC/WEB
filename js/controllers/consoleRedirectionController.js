app.controller('ConsoleRedirectionController', [
    '$scope',
    '$window',
    'dataFactory',
    'logger',
    'CONST_RESTFUL_API',
    'CONST_MESSAGE',
    'CONST_CODE',
    '$q',
    '$rootScope',
    '$location',
    '$sce',
    function (
        $scope,
        $window,
        dataFactory,
        logger,
        CONST_RESTFUL_API,
        CONST_MESSAGE,
        CONST_CODE,
        $q,
        $rootScope,
        $location,
        $sce
    ) {
        /***************************************************************************************************************
         *
         * functions
         *
         ***************************************************************************************************************/
        function getServerPowerControl() {
            return dataFactory.httpRequest(CONST_RESTFUL_API.REMOTE_CONTROL.SERVER_POWER_CONTROL).then(
                function (response) {
                    return $q.resolve(response);
                }
            ).catch(function () {
                return $q.reject(CONST_MESSAGE.SYSTEM.E001);
            });
        }


        function fetchTextFromFile() {
            fetch('./images/time.txt')
                .then(response => response.text())
                .then(text => {
                    const lastModifiedElement = document.getElementById('lastModified');
                    if (lastModifiedElement) {
                        lastModifiedElement.textContent = text;
                    }
                })
                .catch(error => {
                    console.error('Error fetching text from file:', error);
                });
        }

        fetchTextFromFile();
        window.addEventListener('load', fetchTextFromFile);


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

            var videoPath = './images/keti.mp4';
            $scope.videoPath = generateDynamicPath(videoPath);

            function generateDynamicPath(url) {
                return $sce.trustAsResourceUrl(url);
            }
        };

        $scope.onClick = function () {
            dataFactory.httpRequest(CONST_RESTFUL_API.REMOTE_CONTROL.KVM).then(
                function (response) {
                    getServerPowerControl().then(function (resp) {
                        if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                            if (!$rootScope.kvmRef) {
                                // [수정5] kvm 창 크기조정중..
                                $rootScope.kvmRef = $window.open('kvm.html', '_blank', 'height=768' + ',width=1024');
                                // $rootScope.kvmRef = $window.open('kvm.html', '_blank', 'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
                            } else if ($rootScope.kvmRef.closed == false) {
                                var agent = navigator.userAgent.toLowerCase();

                                if (agent.indexOf("chrome") != -1) {
                                    logger.log(CONST_MESaSAGE.REMOTE_CONTROL.KVM.I001);
                                } else {
                                    $rootScope.kvmRef.focus();
                                }

                            }

                            // 230621 add kvm window closed event
                            else if ($rootScope.kvmRef.closed == true) {
                                // 창이 닫혔을 때 이벤트 처리 코드
                                // 여기에 원하는 이벤트 처리 코드를 추가하세요.
                            } else {
                                $rootScope.kvmRef = $window.open('kvm.html' + ":7681", '_blank', 'height=768' + ',width=1024');
                                // $rootScope.kvmRef = $window.open('kvm.html', '_blank', 'height=' + screen.height + ',width=' + screen.width + 'fullscreen=yes');
                            }

                            // var statusName = resp.data.POWER.STATUS == '1' ? 'on' : 'off';
                            // setTimeout(function() {
                            //     popup.call(statusName);
                            // }, 3000);
                        } else {
                            logger.logError(CONST_MESSAGE.REMOTE_CONTROL.KVM.E001);
                        }
                    }).catch(function (error) {
                        logger.logError(error ? error : CONST_MESSAGE.REMOTE_CONTROL.KVM.E001);
                    });
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.REMOTE_CONTROL.KVM.E001);
            });
        };


    }
]);