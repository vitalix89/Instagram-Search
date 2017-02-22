import getCoordinatesFromLocation from './actions/facebookcoordsservice';
import getImagesFromCoords from './actions/instagramservice';


const express = require('express');
const http = require('http');
const path = require('path');
const socketIo = require('socket.io');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath });


const app = express();
const server = http.createServer(app);
const io = socketIo(server, { pingTimeout: 3000, pingInterval: 3000 });

app.use(webpackDevMiddleware);
app.use(require('webpack-hot-middleware')(compiler));

// no
app.use(express.static(path.join(__dirname, '/public')));

app.get('/test', async (request, response) => {
  const location = request.query.location;
 // const params = request.params;

  console.log('LOCATION', location);
  // console.log('params', params);

  // ok, works. it's much better.where you see it works?
  // no errors, and we got the data. ok
  // if we do it without await, we'll get the promise in "coords".
  // now it's typical js code. we have promise we need to resolve with .then
  // we don't want to do that shit. we want to work with data, not deal with promises here. ok
  // const coords = getCoordinatesFromLocation(location);
  // understand the difference? yes but ok i thouth its async by default. without await, code doesn't stop
  // it doesn't wait until your data is coming back. so you can't be sure whats inside the variable.

  // //aahhh so its like we didnt catch the data, yes. it will be there at some point, in the future when
  // promise resolves, but when you run the code, there will be a promise. we want to work with data.

  // it's the same but i dont get something js is async by default wey never added.
  // js is async, that's why it doesn't wait until promise resolves. but we don't want that.
  // we prefer to do this:
  const coords = await getCoordinatesFromLocation(location);
  // response.json(coords);
  try {
    const images = await getImagesFromCoords(coords);
    response.json({ images, coords });
  } catch (err) {
    throw new Error(err);
  }

  // response.json('ok');


  // this way you can use "coords" and you will be sure that there is data from the server,
  // not promise or other shit. you tell js to wait until promise resolves.
  // .then shit does it no? when promise resolves, it executes .then. here. but why would you want
  // to write .then then .then instead of this? just to see its working hhhhh
  // you right you already showed me. you see how simple it is to work with async functions?
  console.log(coords);

    /*
    .then((data) => {
      // you understand the logic?yes
      // make it happen. /test/?location=tel-aviv
      // should returns data from instagram.
      // adblocks instagram too/?
      // adblock is irrelevant if you're using your own
      // server. client won't connect to facebook and to instagram
      // anymore. react will ask /test/ for images.
      // remake instagram api, so it would work on server and on client
      // as well. find isomorphic jsonp library. ok. good. talk to me, after you rewrite instagram service. ok tnx alot this is crazy
      // it's must have. now nobody can steal you facebook api key.

      response.json(data);
      // console.log(data);
      // where are you executing instagram service exactly?
      // it's facebook apino instagram. my bad.
      // this is a fucking mess with .then.then.then.zubi.fuck.ASS.. let's see if async/await works here
      getImagesFromCoords(data)
        .then((res) => {
          response.json(res);
          console.log('response from server', res);
        }).catch(err => console.log(err));
    }).catch(err => console.log(err));

    */
});

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
server.listen(8080);

// no need for router? what router and where?


//  setInterval(() => {
//    io.emit('message', { name: 'Server', text: 'Shalom' });
//  }, 5000);


// Socket.io Code
// const users = [];
const users = {};
const socketsim = {};
const clients = [];
const coords = [];


io.on('connection', (socket) => { // what this line doing? when someone connects
 // socket.emit('user_connected', socket.id); // understand the problem? yes, we sent message only to ourself
  console.log('someone connected.');

  socket.on('user_connected', (username) => {
    console.log('data', username);
   // users[username] = socket.id;

   // socket.join({ username: socket.id });
    socket.join(socket.id);

  //  clients.push(users[username] = socket.id);

    // const user = username;
    const connections = {
      [username]: socket.id
    };
    clients.push(connections);

    // users.push(connections);    // Store a reference to your socket
    socketsim[socket.id] = { user: username, soc: socket };  // Store a reference to your socket
    console.log('data_socket', socket.adapter.rooms);
    console.log('data_users', users);
    io.sockets.emit('connected_users', clients);
  });


      // Private message is sent from client with username of person you want to 'private message'
  socket.on('private_message', (data) => {
    const msg = data.message;
    const to = data.to;
    // const from = data.from;
   // const username = sockets[socket.id];
    console.log('soketeee', data);
    console.log('soketeee', socketsim);
    console.log('dataaa', socket);
    // console.log('soketeee2', sockets[socket.id]);
   // console.log('soketeee3', users[to]);
   // console.log('soketeee44', socket.id);

        // Lookup the socket of the user you want to private message, and send them your message
    // console.log('message arrived to', message);
   // socketsim[users[to]].soc.emit('message_to', { msg, from: socketsim[socket.id].user });
    socket.to(to).emit('message_to', { msg, from: socketsim[socket.id].user });
  });

  socket.on('typing_private_message', (data) => {
    console.log('TYPING');
    const msg = data.message;
    const to = data.to;
    // const from = data.from;
   // const username = sockets[socket.id];
   // console.log('soketeee', data);
   // console.log('soketeee', socketsim);
   // console.log('dataaa', socket);
    // console.log('soketeee2', sockets[socket.id]);
   // console.log('soketeee3', users[to]);
   // console.log('soketeee44', socket.id);

        // Lookup the socket of the user you want to private message, and send them your message
    // console.log('message arrived to', message);
   // socketsim[users[to]].soc.emit('message_to', { msg, from: socketsim[socket.id].user });
    socket.to(to).emit('typing_message_to', { msg, from: socketsim[socket.id].user });
  });


  socket.on('message', (message, callback) => { // got message from user, send it to other users
    console.log('got message. message: ', message);
    // let's say, you want to save message into database.
    // you need to do it here, on message receive.
    // but if saving message to DB fails, you can callback with an error from the db.
    // understand?
    // yes
    // JUST AN EXAMPLE CODE, FOR DEMO PURPOSES ONLY ok
    // mongo.save(message, (err) => {
      // callback({ error: err });
    // });


    setTimeout(() => {
      callback({ error: null, data: message }); // to make server send an error assign false to eeror or string
    }, 3000); // Run callback after 3 seconds

    socket.broadcast.emit('message', message);
  });


  socket.on('user_coords', (location) => {
    console.log('user_coords.');
    coords.push(location);
    io.sockets.emit('publish_coords', { coords });
  });


  socket.on('disconnect', () => {
    console.log('someone disconnected.');
    io.sockets.emit('user_disconnected', { disconnected: true, id: socket.id });
  });
});

