const express =  require('express');
const controller = require('../controller/controller')

const router = express.Router();
router.get('/api/getAllData', controller.getAllData);
// router.get('/zoomverify', controller.zoom);
router.post('/api/addNewData' , controller.addNewData);

module.exports = router;