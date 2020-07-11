//You can edit ALL of the code here
let searchBox;
let allEpisodes;
function setup() {
  //allEpisodes = getAllEpisodes();
  //makePageForEpisodes(allEpisodes);

searchBox = document.querySelector("#searchInput");
searchBox.addEventListener("keyup", searchEpisodes);

}

function searchEpisodes(){
 // let searchBox = document.querySelector("#searchInput");
  console.log(searchBox.value);
  //let allEpisodes = getAllEpisodes();
  let filteredEpisodes = allEpisodes.filter(episode =>
    episodeMatchesQuery(episode, searchBox.value));

    makePageForEpisodes(filteredEpisodes);
    console.log(filteredEpisodes.length);
}

function episodeMatchesQuery(ep, searchWord){
  if(ep.name.toLowerCase().includes(searchWord.toLowerCase()) || ep.summary.toLowerCase().includes(searchWord.toLowerCase())){

  return true;
}else{
  return false;
}
}

fetch("https://api.tvmaze.com/shows/82/episodes")
  .then(function(result){
 return result.json();
 
})
.then(function(episodesAll){
  console.log(episodesAll);
  allEpisodes = episodesAll;
  makePageForEpisodes(allEpisodes);
});


function makePageForEpisodes(episodeList) {
  console.log("makePageForEpisodes" + episodeList.length )
  const rootElem = document.getElementById("root");
  rootElem.textContent = "";
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  let episodeDiv = document.createElement("div");
  episodeDiv.className = "mygrid";
  rootElem.appendChild(episodeDiv);
  
  for (i = 0; i < episodeList.length; i++) {
    console.log(episodeList[i].name, episodeList[i].image.medium, episodeList[i].summary);
    console.log(episodeList[i].season, episodeList[i].number);

   let card = document.createElement("article");
   card.className = "myCard";
   rootElem.appendChild(card); 

   let title = document.createElement("h3");
   title.innerText = episodeList[i].name;
   card.appendChild(title);
  
   let episode = formatEpisodeCode(episodeList[i].season, episodeList[i].number);
   //let episode = `E${episodeList[i].season}S${episodeList[i].number}`;

   let episodeNumber = document.createElement("h3");
   episodeNumber.innerText = episode;
   card.appendChild(episodeNumber);

   
  

   let image = document.createElement("img");
   image.src = episodeList[i].image.medium;
   card.appendChild(image);

   let para = document.createElement("p");
   para.innerHTML = episodeList[i].summary;
   para.className = "mySummary";
   card.appendChild(para);

   let apiLink = document.createElement("a");
   //let api = apiLink "target=_blank";
   apiLink.innerText = episodeList[i]._links.self.href;
   card.appendChild(apiLink);
  
   apiLink.href = episodeList[i]._links.self.href;
   
  
  }
}

function formatEpisodeCode(seasonNumber, episodeNumber){
  //let seasonPadding = "";
  //let episodePadding = "";
  if(seasonNumber < 10){
   //seasonPadding = "0";
   seasonNumber = "0".concat(seasonNumber);
}
if (episodeNumber < 10){
  //episodePadding = "0";
  episodeNumber = "0".concat(episodeNumber);
}
//return "S" + seasonPadding + seasonNumber + "E" + episodePadding + episodeNumber;
return "S" + seasonNumber + "E" + episodeNumber;
}

window.onload = setup;

