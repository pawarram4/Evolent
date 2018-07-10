myContactApp.service("myContactService", function ($http) {
    this.getAllContactDetails = function() {
        return $http.get("Contact/GetAllContactDetails");
    };

    this.getContactDetailsById = function(contactId) {
        return  $http({
            method: "post",
            url: "Contact/GetContactDetailsById",
            params: {
                contactId: JSON.stringify(contactId)
            }
        });
    };

    this.AddContactDetails = function(contact) {
        return $http({
            method: "post",
            url: "Contact/AddContactDetails",
            data: JSON.stringify(contact),
            dataType: "Json"
        }); 
    };

    this.UpdateContactDetails = function (contact) {
        return $http({
            method: "post",
            url: "Contact/UpdateContactDetails",
            data: JSON.stringify(contact),
            dataType: "Json"
        });
    };
    this.DeleteContactDetails = function (contact) {
        return $http({
            method: "post",
            url: "Contact/DeleteContactDetails",
            data: JSON.stringify(contact),
            dataType: "Json"
        });
    };
});