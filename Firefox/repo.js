let search = "search";
let tags = "tags";
let whotofollow = "whotofollow";
let relventppl = "relventppl";
let footer = "footer";
let explore = "explore";
let topics = "topics";
let communities = "communities";
let links = "links";
let linkConsent = "linkConsent";
let savedData =  [search, tags, whotofollow, relventppl, footer, explore, 
 topics, communities, links, linkConsent];

function GetAllData() {
    return browser.storage.local.get();
  }

  function Get(key) {
    return new Promise(function (resolve, _reject) {
      chrome.storage.local.get([key], function (value) {
        resolve(value);
      });
    });
  }
  function Set(key, thingy) {
    browser.storage.local.set({ [key]: thingy });
  }

  function refresh() {
    browser.tabs.reload();
  }