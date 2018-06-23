module.exports = function(languages) {
    //search public or private repos
    var publicPrivate = "public"; 
    //fork or main repo
    var fork = false; 
    //common open source licenses 
    var licenses = ["mit", "gpl", "apache-2.0", "mpl-2.0", "cc"]; 
    //sort by stars, forks, or updated
    var sortBy = "stars"; 

    //Build query string 
    var url = 'https://api.github.com/search/repositories?q='; 

    licenses.forEach((l) => {
        url += "+license:" + l
    }); 
    
    languages.forEach((l) => {
        url += "+language:" + l; 
    }); 

    url += "+is:" + publicPrivate; 
    url += "+fork:" + fork; 
    //url += "+stars:" + starCount;
    url += "&sort=" + sortBy; 
    url += "&order=desc"; 

    return url; 
}

