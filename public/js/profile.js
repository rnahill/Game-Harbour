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
