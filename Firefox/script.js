let root = document.documentElement;

window.onload = function () {
  GetAllData().then((value) => {
    App(value);
  });
};

function App(hideOptions) {
  let twitterElements = Object.keys(hideOptions);
  twitterElements.forEach(twitterElement =>{
    changeElementStatus(twitterElement, hideOptions[twitterElement]);
  })
}


function changeElementStatus(key, status) {
  if (status == "shown") {
      if(key == explore || key == communities) // flex by design for these elements
          root.style.setProperty(`--${key}`, "flex");
      else
          root.style.setProperty(`--${key}`, "inline");
  } else {
        root.style.setProperty(`--${key}`, "none"); 
        FailSafeChecker(key);
  }
}