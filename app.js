const express   =   require('express');
var app =   express();

const request = require('request');

const base64Credentials = Buffer.from('email@email.com:yyyyyyyyyyyyy').toString('base64')
const options = {
  url: 'https://api.urlmeta.org/?url=',
  headers: {
    'Authorization': 'Basic ' + base64Credentials
  }
}

app.get('/', function(req, res) {
    if ( req.query.url ) {
        options.url =   options.url+req.query.url;
        request(options, function(error, response, body) {
            if (!error && response.statusCode === 200) {
                let data = JSON.parse(body)
                if (data.result.status == 'OK') {
                    res.json({
                        status: 200,
                        data: data
                    });
                } else {
                    res.json({
                        status: 301,
                        data: 'unable to reach to URL!'
                    });
                }
            } else {
                res.json({
                    status: 404,
                    message: 'unable to reach to URL!'
                });
            }
        });
    } else {
        res.json({
            status: 404,
            message: 'url parameter is required.'
        });
    }
});

app.listen(9000, () => console.log('Listening to port 9000!'));

// function callback(error, response, body) {
//   if (!error && response.statusCode === 200) {
//     let data = JSON.parse(body)

//     if (data.result.status == 'OK') {
//       console.log(data.meta)
//     } else {
//       console.log(data.result.reason)
//     }
//   } else {
//     console.log(error, body)
//   }
// }