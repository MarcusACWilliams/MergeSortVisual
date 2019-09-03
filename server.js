const nconf = require('nconf');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

//import UserName from "./valueobjects/Name"
//import User from "./User"

const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
app.use(express.json() );
app.use(cors() );

const user = require("./models/user");
    const userRoutes = require('./routes/users');
      app.use('/users', userRoutes);
const order = require("./models/order");
    const orderRoutes = require('./routes/orders');
      app.use('/orders', orderRoutes);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, './client/build')));
//app.use("/static", express.static('client/build'));
console.log("Serving Static Files");

app.get('/',function (req,res) {
    console.log(__dirname);
  res.sendFile(__dirname + '/client/build/index.html');
  //__dirname : It will resolve to your project folder.
});

// Read in keys and secrets. Using nconf use can set secrets via
// environment variables, command-line arguments, or a keys.json file.
nconf.argv().env().file('keys.json');
// Connect to a MongoDB server
const dbuser = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');
const port = nconf.get('mongoPort');

let uri = `mongodb://${dbuser}:${pass}@${host}:${port}`;
if (nconf.get('mongoDatabase')) {
  uri = `${uri}/${nconf.get('mongoDatabase')}`;
}
console.log(uri);

mongoose.connect(uri);

const localport = process.env.PORT || '3000';
app.set('port', localport);

app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});

