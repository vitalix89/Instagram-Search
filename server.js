import getCoordinatesFromLocation from './actions/facebookcoordsservice';
import getImagesFromCoords from './actions/instagramservice';

const express = require('express');

const path = require('path');

const port = process.env.PORT || 8080;

// const http = require('http');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));


app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
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


app.listen(port);
