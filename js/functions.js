/*eslint-env browser*/
window.addEventListener('Submit', saveInput, false);

function saveInput() {
var orgName = document.getElementsByName("organizationName")[0].value;
var date = document.getElementsByName("eventDate")[0].value;
var website = document.getElementsByName("websiteURL")[0].value;
var host = document.getElementsByName("hostName")[0].value;
var recipient = document.getElementsByName("recipientName")[0].value;

document.getElementById("recipientName").textContent = recipient;
document.getElementById("organizationName").innerHTML = orgName;
document.getElementById("eventDate").textContent = date;
document.getElementById("websiteURL").textContent = website;
document.getElementById("hostName").textContent = host;

return false;
}

