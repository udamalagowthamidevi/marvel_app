import { listSection } from "./script.js";
import {apiBaseURL,privateKey,publicKey,calculateMD5 } from "./script.js";
let comicSection=document.getElementById("comicSection");
let seriesSection=document.getElementById("seriesSection");
let eventsSection=document.getElementById('eventsSection');
export function characterDisplaySection(character){
     listSection.style.display='none';
     characterSection.style.display='block';
     let imgEle=document.getElementById("imageSrc");
     imgEle.src=character.thumbnail.path+".jpg";
     let nameElement=document.getElementById("heroName");
     nameElement.textContent=character.name;
     let descriptionEle=document.getElementById("description");
     descriptionEle.textContent=character.description;
     let comicHeading=document.createElement("h4");
     fetch(createComicsUrl(character.id)).then((response)=>{
        return response.json()
     }).then((data)=>{
        if(data.data.results.length>0){
            for(let comic of data.data.results){
                createComic(comic);
            }
        }else{
            let p_ele=document.createElement("p");
            p_ele.textContent='No Series Availavle As of now';
            p_ele.style.color='white';
            comicSection.appendChild(p_ele);  
        }

        
     })
     fetch(creatSeriesUrl(character.id)).then((response)=>{
        return response.json();
     }).then((data)=>{
        if(data.data.results.length>0){
            for(let series of data.data.results){
                createSeriesOrEvent(series,"series");
            }
        }
        else{
            let p_ele=document.createElement("p");
            p_ele.textContent='No Series Availavle As of now';
            p_ele.style.color='white';
            seriesSection.appendChild(p_ele);  
        }

        
     })
     fetch(createEventsUrl(character.id)).then((response)=>{
        console.log(response)
        return response.json();
     }).then((data)=>{
        console.log(data)
        if(data){
            if(data.data.results.length>0){
                for(let event of data.data.results){
                    createSeriesOrEvent(event,"event")
                }
            }
            else{
                let p_ele=document.createElement("p");
                p_ele.textContent='No Events Availavle As of now';
                p_ele.style.color='white';
                eventsSection.appendChild(p_ele);
            }

        }
     })

}
function createComicsUrl(id){
    const ts = Date.now();
    const params = new URLSearchParams({
      //characterId:id,
      ts: ts,
      apikey: publicKey,
      hash: calculateMD5(ts+privateKey+publicKey),
    });
    const endpoint = `${apiBaseURL}/characters/${id}/comics?`; 
    const url = endpoint + params;
    //console.log(url)
    return url;
}
function creatSeriesUrl(id){
    const ts = Date.now();
    const params = new URLSearchParams({
      //characterId:id,
      ts: ts,
      apikey: publicKey,
      hash: calculateMD5(ts+privateKey+publicKey),
    });
    const endpoint = `${apiBaseURL}/characters/${id}/series?`; 
    const url = endpoint + params;
    //console.log(url)
    return url;
}
function createEventsUrl(id){
    const ts = Date.now();
    const params = new URLSearchParams({
      //characterId:id,
      ts: ts,
      apikey: publicKey,
      hash: calculateMD5(ts+privateKey+publicKey),
    });
    const endpoint = `${apiBaseURL}/characters/${id}/events?`; 
    const url = endpoint + params;
    //console.log(url)
    return url;

}
function createComic(comic){
    let comicEle=document.createElement("div");
    comicEle.classList.add("card");
    let imageEle=document.createElement("img");
    imageEle.classList.add("card-img-top");
    imageEle.src=comic.images[0]["path"]+"."+comic.images[0]["extension"];
    comicEle.appendChild(imageEle);
    let bodyEle=document.createElement("div");
    bodyEle.classList.add("card-body");
    let h5Ele=document.createElement("h5");
    h5Ele.classList.add("card-title");
    h5Ele.textContent=comic.title;
    bodyEle.appendChild(h5Ele);
    let p_ele=document.createElement("p");
    p_ele.textContent=comic.description;
    p_ele.classList.add("card-text");
    //bodyEle.appendChild(p_ele);
    comicEle.appendChild(bodyEle);
    comicSection.appendChild(comicEle);
}
function createSeriesOrEvent(serie,sectionName){
    let serEle=document.createElement("div");
    serEle.classList.add("card");
    let imageEle=document.createElement("img");
    imageEle.classList.add("card-img-top");
    imageEle.src=serie.thumbnail.path+".jpg";
    serEle.appendChild(imageEle);
    let bodyEle=document.createElement("div");
    bodyEle.classList.add("card-body");
    let h5Ele=document.createElement("h5");
    h5Ele.classList.add("card-title");
    h5Ele.textContent=serie.title;
    bodyEle.appendChild(h5Ele);
    let p_ele=document.createElement("p");
    p_ele.textContent=serie.description;
    p_ele.classList.add("card-text");
    //bodyEle.appendChild(p_ele);
    serEle.appendChild(bodyEle);
    if(sectionName=='event'){
        eventsSection.appendChild(serEle)
    }
    else{
        seriesSection.appendChild(serEle);
    }
    

}
