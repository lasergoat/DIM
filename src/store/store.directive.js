/*jshint -W027*/

(function () {
  'use strict';

  function StoresCtrl($scope, dimStoreService) {
    var vm = this;

    $scope.$watch(function () {
      return dimStoreService.getStores();
    }, function (newVal) {
      vm.stores = newVal;
    });
  }

  function Stores(ngDialog) {
    return {
      bindToController: true,
      controller: StoresCtrl,
      controllerAs: 'vm',
      scope: {},
      template: [
        '<div ng-repeat="store in vm.stores" class="storage">',
        '  <div dim-store-heading store-data="store"></div>',
        '  <div dim-store-items store-data="store"></div>',
        '</div>'
      ].join('')
    };
  }

  Stores.$inject = ['ngDialog'];
  StoresCtrl.$inject = ['$scope', 'dimStoreService'];

  angular.module('dimApp')
    .directive('dimStores', Stores);

})();
