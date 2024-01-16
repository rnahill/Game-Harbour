const searchForm = document.querySelector("#form")
const searchInput = document.querySelector("#search-form")
const addGame = document.querySelector('#addGameBtn')

const doApiCall = async (event) => {
    event.preventDefault();
    const title = searchInput.value;
    console.log(title);
    if(title){
        window.location = '/search/' + title;
    }
   
}

const addGameHandle = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#gameName").value;
    const publisher = document.querySelector("#gamePublisher").value;
    const platform = document.querySelector("#gamePlatform").value;

    if (name && publisher && platform) {
        const response = await fetch('/api/games/addGame', {
            method: 'POST',
            body: JSON.stringify({name, publisher, platform}),
            headers: { 'Content-Type': 'application/json' },
        });
        if(response.ok){
            console.log("Game added");
        } else {
            console.log(response.status)
        }
    }


}

searchForm.addEventListener('submit', doApiCall);

addGame.addEventListener('click', addGameHandle)