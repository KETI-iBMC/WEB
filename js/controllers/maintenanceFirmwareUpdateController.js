app.controller('MaintenanceFirmwareUpdateController', [
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
        function updateFirmware() {
            dataFactory.httpRequest(CONST_RESTFUL_API.MAINTENANCE.FIRMWARE_UPLOAD).then(
                function (response) {
                    if (response.data.CODE == CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.MAINTENANCE.FIRMWARE_UPLOAD.S002);
                    } else {
                        logger.logError(CONST_MESSAGE.MAINTENANCE.FIRMWARE_UPLOAD.E002);
                    }
                }
            );
        }

        function uploadFile() {
            $scope.showProgress = true;
            var file = $scope.firmwareFile;

            // [수정4] 파일 업로드 binary로 변경
            let config = {
                TransformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                uploadEventHandlers:{
                    progress: progress
                }
            };

            // url을 /upload 사용 --> /upload/category로 분류
            var categoryUrl;
            if($scope.selectedCategory === 'All')
                categoryUrl = 'all';
            //else if($scope.selectedCategory === 'OS')
            //    categoryUrl = 'os';
            else if($scope.selectedCategory === 'Firmware')
                categoryUrl = 'firmware';
            else if($scope.selectedCategory === 'Software')
                categoryUrl = 'sw';
            //else if($scope.selectedCategory === 'etc')
              //  categoryUrl = 'etc';

            var uploadUrl = CONST_RESTFUL_API.MAINTENANCE.FIRMWARE_UPLOAD + '/' + categoryUrl;

            // dataFactory.uploadBinaryToUrl(CONST_RESTFUL_API.MAINTENANCE.FIRMWARE_UPLOAD, file, config).then(
            dataFactory.uploadBinaryToUrl(uploadUrl, file, config).then(
                function(response) {
                    if(response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        logger.logSuccess(CONST_MESSAGE.MAINTENANCE.FIRMWARE_UPLOAD.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.MAINTENANCE.FIRMWARE_UPLOAD.E001);
                    }

                    $scope.showProgress = false;
                    $scope.percent = 0;
                    $scope.reset();
                    
                },
                function (error) {
                    console.log(error);
                    logger.logError(CONST_MESSAGE.MAINTENANCE.FIRMWARE_UPLOAD.E002);

                    $scope.showProgress = false;
                    $scope.percent = 0;
                    $scope.reset();
                }
            );

            

            // Origin
            // dataFactory.uploadFileToUrl(CONST_RESTFUL_API.MAINTENANCE.FIRMWARE_UPLOAD, file, progress).then(
            //     function (response) {
            //         if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
            //             logger.logSuccess(CONST_MESSAGE.MAINTENANCE.FIRMWARE_UPLOAD.S001);
            //         } else {
            //             logger.logError(CONST_MESSAGE.MAINTENANCE.FIRMWARE_UPLOAD.E001);
            //         }

            //         $scope.showProgress = false;
            //         $scope.percent = 0;
            //         $scope.reset();
            //     },
            //     function (error) {
            //         console.log(error);
            //         logger.logError(CONST_MESSAGE.MAINTENANCE.FIRMWARE_UPLOAD.E002);

            //         $scope.showProgress = false;
            //         $scope.percent = 0;
            //         $scope.reset();
            //     }
            // );
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

            $scope.showProgress = false;
            $scope.percent = 0;
            $scope.fileName = undefined;
            // [수정5] categoryList랑 선택 category추가
            //$scope.categoryList = ['All', 'OS', 'Firmware', 'Software', 'etc'];
            $scope.categoryList = ['All', 'Firmware', 'Software'];
            $scope.selectedCategory = "";
        };

        $scope.upload = function () {
            if ($scope.firmwareFile === undefined) {
                logger.logError(CONST_MESSAGE.MAINTENANCE.FIRMWARE_UPLOAD.E001);
                return;
            }

            uploadFile();
        };

        $scope.update = function () {
            updateFirmware();
        };

        $scope.reset = function () {
            angular.element('#firmwareFile').val('');
            $scope.firmwareFile = undefined;
            $scope.fileName = undefined;
        };

        $scope.chooseFile = function() {
            document.getElementById('firmwareFile').click();
        };

        $scope.$watch('firmwareFile', fileChange);

        // [수정5] select firmware category
        $scope.onChangeCategory = function (category) {
            $scope.selectedCategory = category;
        };

        
    }
]);