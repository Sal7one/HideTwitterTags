let search = "search";
let tags = "tags";
let whotofollow = "whotofollow";
let relventppl = "relventppl";
let footer = "footer";
let explore = "explore";
let topics = "topics";
let communities = "communities";
let savedData =  [search  ,  tags  ,  whotofollow  ,  relventppl  ,  footer  ,  explore  , 
 topics  ,  communities]    ;

function Get() {
    return new Promise(function (resolve, _reject) {
      chrome.storage.local.get(null, function (items) {
        resolve(items);
      });
    });
  }

  function Set(key, thingy) {
    chrome.storage.local.set({[key] : [thingy]});
  }

  async function refresh() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    if(tab.url.includes("twitter.com")){
    chrome.tabs.reload(tab.id);
    return false
}else{
      return true
    }
  }