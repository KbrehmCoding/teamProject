//variables are listed here
//eventResult is object that hold info of related events
var eventResult;


// creat a function given string pramater of meetup group return a list of meetup event, event place
//group info is the text that user input in the search box

function meetupFind(groupInfo){
    var search = groupInfo;
    // queryURL =  "https://api.meetup.com/2/events?key=352d3f6d5219b5121f804152572749&group_urlname="+search+"&sign=true";
    queryURL = "https://api.meetup.com/find/upcoming_events?key=352d3f6d5219b5121f804152572749&sign=true&photo-host=public&page=20&text=" + search;
    $.ajax({
        url: queryURL,
        method: "GET"
       }).then(function(response) {
        
        //console.log(response.events[0])

        //here creat a object that stores top 5 event, name, location(lat,lon), time,  duration, descrbtion, and link
       eventResult ={name:[],
                          location:{
                             lat:[],
                             lon:[] 
                          },
                          date:[],
                          time:[],
                          duration:[],
                          desc:[],
                          link:[]
                        }
        
       //using a loop to store them
       for(i=0;i<5;i++){
          eventResult.name.push(response.events[i].group.name)
          eventResult.duration.push(response.events[i].duration)
          eventResult.desc.push(response.events[i].description)
          eventResult.location.lat.push(response.events[i].group.lat)
          eventResult.location.lon.push(response.events[i].group.lon)
          eventResult.date.push(response.events[i].local_date)
          eventResult.time.push(response.events[i].local_time)
          eventResult.link.push(response.events[i].link)
       }

       //check the created object
       console.log("check in function")
       console.log(eventResult)
    
       }).then(function(){
         //creat an array (later maybe an obeject) combine with loop to add events places in the map
        var markerHolder = [];
         //using a loop to display the places
        for(i=0;i<5;i++){
         
           markerHolder[i] = new google.maps.Marker({
           position: {lat: eventResult.location.lat[i], lng:eventResult.location.lon[i]},
           map: map,
           title: eventResult.name[i]
            });
          console.log(markerHolder[i])
         }
        console.log("check your markerHoder")
        console.log(markerHolder)
       });
}

//"A child's Place" is a test for the function
console.log(meetupFind('A Child’s Place'))

// Iniciate a map, make it center at your location, if can't use your location, use the default
var map, infoWindow;
var defLatLng = {lat: 35.218651, lng: -80.841019};  
function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          //***we are going to use a call a function to repace the center with current location,later
          center: defLatLng, 
          zoom: 12
});
        
          
infoWindow = new google.maps.InfoWindow;
        
// Try HTML5 geolocation.
if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            

            infoWindow.setPosition(pos);
            infoWindow.setContent('Your Location.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
}
//handle the error function
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
