/* 
  Display next meeting information, via Meetup API
  API Docs: http://www.meetup.com/meetup_api/docs/2/events/
*/
$.ajax({
    type: "POST",
    dataType: 'jsonp',
    url: 'https://api.meetup.com/2/events?status=upcoming&order=time&limited_events=False&group_urlname=Rhode-Island-Code-for-America-Brigade&desc=false&offset=0&photo-host=public&format=json&page=20&fields=rsvpable%2Cself&sig_id=182593829&sig=c59d1f16dccd434dd2b6b2fff959faabc53ec885',
    crossDomain : true,
    xhrFields: {
        withCredentials: true
    }
})
    .done(function( xhr, textStatus, response, data, responseJSON ) {

      // If No Upcoming Event is Posted on Meetup...
      if (xhr.results[0] == undefined) { 

        document.getElementById("meetupDetails").innerHTML = 'TBD (check back soon)'; // Meeting date and place TBD
        document.getElementById("meetupPeople").style.display = 'none'; // Don't diplay number of RSVP'ers
        document.getElementById("meetupEventURL").href = 'http://meetup.com/Rhode-Island-Code-for-America-Brigade/'; // Link to main Meetup page
        document.getElementById("meetupCTA").innerHTML = 'Join Our Meetup'; // Join us!
      
      }

      // Otherwise...
      else {

        // NEXT EVENT
        var nextEvent = xhr.results[0]; // First in the array returned from API

        // EVENT URL
        var eventURL = nextEvent.event_url;
        document.getElementById("meetupEventURL").href = eventURL; // Replace button link

        // EVENT LOCATION
        var eventLocation = nextEvent.venue.name;

        // If No Address is Listed for this Event...
        if (nextEvent.venue.address_1 == undefined) {

          document.getElementById("meetupLocation").innerHTML = 'TBD'; // TBD

        }

        // Otherwise...
        else {

          // EVENT ADDRESS
          var eventAddress = nextEvent.venue.address_1;
          var gmapAddress = eventAddress.split(' ').join('+').slice(0,-1)+',';

          // EVENT LATITUDE
          var eventLatitude = nextEvent.venue.lat;
          var gmapLat = '@'+eventLatitude+',';

          // EVENT LONGITUDE
          var eventLongitude = nextEvent.venue.lon;
          var gmapLon = eventLongitude+',13z';

          // EVENT CITY
          var eventCity = nextEvent.venue.city;
          var gmapCity = '+'+eventCity+',';
          
          // EVENT STATE
          var eventState = nextEvent.venue.state;
          var gmapState = '+'+eventState+'/';

          // EVENT GOOGLE MAPS LINK
          var gmapStart = 'https://www.google.com/maps/place/';
          var gmapLink = gmapStart + gmapAddress + gmapCity + gmapState + gmapLat + gmapLon;
          document.getElementById("meetupLocation").innerHTML = eventAddress; // Add name of location
          document.getElementById("meetupLocation").href = gmapLink; // Link location to google maps

        }
        
        // RSVP HEADCOUNT
        var headCount = nextEvent.yes_rsvp_count;
        document.getElementById("meetupHeadCount").innerHTML = headCount; // Replace number of RSVP'ers

        // RSVP STATUS

        // If Visitor has Not Yet RSVP'ed on Meetup...
        if (nextEvent.self.rsvp == undefined) {
          
          document.getElementById("meetupRSVPStatus").innerHTML = '. What about you?'; // Ammend RSVP'ers note.
          document.getElementById("meetupCTA").innerHTML = 'RSVP on Meetup'; // Replace button link
        
        } 

        // Otherwise...
        else {
          
          // RSVP RESPONSE
          var RSVPstatus = nextEvent.self.rsvp.response;

          // If RSVP = Yes
          if (RSVPstatus == "yes") {

            var RSVPstatus = "Going";
            document.getElementById("meetupRSVPStatus").innerHTML = ', including you. Yay!'; // Ammend RSVP'ers note.

          }

          // If RSVP = No
          else {

            var RSVPstatus = "Not Going";
            document.getElementById("meetupRSVPStatus").innerHTML = ', and you\'ll be missed.'; // Ammend RSVP'ers note.
            document.getElementById("meetupCTA").innerHTML = 'Change RSVP'; // Replace button link

          }
        }
        
        // EVENT DATE

        // Get Today's Date     
        var now = new Date;
        var todayNumber = now.getDate();
        var todayMonth = now.getMonth();
        var todayTime = formatAMPM(now);

        // Get Event's Date  
        var date = new Date(nextEvent.time);
        var dateTime = formatAMPM(date);
        var dateDay = date.getDay();
        var dateNumber = date.getDate();
        var dateMonth = date.getMonth();
        var dateYear = date.getFullYear();

        // Make the Date Pretty
        function formatAMPM(date) {
          var hours = date.getHours();
          var minutes = date.getMinutes();
          var ampm = hours >= 12 ? 'pm' : 'am';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0' + minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
          return strTime;
        }
        var m_names = new Array("January", "February", "March", 
        "April", "May", "June", "July", "August", "September", 
        "October", "November", "December");
        var d_names = new Array("Sunday", "Monday", "Tuesday", 
        "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");
        
        // If event is today...
        if ( (todayNumber == dateNumber) && (todayMonth == dateMonth) ) {        
          var prettyDate = 'Tonight at ' + dateTime;    
        } 
        // Otherwise...
        else {
          var prettyDate = d_names[dateDay] + ', ' + m_names[dateMonth] + ' ' + dateNumber +  ', ' + dateYear + ' at ' + dateTime;
        
        }
        
        document.getElementById("meetupDate").innerHTML = prettyDate; // Replace the Date
      }

    })
    .fail( function(xhr, textStatus, errorThrown) {
      alert(xhr.responseText);
      alert(textStatus);
    });