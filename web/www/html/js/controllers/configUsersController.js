app.controller('ConfigUsersController', [
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
        function getUsersInfo() {
            $rootScope.showSpinner = true;
            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.USER).then(
                function (response) {
                    if (response.data.USER) {
                        // [수정3] user id로 정렬
                        // $scope.userInfo = response.data.USER;
                        var tmpInfo = response.data.USER.INFO;
                        var sortedInfo = tmpInfo.sort(function (a, b) {
                            if (a.INDEX < b.INDEX) return -1;
                            if (a.INDEX > b.INDEX) return 1;
                            return 0;
                        });

                        $scope.userInfo = {};
                        $scope.userInfo.INFO = sortedInfo;

                    } else {
                        throw 'user info empty';
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.USER.E001);
            }).finally(function () {
                $rootScope.showSpinner = false;
            });
        }

        function addUserInfo() {
            var params = {
                INDEX: getMaxUserIndex(),
                NAME: $scope.addUserName,
                PASSWORD: $scope.addUserPassword,
                IPMIMSG: '0',
                CALLBACK: '0',
                LINKAUTH: '0',
                ENABLE_STATUS: $scope.addUserEnableStatus ? '1' : '0',
                PRIVILEGE: $scope.addUserPrivilege
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.USER, 'POST', undefined, params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        resetUserInfo();
                        getUsersInfo();
                        angular.element("#userAddingModal").modal('hide');
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.USER.S002);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.USER.E004);
                    }
                }
            ).catch(function () {
                logger.logError(CONST_MESSAGE.CONFIGURATION.USER.E005);
            });
        }

        function deleteUserInfo(index) {
            var params = {
                INDEX: index
            };

            dataFactory.httpRequest(CONST_RESTFUL_API.CONFIGURATION.USER, 'DELETE', params).then(
                function (response) {
                    if (response.data.CODE === CONST_CODE.REST_SUCCESS_CODE) {
                        getUsersInfo();
                        logger.logSuccess(CONST_MESSAGE.CONFIGURATION.USER.S001);
                    } else {
                        logger.logError(CONST_MESSAGE.CONFIGURATION.USER.E002);
                    }

                    resetUserInfo();
                }
            ).catch(function () {
                resetUserInfo();
                logger.logError(CONST_MESSAGE.CONFIGURATION.USER.E003);
            });
        }

        function getMaxUserIndex() {
            var index = 0;
            for (var i = 0; i < $scope.userInfo.INFO.length; i++) {
                if (parseInt($scope.userInfo.INFO[i].INDEX) > index) {
                    index = parseInt($scope.userInfo.INFO[i].INDEX);
                }
            }

            return (index + 1).toString();
        }

        function resetUserInfo() {
            $scope.addUserName = '';
            $scope.addUserPassword = '';
            $scope.addUserPasswordConfirm = '';
            $scope.addUserPrivilege = '3';
            $scope.addUserEnableStatus = false;
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

            resetUserInfo();
            getUsersInfo();
        };

        $scope.reset = function () {
            getUsersInfo();
        };

        $scope.delete = function () {
            for (var i = 0; i < $scope.userInfo.INFO.length; i++) {
                if ($scope.userInfo.INFO[i].SELECTED) {
                    deleteUserInfo($scope.userInfo.INFO[i].INDEX);
                    break;
                }
            }
        };

        $scope.modalAddButtonClick = function () {
            if (!$scope.addUserName) {
                logger.logWarning(CONST_MESSAGE.CONFIGURATION.USER.W001);
                angular.element('#userName').focus();
            } else if (!$scope.addUserPassword) {
                logger.logWarning(CONST_MESSAGE.CONFIGURATION.USER.W002);
                angular.element('#userPassword').focus();
            } else if (!$scope.addUserPasswordConfirm) {
                logger.logWarning(CONST_MESSAGE.CONFIGURATION.USER.W003);
                angular.element('#userPasswordConfirm').focus();
            } else if ($scope.addUserPassword != $scope.addUserPasswordConfirm) {
                logger.logWarning(CONST_MESSAGE.CONFIGURATION.USER.W004);
                angular.element('#userPasswordConfirm').focus();
            } else {
                addUserInfo();
            }
        };

        $scope.convertUserEnable = function (enable) {
            if (enable === "0") {
                return 'Disabled';
            } else {
                return 'Enabled';
            }
        };

        $scope.convertUserPrivilege = function (privilege) {
            if (privilege === "4") {
                return 'Administrator';
            } else {
                return 'User';
            }
        };


        $scope.onCheckUser = function (user) {
            if (user.hasOwnProperty("SELECTED") && user.SELECTED) {
                for (var i = 0; i < $scope.userInfo.INFO.length; i++) {
                    if (user.INDEX != $scope.userInfo.INFO[i].INDEX) {
                        $scope.userInfo.INFO[i].SELECTED = false;
                    }
                }
            }
        }
    }
]);