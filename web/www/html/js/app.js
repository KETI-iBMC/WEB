//create app module
var app = angular.module('app', ['ngRoute', 'ngCookies', 'chartistAngularDirective', 'ui.bootstrap', 'radialIndicator', 'pascalprecht.translate']);

app.config(['$translateProvider', function ($translateProvider) {

    var lang = window.localStorage.getItem("language") || 'en_US';
    $translateProvider.useSanitizeValueStrategy('sce');
    $translateProvider.useStaticFilesLoader({
        prefix: './lang/',
        suffix: '.json'
    }).preferredLanguage(lang);
    $translateProvider.registerAvailableLanguageKeys(['en_US', 'ko_KR'], {
        'en_US': 'en',
        'en-US': 'en',
        'ko_KR': 'ko',
        'ko-KR': 'ko'
    });
    $translateProvider.use(lang);

}]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider

        // Login ///////////////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        // Dashboard(Home) /////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/home', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        // System Information //////////////////////////////////////////////////////////////////////////////////////////////
        .when('/systemInformation', {
            templateUrl: 'views/systemInformation.html',
            controller: 'SystemInformationController'
        })

        // FRU Information /////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/fruInformation', {
            templateUrl: 'views/fruInformation.html',
            controller: 'FruInformationController'
        })
        .when('/fruInformationModify/:fruInfo', {
            templateUrl: 'views/fruInformationModify.html',
            controller: 'FruInformationModifyController'
        })

        // Server Health ///////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/serverHealthSensorReadings', {
            templateUrl: 'views/sensorReadings.html',
            controller: 'SensorReadingsController'
        })
        .when('/serverHealthEventLogs', {
            templateUrl: 'views/eventLogs.html',
            controller: 'EventLogsController'
        })
        .when('/serverHealthPowerUsage', {
            templateUrl: 'views/powerUsage.html',
            controller: 'PowerUsageController'
        })
        // Configuration ///////////////////////////////////////////////////////////////////////////////////////////////////

        .when('/configNtp', {
            templateUrl: 'views/configNtp.html',
            controller: 'ConfigNtpController'
        })
        .when('/configUsers', {
            templateUrl: 'views/configUsers.html',
            controller: 'ConfigUsersController'
        })

        /* .when('/configDns', {
            templateUrl: 'views/configDns.html',
            controller: 'ConfigDnsController'
        })
        .when('/configNetwork', {
            templateUrl: 'views/configNetwork.html',
            controller: 'ConfigNetworkController'
        }) 
        .when('/configSmtp', {
            templateUrl: 'views/configSmtp.html',
            controller: 'ConfigSmtpController'
        })
        .when('/configGenerateSsl', {
            templateUrl: 'views/configGenerateSsl.html',
            controller: 'ConfigSslController'
        })
        .when('/configViewSsl', {
            templateUrl: 'views/configViewSsl.html',
            controller: 'ConfigSslController'
        })
        .when('/configActiveDirectory', {
            templateUrl: 'views/configActiveDirectory.html',
            controller: 'ConfigActiveDirectoryController'
        })
        .when('/configLdap', {
            templateUrl: 'views/configLdap.html',
            controller: 'ConfigLdapController'
        })
        .when('/configRadius', {
            templateUrl: 'views/configRadius.html',
            controller: 'ConfigRadiusController'
        })
        */

        // Virtual Media ///////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/virtualMediaUsb', {
            templateUrl: 'views/virtualMediaUsb.html',
            controller: 'VirtualMediaUsbController'
        })

        // Remote Control //////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/remoteControlSol', {
            templateUrl: 'views/consoleRedirectionSOL.html',
            controller: 'SolController'
        })
        .when('/remoteControlConsoleRedirection', {
            templateUrl: 'views/consoleRedirection.html',
            controller: 'ConsoleRedirectionController'
        })
        .when('/remoteControlServerPowerControl', {
            templateUrl: 'views/serverPowerControl.html',
            controller: 'ServerPowerControlController'
        })

        // Maintenance Control //////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/maintenance', {
            templateUrl: 'views/maintenanceFirmwareUpdate.html',
            controller: 'MaintenanceFirmwareUpdateController'
        })
        .when('/maintenanceFirmwareUpdate', {
            templateUrl: 'views/maintenanceFirmwareUpdate.html',
            controller: 'MaintenanceFirmwareUpdateController'
        })
        .when('/maintenanceBmcReset', {
            templateUrl: 'views/maintenanceBmcReset.html',
            controller: 'MaintenanceBmcResetController'
        })
        .when('/maintenanceAiDataLoad', {
            templateUrl: 'views/maintenanceAiDataLoad.html',
            controller: 'MaintenanceAiDataLoadController'
        })

        // Fault Analysis /////////////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/faultAnalysis', {
            templateUrl: 'views/faultAnalysisOverallMonitoring.html',
            controller: 'FaultAnalysisOverallMonitoringController'
        })
        .when('/faultAnalysisOverallMonitoring', {
            templateUrl: 'views/faultAnalysisOverallMonitoring.html',
            controller: 'FaultAnalysisOverallMonitoringController'
        })
        .when('/faultAnalysisFoflPolicy', {
            templateUrl: 'views/faultAnalysisFoflPolicy.html',
            controller: 'FaultAnalysisFoflPolicyController'
        })
        .when('/faultAnalysisDiskReport', {
            templateUrl: 'views/faultAnalysisDiskReport.html',
            controller: 'FaultAnalysisDiskReportController'
        })
        .when('/faultAnalysisLogMonitoring', {
            templateUrl: 'views/faultAnalysisLogMonitoring.html',
            controller: 'FaultAnalysisLogMonitoringController'
        })
        .when('/faultAnalysisHardwareReport', {
            templateUrl: 'views/faultAnalysisHardwareReport.html',
            controller: 'faultAnalysisHardwareReportController'
        })

        // Energy Saving /////////////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/energySaving', {
            templateUrl: 'views/energySavingSmartFanControl.html',
            controller: 'energySavingSmartFanController'
        })
        .when('/energySavingSmartFanControl', {
            templateUrl: 'views/energySavingSmartFanControl.html',
            controller: 'energySavingSmartFanController'
        })
        .when('/energySavingCpuPowerCapping', {
            templateUrl: 'views/energySavingCpuPowerCapping.html',
            controller: 'EnergySavingCpuPowerCappingController'
        })


        // Settings /////////////////////////////////////////////////////////////////////////////////////////////////////////
        .when('/settingsServices', {
            templateUrl: 'views/settingsServices.html',
            controller: 'SettingsServicesController'
        })

        // Otherwise ///////////////////////////////////////////////////////////////////////////////////////////////////////
        .otherwise({
            redirectTo: "/login"
        });
}]).constant('CONST_RESTFUL_API', (function () {
    // var domain = 'http://10.0.6.112:8000';
    var API_HOST = window.location.hostname === "localhost" ? "45.77.14.84" : window.location.hostname;
    var domain = window.location.protocol + "//" + API_HOST + ':8000';

    return {
        ROOT_DOMAIN: domain,
        LOGIN: {
            USER_INFO: domain + '/user',
            LOGIN: domain + '/login'
        },
        HOME: {
            MAIN_INFO: domain + '/main',
            USER: domain + '/user',

            //23.06.09 - Add Quick Command
            COMMAND_1: domain + '/command1',
            COMMAND_2: domain + '/command2',
            COMMAND_KVM: domain + '/command_kvm',
            COMMAND_4: domain + '/command4',
            COMMAND_5: domain + '/command5',
            COMMAND_6: domain + '/command6',
            COMMAND_7: domain + '/command7',
            COMMAND_8: domain + '/command8',

            TEMP: domain + '/temp',
        },
        SYSTEM: {
            SYSTEM_INFO: domain + '/sysinfo'
        },
        FRU: {
            FRU_INFO: domain + '/fru'
        },
        SERVER_HEALTH: {
            SENSOR_INFO: domain + '/sensor',
            EVENT_LOG: domain + '/eventlog',
            POWER_USAGE: domain + '/watt'
        },
        CONFIGURATION: {
            DNS: domain + '/ddns',
            NETWORK: domain + '/network',
            NTP: domain + '/ntp',
            SMTP: domain + '/smtp',
            SSL: domain + '/ssl',
            ACTIVEDIR: domain + '/activedir',
            LDAP: domain + '/ldap',
            RADIUS: domain + '/radius',
            IPV6: domain + '/ipv6',
            USER: domain + '/user'
        },
        REMOTE_CONTROL: {
            KVM: domain + '/kvm',
            FUNCTIONKEY: domain + '/functionkey',
            SERVER_POWER_CONTROL: domain + '/power'
        },
        VIRTUAL_MEDIA: {
            USB_REDIRECTION: domain + '/usb',
            USB_UPLOAD: domain + '/usb_upload'
        },
        MAINTENANCE: {
            FIRMWARE_UPLOAD: domain + '/upload',
            BMC_RESET: domain + '/bmcReset',
            BMC_WARM_RESET: domain + '/warmReset',
            AI_DATA_LOAD: domain + "/aiDataLoad"
        },
        SMART_FAN_CONTROL: {
            ENERGY: domain + '/energySavingSmartFanControl/option',
            RPMDATA: domain + '/fans',
            BFCTEMP: domain + '/temp_include_cpu',
        },
        FAULT_ANALYSIS: {
            OVERALL_MONITORING: domain + '/overallMonitoring',
            FOFL_POLICY: domain + '/fofl',
            DISK_REPORT: domain + '/faultAnalysisDiskReport_nvme0',
            FEEDBACKLOG_LATEST: domain + '/feedbackLog_latest',
            FEEDBACKLOG_MODULE: domain + '/feedbackLog_module',
            FEEDBACKLOG_PROCEED: domain + '/feedbackLog_proceed',
            FEEDBACKLOG_CAUSE: domain + '/feedbackLog_cause',
        },
        CPU_MONITORING: {
            SLOT: domain + '/slot',
            STORAGE: domain + '/faultAnalysisOverallMonitoring_storage',
            DISK_GRAPH: domain + '/diskGraph'
        },
        CPU_POEWR_CAPPING: {
            ENERGYGRAPH: domain + '/energygraph',
            TOTAL_GRAPH: domain + '/compare'
        },
        ENERGY_SAVING: {
            LSTM_GRAPH: domain + '/lstm',
            CPU_POWER_CAPPING_CPU_VALUES_MONITORING: domain + '/energySavingCpuPowerCapping_cpuValuesMonitoring',
            CPU_POWER_CAPPING_CPU_CONTROL: domain + '/energySavingCpuPowerCapping_cpuControl',
            CPU_POWER_CAPPING_CONTROL: domain + '/energySavingCpuPowerCapping',
            ENERGY_GRAPH: domain + '/energygraph'
        },
        SETTINGS: {
            SERVICES: domain + '/setting'
        },
        NTPMAP: {
            AE: domain + '/AE',
            AU: domain + '/AU',
            BD: domain + '/BD',
            BE: domain + '/BE',
            BF: domain + '/BF',
            BG: domain + '/BG',
            BI: domain + '/BI',
            BJ: domain + '/BJ',
            BN: domain + '/BN',
            BO: domain + '/BO',
            BR: domain + '/BR',
            BS: domain + '/BS',
            BT: domain + '/BT',
            BW: domain + '/BW',
            CF: domain + '/CF',
            CG: domain + '/CG',
            CH: domain + '/CH',
            CI: domain + '/CI',
            CL: domain + '/CL',
            CU: domain + '/CU',
            CY: domain + '/CY',
            DJ: domain + '/DJ',
            EE: domain + '/EE',
            ER: domain + '/ER',
            FK: domain + '/FK',
            GF: domain + '/GF',
            GH: domain + '/GH',
            GN: domain + '/GN',
            GQ: domain + '/GQ',
            GW: domain + '/GW',
            GY: domain + '/GY',
            HN: domain + '/HN',
            HR: domain + '/HR',
            HT: domain + '/HT',
            HU: domain + '/HU',
            ID: domain + '/ID',
            IE: domain + '/IE',
            IL: domain + '/IL',
            KE: domain + '/KE',
            KG: domain + '/KG',
            KH: domain + '/KH',
            LB: domain + '/LB',
            LK: domain + '/LK',
            LR: domain + '/LR',
            LS: domain + '/LS',
            LV: domain + '/LV',
            MG: domain + '/MG',
            MM: domain + '/MM',
            MN: domain + '/MN',
            MR: domain + '/MR',
            MW: domain + '/MW',
            MX: domain + '/MX',
            NA: domain + '/NA',
            NC: domain + '/NC',
            NE: domain + '/NE',
            NL: domain + '/NL',
            NZ: domain + '/NZ',
            OM: domain + '/OM',
            PA: domain + '/PA',
            PE: domain + '/PE',
            PG: domain + '/PG',
            PH: domain + '/PH',
            QA: domain + '/QA',
            RO: domain + '/RO',
            RS: domain + '/RS',
            SI: domain + '/SI',
            SJ: domain + '/SJ',
            SK: domain + '/SK',
            SL: domain + '/SL',
            SN: domain + '/SN',
            SO: domain + '/SO',
            SR: domain + '/SR',
            SS: domain + '/SS',
            SV: domain + '/SV',
            SY: domain + '/SY',
            SZ: domain + '/SZ',
            TG: domain + '/TG',
            TH: domain + '/TH',
            TJ: domain + '/TJ',
            TL: domain + '/TL',
            TW: domain + '/TW',
            VE: domain + '/VE',
            VN: domain + '/VN',
            VU: domain + '/VU',
            YE: domain + '/YE',
            ZA: domain + '/ZA',
            PT: domain + '/PT',
            PY: domain + '/PY',
            ES: domain + '/ES',
            ET: domain + '/ET',
            IT: domain + '/IT',
            JM: domain + '/JM',
            AL: domain + '/AL',
            AM: domain + '/AM',
            MK: domain + '/MK',
            ML: domain + '/ML',
            GR: domain + '/GR',
            GT: domain + '/GT',
            TR: domain + '/TR',
            TT: domain + '/TT',
            TM: domain + '/TM',
            TN: domain + '/TN',
            KR: domain + '/KR',
            XK: domain + '/XK',
            KP: domain + '/KP',
            KW: domain + '/KW',
            CN: domain + '/CN',
            CO: domain + '/CO',
            PL: domain + '/PL',
            PS: domain + '/PS',
            CZ: domain + '/CZ',
            DE: domain + '/DE',
            FR: domain + '/FR',
            GA: domain + '/GA',
            MA: domain + '/MA',
            MD: domain + '/MD',
            DZ: domain + '/DZ',
            EC: domain + '/EC',
            LY: domain + '/LY',
            ME: domain + '/ME',
            TD: domain + '/TD',
            TF: domain + '/TF',
            SD: domain + '/SD',
            EH: domain + '/EH',
            SA: domain + '/SA',
            SB: domain + '/SB',
            IQ: domain + '/IQ',
            JO: domain + '/JO',
            IR: domain + '/IR',
            IS: domain + '/IS',
            AZ: domain + '/AZ',
            BA: domain + '/BA',
            UA: domain + '/UA',
            UG: domain + '/UG',
            BY: domain + '/BY',
            BZ: domain + '/BZ',
            LT: domain + '/LT',
            LU: domain + '/LU',
            DK: domain + '/DK',
            DO: domain + '/DO',
            GB: domain + '/GB',
            GE: domain + '/GE',
            MY: domain + '/MY',
            MZ: domain + '/MZ',
            TZ: domain + '/TZ',
            ZW: domain + '/ZW',
            CD: domain + '/CD',
            AR: domain + '/AR',
            NG: domain + '/NG',
            NI: domain + '/NI',
            CM: domain + '/CM',
            CR: domain + '/CR',
            US: domain + '/US',
            UY: domain + '/UY',
            KZ: domain + '/KZ',
            LA: domain + '/LA',
            UZ: domain + '/UZ',
            ZM: domain + '/ZM',
            AF: domain + '/AF',
            AT: domain + '/AT',
            PK: domain + '/PK',
            PR: domain + '/PR',
            IN: domain + '/IN',
            JP: domain + '/JP',
            CA: domain + '/CA',
            GM: domain + '/GM',
            GL: domain + '/GL',
            AO: domain + '/AO',
            NO: domain + '/NO',
            NP: domain + '/NP',
            RU: domain + '/RU',
            RW: domain + '/RW',
            FI: domain + '/FI',
            FJ: domain + '/FJ',
            SE: domain + '/SE',
            EG: domain + '/EG'
        }
    }


})()).constant('CONST_MESSAGE', {
    LONIN: {
        'S001': '[S001] Language change Succese.',
        'S002': '[S002] Logout has been completed.'
    },
    USER: {
        'E001': '[E001] Could not get user information.',
        'W001': '[W001] User name or password do not match.'
    },
    MAIN: {
        'E001': '[E001] Could not get user information.'
    },
    SYSTEM: {
        'E001': '[E001] Could not get system information.'
    },
    FRU: {
        'S001': '[S001] Saving completed.',
        'E001': '[E001] Could not get fru information.',
        'E002': '[E002] Saving failed.'
    },
    TEMP: {
        'E001': '[E001] URL not found',
        'E002': '[E002] Failed to fetch data',

    },
    SERVER_HEALTH: {
        SENSOR_READINGS: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Could not get sensor information.',
            'E002': '[E002] Saving failed.',
            'E003': '[E003] Saving failed.'
        },
        EVENT_LOGS: {
            'E001': '[E001] Could not get event logs.'
        },
        POWER_USAGE: {
            'E001': '[E001] Could not get total power usage.',
            'E002': '[E002] Could not get last min power usage.',
            'E003': '[E003] Could not get last hour power usage.',
            'E004': '[E004] Could not get real time power usage.'
        }
    },
    CONFIGURATION: {
        DNS: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Could not get dns information.',
            'E002': '[E002] Saving failed.',
            'E003': '[E003] Saving failed.'
        },
        NETWORK: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Could not get network information.',
            'E002': '[E002] Saving failed.',
            'E003': '[E003] Saving failed.'
        },
        NTP: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Could not get ntp information.',
            'E002': '[E002] Saving failed.',
            'E003': '[E003] Saving failed.'
        },
        SMTP: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Could not get smtp information.',
            'E002': '[E002] Saving failed.',
            'E003': '[E003] Saving failed.'
        },
        SSL: {
            'S001': '[S001] Generating completed.',
            'E001': '[E001] Could not generate ssl.',
            'E002': '[E001] Could not generate ssl.',
        },
        USER: {
            'S001': '[S001] Delete completed.',
            'S002': '[S002] Adding completed.',
            'E001': '[E001] Could not get user information.',
            'E002': '[E002] Delete failed.',
            'E003': '[E003] Delete failed.',
            'E004': '[E004] Adding failed.',
            'E005': '[E005] Adding failed.',
            'W001': '[W001] Please input user name.',
            'W002': '[W002] Please input user password.',
            'W003': '[W003] Please input confirm password.',
            'W004': '[W004] Password is mismatch.'
        },
        ACTIVEDIR: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Could not get active directory information.',
            'E002': '[E002] Saving failed.',
            'E003': '[E003] Saving failed.'
        },
        LDAP: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Could not get LDAP information.',
            'E002': '[E002] Saving failed.',
            'E003': '[E003] Saving failed.'
        },
        RADIUS: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Could not get RADIUS information.',
            'E002': '[E002] Saving failed.',
            'E003': '[E003] Saving failed.'
        }
    },
    VIRTUAL_MEDIA: {
        USB_REDIRECTION: {
            'S001': '[S001] Saving completed.',
            'S002': '[S002] Mounting completed.',
            'S003': '[S003] Unmounting completed.',
            'E001': '[E001] Saving failed.',
            'E002': '[E002] Mounting failed.',
            'E003': '[E003] Unmounting failed.',
            'E004': '[E004] IP address or path error.'
        }
    },
    REMOTE_CONTROL: {
        SOL: {
            'I001': '[I001] SOL Console is already opened, Please focus the SOL console.'
        },
        KVM: {
            'E001': '[E001] Virtual machine not ready.',
            'I001': '[I001] KVM Console is already opened, Please focus the KVM console.'
        },
        SERVER_POWER_CONTROL: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Saving failed.'
        }
    },
    MAINTENANCE: {
        FIRMWARE_UPLOAD: {
            'S001': '[S001] Success Upload! Start upgrade BMC Firmware.',
            'S002': '[S002] Success Update Firmware! After few minute, BMC Firmware will updated!',
            'E001': '[E001] Upload failed.',
            'E002': '[E002] Firmware Update failed.'
        },
        BMC_RESET: {
            'S001': '[S001] Reset succeeded.',
            'E001': '[E001] Reset failed',
        },
        BMC_WARM_RESET: {
            'S001': '[S001] Warm Reset succeeded.',
            'E001': '[E001] Warm Reset failed',
        }
    },
    SETTINGS: {
        SERVICES: {
            'S001': '[S001] Saving completed.',
            'E001': '[E001] Could not get services information.',
            'E002': '[E002] Saving failed.'
        }
    }
}).constant('CONST_CODE', {
    REST_SUCCESS_CODE: '200',
    REST_FAIL_CODE: '400'
}).run(['$rootScope', '$location', function ($rootScope, $location) {
    var path = function () {
        return $location.path();
    };

    $rootScope.$watch(path, function (newVal, oldVal) {
        Number.prototype.padLeft = function (base, chr) {
            var len = (String(base || 10).length - String(this).length) + 1;
            return len > 0 ? new Array(len).join(chr || '0') + this : this;
        };

        $rootScope.activeState = newVal;
    });

    $rootScope.showSpinner = false;
}]);
