require('dotenv/config')
const request = require('request')
const express = require('express')
const zoom = express.Router()

zoom.get('/', (req, res) => {

    if(req.query.Field_6 != undefined){                
            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'http://localhost:4000/api/addNewData',


                body:    `Field_1=${req.query.Field_1}`
                }, function(error, response, body){ 
                    console.log(body);
                });                   
    }else{
        console.log('Error');
    }

if (req.query.code) {


let url = 'https://zoom.us/oauth/token?grant_type=authorization_code&code=' + req.query.code + '&redirect_uri=' + process.env.redirectURL;

request.post(url, (error, response, body) => {

    body = JSON.parse(body);

    if (body.access_token) {

        request.get('https://api.zoom.us/v2/users/me', (error, response, body) => {
            if (error) {
                console.log('API Response Error: ', error)
            } else {
                body = JSON.parse(body);
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
res.send(`
<meta http-equiv="Refresh" content="1;url=https://zoom.us/oauth/authorize?response_type=code&client_id=zm2PgkOTwyAXt7Oki1RCQ&redirect_uri=http://zoom.medicloud.me/">
`);

// 'https://zoom.us/oauth/authorize?response_type=code&client_id=' + process.env.clientID + '&redirect_uri=' + process.env.redirectURL)
})

module.exports = zoom