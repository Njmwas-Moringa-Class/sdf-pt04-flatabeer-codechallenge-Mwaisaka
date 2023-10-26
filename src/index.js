// Code here
document.addEventListener('DOMContentLoaded',() => {

    const baseUrl='http://localhost:3000/beers';

    const beerTitle = document.getElementById('beer-name');
    const beerImage = document.getElementById('beer-image');
    const beerDescription = document.getElementById('beer-description');
    const reviewList = document.getElementById('review-list');

    //See the full details of the firt beer (i.e. its name, image, description, and reviews) when the page loads.
    //Fetch the data of the beer from the server.
   
    fetch(baseUrl)
    .then(response =>response.json())
    .then((beers) => {

        //The folowing code displays beer one.
        beerTitle.textContent = beers[0].name;
        beerImage.src = beers[0].image_url;
        beerDescription.textContent = beers[0].description;
        reviewList.textContent = beers[0].reviews;
    });
    fetch(baseUrl)
    .then(res=>res.json())
    .then((data)=>{
        data.forEach(beer=>{
        //listItem="";
        const beerList = document.getElementById("beer-list");
        const listItem = document.createElement("li");
        //const listItem = document.querySelectorAll("li>ul");
        
        listItem.textContent=beer.name;
        beerList.appendChild(listItem);
    });
});
});