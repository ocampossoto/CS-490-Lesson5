// 'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('View1Ctrl', function ($scope, $http) {
        $scope.venueList = new Array();
        $scope.mostRecentReview;
        $scope.getVenues = function () {
            var placeEntered = document.getElementById("txt_placeName").value;
            var searchQuery = document.getElementById("txt_searchFilter").value;
            if (placeEntered != null && placeEntered != "" && searchQuery != null && searchQuery != "") {

                //This is the API that gives the list of venues based on the place and search query.
                var handler = $http.get("https://api.foursquare.com/v2/venues/search" +
                    "?client_id=S5DN2NBFOA03DWHRGR5K3JPKRAJNXW2YVROK1TJNCN3LBCLE" +
                    "&client_secret=WAQCGMDFL1ENO3O322COW5Y5TCE51JRY2RVYUVKA4PEYOR2X" +
                    "&v=20160215&limit=5" +
                    "&near=" + placeEntered +
                    "&query=" + searchQuery);

                handler.success(function (data) {
                    if (data != null && data.response != null && data.response.venues != undefined && data.response.venues != null) {
                        // Tie an array named "venueList" to the scope which is an array of objects.
                        // Each object should have key value pairs where the keys are "name", "id" , "location" and values are their corresponding values from the response
                        // Marks will be distributed between logic, implementation and UI
                        $scope.venueList = [];
                        var venues = data.response.venues;
                        //go through all 5 venues
                        for(var i = 0; i < venues.length; i++){
                            //temp value
                            var temp = {id: "null", name:"No name given", location:"No information", phone:"No information", menu:"No Menu Available", menu_url: ""};
                            if(typeof(venues[i].id) != "undefined"){
                                if(venues[i].id != null){
                                    temp.id = venues[i].id;
                                }
                            }
                            //check for name
                            if(venues[i].name != null){
                                temp.name = venues[i].name;
                            }
                            //check for undefined menu
                            if(typeof(venues[i].menu) != "undefined"){
                                //check for url
                                if(venues[i].menu.url != null){
                                    temp.menu="Menu";
                                    temp.menu_url = venues[i].menu.url;
                                }

                            }
                            //check for undefined contact info
                            if(typeof(venues[i].contact) != "undefined"){
                                //check for phone number
                                if(venues[i].contact.formattedPhone != null){
                                    temp.phone = venues[i].contact.formattedPhone;
                                }
                            }
                            //add address
                            //check for no location data
                            if(typeof(venues[i].location) != "undefined"){
                                temp.location = ""; //reset data
                                //add address on existance
                                if(typeof(venues[i].location.address) != "undefined"){
                                    temp.location += venues[i].location.address + ", ";
                                }
                                //add city on existance
                                if(typeof(venues[i].location.city) != "undefined"){
                                    temp.location += venues[i].location.city + ", "
                                }
                                //add state on existance
                                if(typeof(venues[i].location.state) != "undefined"){
                                    temp.location+=venues[i].location.state + " ";
                                }
                                //add postalCode on existance
                                if(typeof(venues[i].location.postalCode) != "undefined"){
                                    temp.location += venues[i].location.postalCode;
                                }

                                if(!temp.location){
                                    temp.location = "No information";
                                }
                            }

                            $scope.venueList.push(temp);
                        }



                    }
                })
                handler.error(function (data) {
                    alert("There was some error processing your request. Please try after some time.");
                });
            }
        }
    });
