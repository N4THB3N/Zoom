const { sql,poolPromise } = require('../db/db.js')
const fs = require('fs');
var rawdata = fs.readFileSync('./query/queries.json');
var queries = JSON.parse(rawdata);
// var path = require('path');

// req.body.Field_1
// req.query.Field_1

class MainController{
    async getAllData(req , res){
        try {
          const pool = await poolPromise
            const result = await pool.request()
            .query(queries.getAllData)
            res.json(result.recordset)
        } catch (error) {
          res.status(500)
          res.send(error.message)
        }
      }
      // async zoom(req, res){
      //   res.sendFile(path.join(__dirname+'/verifyzoom.html'));
      // }
      async addNewData(req , res){
        try {
          if(req.body.Field_1 != null) {
            const pool = await poolPromise
            const result = await pool.request()
            .input('Field_1',sql.VarChar , req.body.Field_1)
            .query(queries.addNewUser)
            res.json(result)
          } else {
            res.send('Please fill all the details!')
          }
        } catch (error) {
          res.status(500)
          res.send(error.message)
      }
      }
}

const controller = new MainController()
module.exports = controller;