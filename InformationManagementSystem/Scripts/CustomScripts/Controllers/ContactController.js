myContactApp.controller("contactCtrl", function ($scope, myContactService) {

    $scope.divContact = true;
    $scope.Action = "Add";
    GetAllContactDetails();
    function GetAllContactDetails() {
        $scope.divContact = false;
        var getAllContactDetails = myContactService.getAllContactDetails();
        getAllContactDetails.then(function (contact) {
            $scope.Contacts = contact.data;
        },function () {
                $scope.error = "Error is getting while retrive contact list";
            });
    };

    $scope.EditContactDetails = function (contact) {

        var getContactDetails = myContactService.getContactDetailsById(contact.ContactId);
        getContactDetails.then(function (_contact) {
            $scope.contact = _contact.data;
            $scope.ContactId = contact.ContactId;
            $scope.FirstName = contact.FirstName;
            $scope.LastName = contact.LastName;
            $scope.EmailId = contact.EmailId;
            $scope.PhoneNumber = contact.PhoneNumber;
            $scope.Status = contact.Status;
            $scope.Action = "Update";
            $scope.divContact = true;
        },
            function () {
                $scope.error = "Error is getting while retrive contact list";
            });
    };

    $scope.AddOrUpdateContactDetails = function() {
        var contact = {
            FirstName: $scope.FirstName,
            LastName: $scope.LastName,
            EmailId: $scope.EmailId,
            PhoneNumber: $scope.PhoneNumber,
            Status: $scope.Status
        };
        var getAction = $scope.Action;

        var getContactDetails;
        if (getAction === "Update") {
            contact.ContactId = $scope.ContactId;
            getContactDetails = myContactService.UpdateContactDetails(contact);
            getContactDetails.then(function() {
                    GetAllContactDetails();
                    $scope.divContact = false;
                },
                function() {
                    $scope.error = "Error is getting while updating contact details";
                });
        } else {

            getContactDetails = myContactService.AddContactDetails(contact);
            getContactDetails.then(function() {
                    GetAllContactDetails();
                    $scope.divContact = false;
                },
                function() {
                    $scope.error = "Error is getting while adding contact details";
                });
        }
    };

    $scope.AddOrUpdateDiv = function() {
        clearFields();
        $scope.Action = "Add";
        $scope.divContact = true;
    };

    $scope.DeleteContactDetails = function(contact) {
        var getContactDetails = myContactService.DeleteContactDetails(contact);
        getContactDetails.then(function() {
                GetAllContactDetails();
            },
            function() {
                $scope.error = "Error is getting while adding contact details";
            });
    };

    $scope.Cancel = function () {
        $scope.divContact = false;
    };

    function clearFields() {
        $scope.ContactId = "";
        $scope.FirstName = "";
        $scope.LastName = "";
        $scope.EmailId = "";
        $scope.PhoneNumber = "";
        $scope.Status = false;
    };
});