
import fetch from 'isomorphic-fetch';

const API_KEY = 'EAAJq5wRZBIDgBAI6L9VXMB0ZBa6rwDEMMcxhaVXYX34M7uWyIhqXXuayCjG3jo6JMSv3l0OZCipa8wuzMMwZBDmyqDw4G6pgUaCZCF1Sg2Xbj9Skr03YiUk23s7TZB7W5gxzCOowP1ojEUrQzCvZA7mor26DNpenR0ZD';

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
    });
  });

export default getCoordinatesFromLocation;
