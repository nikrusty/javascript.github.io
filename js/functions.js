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
    window.location.href = "interests.html"+"?Username="+document.registrationForm.userName.value +
        "&First="+document.registrationForm.firstName.value +
        "&Last="+document.registrationForm.lastName.value +
        "&Password="+document.registrationForm.password.value +
        "&Email="+document.registrationForm.email.value +
        "&Number="+document.registrationForm.phoneNumber.value +
        "&SignUp="+document.registrationForm.signUpNewsletter.value;
    
    return false;
}
//Function to set cookie
function setCookie(cookieName, cookieValue, time) {
    var expires = "";

    if (time) {
        var date = new Date();
        date.setTime(date.getTime() + (time*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = cookieName + "=" + cookieValue + expires + "; path=/";
}

//function to get data from cookie once on confirmation page
function getCookies(cookieName) {
    var name = cookieName + "=";
    var ca = document.cookie.split(';');

    for(var i=0;i < ca.length;i++) {

        var c = ca[i];

        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length,c.length);
        }
    }

    return "what";
}
//function to import data into Interests.html
function importData() {
    var username = getQuerystring('Username');
    var first = getQuerystring('First');
    var last = getQuerystring('Last');
    var password = getQuerystring('Password');
    var email = getQuerystring('Email');
    var number = getQuerystring('Number');
    var signUp = getQuerystring('SignUp');
    if(signUp == "Yes")
    {
        document.getElementById('newsletterYes').checked = true;
    }
    else
    {
        document.getElementById('newsletterNo').checked = true;
    }
    document.registrationForm.userName.value = username;
    document.registrationForm.firstName.value = first;
    document.registrationForm.lastName.value = last;
    document.registrationForm.password.value = password;
    document.registrationForm.email.value = email;
    document.registrationForm.phoneNumber.value = number;
    document.registrationForm.signUpNewsletter.value = signUp;
}
//function to start importing data into Confirm.html
function getData() {
    
    var data = getCookies("cookie1");
    var obj = {};

    if (data) {
        var regSplitStr = data.split(",");
    
        for (var i = 0; i < regSplitStr.length; ++i) {

            var tmp = regSplitStr[i].split("=");
            obj[tmp[0]] = tmp[1];
        }
        document.getElementById("username").textContent = obj.username;
        document.getElementById("first").textContent = obj.first;
        document.getElementById("last").textContent = obj.last;
        document.getElementById("password").textContent = obj.password;
        document.getElementById("email").textContent = obj.email;
        document.getElementById("number").textContent = obj.number;
        document.getElementById("signUp").textContent = obj.signUp;
        document.getElementById("interest").textContent = obj.interest;
        document.getElementById("comments").textContent = obj.comments;
        document.getElementById("referral").textContent = obj.referral;
    }
}
//function to retrieve data via query string
function getQuerystring(name, url) {
    if (!url){
        url = window.location.href;
    } 
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results){
       return null; 
    } 
    if (!results[2]) {
        return '';
    } 
    return results[2];

}
//Function to save and store cookies through page redirects
function saveCookies() {
    var savedCookies = 
        {
            username:document.registrationForm.userName.value,
            first: document.registrationForm.firstName.value,
            last: document.registrationForm.lastName.value,
            password: document.registrationForm.password.value,
            email: document.registrationForm.email.value,
            number:document.registrationForm.phoneNumber.value,
            signUp: document.registrationForm.signUpNewsletter.value,
            interest: document.registrationForm.interest.value,
            comments: document.registrationForm.comments.value,
            referral: document.registrationForm.referral.value, 
        };
    var data = "username=" + savedCookies.username + ",first=" + savedCookies.first + ",last=" + savedCookies.last + ",password=" + savedCookies.password +",email=" + savedCookies.email + ",number=" + savedCookies.number + ",signUp=" + savedCookies.signUp + ",interest=" + savedCookies.interest + "" +",comments=" + savedCookies.comments + ",referral=" + savedCookies.referral + "";
    
    setCookie("cookie1", data, 1);
    window.location.href = "confirm.html"

    return false;

}