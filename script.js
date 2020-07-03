//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.className = "grid";
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  
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

