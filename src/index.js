// Code here

//Base URL 
const baseUrl='http://localhost:3000';

//List of parameters used in the code
const elements = {
  beerTitle : document.getElementById('beer-name'),
  beerImage : document.getElementById('beer-image'),
  beerDescription : document.getElementById('beer-description'),
  reviewList : document.getElementById('review-list'),
  beerList : document.getElementById("beer-list"),
  descriptionForm : document.getElementById('description-form'),
  descriptionTextarea : document.getElementById('description'),
  reviewForm : document.getElementById('review-form'),
  reviewTextarea : document.getElementById('review'),
};

const {
  beerTitle,
  beerImage,
  beerDescription,
  reviewList,
  beerList,
  descriptionForm,
  descriptionTextarea,
  reviewForm,
  reviewTextarea,
}=elements;
  
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
        listItem.addEventListener('click', () => fetchBeers(beer.id));
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

//The following two functions are used to capture and update review comments 
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

//The start of DOMContentLoaded event
document.addEventListener('DOMContentLoaded',() => {


   fetchBeers(); //Function call to fetchBeers method 
   addBeersList(); //Function call to addBeersList method

   //Event handler for update beer button click event
  descriptionForm.addEventListener('submit', event => {
        event.preventDefault();
        const updatedDescription = descriptionTextarea.value;
        updateDescription(updatedDescription);
   });

   //Event handler for add review button click event
  reviewForm.addEventListener('submit', event => {
        event.preventDefault();
        const updatedReview = reviewTextarea.value;
        updateReviews(updatedReview);
    });
});
