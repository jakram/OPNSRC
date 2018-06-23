//Github API Script

document.getElementById("languageList").addEventListener("click", function(e) {
    if (e.target && e.target.nodeName == "LI") {
        var language = e.target.textContent;
    }
});

document.getElementById('urlSubmit').addEventListener('click', (event) => {
    console.log('test');
    var req = new XMLHttpRequest(); 

    //Query string qualifiers

    //search by language
    //var lang = document.getElementById('language').value;
    var lang = "c++";
    //search public or private repos
    var publicPrivate = "public"; 
    //common open source licenses 
    var licenses = ["mit", "gpl", "apache-2.0", "mpl-2.0", "cc"]; 
    //sort by stars, forks, or updated
    var sortBy = "stars"; 

    //Build query string 
    var url = 'https://api.github.com/search/repositories?q='; 
    url += "language:" + lang; 
    licenses.forEach((l) => {
        url += "+license:" + l
    }); 
    url += "+is=" + publicPrivate; 
    url += "&sort=" + sortBy; 
    url += "&order=desc"; 
    req.open("GET", url, true); 
    req.addEventListener('load', () => {
        if(req.status >= 200 && req.status < 400) {
            var response = JSON.parse(req.responseText);  
            console.log(response);
            createList(response);
        } else {
            console.log('ERROR'); 
        }
    }); 
    req.send(null); 
    event.preventDefault(); 
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

