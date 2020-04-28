
const express = require('express')
const app = express()
var port = process.env.PORT || 4000
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/route');
const zoom1 = require('./zoom/zoom');


app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(router);
app.use(zoom1);

app.listen(port, () => console.log(
    'Medicloud with Zoom'))