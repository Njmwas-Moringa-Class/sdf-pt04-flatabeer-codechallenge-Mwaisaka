// Code here
const baseUrl='http://localhost:3000';

    const beerTitle = document.getElementById('beer-name');
    const beerImage = document.getElementById('beer-image');
    const beerDescription = document.getElementById('beer-description');
    const reviewList = document.getElementById('review-list');

//The below function fetches full details of the firt beer (i.e. its name, image, description, and reviews) from the server when the page loads.

function fetchBeers(){
    fetch(`${baseUrl}/beers`)
    .then(response =>response.json())
    .then((beers) => {

        //The folowing code displays beer one.
        beerTitle.textContent = beers[0].name;
        beerImage.src = beers[0].image_url;
        beerDescription.textContent = beers[0].description;
        reviewList.textContent = beers[0].reviews;
    })
    .catch(error=>console.error("Error in fetching beer details",error));
   }
//The below function diplays the list of beers on the 'nav' after fetching from the server
   function addBeersList(){
    fetch(`${baseUrl}/beers`)
    .then(res=>res.json())
    .then((data)=>{
        
        data.forEach(beer=>{
        
        const beerList = document.getElementById("beer-list");
        const listItem = document.createElement("li");
              
        listItem.textContent=beer.name;
        beerList.appendChild(listItem);

    });
   });
}

document.addEventListener('DOMContentLoaded',() => {

   fetchBeers();
   addBeersList(); 

    listItem.addEventListener("submit",()=>{
        event.preventDefault();
        const beerName = document.getElementById("beer-name");
        beerName.textContent=beer.name;
        beerImage = beer.image_url;

        const beerDescription = document.getElementById("beer-description");
        beerDescription.textContent = beer.description;
        reviewList.textContent = beer.reviews;
        reviewList.textContent = bear[0].reviews;
    });
});
