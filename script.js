var mykey = "mykey";
let swtch = document.getElementById("switchbtn");
let root = document.documentElement;
let loggedin = true;
let savedprefrence = "";
let cookieValue = 0;

// Who to folow .r-1bro5k0,
function Set(thingy) {
  chrome.storage.local.set({ mykey: thingy });
}

window.onload = function () {
  cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("twid"));

  if (cookieValue == undefined) loggedin = false;

  async function Get() {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(mykey, function (value) {
          resolve(value.mykey);
        });
      } catch (ex) {
        reject(ex);
      }
    });
  }

  Get(mykey).then((result) => {
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

function hidethem() {
  root.style.setProperty("--list1", "inline");
  root.style.setProperty("--status", "none");

  Set("hidden");
  swtch.setAttribute("checked", true);
}
function showthem() {
  root.style.setProperty("--list1", "inline");
  root.style.setProperty("--list0", "inline");
  root.style.setProperty("--status", "inline");

  Set("shown");
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
