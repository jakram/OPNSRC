//jamil is awesome!
var express = require('express');
//var mysql = require('./gitAuth.js');
var axios = require('axios'); 
var urlCreator = require('./url.js'); 

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
//var request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/',function(req,res,next){
    //search by language
    var context = {};
    context.repos = [];
    var idx = 0;
    var url = urlCreator(['c++']);
    axios.get(url)
        .then(response => {
            while(context.repos.length < 5 && idx < response.data.items.length){
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

app.get('/repos', function(req, res, next){
    //search by language
    console.log(req.headers.language);
    console.log("repos server side");
    var context = {};
    context.repos = [];
    var idx = 0;
    var language = req.headers.language;
    var url = urlCreator([language]);
    axios.get(url)
        .then(response => {
            while(context.repos.length < 16 && idx < response.data.items.length){
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
    context.issues = [];
    context.repo = req.query.repo;
    console.log(req.query);


    var baseUrl = "https://api.github.com/search/issues?q=" + req.query.repo;

    //paramms



    var language = req.query.language;
    var sortBy = "created";
    var order = "desc";
    var state = "open";
    var type = "issue";
    var label = "\"help+wanted\"";

    var index = 0;

    axios.get(baseUrl, {
            params: {
                is:state,
                is:type,
                no:'assignee',
                label:label,
                sort:sortBy,
                direction: order,
                language:language
            }
        })
        .then(response => {
            if (response.data.message) {
                console.log(`Got ${Object.entries(response.data.message).length} issues`);
            }
            console.log(response.data.items); 
            while(context.issues.length < 15 && index < response.data.items.length){
                if(response.data.items[index].state == "open"){
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
