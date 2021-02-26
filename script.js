let mybtns = document.querySelectorAll("[data-num]");
let root = document.documentElement;
var search = "search";
var tags = "tags";
var whotofollow = "whotofollow";
var relventppl = "relventppl";
var footer = "footer";
var explore = "explore";
var savedvalues = "";
let keey = "";

window.onload = function () {
  Get().then((value) => {
    App(value);
  });
};

function App(result) {
  savedvalues = result;
  keey = [search,tags, whotofollow, relventppl, footer, explore];
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
    for (i = 0; i < 5; i++) {
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

function refresh() {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.reload(tab.id);
  });
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
  searchlangs = [ `[aria-label="Search Twitter"]`,`[aria-label="البحث في تويتر"]`,`[aria-label="Twitter durchsuchen"]`,`[aria-label="Buscar en Twitter"]` ]
  taglangs = [`[aria-label="Timeline: Trending now"]`,  `[aria-label="الخطّ الزمنيّ: المتداوَل الآن"]`,`[aria-label="Timeline: Aktuelle Trends"]`,`[aria-label="Cronología: Tendencias del momento"]` ]
  whotofollowlangs = [`[aria-label="Who to follow"]` , `[aria-label="اقتراحات المتابعة"]`,`[aria-label="Wem folgen?"]`,`[aria-label="A quién seguir"]` ]
  relventppllangs = [`[aria-label="Relevant people"]`, `[aria-label="الأشخاص ذوو الصلة"]`,`[aria-label="Relevante Personen"]`,`[aria-label="Personas relevantes"]`]
  footerlangs = [`[aria-label="Footer"]`, `[aria-label="الشريط السُفلي"] `,`[aria-label="Fußzeile"]`,`[aria-label="Pie de página"]`]
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
  default:  console.log("Tags hider error..Something huge changed in Twitter ")
  }

  if(key === tags){
    try {
     tagselemnt =  document.querySelector(".css-1dbjc4n.r-1uaug3w.r-1uhd6vh.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x")
     if(tagselemnt!= null){

       tagselemnt.style.setProperty(" border-width","0px","important")
       tagselemnt.style.setProperty("border-color","transparent","important")
     }else{

      document.arrive(".css-1dbjc4n.r-1uaug3w.r-1uhd6vh.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x", function () {
        this.style.setProperty("border-width","0px","important")
        this.style.setProperty("border-color","transparent","important")
      })

     }
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