let root = document.documentElement;

window.onload = function () {
  Get().then((value) => {
    App(value);
  });
};

function App(result) {
}


function changeElementStatus(key, status) {
  if (status == "shown") {
      if(key == explore || key == communities) // flex by design for these elements
          root.style.setProperty(`--${key}`, "flex");
      else
          root.style.setProperty(`--${key}`, "inline");
  } else {
      root.style.setProperty(`--${key}`, "none"); 
  }
}
