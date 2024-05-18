import { characterDisplaySection } from "./character.js";
export function calculateMD5(input) {
    return md5(input);
}


// Example usage
export const publicKey = '9297374db5a404fa147da3ab86fc06e7';
export const privateKey = '0cdde1b9b3dc279ff513ac4d660578ab5ac3df38';
export const apiBaseURL = "https://gateway.marvel.com/v1/public";
//const apiSearchURL="https://gateway.marvel.com:443/v1/public/characters?nameStartsWith="
export let listSection=document.getElementById("listSection");
export let characterSection=document.getElementById("characterSection");
let offsetNum=0;
let limitNum=24;
let prevEle=document.getElementById("previous");
let nextEle=document.getElementById("next");
let favHeroList=[];

function createURL() {
    const ts = Date.now();
    const params = new URLSearchParams({
      ts: ts,
      apikey: publicKey,
      hash: calculateMD5(ts+privateKey+publicKey),
      limit:24,
      offset:offsetNum
    });
    const endpoint = `${apiBaseURL}/characters?`; 
    const url = endpoint + params;
    return url;
  }
//console.log(createURL())  ;
export let listsEle=document.getElementById("listOfCharaters");
async function fetchData(){
    characterSection.style.display='none';
    const response=await fetch(createURL()).then((response)=>{
         return response.json();
    }).then((data)=>{
        //console.log(data)
        let characters=data.data.results;
        console.log(characters)
        listsEle.innerHTML=''
        for(let character of characters){
            createCard(character,listsEle)
        }
        if(offsetNum==0){
            prevEle.style.display='none'
        }
        else{
            prevEle.style.display='inline'
        }
    }).catch((error)=>{
        console.log(error)
    })
}
fetchData();
function createCard(character,listsEle){
    let divEle=document.createElement("div");
    divEle.classList.add("card")
    let imgEle=document.createElement("img");
    imgEle.src=character.thumbnail.path+".jpg";
    //console.log(character.thumbnail.path);
    imgEle.classList.add("card-img-top");
    divEle.appendChild(imgEle);
    let cardBody=document.createElement("div");
    cardBody.classList.add("card-body")
    let name=document.createElement("h3")
    name.classList.add("card-title");
    name.textContent=character.name;
    cardBody.appendChild(name);
    let pEle=document.createElement("p");
    pEle.textContent=character.description;
    //console.log(character.description);
    pEle.classList.add("card-text");
    cardBody.appendChild(pEle);
    let favBtn=document.createElement("button")
    favBtn.classList.add("btn-primary")
    favBtn.textContent="Add to My Fav tab";
    favBtn.addEventListener("click",function(){
        favHeroList.push(character.id);
        //console.log(favHeroList)
        favBtn.textContent="Added to My Fav tab"
        favBtn.classList.remove("btn-primary")
        favBtn.classList.add("btn-secondary");
    })
    cardBody.appendChild(favBtn);
    divEle.appendChild(cardBody);
    let learnMore=document.createElement("button")
    learnMore.textContent="Learn More";
    learnMore.classList.add("btn-link");
    learnMore.classList.add("btn")
    learnMore.addEventListener("click",function(){
        characterDisplaySection(character);
    })
    // divEle.addEventListener("click",function(){
    //     
    // })
    divEle.appendChild(learnMore);
    listsEle.appendChild(divEle);
}
prevEle.addEventListener("click",function(){
    offsetNum=offsetNum-limitNum;
    fetchData();
})
nextEle.addEventListener("click",function(){
    offsetNum=offsetNum+limitNum;
    fetchData();
})
let goBack =document.getElementById("goBack");
goBack.addEventListener("click",function(){
    listSection.style.display='block';
    fetchData();
})
let searchIndex=document.getElementById("SearchField");
let prev_value='';
let search_button=document.getElementById("searchButton")
search_button.addEventListener("click",function(){
    characterSection.style.display='none';
    console.log(createSearchURL());
    fetch(createSearchURL()).then((response)=>{
         return response.json();
    }).then((data)=>{
        console.log(data)
        if(data.data.results.length>0){
            let characters=data.data.results;
            //console.log(characters)
            listsEle.innerHTML=''
            for(let character of characters){
               createCard(character,listsEle)
           }
           searchIndex.value='';
        }
    }).catch((error)=>{
        console.log(error)
    })
    
})
function createSearchURL() {
    const ts = Date.now();
    const params = new URLSearchParams({
      nameStartsWith:searchIndex.value,
      ts: ts,
      apikey: publicKey,
      hash: calculateMD5(ts+privateKey+publicKey),
      limit:24,
      offset:offsetNum
    });
    const endpoint = `${apiBaseURL}/characters?`; 
    const url = endpoint + params;
    return url;
  }

export default favHeroList;
