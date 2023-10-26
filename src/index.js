// Code here
const baseUrl='http://localhost:3000';

    const beerTitle = document.getElementById('beer-name');
    const beerImage = document.getElementById('beer-image');
    const beerDescription = document.getElementById('beer-description');
    const reviewList = document.getElementById('review-list');
    const beerList = document.getElementById("beer-list");

    const descriptionForm = document.getElementById('description-form');
    const descriptionTextarea = document.getElementById('description');

    const reviewForm = document.getElementById('review-form');
    const reviewTextarea = document.getElementById('review');
  
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
    .then(data=>{
        beerList.innerHTML = '';
        data.forEach(beer=>{
                
        const listItem = document.createElement("li");
        listItem.textContent=beer.name;
        listItem.addEventListener('click', () => fetchBeerDetails(beer.id));
        beerList.appendChild(listItem);
    });
   })
   .catch(error => console.error('Error fetching beer list:', error));
}
//The below function updates form description
function updateDescription(updatedDescription){
const beerId=1;
        fetch(`${baseUrl}/beers/${beerId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ description: updatedDescription }),
          })
            .then(response => response.json())
            .then(data => {
              beerDescription.textContent = data.description;
            })
            .catch(error => console.error('Error updating description on the server:', error));      
}

//The following functions are used to update review comments 
function updateReviewList(reviews) {
    reviewList.innerHTML = '';
    reviews.forEach(review => {
      const listItem = document.createElement('li');
      listItem.textContent = review;
      reviewList.appendChild(listItem);
    });
  }
  
function updateReviews(review){
    const beerId = 1;
    const currentReviews = Array.from(reviewList.children).map(li => li.textContent);
    const updatedReviews = [review, ...currentReviews];
    fetch(`${baseUrl}/beers/${beerId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reviews: updatedReviews }),
    })
      .then(response => response.json())
      .then(data => {
        updateReviewList(data.reviews);
      })
      .catch(error => console.error('Error updating review on the server:', error));
}

document.addEventListener('DOMContentLoaded',() => {

   fetchBeers();
   addBeersList(); 

  descriptionForm.addEventListener('submit', event => {
        event.preventDefault();
        const updatedDescription = descriptionTextarea.value;
        updateDescription(updatedDescription);
   });

  reviewForm.addEventListener('submit', event => {
        event.preventDefault();
        const updatedReview = reviewTextarea.value;
        updateReviews(updatedReview);
    });

    listItem.addEventListener("submit",(event)=>{
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
