const searchForm = document.querySelector("#form")
const searchInput = document.querySelector("#search-form")


const doApiCall = async (event) => {
    event.preventDefault();
    const title = searchInput.value;
    console.log(title);
    if(title){
        window.location = '/search/' + title;
    }
   
}

searchForm.addEventListener('submit', doApiCall);

