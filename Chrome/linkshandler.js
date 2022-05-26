
let cc = "curiouscat";
let tell = "tellonym.me";

GetAllData().then(savedData=>{
  let shouldObserve = savedData[linkConsent];
    if(shouldObserve == "hidden"){
        observeTweets();
    }
})

function findLinks(){
  document.querySelectorAll(`[data-testid="tweet"] a[href*="https://t.co/"]`).forEach(link =>{
        try{
            let tweetLink = link.children[0].children[0].children[0].children[0].innerHTML
            let cclink = tweetLink.includes(cc);
            let telllink = tweetLink.includes(tell);
            if(cclink || telllink){
                if(!location.href.includes("status")){
                tweet = link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
                hideTweet(tweet);
                hideborder(tweet.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
                }
            }
        }catch(e){
        }
    });

    document.querySelectorAll(`[data-testid="tweet"] [data-testid="tweetText"] a[href*="https://t.co/"]`).forEach(link =>{
      try{
          let tweetContent = link.innerHTML;
          let cclink = tweetContent.includes(cc);
          let telllink = tweetContent.includes(tell);
          
          if(cclink || telllink){
            if(!location.href.includes("status")){
              tweet = link.parentNode.parentNode.parentNode.parentNode;
              hideTweet(tweet);
              hideborder(tweet.parentNode.parentNode.parentNode.parentNode);
            }
        }
      }catch(e){
      }
  });
}

function hideTweet(tweet){
  tweet.style.width = "0px";
  tweet.style.height = "0px";
  tweet.style.opacity = "0";
}
function hideborder(tweet){
  tweet.style.setProperty('border', 'transparent 0px', 'important');
}

function observeTweets(){
  var arriveOptions = {
    fireOnAttributesModification: true, // Tweet ViewHolder element data changed
    onceOnly: true, // for every Tweet
    existing: true  // If Tweet is already loaded when this code ran
};

// Use Arrive js to obeserve all tweets (around 25 max are loaded and if the data changes this code will also run)
  try {
    document.arrive(`[data-testid="tweet"]`, arriveOptions, (tweet)=>{
      findLinks();
      document.addEventListener('scroll', function() {
        findLinks();
      });
    })
   
  } catch (error) {
    console.log("timeline or children error")
    console.log(error)
  }
}
