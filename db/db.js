const sql = require('mssql/msnodesqlv8');

var config = {
    user: 'sa',
    password: 'Administrator1',
    server: 'DESKTOP-UTVUTI4\\SQLEXPRESS',
    driver: 'msnodesqlv8', 
    database: 'DHL5',
    options: {
        trustedConnection: true
    } 
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}