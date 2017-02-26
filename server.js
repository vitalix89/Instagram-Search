import getCoordinatesFromLocation from './actions/facebookcoordsservice';
import getImagesFromCoords from './actions/instagramservice';

const express = require('express');

const path = require('path');

// const webpack = require('webpack');
// const webpackConfig = require('./webpack.config.js');

// const compiler = webpack(webpackConfig);
// const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, { noInfo: false, publicPath: webpackConfig.output.publicPath });

const port = process.env.PORT || 8080;

// const http = require('http');
const app = express();


// app.use(webpackDevMiddleware);
// app.use(require('webpack-hot-middleware')(compiler));

// app.use(express.static(path.join(__dirname, '/public')));


// if you want whole app to be available, you need webpack as well. this file should only serve api.
// where is webpack configuration?
// app.get('*', (request, response) => {
//   response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });
// const server = http.createServer(app);


// I'm installing "nodemon", this shit restarts node when file changed automaticly ohhh nice
// At least don't have to wait hours to recompile:0
app.get('/test', async (request, response) => {
  const location = request.query.location;

  try {
    const coords = await getCoordinatesFromLocation(location);
    const images = await getImagesFromCoords(coords);
    response.json({ images, coords });
  //  response.json(images);
  } catch (err) {
    throw new Error(err);
  }
});


if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('./webpack.config.js');
  const compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));
} else {
  app.use(express.static('public')); // you know what this line does?expose public folder, why you don't put bundle.js inside public?i tried it didnt work now it is in root from root it worked i can try again
  // app.get('*', (request, response) => { // run  this locally now, it supossed to work?
  //   response.sendFile(path.join(__dirname, 'public/index.html'));
  // });


  app.all('/*', (req, res) => {
    res.sendfile('index.html', { root: path.join(__dirname, 'public') });
  });
  // you have no bundle in public directoery..its in root why?tried with public it didnt read it// what happended?
  //

  app.get('/test', async (request, response) => {
    const location = request.query.location;

    try {
      const coords = await getCoordinatesFromLocation(location);
      const images = await getImagesFromCoords(coords);
      response.json({ images, coords });
  //  response.json(images);
    } catch (err) {
      throw new Error(err);
    }
  });
}


app.listen(port);
