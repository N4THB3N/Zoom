var path = require('path');
const express = require('express');
const router2 = express.Router();

router2.get('/zoomverify/verifyzoom.html', (req, res) => {
    res.sendFile(path.join(__dirname+'/verifyzoom.html'));
})

module.exports = router2
