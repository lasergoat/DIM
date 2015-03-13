angular.module('dimApp')
.directive('dimStores',

  ['ngDialog', '$scope', 'dimStoreService',

  function(ngDialog, $scope, dimStoreService) {
    return {
      bindToController: true,
      controller: function() {

        var vm = this;

        $scope.$watch(function () {
          return dimStoreService.getStores();
        }, function (newVal) {
          vm.stores = newVal;
        });

      },
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

]);
