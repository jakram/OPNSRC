//jamil is awesome!
var express = require('express');
//var mysql = require('./gitAuth.js');
var axios = require('axios'); 

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
//var request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/',function(req,res,next){
    var context = {};

    res.render('home', context);

});

app.get('/repos', function(req, res, next){
    console.log("in repos server side");
    //search by language
    var context = {};
    context.repos = [];
    var idx = 0;
    var lang = "python"; //TODO: get language from form req
    console.log(req.query);
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
    url += "language:" + lang; 
    licenses.forEach((l) => {
        url += "+license:" + l
    }); 
    url += "+is:" + publicPrivate; 
    url += "+fork:" + fork; 
    //url += "+stars:" + starCount;
    url += "&sort=" + sortBy; 
    url += "&order=desc"; 
    axios.get(url)
        .then(response => {
            while(context.repos.length < 10 && idx < response.data.items.length){
                var r = response.data.items[idx]; 
                if(r.open_issues_count > 0){
                    context.repos.push(response.data.items[idx]);
                }
                idx++;
            }
            res.render('home', context);
        })
        .catch(error => {
            console.log(error); 
            res.render('500');
        }); 
});

app.get('/issues',function(req,res,next){
    //https://api.github.com/search/issues?q=windows+label:bug+language:python+state:open&sort=created&order=asc

    var context = {};
    console.log(req.query);
    var language = req.query.language;
    var sortBy = "created";
    var order = "desc";

    // build url, add state, language, sort, maybe label?
    var url = "https://api.github.com/search/issues?q=";
    url += "language:" + language;
    url += "state:open";
    url += "&sort=" + sortBy;
    url += "&order=" + order;
    var index = 0;

    axios.get(url)
        .then(response => {
            if (response.data.message) {
                console.log(
                    `Got ${Object.entries(response.data.message).length} issues`
                )
            }
            while(context.repos.length < 10 && index < response.data.items.length){
                var r = response.data.items[index];
                if(r.open_issues_count > 0){
                    context.issues.push(response.data.items[index]);
                }
                index++;
            }
            res.render('issues', context);
        })
        .catch(error => {
            console.log(error)
            res.render('500');
        });
});

app.get('/',function(req,res,next){
    var context = {};

    res.render('home', context);

});

app.post('/',function(req,res,next){
    var context = {};

    res.send('home', context);

});

app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
