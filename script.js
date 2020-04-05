

function api(url)
{
    let settings = {
        "method": "GET"
      };

      fetch( url, settings )
        .then( response => {
            if( response.ok ){
                return response.json();
            }

            throw new Error( response.statusText );
        })
        .then( responseJSON => {
            displayResults(responseJSON);
        })
        .catch( err => {
            console.log( err );
        });

}

function displayResults( data ){
    let results = document.querySelector( '.results' );

    results.innerHTML = "";

    let watch= "https://www.youtube.com/watch?v=";

    for( let i = 0; i < data.items.length; i ++ ){

        results.innerHTML += `

        <div class="col-sm-6">
        <div class="card" style="width: 18rem;">
        <img class="card-img-top" src="${data.items[i].snippet.thumbnails.default.url}">
        <div class="card-body">
            <a href="${ watch + data.items[i].id.videoId}" target="_blank" class="card-title">${data.items[i].snippet.title}</a>
        </div>
        </div>
        </div>
        
        `;
   
    }

    console.log("Previuous: " + data.prevPageToken);
    console.log("Next: " + data.nextPageToken);

    if(data.hasOwnProperty('prevPageToken')) {

        console.log("Previous: " + data.prevPageToken);

        results.innerHTML += `
            '<button id="btnPreviuos"> Previos Videos </button>'

        `;
        let btnPreviuos = document.getElementById("btnPreviuos");
        btnPreviuos.addEventListener('click', (event) => {
            let variableSearch = document.getElementById("searchText").value;
            let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBMlAV67Bg4E60LNEPals6KX7jOJraVHn0&type=video&maxResults=10&q=" + variableSearch + '&pageToken=' + data.prevPageToken;
            api(url);

        });

    }
    if(data.hasOwnProperty('nextPageToken')) {

        console.log("Next: " + data.nextPageToken);
        
        results.innerHTML += `
        '<button id="btnNext"> Next 10 Videos </button>'

        `;
        let btnNext = document.getElementById("btnNext");
        btnNext.addEventListener('click', (event) => {
            let variableSearch = document.getElementById("searchText").value;
            let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBMlAV67Bg4E60LNEPals6KX7jOJraVHn0&type=video&maxResults=10&q=" + variableSearch + '&pageToken=' + data.nextPageToken;
            api(url);

        });
    }
}




function init()
{
    let btnSearch = document.getElementById("buttonSearch");


    btnSearch.addEventListener('click', (event) => {

        let variableSearch = document.getElementById("searchText").value;
        
        let url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyBMlAV67Bg4E60LNEPals6KX7jOJraVHn0&type=video&maxResults=10&q=" + variableSearch;
        api(url);
    
    })
    

}

init();