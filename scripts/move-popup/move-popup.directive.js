(function () {
  'use strict';

  angular.module('dimApp')
    .directive('dimMovePopup', MovePopup);

  MovePopup.$inject = ['$window', 'ngDialog'];

  function MovePopup($window, ngDialog) {
    return {
      controller: MovePopupController,
      controllerAs: 'vm',
      bindToController: true,
      restrict: 'A',
      scope: {
        store: '=dimStore',
        item: '=dimItem'
      },
      replace: true,
      template: [
        '<div class="move-popup">',
        '  <div class="locations" ng-repeat="store in vm.stores">',
        '    <div class="move-button move-vault" ng-class="{ \'little\': item.notransfer }" ',
        '      ng-if="vm.canShowVault(vm.item, vm.store, store)" ng-click="vm.MoveToVault(vm.item, store, $event)" ',
        '      data-type="item" data-character="{{ store.id }}">',
        '      <span>Vault</span>',
        '    </div>',
        '    <div class="move-button move-store" ng-class="{ \'little\': item.notransfer }" ',
        '      ng-if="vm.canShowStore(vm.item, vm.store, store)" ng-click="vm.MoveToGuardian(store, $event)" ',
        '      data-type="item" data-character="{{ store.id }} style="background-image: url(http://bungie.net{{ store.icon }})"> ',
        '      <span>Store</span>',
        '    </div>',
        '    <div class="move-button move-equip" ng-class="{ \'little\': item.notransfer }" ',
        '      ng-if="vm.canShowEquip(vm.item, vm.store, store)" ng-click="vm.MoveToEquip(store, $event)" ',
        '      data-type="equip" data-character="{{ store.id }}" style="background-image: url(http://bungie.net{{ store.icon }})">',
        '      <span>Equip</span>',
        '    </div>',
        '  </div>',
        '</div>'
      ].join('')
    }
  }

  MovePopupController.$inject = ['$window', 'dimStoreService', 'ngDialog'];

  function MovePopupController($window, dimStoreService, ngDialog) {
    var vm = this;

    vm.stores = dimStoreService.getStores();

    vm.MoveToVault = function MoveToVault(store, e) {
      var data = e.currentTarget.dataset;

      $window.moveItem(vm.item, data, 1, function () {
        $window.manageItemClick(vm.item, data);
        ngDialog.closeAll();
      });
    };

    vm.MoveToGuardian = vm.MoveToEquip = vm.MoveToVault;

    this.canShowVault = function canShowButton(item, sourceStore, buttonStore) {
      if (item.notransfer) {
        return false;
      }

      if (sourceStore.id === 'vault') {
        return false;
      }

      if (sourceStore.id === buttonStore.id) {
        return false;
      }

      return true;
    };

    this.canShowStore = function canShowButton(item, sourceStore, buttonStore) {
      if (!item.equpment) {
        return false;
      }

      if (item.notransfer && item.equipped && item.owner === buttonStore.id) {
        return true;
      }

      if (item.equipped && button.owner === sourceStore.id) {
        return false;
      }

      return false;
    };

    this.canShowEquip = function canShowButton(item, sourceStore, buttonStore) {
      if (item.notransfer && !item.equipped) {
        return true;
      }

      if (buttonStore.id === 'vault') {
        return false;
      }

      if (!item.equipped) {
        return true;
      }

      return false;
    };
  }
})();
