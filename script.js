let mybtns = document.querySelectorAll("[data-num]");
let root = document.documentElement;
var tags = "tags";
var whotofollow = "whotofollow";
var relventppl = "relventppl";
var footer = "footer";
var savedvalues = "";
let keey = "";
let gettingItem = browser.storage.local.get();
gettingItem.then((gotvalues) => {
  values = [];

  values.push(gotvalues.tags);
  values.push(gotvalues.whotofollow);
  values.push(gotvalues.relventppl);
  values.push(gotvalues.footer);

  App(values);
});

function App(result) {
  savedvalues = result;
  keey = [tags, whotofollow, relventppl, footer];
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
    for (i = 0; i < 4; i++) {
      try {
        mybtns[i].setAttribute("checked", true);
      } catch (error) {}
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
  browser.tabs.reload();
}

function Set(key, thingy) {
  browser.storage.local.set({ [key]: thingy });
}
