import favHeroList from "./script.js";
import { listsEle,apiBaseURL,privateKey,publicKey,calculateMD5 } from "./script.js";
let favTab=document.getElementById("favHeroTab")
favTab.addEventListener("click",function(){
    listsEle.innerHTML='';
    for(let id of favHeroList){
        fetch(createFavUrl(id)).then((response)=>{
            return response.json()
        }).then((data)=>{
            if(data){
                createfavCard(data.data.results[0],listsEle)
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
    
})
function createFavUrl(id){
    const ts = Date.now();
    const params = new URLSearchParams({
      //characterId:id,
      ts: ts,
      apikey: publicKey,
      hash: calculateMD5(ts+privateKey+publicKey),
    });
    const endpoint = `${apiBaseURL}/characters/${id}?`; 
    const url = endpoint + params;
    //console.log(url)
    return url;
}
function createfavCard(character,listsEle){
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
    divEle.appendChild(cardBody)
    let removeBtn=document.createElement("div")
    removeBtn.textContent="Remove"
    removeBtn.addEventListener("click",function(){
        let removeIndex=-1
        for(let i in favHeroList){
            if(favHeroList[i]==character.id){
                removeIndex=i;
                favHeroList.splice(removeIndex,1);
                break;
            }

        }
        updatePageOnRemove();
    })
    removeBtn.classList.add("btn-danger");
    divEle.appendChild(removeBtn);
    listsEle.appendChild(divEle);
}
function updatePageOnRemove(){
    listsEle.innerHTML='';
    for(let id of favHeroList){
        fetch(createFavUrl(id)).then((response)=>{
            return response.json()
        }).then((data)=>{
            if(data){
                createfavCard(data.data.results[0],listsEle)
            }
        }).catch((error)=>{
            console.log(error);
        })
    }
}




