let root = document.documentElement;

window.onload = function () {
  Get().then((value) => {
    App(value);
  });
};

function App(result) {
  key = [result[search], result[tags], result[whotofollow], result[relventppl], result[footer], result[explore], 
  result[topics], result[communities]];

  console.log(key)
}

function changepagestatus(key, status) {
  if (status == "shown") {
    if(key == explore || key == communities)
    root.style.setProperty(`--${key}`, "flex");
    else
    root.style.setProperty(`--${key}`, "inline");
  } else {
   root.style.setProperty(`--${key}`, "none");
    // FailSafeChecker(key)
  }
}
