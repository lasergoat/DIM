// Code here will be linted with JSHint.
/* jshint ignore:start */
(function() {
  'use strict';

  angular.module('dimApp').factory('dimPlatformService', PlatformService);

  PlatformService.$inject = ['dimBungieService'];

  function PlatformService(dimBungieService) {
    return {
      getPlatforms: getPlatforms
    };

    var responseData = null;

    function getPlatforms() {
      if (_.isNull(responseData)) {
        dimBungieService.loadPlatformUser().then(function(data) {
          responseData = data;
        });
      }

      return responseData;
    }
  }
})();
/* jshint ignore:end */
