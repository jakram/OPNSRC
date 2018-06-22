//Github API Script

document.getElementById('urlSubmit').addEventListener('click', (event) => {
    console.log('test');
    var req = new XMLHttpRequest(); 

    //Query string qualifiers

    //search by language
    var lang = document.getElementById('language').value; 
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
        } else {
            console.log('ERROR'); 
        }
    }); 
    req.send(null); 
    event.preventDefault(); 
}); 
