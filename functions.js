/*eslint-env browser*/
//window.addEventListener('Submit', saveInput, false);
window.addEventListener('keyup', addFields);

var invitations = new Array();
var n;
var i;

/* function to take values on submit and assign
to placeholders below form
returning false to ensure values dont get consumed and overwritten */
//function saveInput() {
//
////Variables that hold values on submit of form
//var orgName = document.getElementsByName("organizationName")[0].value;
//var date = document.getElementsByName("eventDate")[0].value;
//var website = document.getElementsByName("websiteURL")[0].value;
//var host = document.getElementsByName("hostName")[0].value;
//var recipient = document.getElementsByName("recipientName")[0].value;
//
////Reassigning of span id's to variable values from above
//document.getElementById("recipientName").textContent = recipient;
//document.getElementById("organizationName").textContent = orgName;
//document.getElementById("eventDate").textContent = date;
//document.getElementById("websiteURL").textContent = website;
//document.getElementById("hostName").textContent = host;
//
//return false;
//}
//Function to obtain how many fields to create for the invitations
function addFields(){
    document.getElementById("recipientNumber").onkeypress = function(e) { 
        if(!e) e = window.event;
        //13 represents the keycode for Enter key
        if(e.keyCode == '13') {
            n = document.getElementById("recipientNumber").value;
            createInvitations(n);
            return false;
        }
    }
}

//function to input fields based on number of fields entered
function createInvitations(n) {
var invitation =  "<label for=\"recipientName\">Recipient name:</label> <input type=\"text\" name=\"recipientName\" placeholder=\"Enter your Recipient Name\" />";
invitation += "<label for=\"organizationName\">Organization name:</label><input type=\"text\" name=\"organizationName\" placeholder=\"Enter your Organization Name\" />";
invitation += "<label for=\"eventDate\">Event Date:</label><input type=\"text\" name=\"eventDate\" placeholder=\"Enter your Event Date\" />"
invitation += "<label for=\"websiteURL\">URL:</label><input type=\"text\" name=\"websiteURL\" placeholder=\"Enter your Website URL\" />";
invitation += "<label for=\"hostName\">Host name:</label><input type=\"text\" name=\"hostName\" placeholder=\"Host Name\" />";
    
    //Adding div ids to each invitation
    var inviteIds = "";
    for (i = 1; i <= n; i++) {
        inviteIds += ("<div id="+i+">");
        inviteIds += invitation;
        inviteIds += "</div><br>";
    }
    inviteIds += "<input type=\"submit\" value=\"Submit\" onclick=\"organizeInvites(n)\">"
    document.getElementById("invitationForm").innerHTML += inviteIds;
}
//Function to obtain info from input and add to Array
function organizeInvites(n) {
    for(i = 1; i <= n; i++) {
        var invite = new Object();
        var inviteInput = document.getElementById(i).getElementsByTagName("input");
        invite.name = inviteInput[0].value;
        invite.organization = inviteInput[1].value;
        invite.event = inviteInput[2].value;
        invite.url = inviteInput[3].value;
        invite.host = inviteInput[4].value;
        
        invitations[i-1] = invite;

    }
}
//Function to render the Array of records to the user
function showInvitations() {
    var display = "";
    
    for(i = 0; i < invitations.length; i++) { 
    var single = invitations[i];
    display += "Hello <span id=\"recipientName\">"+single.name+"</span>!<br/><br/> ";
    display += "You have been invited to volunteer for an event held by <span id=\"organizationName\">"+single.organization +"</span> on <span id=\"eventDate\">"+single.event +"</span>.";
    display += "Please come to the following website: <span id=\"websiteURL\">"+single.url+"</span> to sign up as a volunteer.<br><br>Thanks!";
    display +=  "<br><br><span id=\"hostName\">"+single.host+"</span><br><br>===============================<br><br>";    
    }
    document.getElementById("placeholderContent").innerHTML = display;
}
