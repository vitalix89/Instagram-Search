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
  app.use(express.static('public'));
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, './public/index.html'));
  });


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
