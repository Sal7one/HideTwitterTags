let mybtns = document.querySelectorAll("[data-num]");
let root = document.documentElement;
var search = "search";
var tags = "tags";
var whotofollow = "whotofollow";
var relventppl = "relventppl";
var footer = "footer";
var explore = "explore";
var topics = "topics";
var savedvalues = "";
let keey = "";

window.onload = function () {
  Get().then((value) => {
    App(value);
  });
};

function App(result) {
  savedvalues = result;
  keey = [search,tags, whotofollow, relventppl, footer, explore, topics];
  NumofSavedValues = savedvalues.length;


  if (NumofSavedValues > 0) {
    for (i = 0; i < NumofSavedValues; i++) {
      if (savedvalues[i] == "shown") {
        try {
          mybtns[i].setAttribute("unchecked", true);
        } catch (error) {}
        changepagestatus(keey[i], "shown");
      } else {
        if((i == 0|| i == 5) && savedvalues[i] == undefined)
        continue;
        try {
          mybtns[i].setAttribute("checked", true);
        } catch (error) {}
        changepagestatus(keey[i], "hidden");
      }
    }
  } else {
    for (i = 0; i < 6; i++) {
      try {
        mybtns[i].setAttribute("checked", true);
      } catch (error) {}
      if(keey[i] == "search" || keey[i] == "explore"){
        console.log("found")
        continue;
      }
      changepagestatus(keey[i], "hidden");
      Set(keey[i], "hidden");
    }
  }
}

function changepagestatus(key, status) {
  if (status == "shown") {
    if(key == explore)
    root.style.setProperty(`--${key}`, "flex");
    else
    root.style.setProperty(`--${key}`, "inline");
  } else {
   root.style.setProperty(`--${key}`, "none");
    FailSafeChecker(key)
  }
}

mybtns.forEach((element) => {
  let myid = element.getAttribute("id");
  element.addEventListener("click", function () {
    if (element.checked) {
      Set(myid, "hidden");
      refresh();
    } else {
      Set(myid, "shown");
      refresh();
    }
  });
});

async function refresh() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  chrome.tabs.reload(tab.id);
}

function Get() {
  return new Promise(function (resolve, _reject) {
    chrome.storage.local.get(null, function (items) {
      let values = [];
      values[0] = items[search];
      values[1] = items[tags];
      values[2] = items[whotofollow];
      values[3] = items[relventppl];
      values[4] = items[footer];
      values[5] = items[explore];
      values[6] = items[topics];
      resolve(values);
    });
  });
}
function Set(key, thingy) {
  chrome.storage.local.set({ [key]: [thingy] });
}

// Backup plan if Twitter change their elemnts

function FailSafeChecker(key){
  
  // Supported languages are English, Arabic, German, Spanish
  searchlangs = [ `[aria-label="Search Twitter"]`,`[aria-label="?????????? ???? ??????????"]`,`[aria-label="Twitter durchsuchen"]`,`[aria-label="Buscar en Twitter"]` ]
  taglangs = [`[aria-label="Timeline: Trending now"]`,  `[aria-label="?????????? ??????????????: ?????????????????? ????????"]`,`[aria-label="Timeline: Aktuelle Trends"]`,`[aria-label="Cronolog??a: Tendencias del momento"]` ]
  whotofollowlangs = [`[aria-label="Who to follow"]` , `[aria-label="???????????????? ????????????????"]`,`[aria-label="Wem folgen?"]`,`[aria-label="A qui??n seguir"]` ]
  relventppllangs = [`[aria-label="Relevant people"]`, `[aria-label="?????????????? ?????? ??????????"]`,`[aria-label="Relevante Personen"]`,`[aria-label="Personas relevantes"]`, `[aria-label="??????????????????????????? ?????????"]`,`[aria-label="???????????????????? ????????"]`, `[aria-label="??????????????????? ????????"]`,` [aria-label="Persone pertinenti"]`, `[aria-label="?????????????????????????????????"]`]
  footerlangs = [`[aria-label="Footer"]`, `[aria-label="???????????? ??????????????"] `,`[aria-label="Fu??zeile"]`,`[aria-label="Pie de p??gina"]`]
  explorelangs = [`a[href="/explore"]`]
  element = [0]
  
  // Selected elemnt
  switch(key){
    case tags: element = taglangs
    break;
    case  whotofollow: element =  whotofollowlangs
    break;
    case relventppl: element =  relventppllangs
    break;
    case  footer: element = footerlangs
    break; case search: element =  searchlangs
    break; case explore: element =  explorelangs
    break;
  default: return
  }

  if(key === tags){
    try {
      autoborderhider();
      setTimeout(()=>{
        autoborderhider();
       },950)
 

    } catch (error) {
      console.log("error in backup tags border")
      console.log(error)
    }
    
  }

  if(key === explore){
    explore =  document.querySelector(`a[href="/explore"]`)
    if(explore == null)
    document.arrive(`a[href="/explore"]`, (Explore)=>{Explore.style.display = "none"})
    else
    explore.style.display = "none"
  }else{

  for(j = 0; j < element.length; j++){
  //Is the element here
  selectedElement = document.querySelector(element[j])
  if(selectedElement == null){
    // No...Wait for it
    document.arrive(element[j], function () {
      // Element was already loaded 
        this.parentNode.style.setProperty("display","none","important")
        try { 
           parentofelemnt =  findsidebar(this)
          parentofelemnt.style.setProperty("display","none","important")
        } catch (error) {}
      document.unbindArrive(element[j]);
    });
  }
  else{
      selectedElement.parentNode.style.setProperty("display","none","important")
      try { 
         parentofelemnt =  findsidebar(selectedElement)
        parentofelemnt.style.setProperty("display","none","important")
      } catch (error) {}
  }
  }
}
}


function findsidebar(element, BeforeSideBar){
  sidebar = document.querySelector(".css-1dbjc4n.r-1l5qxre.r-m611by")
  if(element != sidebar){
    BeforeSideBar = element;
    element = element.parentNode;
    return findsidebar(element, BeforeSideBar)
  }
  return BeforeSideBar;
}


function autoborderhider(){
  tagselemntwhite =  document.querySelector(".css-1dbjc4n.r-1ihkh82.r-1in3vh1.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x")
  tagselemntDark =  document.querySelector(".css-1dbjc4n.r-1uaug3w.r-1uhd6vh.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x")
  tagselemntblack =  document.querySelector(".css-1dbjc4n.r-1ysxnx4.r-k0dy70.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x")
 if(tagselemntwhite){
  tagselemntwhite.style.setProperty("border-width","0px","important")
  tagselemntwhite.style.setProperty("border-color","transparent","important")
 }
 if(tagselemntDark){
  tagselemntDark.style.setProperty("border-width","0px","important")
  tagselemntDark.style.setProperty("border-color","transparent","important")
 }
 if(tagselemntblack){
  tagselemntblack.style.setProperty("border-width","0px","important")
  tagselemntblack.style.setProperty("border-color","transparent","important")
 }
}