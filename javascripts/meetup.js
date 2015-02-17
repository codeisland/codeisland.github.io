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
      
      // First Event in Array from JSON Response
      var nextEvent = xhr.results[0];

      // Event URL
      var eventURL = nextEvent.event_url;
      document.getElementById("meetupEventURL").href = eventURL;
      
      // RSVP Head Count
      var headCount = nextEvent.yes_rsvp_count;
      document.getElementById("meetupHeadCount").innerHTML = headCount;

      // RSVP Status of Visitor
      if (nextEvent.self.rsvp == undefined) {
        document.getElementById("meetupRSVPStatus").innerHTML = '. What about you?';
        document.getElementById("meetupCTA").innerHTML = 'RSVP on Meetup';
      } else {
        var RSVPstatus = nextEvent.self.rsvp.response;
        if (RSVPstatus == "yes") {
          var RSVPstatus = "Going";
          document.getElementById("meetupRSVPStatus").innerHTML = ', including you. Yay!';
        }
        else {
          var RSVPstatus = "Not Going";
          document.getElementById("meetupRSVPStatus").innerHTML = ', and you\'ll be missed.';
          document.getElementById("meetupCTA").innerHTML = 'Change RSVP';
        }
      }
      
      // Event Date     
      var now = new Date;
      var todayNumber = now.getDate();
      var todayMonth = now.getMonth();
      var todayTime = formatAMPM(now);
      var date = new Date(nextEvent.time);
      var dateTime = formatAMPM(date);
      var dateDay = date.getDay();
      var dateNumber = date.getDate();
      var dateMonth = date.getMonth();
      var dateYear = date.getFullYear();
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
      if ( (todayNumber == dateNumber) && (todayMonth == dateMonth) ) {
        var prettyDate = 'Tonight at ' + dateTime;
      } 
      else {
        var prettyDate = d_names[dateDay] + ', ' + m_names[dateMonth] + ' ' + dateNumber +  ', ' + dateYear + ' at ' + dateTime;
      }
      document.getElementById("meetupDate").innerHTML = prettyDate;

    })
    .fail( function(xhr, textStatus, errorThrown) {
      alert(xhr.responseText);
      alert(textStatus);
    });