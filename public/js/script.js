//Github API Script

document.getElementById("languageList").addEventListener("click", function(e) {
    if (e.target && e.target.nodeName == "LI") {
        var language = e.target.textContent;
    }
});

const languageChoice = document.getElementById('languageSelect');
languageChoice.addEventListener('click', function(e) {
    console.log('button was clicked');
    var language = "python";
    event.preventDefault();



    var payload = new Headers();
    payload.append("language", language);

    fetch('/repos', {method: 'GET', headers: payload})
        .then(function(response) {
            if(response.ok) {
                console.log('data was loaded to database');
                console.log(response); 
                return response.json();

            }
            throw new Error('Request failed.');
        }).then(function (jsonObject) {
        console.log(jsonObject);
        //add to table
        createList(jsonObject['response']);


    }).catch(function(error) {
        console.log(error);
    });
});


function createList(response) {
    console.log("showing response 0 ...")
    console.log(response[0]);
    for (var i = 0; i < response.length; i++) {
        console.log(response[i]);
        displayRepo(response[i]);
    }

    //Get the elements with class="column"
    var elements = document.getElementsByClassName("column");

    listView(elements);
}

function displayRepo(repo) {
    
    let repoLink = document.getElementById("repoUrl");
}

// List View
function listView(repos) {
    for (var i = 0; i < repos.length; i++) {
        repos[i].style.width = "100%";
    }
}

