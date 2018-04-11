var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var auth = require('./jenkinsCredentials.js');
//var auth = require('./local-jenkinsCredentials.js');
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,response) => {
    response.send('Making Call');



});
//POST request from the app with jenkins url
app.post('/',(req,res) => {
    var options = {
        url: req.body.url,
        method: 'GET',
        auth: {
            'user': auth.userName,
            'pass': auth.password,
            },
        proxy: auth.proxy
      }    
    request(options,(error,response,body)=>{
        if(error){
            console.log("Error connecting to Jenkins: " + error);
        }
        else{
            console.log(response.statusCode + ' ' + response.statusMessage + ' for: ' + options.url);
            res.send(body);
        }
    })   
});


app.listen(3000,() => {
    console.log('Listening on 3000');
});