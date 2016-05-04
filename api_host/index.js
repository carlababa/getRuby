const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
// const errors = require('feathers-errors');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
const service = require('feathers-mongodb');

// Create a feathers instance.
const app = feathers()
  // Enable Socket.io
  .configure(socketio())
  // Enable REST services
  .configure(rest())
  // Turn on JSON parser for REST services
  .use(bodyParser.json())
  // Turn on URL-encoded parser for REST services
  .use(bodyParser.urlencoded({extended: true}));

const mongo_url = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/getrubies';

  // Connect to your MongoDB instance(s)
MongoClient.connect(mongo_url).then(function(db){
  // Connect to the db, create and register a Feathers service.

  app.use('/games', service({
    Model: db.collection('games'),
    paginate: {
      default: 100,
      max: 100
    }
  }));

  // A basic error handler, just like Express
  // app.use(errors.handler());

  // Start the server
  var port = process.env.PORT || 3030;
  var server = app.listen(port);
  server.on('listening', function() {
    console.log('Feathers Message MongoDB service running on ' + port);
  });
}).catch(function(error){
  console.error(error);
});
