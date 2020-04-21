require('dotenv/config')
const request = require('request')
const express = require('express')
const app = express()
var port = process.env.PORT || 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/route');
const http = require('http');
const url = require('url');


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(router);


app.get('/', (req, res) => {

    if (req.query.code) {

       //Social work 


        let url = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=' + process.env.redirectURL;

        request.post(url, (error, response, body) => {

            body = JSON.parse(body);

            console.log(`access_token: ${body.access_token}`);
            console.log(`refresh_token: ${body.refresh_token}`);

            if (body.access_token) {

                request.get('https://api.zoom.us/v2/users/me', (error, response, body) => {
                    if (error) {
                        console.log('API Response Error: ', error)
                    } else {
                        body = JSON.parse(body);
                        console.log('API call ', body);

                        request.post({
                          headers: {'content-type' : 'application/x-www-form-urlencoded'},
                          url:     'http://localhost:4000/api/addNewData',
                          body:    `Field_1=${body.first_name}`
                        }, function(error, response, body){
                          console.log(body);
                        });

                        res.send(`
                                <meta http-equiv="Refresh" content="1;url=${body.personal_meeting_url}">
                        `);
                    }
                }).auth(null, null, true, body.access_token);

            } else {
                // Handle errors, something's gone wrong!
				
            }

        }).auth(process.env.clientID, process.env.clientSecret);

        return;

    }
    res.redirect('https://zoom.us/oauth/authorize?response_type=code&client_id=' + process.env.clientID + '&redirect_uri=' + process.env.redirectURL)
})




app.listen(port, () => console.log(
    'Medicloud with Zoom'))