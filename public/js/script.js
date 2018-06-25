//Github API Script

function searchLanguage(language) {
    event.preventDefault();

    console.log("test"); 

    document.getElementById("collapse-btn").click(); 
    var node = document.getElementById("list"); 
    node.classList.add("divFadeOut"); 
    var payload = new Headers();
    payload.append("language", language);

    fetch('/repos', {method: 'GET', headers: payload})
        .then(function(response) {
            if(response.ok) {
                console.log(response); 
                //Remove default projects on landing
                while(node.firstChild){
                    node.removeChild(node.firstChild); 
                }
                return response.json();
            }
            throw new Error('Request failed.');
        }).then(function (jsonObject) {
            console.log("got response");
            console.log(jsonObject);
            createList(jsonObject['repos']);
            node.classList.remove("divFadeOut"); 
            node.classList.add("divFadeIn"); 
        }).catch(function(error) {
        console.log(error);
    });
    node.classList.remove("divFadeIn"); 
};


function createList(repos) {

    for (var i = 0; i < repos.length; i++) {
        console.log(repos[i]);
        displayRepo(repos[i]);
    }

    //Get the elements with class="column"
    var elements = document.getElementsByClassName("column");

    listView(elements);
}

function displayRepo(repo) {
    //Classes, IDs, and href
    var outerDivClass = "list-group"; 
    var outerDivId = "repos";
    var aClass = "list-group-item list-group-item-action flex-column align-items-start list-group-item-light"; 
    var innerDivClass = "d-flex w-100 justify-content-between";
    var pClass = "mb-1"; 
    var pId = "repoDesc"; 
    var smallLanguageId = "repoName"; 
    var smallIssuesId = "numIssues"; 
    var h3Class = "mb-1"; 
    var h3Id = "repoName"; 
    var href = "/issues?repo=" + repo.full_name + "&language=" + repo.language; 
    //Create elements 
    var outerDiv = document.createElement("div"); 
    var br = document.createElement("br"); 
    var a = document.createElement("a"); 
    var innerDiv = document.createElement("div"); 
    var h3 = document.createElement("h3"); 
    var p = document.createElement("p"); 
    var smallLanguage = document.createElement("small"); 
    var smallIssues = document.createElement("small");
    //Create text 
    var h3Text = document.createTextNode(repo.name);
    h3.appendChild(h3Text); 
    var smallLanguageText = document.createTextNode(repo.language); 
    smallLanguage.appendChild(smallLanguageText); 
    var pText = document.createTextNode(repo.description); 
    p.appendChild(pText); 
    var smallIssuesText = document.createTextNode(repo.open_issues_count + " issues"); 
    smallIssues.appendChild(smallIssuesText); 
    //Set attributes 
    outerDiv.setAttribute("class", outerDivClass); 
    outerDiv.setAttribute("id", outerDivId); 
    a.setAttribute("href", href); 
    a.setAttribute("class", aClass); 
    innerDiv.setAttribute("class", innerDivClass);  
    h3.setAttribute("class", h3Class); 
    h3.setAttribute("id", h3Id); 
    smallLanguage.setAttribute("id", smallLanguageId); 
    p.setAttribute("class", pClass); 
    p.setAttribute("id", pId); 
    smallIssues.setAttribute("id", smallIssuesId); 
    //Create the structure
    outerDiv.appendChild(br); 
    outerDiv.appendChild(a); 
    a.appendChild(innerDiv); 
    a.appendChild(p); 
    a.appendChild(smallIssues); 
    innerDiv.appendChild(h3); 
    innerDiv.appendChild(smallLanguage); 
    //Add to page
    document.getElementById("list").appendChild(outerDiv); 
    
    //let repoLink = document.getElementById("repoUrl");

}

// List View
function listView(repos) {
    for (var i = 0; i < repos.length; i++) {
        repos[i].style.width = "100%";
    }
}

