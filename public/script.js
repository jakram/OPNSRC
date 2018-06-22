//Github API Script

document.getElementById('urlSubmit').addEventListener('click', (event) => {
    console.log('test');
    var req = new XMLHttpRequest(); 
    var lang = document.getElementById('language').value; 
    var url = 'https://api.github.com/search/repositories?q=language:'; 
    url += lang; 
    url += "+license:mit+license:lgpl-3.0&sort=stars&order=desc"; 
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
