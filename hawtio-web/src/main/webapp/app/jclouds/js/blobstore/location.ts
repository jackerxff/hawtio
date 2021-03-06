module Jclouds {

    export function BlobstoreLocationController($scope, $filter:ng.IFilterService, workspace:Workspace, $routeParams) {
        $scope.blobstoreId = $routeParams.blobstoreId
        $scope.locationId = $routeParams.locationId;

        updateTableContents();

        function setLocationProfiles(locationProfiles) {
            $scope.row = findLocationById(locationProfiles, $scope.locationId)
            $scope.$apply();
        };


        function updateTableContents() {
            var jolokia = workspace.jolokia;
            var blobstoreMbean = getSelectionJcloudsBlobstoreMBean(workspace, $scope.blobstoreId);

            if (blobstoreMbean) {
                setLocationProfiles(jolokia.request(
                    {type: 'exec', mbean:blobstoreMbean, operation: 'listAssignableLocations()'}).value
                );
            }
        }

        function findLocationById(locationProfiles, id) {
            return locationProfiles.find(function (location) {
                return location.id === id
            });
        }
   }
}