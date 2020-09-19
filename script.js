var loggedin = true;
let swtch = document.getElementById("switchbtn");
let root = document.documentElement;
let home = "https://twitter.com/home";
var allofthem = "allofthem";
var tags = "tags";
var whotofollow = "whotofollow";
var relventppl = "relventppl";
var footer = "footer";
var signup = "signup";
let savedprefrence = "";

// Who to folow .r-1bro5k0,
function Set(key, thingy) {
  chrome.storage.local.set({ [key]: thingy });
}

window.onload = function () {
  async function Get() {
    return new Promise((resolve, reject) => {
      try {
        let results = [];
        chrome.storage.local.get(allofthem, function (value) {
          results[0] = value.allofthem;
        });
        chrome.storage.local.get(tags, function (value) {
          results[1] = value.tags;
        });
        chrome.storage.local.get(whotofollow, function (value) {
          results[2] = value.whotofollow;
        });
        chrome.storage.local.get(relventppl, function (value) {
          results[3] = value.relventppl;
        });
        chrome.storage.local.get(footer, function (value) {
          results[4] = value.footer;
        });
        resolve(results);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  Get(allofthem).then((result) => {
    // result is here
    App(result);
  });
};

function App(result) {
  savedprefrence = result;
  if (savedprefrence == "shown") {
    showthem();
  } else if (savedprefrence == "hidden") {
    hidethem();
  } else {
    hidethem();
  }
}

function hidethem(key) {
  Set(key, "hidden");
  swtch.setAttribute("checked", true);
}
function showthem(key) {
  //  root.style.setProperty("--status", "inline");

  Set(key, "shown");
  swtch.setAttribute("unchecked", true);
}

swtch.onclick = function () {
  if (swtch.checked) {
    hidethem();
    refresh();
  } else {
    showthem();
    refresh();
  }
};

function refresh() {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.reload(tab.id);
  });
}
