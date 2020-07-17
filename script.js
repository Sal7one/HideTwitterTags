let root = document.documentElement;
let home = "https://twitter.com/home";
let tagbtn = document.getElementById("switchbtntag");
let whobtn = document.getElementById("switchbtnwho");
let footbtn = document.getElementById("switchbtnfoot");
let relvbtn = document.getElementById("switchbtnrelv");
var tags = "tags";
var whotofollow = "whotofollow";
var relventppl = "relventppl";
var footer = "footer";
let savedprefrence = "";
let results = [];

function Set(keys, thingy) {
  alert("setting " , keys, "  s" , thing)
  var obj = {};
  var key = keys;
  obj[key] += thingy;
  chrome.storage.local.set(obj);
}

window.onload = function () {
  async function Get(x) {
    return new Promise((resolve, reject) => {
      try {
        chrome.storage.local.get(tags, function (value) {
          if (value.tags != "shown " || value.tags != "hidden") {
            results[0] = value.tags;
            alert("getting  ", value.tags);
          } else alert("ss");
        });
        // chrome.storage.local.get(whotofollow, function (value) {
        //   results[1] = await value.whotofollow;
        // });
        // chrome.storage.local.get(relventppl, function (value) {
        //   results[2] = await value.relventppl;
        // });
        // chrome.storage.local.get(footer, function (value) {
        //   results[3] = await value.footer;
        // });

        resolve(results);
      } catch (ex) {
        reject(ex);
      }
    });
  }

  Get(something).then((result) => {
    alert("my result is " + result);
  });
};

function App(result) {
  for (i = 0; i < result.length; i++) {
    if (result[i] == "shown") {
      if (i == 0) {
        showthem(tags);
        tagbtn.setAttribute("checked", true);
      }
      if (i == 1) {
        showthem(whotofollow);
        whobtn.setAttribute("checked", true);
      }
      if (i == 2) {
        showthem(relventppl);
        relvbtn.setAttribute("checked", true);
      }
      if (i == 3) {
        showthem(footer);
        footbtn.setAttribute("checked", true);
      }
    } else {
      if (i == 1) {
        hidethem(tags);
        tagbtn.setAttribute("unchecked", true);
      }
      if (i == 2) {
        hidethem(whotofollow);
        whobtn.setAttribute("unchecked", true);
      }
      if (i == 3) {
        hidethem(relventppl);
        relvbtn.setAttribute("unchecked", true);
      }
      if (i == 4) {
        hidethem(footer);
        footbtn.setAttribute("unchecked", true);
      }
    }
  }
}

function hidethem(key) {
  alert("my key is " + key);
  root.style.setProperty("--" + key, "none");
  Set(key, "hidden");
}
function showthem(key) {
  root.style.setProperty("--" + key, "inline");
  Set(key, "shown");
}

//Todo make it on click function and pass values

tagbtn.onclick = function () {
  if (tagbtn.checked) {
    hidethem(tags);
    refresh();
  } else {
    showthem(tags);
    refresh();
  }
};

whobtn.onclick = function () {
  if (whobtn.checked) {
    hidethem(whotofollow);
    refresh();
  } else {
    showthem(whotofollow);
    refresh();
  }
};

relvbtn.onclick = function () {
  if (relvbtn.checked) {
    hidethem(relventppl);
    refresh();
  } else {
    showthem(relventppl);
    refresh();
  }
};

footbtn.onclick = function () {
  if (footbtn.checked) {
    hidethem(footer);
    refresh();
  } else {
    showthem(footer);
    refresh();
  }
};

function refresh() {
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.reload(tab.id);
  });
}
