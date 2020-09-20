var loggedin = true;
let mybtns = document.querySelectorAll("[data-num]");
let root = document.documentElement;
let home = "https://twitter.com/home";
var tags = "tags";
var whotofollow = "whotofollow";
var relventppl = "relventppl";
var footer = "footer";
let savedprefrence = "";
let keey = "";

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
  keey = [tags, whotofollow, relventppl, footer];
  NumofSavedValues = savedprefrence.length;

  for (i = 0; i < NumofSavedValues; i++) {
    if (savedprefrence[i] == "shown") {
      try {
        mybtns[i].setAttribute("unchecked", true);
      } catch (error) {}
      changestatus(keey[i], "shown");
    } else {
      try {
        mybtns[i].setAttribute("checked", true);
      } catch (error) {}
      changestatus(keey[i], "hidden");
    }
  }
}

function changestatus(key, status) {
  if (status == "shown") {
    root.style.setProperty(`--${key}`, "inline");
    Set(key, "shown");
  } else {
    root.style.setProperty(`--${key}`, "none");
    Set(key, "hidden");
  }
}

mybtns.forEach((element) => {
  let myid = element.getAttribute("id");
  element.addEventListener("click", function () {
    if (element.checked) {
      element.setAttribute("checked", true);
      changestatus(myid, "hidden");
      refresh();
    } else {
      element.setAttribute("unchecked", true);
      changestatus(myid, "shown");
      refresh();
    }
  });
});

function refresh() {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.reload(tab.id);
  });
}
