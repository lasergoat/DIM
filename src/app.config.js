
var dimApp = angular.module(
    'dimApp', 
    []
)

.value('dimUserSystemIds', {
    xbl: null,
    psn: null
})
.value('dimConfig', {
    'membershipType': -1,
    'active': {}
})

.run(['dimBungieService', 'dimUserSystemIds', 'dimConfig', '$window',

    function(dimBungieService, dimUserSystemIds, dimConfig, $window) {

        var platformData = null;
        var storeData = null;

        dimBungieService.loadBungieNetUser()

        .then(function (data) {
            var bungieUser = data.Response;

            if (bungieUser.gamerTag) {
                dimUserSystemIds.xbl = {
                    id: bungieUser.gamerTag,
                    type: 1,
                    label: 'Xbox'
                };
            }

            if (bungieUser.psnId) {
                dimUserSystemIds.psn = {
                    id: bungieUser.psnId,
                    type: 2,
                    label: 'PlayStation'
                };
            }

            dimConfig.active = dimUserSystemIds.xbl;

        });

    }
]);

