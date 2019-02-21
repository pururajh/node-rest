const mongoose = require('mongoose');
const getConfig = require('./config');
//const config = getConfig(process.env.NODE_ENV);
const connect = () => mongoose.connect(getConfig().MONGO_URI, {useNewUrlParser:true});
module.exports = connect;

/*const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/practice');
 
const db = mongoose.connection;
 
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});*/

/*const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  const dbo = db.db("mydb");
  const myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});*/
