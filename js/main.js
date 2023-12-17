var bookmarkName = document.getElementById("siteNameInput");
var websiteUrl = document.getElementById("siteUrlInput");
 
var bookmark = [];

document.getElementById('btnSubmit').style.zIndex=0;

if (localStorage.getItem("bookmarkStorage") != null) {
  bookmark = JSON.parse(localStorage.getItem("bookmarkStorage"));
  bookmarkDisplay();
}

function bookmarkStore() {
  bookmarkDetails = "";
  bookmarkDetails = {
    bookmarkName: bookmarkName.value,
    bookmarkWebsite: websiteUrl.value,
  };
  if (
    (`${bookmarkName.value}`.length >= 3 &&
    `${websiteUrl.value.slice(-4)}` == ".com") ||
    `${websiteUrl.value.slice(-4)}` == ".net" ||
    `${websiteUrl.value.slice(-4)}` == ".org"
  ) {
    bookmark.push(bookmarkDetails);
    localStorage.setItem("bookmarkStorage", JSON.stringify(bookmark));
    bookmarkDisplay();
    dataClear();
  }
}

function bookmarkDisplay() {
  container = "";
  for (var i = 0; i < bookmark.length; i++) {
    container += `
        <tr>
            <td>${i+1}</td>
            <td>${bookmark[i].bookmarkName}</td>
            <td>
                 <a href="https://${bookmark[i].bookmarkWebsite}" target="_blank"><button class="btn visit"><i class="fa-solid fa-eye pe-1"></i>Visit</button></a>
            </td>
            <td><button class="btn delete" onclick="bookmarkDelete(${i})"><i class="fa-solid fa-trash-can pe-1"></i></i> Delete</button></td>
        </tr>
        `;
  }
  document.getElementById("tbodyInput").innerHTML = container;
}

function bookmarkDelete(i) {
  bookmark.splice(i, 1);
  localStorage.setItem("bookmarkStorage", JSON.stringify(bookmark));
  bookmarkDisplay();
}

function dataClear() {
  (bookmarkName.value = ""), (websiteUrl.value = "");
  document.getElementById("siteIcon").style.opacity = 0;
  document.getElementById("siteIconError").style.opacity = 0;
  document.getElementById("siteIcon2").style.opacity = 0;
  document.getElementById("siteIconError2").style.opacity = 0;
  document.getElementById("siteNameInput").style.borderColor = "transparent";
  document.getElementById("siteNameInput").style.boxShadow = "none";
  document.getElementById("siteUrlInput").style.borderColor = "transparent";
  document.getElementById("siteUrlInput").style.boxShadow = "none";
}

function validateSiteName() {
  if (`${bookmarkName.value}`.length >= 3) {
    document.getElementById("siteIcon").style.opacity = 1;
    document.getElementById("siteIconError").style.opacity = 0;
    document.getElementById("siteNameInput").style.borderColor = "#198754";
    document.getElementById("siteNameInput").style.boxShadow =
      "0 0 0 0.25rem rgba(25,135,84,.25)";
    document.getElementById('btnSubmit').style.zIndex=1; 
  } else if (`${bookmarkName.value}`.length < 3) {
    document.getElementById("siteIconError").style.opacity = 1;
    document.getElementById("siteIcon").style.opacity = 0;
    document.getElementById("siteNameInput").style.borderColor = "#dc3545";
    document.getElementById("siteNameInput").style.boxShadow =
      "0 0 0 0.25rem rgba(220,53,69,.25)";
    document.getElementById('btnSubmit').style.zIndex=0; 

  }
}

function validateSiteUrl() {
  if (
    websiteUrl.value.includes('.com') == true ||
    `${websiteUrl.value.slice(-4)}` == ".net" ||
    `${websiteUrl.value.slice(-4)}` == ".org"
  ) {
    document.getElementById("siteIcon2").style.opacity = 1;
    document.getElementById("siteIconError2").style.opacity = 0;
    document.getElementById("siteUrlInput").style.borderColor = "#198754";
    document.getElementById("siteUrlInput").style.boxShadow =
      "0 0 0 0.25rem rgba(25,135,84,.25)";
    if(`${bookmarkName.value}`.length < 3){
      document.getElementById('btnSubmit').style.zIndex=0; 

    }
    else{
      document.getElementById('btnSubmit').style.zIndex=1; 
    }
  } else {
    document.getElementById("siteIconError2").style.opacity = 1;
    document.getElementById("siteIcon2").style.opacity = 0;
    document.getElementById("siteUrlInput").style.borderColor = "#dc3545";
    document.getElementById("siteUrlInput").style.boxShadow =
      "0 0 0 0.25rem rgba(220,53,69,.25)";
    document.getElementById('btnSubmit').style.zIndex=0; 
  }
}

