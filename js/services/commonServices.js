app.factory('dataFactory', function ($http) {

    return {

        httpRequest: function (url, method, params, dataPost, upload) {

            var passParameters = {};

            passParameters.url = url;

            if (typeof method == 'undefined') {
                passParameters.method = 'GET';
            }
            else {
                passParameters.method = method;
            }

            if (typeof params != 'undefined') {
                passParameters.params = params;
            }

            if (typeof dataPost != 'undefined') {
                passParameters.data = dataPost;
            }

            if (typeof upload != 'undefined') {
                passParameters.upload = upload;
            }

            // [수정3] delete때 header Content-type이 디폴트 text/plain인 거 변경
            // [수정4] typeof 빼야지
            if (method === 'DELETE'){
                passParameters.headers = {'Content-Type' : 'application/json;charset=utf-8'};
                // console.log('Come in', passParameters.headers);
            }

            return $http(passParameters);

        },

        uploadFileToUrl: function (uploadUrl, file, callback) {
            var fd = new FormData();
            fd.append('upload', file);
            fd.append('data', 'upload');
            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                uploadEventHandlers: {
                    progress: callback
                }
            });
        },

        // [수정4] multipart 아닌 binary(file)만 body로 주는 함수
        uploadBinaryToUrl: function (uploadUrl, file, config) {
            return $http.post(uploadUrl, file, config);
        }

    };
}).directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}]).factory('logger', function () {
    var logIt;

    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-top-right",
        "timeOut": "3000"
    };

    logIt = function (message, type) {
        return toastr[type](message);
    };

    return {
        log: function (message) {
            logIt(message, 'info');
        },
        logWarning: function (message) {
            logIt(message, 'warning');
        },
        logSuccess: function (message) {
            logIt(message, 'success');
        },
        logError: function (message) {
            logIt('Error<br/>' + message, 'error');
        },
        logFromResponse: function (response) {
            var message = '';
            if (response.data) {
                message = response.data.Error
            } else if (response.statusText) {
                message = response.status + ' ' + response.statusText;
            } else {
                message = response;
            }
            if (message) {
                logIt('Error<br/>' + message, 'error');
            }
        }
    };

}).factory('echartSupport', function () {
    function getLineRaceChartOption(data) {
        var sensors = [];
        var sourceData = [
            ["Time", "TimeLong", "SensorID", "Value"]
        ];

        // [수정] y축 Value대신 단위 넣기
        var details;
        if(data.Readings.length > 0)
            details = data.Readings[0].Detail;
        
        // console.log('What Detail', details);
        var unit_yAxis;
        switch (details){
            case 'fan':
                unit_yAxis = 'RPM';
                break;
            case 'temperature':
            case 'smartheater':
                unit_yAxis = '℃';
                break;
            case 'powercontrol':
            case 'powersupply':
                unit_yAxis = 'W (watt)';
                break;
            case 'powervoltage':
                unit_yAxis = 'V (volt)';
                break;
            default:
                unit_yAxis = 'Value';
                break;
        }

        data.Readings?.forEach(function (reading) {
            sensors.push(reading.SensorID);
            reading.Items.forEach(function (item) {
                // sourceData.push([item.Time, Date.parse(item.Time), reading.SensorID, item.Value]);
                sourceData.push([item.Time, Date.parse(item.Time), reading.SensorID, item.Value.toFixed(1)]);
                // Value 소수점 첫번째까지나오게 바꿈
                // 배열 두번째는 UTC기준 경과한 밀리초 (정렬위해서인가봄)
            });
        });

        sourceData.sort(function (a, b) {
            return a[1] - b[1];
        });

        const datasetWithFilters = [];
        const seriesList = [];
        echarts.util.each(sensors, function (sensor) {
            var datasetId = 'dataset_' + sensor;
            datasetWithFilters.push({
                id: datasetId,
                fromDatasetId: 'dataset_raw', // 이걸로 그 옵션의 dataset에 id로 찾아가는거임
                // 즉 seriesList에서 datasetId에 datasetId(밸류)가 있고 그건 dataset에 들어가있는 이 datasetWithFilters의
                // id가 datasetId니까 요기로 찾아오게 되고 다시 datasetWithFilters에서 fromDatasetId에 dataset_raw(밸류)가
                // 들어있으니깐 dataset에 id dataset_raw에 들어있는 source(값 sourceData)를 이용해서 데이터 추출
                transform: {
                    type: 'filter',
                    config: {
                        and: [
                            { dimension: 'TimeLong', gte: 0 }, // TimeLong 디멘션이 0보다 크거나 같은(gte) 녀석들을 필터링해옴
                            { dimension: 'SensorID', '=': sensor } // dimension SensorID가 sensor인 거와 동일한 녀석들을 필터링해옴
                            // and로 묶었으니깐 두가지 모두 만족하는 데이터만 dataset_raw의 source에서 가져옴
                        ]
                    }
                }
            });
            seriesList.push({
                // [수정] 잘 표현되게 수정중
                type: 'line',
                datasetId: datasetId,
                // showSymbol: false,
                showSymbol: true,
                // [추가]
                symbol: 'circle',
                symbolSize: 7,
                // label: {
                //     show: true,
                //     formatter: function(params){
                //         return params.value[3].toFixed(0);
                //     }
                // },
                name: sensor,
                endLabel: {
                    show: true,
                    formatter: function (params) {
                        return params.value[2]; // + ': ' + params.value[3].toFixed(2);
                    }
                },
                labelLayout: {
                    moveOverlap: 'shiftY'
                },
                emphasis: {
                    focus: 'series'
                },
                encode: {
                    x: 'Time', // x축에 Time 사용
                    y: 'Value',
                    // label: ['SensorID', 'Value'],
                    // itemName: 'Time',
                    // tooltip: ['Value']
                    // right value에 dimension들어가고 left value에 x축, y축, 라벨, itemName, 툴팁... 들어감
                }
            });
        });
        return {
            animationDuration: 1500,
            dataset: [
                {
                    id: 'dataset_raw',
                    source: sourceData
                },
                ...datasetWithFilters
            ],
            tooltip: {
                order: 'valueDesc',
                // order: 'valueAsc',
                trigger: 'axis',
                // formatter: function (params) {
                //     console.log('YYYY', params);
                //     params.forEach(function (param){
                //         return param.seriesName + ': ' + param.data[3];
                //     });
                // }
            },
            xAxis: {
                // type 'time' 으로 바꿈(Time간격위해)
                type: 'time',
                // type: 'category',
                // [수정] name추가 하고 location end로
                name: 'Time',
                nameLocation: 'end'
                // nameLocation: 'middle'
            },
            yAxis: {
                // name: 'Value'
                name: unit_yAxis
            },
            grid: {
                left: 50, // 그래프 부분의 왼쪽공백
                right: 80, // 오른쪽공백
                bottom: 50
            },
            series: seriesList
        };
    }

    return {
        getLineRaceOption: function (data) {
            return getLineRaceChartOption(data);
        }
    };
});
