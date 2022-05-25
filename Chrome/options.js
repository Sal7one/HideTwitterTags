
let optionsButtons = document.querySelectorAll("[data-num]");

Get().then((savedData) => {
    if(Object.keys(savedData).length> 0)
      UpdateButtonStatus(savedData);
    });

optionsButtons.forEach((option) => {
    let btnId = option.getAttribute("id");
    option.addEventListener("click", function () {
      if (option.checked) {
        console.log(btnId)
        Set(btnId, "hidden");
        refreshRequest();
      } else {
        Set(btnId, "shown");
        refreshRequest();
      }
    });
  });


function UpdateButtonStatus(savedData){
    let keys = Object.keys(savedData);
    keys.forEach(key =>{
        let button = document.querySelector(`#${key}`);
        
        if(savedData[key] == "hidden")
        button.setAttribute("checked", true);
        else
        button.setAttribute("unchecked", true);
    })
  }

async function refreshRequest(){
    let hiddenMessage = document.querySelector("#messageDiv");
   if( await refresh())
    hiddenMessage.style.display = "block";
  }

