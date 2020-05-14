/*eslint-env browser*/
window.addEventListener('keyup', addFields);
window.onload = preloadImages;
var invitations = new Array();
var n;
var i;

//Banner variables
var cycle = 0;
var preload = new Array("images/banner1.jpg", "images/banner2.jpg", "images/banner3.jpg");

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
function setupRollover(n) {
    n.outImage = new Image();
    
}
//Function to preload banner images and cycle through
function preloadImages() {
    cycle++;
    if(cycle == preload.length) {
        cycle = 0;
    }
    document.getElementById("banner").src = preload[cycle];
    setTimeout(preloadImages, 3 * 1000);
}