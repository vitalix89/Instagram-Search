import superagent from 'superagent';
import jsonp from 'superagent-jsonp';


const API_KEY = '1427979890.465f650.72dc88624d8d45a7ac510b336bf08344';

const getImagesFromCoords = (coords) => {
  const { lat, long } = coords;
  const API_URL = `https://api.instagram.com/v1/media/search?distance=5000&lat=${lat}&lng=${long}&access_token=${API_KEY}&`;

  return new Promise((resolve, reject) => {
    superagent
      .get(API_URL)
       .use(jsonp)
      .end((err, res) => {
        resolve(res.body.data);
      });
  });
};


export default getImagesFromCoords;

