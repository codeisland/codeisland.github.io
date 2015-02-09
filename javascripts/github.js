/* 
  Display all public members of Code Island organization, via GitHub API.
  For unauthenticated requests, we're allowed up to 60 per hour, per IP address. 
  API Docs: https://developer.github.com/v3/orgs/members/#members-list
*/
var html = "";
$.ajax( {
  url : "https://api.github.com/orgs/codeisland/public_members",
  dataType : "jsonp",
  success : function ( returndata ) {
    $.each( returndata.data, function ( i, item ) {
      memberLogin = this.login;
      memberURL = this.html_url;
      memberAvatar = this.avatar_url;
      html += '<li class="do-gooder">' + 
                '<a href="' + memberURL + '">' +
                  '<img class="avatar" src="' + memberAvatar + '">' + 
                  '<h1 class="username">' + memberLogin + '</h1>' + 
                  '</a>' +
              '</li>';
      });
    $( '#githubMembers' ).append(html).append('</ul></div>');
  } // close success handler
 });