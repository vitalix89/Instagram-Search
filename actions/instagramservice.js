import superagent from 'superagent'; // superagent is like axios, remember?yes
import jsonp from 'superagent-jsonp';
// import { store } from '../src';

const API_KEY = '1427979890.465f650.72dc88624d8d45a7ac510b336bf08344';

const getImagesFromCoords = (coords) => {
  const { lat, long } = coords;
  const API_URL = `https://api.instagram.com/v1/media/search?distance=5000&lat=${lat}&lng=${long}&access_token=${API_KEY}&`;

  return new Promise((resolve, reject) => {
    superagent
      .get(API_URL)
       .use(jsonp)
      .end((err, res) => {
        // if (!window) {
        //   resolve(JSON.parse(res.text).data);
        //   // store.dispatch({ type: 'SEARCH_IMAGES', payload: res.body.data });
        // }

        resolve(res.body.data);
       // resolve(JSON.parse(res.text).data);
       // resolve(JSON.parse(res.text).data);


// tov i think enougth for today, yes. tomorrow just connect your api (/test) to react.
        // get data from it instead of those services.i started to read about react universal soomething
        // what we're doing here is part of server rendering. you have to use universal libraries that work
        // on client and on server. node should be able to run all your code.ok
        // the question is
        // ok where to save in redux. you shouldn't deal with this shit in the client.
        // fuck jsonp. it works on server. you can connect your api server to react.
        // get data from it right fuck json p
      // resolve(JSON.parse(res.body));//alive? yes, reading aboout this shit k
      });
  });
};


export default getImagesFromCoords;


// const API_KEY = '1427979890.465f650.72dc88624d8d45a7ac510b336bf08344';

// const getImagesFromCoords = coords =>
// Comment so eslint won't minimize the syntax
 // new Promise((resolve, reject) => {
 //   const { lat, long } = coords;

    // If lat & lng is empty, then resolve empty array
 //   if (!lat && !long) return resolve([]);
  //  return jsonp(`https://api.instagram.com/v1/media/search?distance=5000&lat=${lat}&lng=${long}&access_token=${API_KEY}`, { timeout: 5000 }, (err, response) => {
  //    if (err) return reject(err.message);
 //     return resolve(response.data);
 //   });
//  });
// export default getImagesFromCoords;
