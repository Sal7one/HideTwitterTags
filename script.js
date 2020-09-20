var loggedin = true;
let mybtns = document.querySelectorAll("[data-num]");
let root = document.documentElement;
let home = "https://twitter.com/home";
var tags = "tags";
var whotofollow = "whotofollow";
var relventppl = "relventppl";
var footer = "footer";
let savedprefrence = "";

// Who to folow .r-1bro5k0,
function Set(key, thingy) {
  chrome.storage.local.set({ [key]: [thingy] });
}

window.onload = function () {
  var savedvalues = [];

  function printme(i, values) {
    savedvalues[i] = values;

    if (savedvalues.length == 4) App(savedvalues);
  }
  function Get(num, key, mycall) {
    chrome.storage.local.get(key, function (items) {
      return mycall(num, items[key]);
    });
  }
  Get(0, tags, printme);
  Get(1, whotofollow, printme);
  Get(2, relventppl, printme);
  Get(3, footer, printme);
};

function App(result) {
  savedprefrence = result;
  NumofSavedValues = savedprefrence.length;

  for (i = 0; i < NumofSavedValues; i++) {
    if (savedprefrence[i] == "shown") {
      root.style.setProperty(`--none`, savedprefrence[i]);
    } else {
      root.style.setProperty(`--none`, savedprefrence[i]);
    }
  }
}

function changestatus(element, status) {
  let key = element.getAttribute("id");
  let styletype = "none";
  let savedvalue = "hidden";
  let attribute = "checked";
  if (status == "show") {
    styletype = "inline";
    attribute = "unchecked";
    savedvalue = "shown";
  }
  try {
    element.setAttribute(attribute, true);
    root.style.setProperty(`--${key}`, styletype);
    Set(key, savedvalue);
    refresh();
  } catch (error) {}
}

mybtns.forEach((element) => {
  element.addEventListener("click", function () {
    if (element.checked) {
      changestatus(element, "hide");
      refresh();
    } else {
      changestatus(element, "show");
      refresh();
    }
  });
});

function refresh() {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.reload(tab.id);
  });
}
