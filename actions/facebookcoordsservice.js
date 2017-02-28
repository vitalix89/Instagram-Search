
import fetch from 'isomorphic-fetch';

const API_KEY = 'EAAJq5wRZBIDgBAI6L9VXMB0ZBa6rwDEMMcxhaVXYX34M7uWyIhqXXuayCjG3jo6JMSv3l0OZCipa8wuzMMwZBDmyqDw4G6pgUaCZCF1Sg2Xbj9Skr03YiUk23s7TZB7W5gxzCOowP1ojEUrQzCvZA7mor26DNpenR0ZD';

// you can test this API
// check if it returns actual array.
// check if it returns error if "location" if shit.
// this way, you never going to break it without knowing it.
// now you remember what this service returns.
// after 2 weeks you come back and change
const getCoordinatesFromLocation = location =>

  new Promise((resolve, reject) => {
    fetch(`https://graph.facebook.com/search?q=${location}&fields=location&type=place&access_token=${API_KEY}`)
    .then(response => response.json())
    .then((response) => {
      if (!response.data.length) {
        return resolve({ lat: 0, long: 0 });
      }

      const lat = response.data[0].location.latitude;
      const long = response.data[0].location.longitude;

      return resolve({ lat, long });
      // maybe you want to refactor you code in 2 weeks, so you change
      // properties names. boom, app is broken. ye
      // and broken in some stupid ways. you refresh app it works,
      // it only breaks when you search for location.
      // it will take a lot of time to find this shit.
      // if you have test, you expect object with { lat, long }
      // test fail if you change them
    });
  });

export default getCoordinatesFromLocation;
