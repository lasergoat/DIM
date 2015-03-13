
angular.module('dimApp')

.directive('dimStoreItem', 

  ['$scope', 'dimStoreService', 'ngDialog',

  function($scope, dimStoreService, ngDialog) {

    return {
      bindToController: true,
      controller: function() {
        var vm = this;
        var dialogResult = null;

        vm.openLoadout = function(item, e) {
          e.stopPropagation();

          if (!_.isNull(dialogResult)) {
            dialogResult.close();
          } else {
            ngDialog.closeAll();

            dialogResult = ngDialog.open({
              template: '<div dim-move-popup dim-store="vm.store" dim-item="vm.item"></div>',
              plain: true,
              appendTo: 'div[data-instance-id="' + item.id + '"]',
              overlay: false,
              className: 'move-popup',
              showClose: false,
              scope: $scope
            });

            dialogResult.closePromise.then(function (data) {
              dialogResult = null;
            });
          }
        };
      },
      controllerAs: 'vm',
      replace: true,
      scope: {
        'store': '=storeData',
        'item': '=itemData'
      },
      template: [
        '<div ui-draggable="true" drag="vm.item.id" drag-channel="{{ vm.item.type }}" class="item{{ vm.item.complete ? \' complete\' : \'\' }}" ',
        '  data-index="{{ vm.item.index }}" data-name="{{ vm.item.name }}" data-instance-id="{{ vm.item.id }}">',
        '  <img ui-draggable="false" ng-src="http://bungie.net/{{ vm.item.icon }}" ng-click="vm.openLoadout(vm.item, $event)">',
        '  <div ui-draggable="false" class="counter" ng-if="vm.item.amount > 1">{{ vm.item.amount }}</div>',
        '  <div ui-draggable="false" class="damage-type" ng-if="vm.item.sort === \'Weapons\'" ng-class="\'damage-\' + vm.item.dmg"></div>',
        '</div>'
      ].join('')
    };

  }

]);
