/*eslint-env browser*/
window.addEventListener('keyup', addFields);
window.onload = preloadImages;

//Global Variables
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
//Function to preload banner images and cycle through
function preloadImages() {
    //Increase counter to go to next image
    cycle++;
    //If counter is at last image, start over
    if(cycle == preload.length) {
        cycle = 0;
    }
    //Change Banner to next image in array
    document.getElementById("banner").src = preload[cycle];
    setTimeout(preloadImages, 3 * 1000);
}
//When mouse rolls over image, image will change to smaller version
function rollover(x) {
    x.style.color = "red";

}
//when mouse rolls off image, image will default to original
function rollout(x) {
    x.style.height = "200px";
    x.style.width = "300px";
}
//Function to validate input from form
function validateForm() {
    var letter = /^[A-Za-z]+$/;
    var letters = /^[0-9a-zA-Z]+$/;
    var numberFormat = /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
    var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var username = document.forms["registrationForm"]["userName"].value;
    var password = document.forms["registrationForm"]["password"].value;
    var passwordVerify = document.forms["registrationForm"]["passwordVerify"].value;
    var first = document.forms["registrationForm"]["firstName"].value;
    var last = document.forms["registrationForm"]["lastName"].value;
    var email = document.forms["registrationForm"]["email"].value;
    var number = document.forms["registrationForm"]["phoneNumber"].value;

    //Username validation to ensure only letters and numbers are used
    if(!username.match(letters)) {
        alert("Please use only numbers or letters");
        document.getElementById("userName").focus();
        return false;
    }
    //Validation to check password length
    if(password.length < 8) {
        alert("Password must be minimum of 8 characters");
        document.getElementById("password").focus();
        return false;
    }
    if(passwordVerify.length != password.length || passwordVerify.length < 8 || passwordVerify != password) {
        alert("Verify Password is not long enough or does not match password");
        document.getElementById("passwordVerify").focus();
        return false;
    }
    if(!first.match(letter)) {
        alert("First name can only contain letters");
        document.getElementById("firstName").focus();
        return false;
    }
    if(!last.match(letter)) {
        alert("Last name can only contain letters");
        document.getElementById("lastName").focus();
        return false;
    }
    if(!email.match(emailFormat)) {
        alert("Email format must be xxx@xxx.xxx format");
        document.getElementById("email").focus();
        return false;
    }
    if(!number.match(numberFormat)) {
        alert("Phone Number must match (xxx) xxx-xxxx format");
        document.getElementById("phoneNumber").focus();
        return false;
    }
    return true;
}