// STEP 1
const API_KEY = "8TyNOS31SQ5tpKuDlnF9aorNfeTjD9IDPpnod7YDCQpO5hmphBpL0wos";
const imgUrl = "https://api.pexels.com/v1/search?";
const vidUrl = "https://api.pexels.com/videos/search?";
const menu= document.querySelector(".menu-icon");
const dropbar= document.querySelector(".dropbar");

const method = {
  headers: {
    Authorization: `${API_KEY}`,
  },
};

const cards = document.querySelector(".cards-container");
const search = document.querySelector(".search");
const container = document.querySelector(".cards-container");

let searchType= null;

function saveType(event) {

   searchType= event;
   console.log(event);
}

function navItemClick(event) {
   const type= event;
    
   dropbar.classList.add("show-dropdown");
   showMenu= false;

    let e = container;

     //e.firstElementChild can be used.
     let child = e.lastElementChild;
     while (child) {
         e.removeChild(child);
         child = e.lastElementChild;
     }


    if( type === "homenav"){
      fetchData("latest", "home");
    }
    else if( type === "imagesnav"){
      fetchData("trending","images");
    }
    else{
      fetchData("trending","videos")
    }
}

let currSelector = null;

fetchData("people+nature", "home");

search.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
    const input= event.target.value;

    let e = container;

     //e.firstElementChild can be used.
     let child = e.lastElementChild;
     while (child) {
         e.removeChild(child);
         child = e.lastElementChild;
     }

     fetchData(input,`${searchType}`);
     event.target.value= "";

     dropbar.classList.add("show-dropdown");
     showMenu= false;
    }
  });

async function fetchData(query, content) {
  // search for photos
  if (content === "images") {
    // fetch data
    try {
      
      const res = await fetch(`${imgUrl}query=${query}&per_page=30`, method);
      const data = await res.json();
      console.log("images");
      console.log(data);
      bindDataImage(data.photos);
      //error handling
    } catch (error) {
      console.log("Error in fetching data");
    }
  } // search for videos
  else if (content === "videos") {
    //fetching data
    try {
      const res = await fetch(`${vidUrl}query=${query}&per_page=30`, method);
      const data = await res.json();
      console.log(data);
      bindDataVideo(data.videos);
    } catch (error) {
      // error handling
      console.log("Error in fetching data");
    }
  } // search for both
  else {
    try {
      const res = await fetch(`${imgUrl}query=${query}&per_page=30`, method);
      const data = await res.json();
      console.log(data);
      bindDataImage(data.photos);
      //error handling
    } catch (error) {
      console.log("Error in fetching data");
    }

    try {
      const res = await fetch(`${vidUrl}query=${query}&per_page=30`, method);
      const data = await res.json();
      console.log(data);
      bindDataVideo(data.videos);
    } catch (error) {
      // error handling
      console.log("Error in fetching data");
    }
  }
}



function bindDataImage(result) {

  const contentCard= document.querySelector(".imageContent");
  
  result.forEach((element) => {
    const content= contentCard.content.cloneNode(true);
   
    // const imgCard= document.content.querySelector("images");
    // imgCard.src = `${element.src.portrait}`;
    content.querySelector("img").src= `${element.src.portrait}`;
    content.querySelector("button").addEventListener("click", () => {
      const sources= `${element.src.portrait}`;
      window.open(sources);
      
    });

    content.querySelector(".click_by").innerHTML= `${element.photographer}`;
    cards.appendChild(content);

  });

}

function bindDataVideo(result) {

  const contentCard= document.querySelector(".videoContent");

  result.forEach((element) => {
    const content= contentCard.content.cloneNode(true);
  
    // const vidCard= document.createElement("video");
    // vidCard.innerHTML= `<source src="${element.video_files[2].link}" type="video/mp4" >`;


   content.querySelector("video").src= `${element.video_files[2].link}`;
  
    
    cards.appendChild(content);
  });


}

const backGround = document.body;
let pageMode= false;
const btn= document.querySelector(".switch-mode");


function switchMode() {

  backGround.classList.toggle("dark-mode");
    
    if( pageMode === false ){
      
      btn.innerHTML = "light_mode"
      
    }
    else{
      
      btn.innerHTML = "dark_mode"
    }

    pageMode = !pageMode;

}

let showMenu= false;

menu.addEventListener("click", ()=> {
  if( showMenu === false){
    dropbar.classList.remove("show-dropdown");
  }
  else{
    dropbar.classList.add("show-dropdown");
  }

  showMenu= !showMenu
})

function myFunction(){
  if( screen.width > 500 ){
    dropbar.classList.add("show-dropdown");
  }
  showMenu= false;
}


