// Code here will be linted with JSHint.
/* jshint ignore:start */
angular.module('dimApp')
.factory('dimBungieService', 

  ['$http', '$q', 'dimConfig', '$timeout',

  function($http, $q, dimConfig, $timeout) {

    var bungieFactory = {

    var vaultData = null;
    var inventoryData = null;
    var destinyUserData = null;
    var platformUserData = null;
    var bungieUserData = null;

    return {

      // Moves items between the equip slot and the inventory.
      equip : function(membershipType, characterId, itemId) {
        return loadBnetCookies()
          .then(getBungleToken)
          .then(function (token) {
            return this.generateEquipToken(token, membershipType, characterId, itemId);
          })
          .catch(loadStoresFailed);
      },

      this.generateEquipToken : function(token, membershipType, characterId, itemId) {
        return $q(function (resolve, reject) {
          var request = {
            method: 'POST',
            url: 'https://www.bungie.net/Platform/Destiny/EquipItem/',
            headers: {
              'X-API-Key': '57c5ff5864634503a0340ffdfbeb20c0',
              'x-csrf': token
            },
            data: JSON.stringify({
              membershipType: membershipType,
              characterId: characterId,
              itemId: itemId
            }),
            withCredentials: true
          };

          window.setTimeout(function () {
            return $http(request)
              .success(function (data, status, headers, config) {
                if (data.ErrorCode === 1) {
                  resolve(data);
                } else {
                  reject(data);
                }
              })
              .error(function (data) {
                reject(data);
              });
          }, 0);
        });
      },

      // Moves items between characters and the vault.
      vault : function(characterId, membershipType, itemId, itemReferenceHash, stackSize, transferToVault) {
        return loadBnetCookies()
          .then(getBungleToken)
          .then(function (token) {
            return generateTransferReq(token, characterId, membershipType, itemId, itemReferenceHash, stackSize, transferToVault);
          })
          .catch(loadStoresFailed);
      },

      generateTransferReq : function(token, characterId, membershipType, itemId, itemReferenceHash, stackSize, transferToVault) {
        return $q(function (resolve, reject) {
          var request = {
            method: 'POST',
            url: 'https://www.bungie.net/Platform/Destiny/TransferItem/',
            headers: {
              'X-API-Key': '57c5ff5864634503a0340ffdfbeb20c0',
              'x-csrf': token
            },
            data: JSON.stringify({
              characterId: characterId,
              membershipType: membershipType,
              itemId: itemId,
              itemReferenceHash: itemReferenceHash,
              stackSize: stackSize,
              transferToVault: transferToVault
            }),
            withCredentials: true
          };

          window.setTimeout(function () {
            return $http(request)
              .success(function (data, status, headers, config) {
                if (data.ErrorCode === 1) {
                  resolve(data);
                } else {
                  reject(data);
                }

              })
              .error(function (data) {
                reject(data);
              });
          }, 1000);
        });
      },

      getUser : function() {
        return {
          platform: platformUserData,
          destiny: destinyUserData
        };
      },

      getStores : function() {
        return {
          vault: vaultData,
          destiny: inventoryData
        };
      },

      loadPlatformUser : function() {
        return loadBnetCookies()
          .then(getBungleToken)
          .then(generatePlatformUserReq)
          .catch(loadStoresFailed);
      },

      generatePlatformUserReq : function(token) {
        return $q(function (resolve, reject) {
          var request = {
            method: 'GET',
            url: 'https://www.bungie.net/Platform/Destiny/Tiger' + (dimConfig.active.type === 1 ? 'Xbox' : 'PSN') + '/Account/' + dimConfig.membershipId + '/',
            headers: {
              'X-API-Key': '57c5ff5864634503a0340ffdfbeb20c0',
              'x-csrf': token
            },
            withCredentials: true
          };

          window.setTimeout(function () {
            $http(request)
              .success(function (data, status, headers, config) {
                if (_.size(data.Response) === 0) {
                  reject(data);
                }

                platformUserData = data;

                // inventoryData = _.indexBy(data.Response.data.characters, function (item) {
                //   return item.characterBase.characterId;
                // });

                resolve(data);
              })
              .error(function (data) {
                reject(data);
              });
          }, 0);
        });
      },

      loadDestinyUser : function() {
        return loadBnetCookies()
          .then(getBungleToken)
          .then(generateDestinyUserReq)
          .catch(loadStoresFailed);
      },

      generateDestinyUserReq : function(token) {
        return $q(function (resolve, reject) {
          var request = {
            method: 'GET',
            url: 'https://www.bungie.net/Platform/Destiny/SearchDestinyPlayer/' + dimConfig.active.type + '/' + dimConfig.active.id + '/',
            headers: {
              'X-API-Key': '57c5ff5864634503a0340ffdfbeb20c0',
              'x-csrf': token
            },
            withCredentials: true
          };

          window.setTimeout(function () {
            $http(request)
              .success(function (data, status, headers, config) {
                destinyUserData = data;

                if (_.size(data.Response) === 0) {
                  reject(data);
                }

                resolve(data);
              })
              .error(function (data) {
                reject(data);
              });
          }, 0);
        });
      },

      loadDestinyStores : function() {
        var vaultPromise = loadBnetCookies()
          .then(getBungleToken)
          .then(loadBnetVault)
          .catch(loadStoresFailed);
        var inventoryPromise = loadBnetCookies()
          .then(getBungleToken)
          .then(loadBnetInventory)
          .catch(loadStoresFailed);

        return $q.all([vaultPromise, inventoryPromise]);
      },

      loadBnetVault : function(token) {
        return $q(function (resolve, reject) {
          var request = {
            method: 'GET',
            url: 'https://www.bungie.net/Platform/Destiny/' + dimConfig.active.type + '/MyAccount/Vault/?definitions=true',
            headers: {
              'X-API-Key': '57c5ff5864634503a0340ffdfbeb20c0',
              'x-csrf': token
            },
            withCredentials: true
          };

          window.setTimeout(function () {
            $http(request)
              .success(function (data, status, headers, config) {
                vaultData = data;
                resolve(data);
              })
              .error(function (data) {
                reject(data);
              });
          }, 0);
        });
      },

      loadBnetInventory : function(token) {
        var promises = [];

        inventoryData = {};

        _.each(dimConfig.characterIds, function (characterId) {
          var p = $q(function (resolve, reject) {
            var request = {
              method: 'GET',
              url: 'https://www.bungie.net/Platform/Destiny/' + dimConfig.active.type + '/Account/' + dimConfig.membershipId + '/Character/' + characterId + '/Inventory/?definitions=true',
              headers: {
                'X-API-Key': '57c5ff5864634503a0340ffdfbeb20c0',
                'x-csrf': token
              },
              withCredentials: true
            };

            window.setTimeout(function () {
              $http(request)
                .success(function (data, status, headers, config) {
                  data.Response.characterId = characterId;
                  inventoryData[characterId] = data.Response;
                  resolve(data.Response);
                })
                .error(function (data) {
                  reject(data);
                  return;
                });
            }, 0);
          });

          promises.push(p);
        });

        return $q.all(promises);
      },

      loadStoresFailed : function(response) {
        throw 'XHR Failed for loadBungieStores. ' + response;
      },

      loadBnetUser: function(token) {
        return $q(function (resolve, reject) {
          var request = {
            method: 'GET',
            url: 'https://www.bungie.net/Platform/User/GetBungieNetUser/',
            headers: {
              'X-API-Key': '57c5ff5864634503a0340ffdfbeb20c0',
              'x-csrf': token
            },
            withCredentials: true
          };

          $timeout(function () {
            $http(request)
              .success(function (data, status, headers, config) {
                if (data.ErrorCode === 99) {
                  reject("Please log into Bungie.net before using this extension.");
                }
                bungieUserData = data;
                resolve(data);
              })
              .error(function (data) {
                reject(data);
              });
          }, 0, false);
        });
      },

      loadBungieNetUser : function() {
        return loadBnetCookies()
          .then(getBungleToken)
          .then(loadBnetUser)
          .catch(loadUserFailed);
      },

      loadUserFailed : function(response) {
        throw 'XHR Failed for loadBungieNetUser. ' + response;
      },

      loadBnetCookies : function() {
        return $q(function (resolve, reject) {
          chrome.cookies.getAll({
            'domain': '.bungie.net'
          }, getAllCallback);

          function getAllCallback(cookies) {
            if (_.size(cookies) > 0) {
              resolve(cookies);
            } else {
              reject('No cookies found.');
            }
          }
        });
      },

      getBungleToken : function(cookies) {
        return $q(function (resolve, reject) {
          var cookie = _.find(cookies, function (cookie) {
            return cookie.name === 'bungled';
          });

          if (!_.isUndefined(cookie)) {
            resolve(cookie.value);
          } else {
            if (_.isUndefined(location.search.split('reloaded')[1])) {
              chrome.tabs.create({
                url: 'http://bungie.net',
                active: false
              });

              setTimeout(function () {
                window.location.reload(window.location.href + "?reloaded=true");
              }, 5000);
            }

            reject('No bungled cookie found.');
          }
        });
      }


    };

    return bungieFactory;
  }

}]);
/* jshint ignore:end */
