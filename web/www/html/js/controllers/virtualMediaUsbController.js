app.controller('VirtualMediaUsbController', [
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
        function getUsbRedirectionInfo() {
            $rootScope.showSpinner = true;

            // [수정3] 기존에 입력하는 부분이었던 NFS Settings 부분을 읽어오는 것을
            // Redfish VM 리소스 읽어오는 것으로 변경 + ID로 정렬
            dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_REDIRECTION).then(
                function (response) {
                    // var usbInfo = response.data.USB;
                    // $scope.ipAddress = usbInfo.IP_ADDRESS;
                    // $scope.path = usbInfo.PATH;
                    // $scope.user = usbInfo.USER || '';
                    // $scope.pw = usbInfo.PASSWORD || '';

                    var tmpList = [];
                    tmpList = response.data.VM;

                    $scope.fileList = [];
                    $scope.fileList = tmpList.sort(function(a,b) {
                        var sub_a = a.ID.substring(3);
                        var sub_b = b.ID.substring(3);
                        if(sub_a < sub_b)
                            return -1;
                        else if(sub_a > sub_b)
                            return 1;

                        return 0;
                    });
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.SYSTEM.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }
        
        function updateUSB() {
            dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_UPLOAD).then(
                function (response) {
                    if (response.data.CODE == CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.VIRTUAL_MEDIA.USB_UPLOAD.S002);
                    } else {
                        logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_UPLOAD.E002);
                    }
                }
            );
        }

        function usb_uploadFile() {
            $scope.showProgress = true;
            var file = $scope.usbFile;

            // var maxSizeInBytes = 100 * 1024 * 1024; // 70MB
            // if (file.size > maxSizeInBytes) {
            //     // 파일 크기가 70MB를 초과하는 경우
            //     logger.logError('File size cannot exceed 70MB');
            //     $scope.showProgress = false;
            // } else {
                // [수정4] 파일 업로드 binary로 변경
                let config = {
                    TransformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    },
                    uploadEventHandlers: {
                        progress: progress
                    }
                };

                var uploadUrl = CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_UPLOAD;

                // dataFactory.uploadBinaryToUrl(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_UPLOAD, file, config).then(
                dataFactory.uploadBinaryToUrl(uploadUrl, file, config).then(
                    function (response) {
                        if (response.status === CONST_CODE.REST_SUCCESS_CODE) {
                            logger.logSuccess(CONST_MESSAGE.VIRTUAL_MEDIA.USB_UPLOAD.S001);
                            getUsbRedirectionInfo();

                        } else {
                            logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_UPLOAD.E001);
                            getUsbRedirectionInfo();
                        }
                    },
                    function (error) {
                        console.log(error);
                        logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_UPLOAD.E002);
                        getUsbRedirectionInfo();

                        $scope.showProgress = false;
                        $scope.percent = 0;
                        $scope.reset();
                    }
                );
            //}

        }
        function progress(e) {
            $scope.percent = parseInt(e.loaded * 100 / e.total);
            console.log($scope.percent);
        }

        function fileChange(newValue, oldValue) {
            if(newValue) {
                $scope.fileName = newValue.name;
            }
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

            $scope.fileList = [];
            getUsbRedirectionInfo();

            $scope.showProgress = false;
            $scope.percent = 0;
            $scope.fileName = undefined;
            $scope.selectedCategory = "";
        };

        $scope.refresh = function () {
            $scope.fileList = [];
            getUsbRedirectionInfo();
            
        };

        $scope.fileBrowse = function () {
            // [수정3] VM 리소스 생성 및 ISO Images refresh 로 변경
            // /usb PUT 사용
            if(!$scope.path || !$scope.ipAddress) {
                logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E004);
                return;
            }

            var params = {
                IP_ADDRESS: $scope.ipAddress,
                PATH: $scope.path,
                USER: $scope.user,
                PASSWORD: $scope.pw
            };

            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_REDIRECTION, 'PUT', undefined, params).then(
                function (response) {

                    // [수정3] VM 리소스 생성 후 다시 읽기
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        $scope.fileList = [];
                        getUsbRedirectionInfo();
                        logger.logSuccess(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E001);
                    }
                    // $scope.fileList = response.data.FILES;
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        };

        $scope.mount = function () {
            if(!$scope.selectedItem)
            {
                logger.logError("Select Virtual Media Error");
                return ;
            }
            
            var params = {
                ID: $scope.selectedItem.ID
            };

            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_REDIRECTION, 'POST', undefined, params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        $scope.fileList = [];
                        getUsbRedirectionInfo();
                        logger.logSuccess(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.S002);
                    } else {
                        logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E002);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E002);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });


        };

        $scope.unmount = function () {
            // New
            if(!$scope.selectedItem)
            {
                logger.logError("Select Virtual Media Error");
                return ;
            }

            var params = {
                ID: $scope.selectedItem.ID
            };

            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.VIRTUAL_MEDIA.USB_REDIRECTION, 'DELETE', undefined, params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        $scope.fileList = [];
                        getUsbRedirectionInfo();
                        logger.logSuccess(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.S003);
                    } else {
                        logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E003);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_REDIRECTION.E003);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });

        };

        // [수정3] radio버튼으로 VM 리소스 골라서 마운트 언마운트하기로 변경
        $scope.changeItem = function (file) {
            // New
            // console.log('Can use Item?', $scope.item.ID);
            $scope.selectedItem = file;
            // console.log('selectedItem?', $scope.selectedItem);

            $scope.ipAddress = $scope.selectedItem.IP_ADDRESS;
            $scope.path = $scope.selectedItem.PATH;
            $scope.user = $scope.selectedItem.USER;
            $scope.pw = $scope.selectedItem.PASSWORD;
        };


        //23.05.23 usb file upload 
        $scope.upload = function () {
            if ($scope.usbFile === undefined) {
                logger.logError(CONST_MESSAGE.VIRTUAL_MEDIA.USB_UPLOAD.E001);
                return;
            }

            usb_uploadFile();
    setTimeout(function () {
        location.reload(true);
    }, 1000);
        };

        $scope.update = function () {
            updateUSB();
        };

        $scope.reset = function () {
            angular.element('#usbFile').val('');
            $scope.usbFile = undefined;
            $scope.fileName = undefined;
        };

        $scope.chooseFile = function() {
            document.getElementById('usbFile').click();
        };

        $scope.$watch('usbFile', fileChange);

        // [수정5] select usb category
        $scope.onChangeCategory = function (category) {
            $scope.selectedCategory = category;
        };
       
    }
]);