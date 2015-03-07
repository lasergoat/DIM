(function () {
  'use strict';

  angular.module('dimApp').directive('dimStoreItem', StoreItem);

  function StoreItem(ngDialog) {
    return {
      bindToController: true,
      controller: StoreItemCtrl,
      controllerAs: 'vm',
      link: Link,
      replace: true,
      scope: {
        'store': '=storeData',
        'item': '=itemData'
      },
      template: [
        '<div class="item{{ vm.item.complete ? \' complete\' : \'\' }}" data-index="{{ vm.item.index }}" data-name="{{ vm.item.name }}" data-instance-id="{{ vm.item.id }}">',
          '<img draggable="true" ng-src="http://bungie.net/{{ vm.item.icon }}" ng-click="vm.openLoadout(vm.item, $event)">',
          '<div class="stack" ng-if="vm.item.amount > 1">{{ vm.item.amount }}</div>',
        '</div>'].join('')
    };

    function StoreItemCtrl() {
      var vm = this;
    }

    function Link(scope) {
      var vm = scope.vm;

      vm.openLoadout = function openLoadout(item, e) {
        ngDialog.closeAll();
        ngDialog.open({
          template: '<p>my template</p>',
          plain: true,
          appendTo: 'div[data-instance-id="' + item.id + '"]',
          overlay: false,
          scope: scope
        });
      };
    }
  }
})();