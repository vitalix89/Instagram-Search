import getCoordinatesFromLocation from './actions/facebookcoordsservice';
import getImagesFromCoords from './actions/instagramservice';

const express = require('express');

const path = require('path');


const port = process.env.PORT || 8080;


const app = express();


app.get('/test', async (request, response) => {
  const location = request.query.location;

  try {
    const coords = await getCoordinatesFromLocation(location);
    const images = await getImagesFromCoords(coords);
    response.json({ images, coords });
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
  const fallback = require('express-history-api-fallback');

  const root = `${__dirname}/public`;
  app.use(express.static(root));

  app.all('/*', (req, res) => {
    res.sendfile('index.html', { root: path.join(__dirname, 'public') });
  });


  app.use(fallback('index.html', { root }));


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
