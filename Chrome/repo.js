let search = "search";
let tags = "tags";
let whotofollow = "whotofollow";
let relventppl = "relventppl";
let footer = "footer";
let explore = "explore";
let topics = "topics";
let communities = "communities";

function Get() {
    return new Promise(function (resolve, _reject) {
      chrome.storage.local.get(null, function (items) {
        resolve(items);
      });
    });
  }

  function Set(key, thingy) {
    chrome.storage.local.set({ [key]: [thingy] });
  }