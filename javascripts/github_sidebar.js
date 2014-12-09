$(document).ready(function() {
  var apiMembersUrl = "https://api.github.com/orgs/codeisland/public_members";

  if($('.github-members').length > 0 ){
    $.getJSON(apiMembersUrl, function (members) {
        $(".github-members").append("<h3>" + members.length + " Code Islanders on Github</h3><ul>");
        $.each(members, function (i, member) {
            $(".github-members")
               .append("<li><a href='"+ member.html_url + "'>")
               .append("<img class='avatar' src='" + member.avatar_url + "'>")
               .append("<h1 class='username'>" + member.login + "</h1>")
               .append("</a>")
               .append("</li>");
        });
        $(".github-members").append("</ul>");
    });
  }
});
