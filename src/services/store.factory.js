// Code here will be linted with JSHint.
/* jshint ignore:start */
(function () {
  'use strict';

  angular.module('dimApp')
    .factory('dimStoreService', StoreService);

  StoreService.$inject = ['$window'];

  function StoreService($window) {
    return {
      getStore: getStore,
      getStores: getStores
    };

    function getStore(id) {
      return _.find($window.dimDO.stores, function (store) {
        return store.id === id;
      });
    }

    function getStores() {
      return ($window.dimDO) ? $window.dimDO.stores : null;
    }
  }
})();
/* jshint ignore:end */
