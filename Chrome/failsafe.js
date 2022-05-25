
// In case Twitter changes thier styles
function FailSafeChecker(key){
  
    // Supported languages are English, Arabic, German, Spanish
    searchlangs = [ `[aria-label="Search Twitter"]`,`[aria-label="البحث في تويتر"]`,`[aria-label="Twitter durchsuchen"]`,`[aria-label="Buscar en Twitter"]` ];
    taglangs = [`[aria-label="Timeline: Trending now"]`,  `[aria-label="الخطّ الزمنيّ: المتداوَل الآن"]`,`[aria-label="Timeline: Aktuelle Trends"]`,`[aria-label="Cronología: Tendencias del momento"]` ];
    whotofollowlangs = [`[aria-label="Who to follow"]` , `[aria-label="اقتراحات المتابعة"]`,`[aria-label="Wem folgen?"]`,`[aria-label="A quién seguir"]` ];
    relventppllangs = [`[aria-label="Relevant people"]`, `[aria-label="الأشخاص ذوو الصلة"]`,`[aria-label="Relevante Personen"]`,`[aria-label="Personas relevantes"]`, `[aria-label="प्रासंगिक लोग"]`,`[aria-label="Подходящие люди"]`, `[aria-label="Пов’язані люди"]`,` [aria-label="Persone pertinenti"]`, `[aria-label="関連性の高いアカウント"]`];
    footerlangs = [`[aria-label="Footer"]`, `[aria-label="الشريط السُفلي"] `,`[aria-label="Fußzeile"]`,`[aria-label="Pie de página"]`];
    explorelangs = [`a[href="/explore"]`];
    explorelangs = [`a[href="/explore"]`];
    element = [0];
    
    // Selected elemnt
    switch(key){
      case tags: element = taglangs;
      break;
      case whotofollow: element =  whotofollowlangs;
      break;
      case relventppl: element =  relventppllangs;
      break;
      case  footer: element = footerlangs;
      break; 
      case search: element =  searchlangs;
      break; 
      case explore: element =  explorelangs;
      break;
    default: return
    }
  
    if(key === tags){
      try {
        autoborderhider();
        setTimeout(()=>{
          autoborderhider();
         },950)
   
  
      } catch (error) {
        console.log("error in backup tags border");
        console.log(error);
      }
      
    }
  
    if(key === explore){
      explore =  document.querySelector(`a[href="/explore"]`);
      if(explore == null)
      document.arrive(`a[href="/explore"]`, (Explore)=>{Explore.style.display = "none"});
      else
      explore.style.display = "none";
    }else if(key === communities){
      communities =  document.querySelector(`a[href*="/communities"]`);
      if(communities == null)
      document.arrive(`a[href*="/communities"]`, (communities)=>{communities.style.display = "none"});
      else
      communities.style.display = "none";
  
    }else{
  
    for(j = 0; j < element.length; j++){
    //Is the element here
    selectedElement = document.querySelector(element[j]);
    if(selectedElement == null){
      // No...Wait for it
      document.arrive(element[j], function () {
        // Element was already loaded 
          this.parentNode.style.setProperty("display","none","important");
          try { 
             parentofelemnt =  findsidebar(this);
            parentofelemnt.style.setProperty("display","none","important");
          } catch (error) {
          }
        document.unbindArrive(element[j]);
      });
    }
    else{
        selectedElement.parentNode.style.setProperty("display","none","important");
        try { 
           parentofelemnt =  findsidebar(selectedElement);
          parentofelemnt.style.setProperty("display","none","important");
        } catch (error) { }
    }
    }
  }
  }
  
  function findsidebar(element, BeforeSideBar){
    sidebar = document.querySelector(".css-1dbjc4n.r-1l5qxre.r-m611by");
    if(element != sidebar){
      BeforeSideBar = element;
      element = element.parentNode;
      return findsidebar(element, BeforeSideBar);
    }
    return BeforeSideBar;
  }
  
  
  function autoborderhider(){
    tagselemntwhite =  document.querySelector(".css-1dbjc4n.r-1ihkh82.r-1in3vh1.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x");
    tagselemntDark =  document.querySelector(".css-1dbjc4n.r-1uaug3w.r-1uhd6vh.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x");
    tagselemntblack =  document.querySelector(".css-1dbjc4n.r-1ysxnx4.r-k0dy70.r-1867qdf.r-1phboty.r-rs99b7.r-1ifxtd0.r-1udh08x");
   if(tagselemntwhite){
    tagselemntwhite.style.setProperty("border-width","0px","important");
    tagselemntwhite.style.setProperty("border-color","transparent","important");
   }
   if(tagselemntDark){
    tagselemntDark.style.setProperty("border-width","0px","important");
    tagselemntDark.style.setProperty("border-color","transparent","important");
   }
   if(tagselemntblack){
    tagselemntblack.style.setProperty("border-width","0px","important");
    tagselemntblack.style.setProperty("border-color","transparent","important");
   }
  }