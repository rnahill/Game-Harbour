const searchForm = document.querySelector("#form")
const searchInput = document.querySelector("#search-form")
const addGame = document.querySelectorAll('.addGameBtn')
const returnProfile = document.querySelector('#returnProfile')

const doApiCall = async (event) => {
    event.preventDefault();
    const title = searchInput.value;
    console.log(title);
    if(title){
        window.location = '/search/' + title;
    }
   
};

const doReturn = async (event) => {
    event.preventDefault();
    document.location.replace('/profile');
};

const addGameHandle = async (event) => {
    event.preventDefault();
    const name = document.querySelector("#gameName").textContent;
    const ogRelease = document.querySelector("#gamePublisher").textContent;
    const platform = document.querySelector("#gamePlatform").textContent;
    console.log(name, ogRelease, platform)

    if (name && ogRelease && platform) {
        const response = await fetch('/api/games/addGame', {
            method: 'POST',
            body: JSON.stringify({name, ogRelease, platform}),
            headers: { 'Content-Type': 'application/json' },
        });
        if(response.ok){
            console.log("Game added");
        } else {
            console.log(response.status)
        }
    }


};

searchForm.addEventListener('submit', doApiCall);

returnProfile.addEventListener('click', doReturn)

if(addGame) {
    for (var i = 0; i<addGame.length; i++){
        addGame[i].addEventListener('click', addGameHandle);
    }
};
