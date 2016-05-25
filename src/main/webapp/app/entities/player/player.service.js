(function() {
    'use strict';
    angular
        .module('basketballApp')
        .factory('Player', Player);

    Player.$inject = ['$resource', 'DateUtils'];

    function Player ($resource, DateUtils) {
        var resourceUrl =  'api/players/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.birthday = DateUtils.convertLocalDateFromServer(data.birthday);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.birthday = DateUtils.convertLocalDateToServer(data.birthday);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.birthday = DateUtils.convertLocalDateToServer(data.birthday);
                    return angular.toJson(data);
                }
            }
        });
    }
})();
