// import jsonp from 'jsonp';
// this one doesn't work in the browser :)
// isomorphic = universal. it means that it works
// in all platforms.cool
import fetch from 'isomorphic-fetch';

const API_KEY = 'EAAJq5wRZBIDgBAI6L9VXMB0ZBa6rwDEMMcxhaVXYX34M7uWyIhqXXuayCjG3jo6JMSv3l0OZCipa8wuzMMwZBDmyqDw4G6pgUaCZCF1Sg2Xbj9Skr03YiUk23s7TZB7W5gxzCOowP1ojEUrQzCvZA7mor26DNpenR0ZD';

const getCoordinatesFromLocation = location =>

  new Promise((resolve, reject) => {
    // you see the mess without async/await?
    // .then.then.catch.........yeee
    // this shit doesn't work in node either
    // it's because jsonp is vbrowser hack
    // this is fucking shit. boilerplate is bad, cause you need to
    // restart server everytime you change stuff.
    // it doesn't support es6/es7/es8 by default for the server side
// but you change on the client, no.
// node making request to facebook now, not client. i see but
    fetch(`https://graph.facebook.com/search?q=${location}&fields=location&type=place&access_token=${API_KEY}`)
    .then(response => response.json())
    .then((response) => {
     // console.log(response);
      if (!response.data.length) {
        return resolve({ lat: 0, long: 0 });
      }

      const lat = response.data[0].location.latitude;
      const long = response.data[0].location.longitude;

      return resolve({ lat, long });
    });
    /*
    jsonp(`https://graph.facebook.com/search?q=${location}&fields=location&type=place&access_token=${API_KEY}`, { timeout: 5000 }, (err, response) => {
      if (err) return reject(err.message);
      const array = response.data;

      if (!array.length) {
        return resolve({ lat: 0, long: 0 });
      }

      const lat = response.data[0].location.latitude;
      const long = response.data[0].location.longitude;

      return resolve({ lat, long });
    });
    */
  });

export default getCoordinatesFromLocation;
