let mybtns = document.querySelectorAll("[data-num]");
let root = document.documentElement;
var search = "search";
var tags = "tags";
var whotofollow = "whotofollow";
var relventppl = "relventppl";
var footer = "footer";
var savedvalues = "";
let keey = "";

window.onload = function () {
  Get().then((value) => {
    App(value);
  });
};

function App(result) {
  savedvalues = result;
  keey = [search,tags, whotofollow, relventppl, footer];
  NumofSavedValues = savedvalues.length;

  if (NumofSavedValues > 0) {
    for (i = 0; i < NumofSavedValues; i++) {
      if (savedvalues[i] == "shown") {
        try {
          mybtns[i].setAttribute("unchecked", true);
        } catch (error) {}
        changepagestatus(keey[i], "shown");
      } else {
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
      if(keey[i] == "search")
      continue;
      changepagestatus(keey[i], "hidden");
      Set(keey[i], "hidden");
    }
  }
}

function changepagestatus(key, status) {
  if (status == "shown") {
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
      resolve(values);
    });
  });
}
function Set(key, thingy) {
  chrome.storage.local.set({ [key]: [thingy] });
}

// Backup plan if Twitter change their elemnts

function FailSafeChecker(key){

  element =""

  // Selected elemnt
  switch(key){
    case tags: element = `[aria-label="Timeline: Trending now"]`
    break;
    case  whotofollow: element =  `[aria-label="Who to follow"]` 
    break;
    case relventppl: element =  `[aria-label="Relevant people"]`
    break;
    case  footer: element = `[aria-label="Footer"]`
    break; case search: element =  `[aria-label="Search Twitter"]`
    break;
  default:  console.log("Tags hider error..Something huge chnaged in Twitter ")
  }

    //Is the element here
    selectedElement = document.querySelector(element)
    if(selectedElement == null){
      // No...Wait for it
      document.arrive(element, function () {
        //Chcek if it's already hidden, or hide it..
        if(getComputedStyle(this).display != "none")
        this.parentNode.style.setProperty("display","none","important")
        else
        console.log(`Element ${key} is already hidden`)
      });
    }
    else{
      // Element was already loaded 
      if(getComputedStyle(this).display != "none")
      selectedElement.parentNode.style.setProperty("display","none","important")
      else
      console.log(`Element ${key} is already hidden`)
    }
}