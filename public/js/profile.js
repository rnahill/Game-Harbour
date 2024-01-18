const viewReview = document.querySelector('#viewReviewBtn')

const viewReviewHandler = async (event) => {
  event.preventDefault();
  console.log(event);
}

document
  .querySelector('#profile-search-btn')
  .addEventListener('click', () => {
    document.location.replace('/search');
});

viewReview.addEventListener('click', viewReviewHandler)

// Saving a review
const saveReviewBtn = document.querySelector("#saveReviewBtn");


const saveReview = async (event) => {
  event.preventDefault();
  const reviewText = document.querySelector("#floatingTextarea").value;

  console.log(reviewText);

};

saveReviewBtn.addEventListener('click', saveReview); 