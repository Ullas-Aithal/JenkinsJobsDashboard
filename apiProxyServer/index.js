var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
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
        headers: {
          Authorization: 'auth'
        },
        proxy: 'proxy'
      }    
    request(options,(error,response,body)=>{
        console.log(body);
        res.send(body);
    })    

});


app.listen(3000,() => {
    console.log('Listening on 3000');
});