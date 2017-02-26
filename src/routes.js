import React from 'react';

import { Route, IndexRoute } from 'react-router';


import Navbar from './components/Navbar';
import ImagesCard from './components/ImagesCard';
import Maper from './components/Map';


export default (

  <Route path="/" component={Navbar} >

    <IndexRoute component={ImagesCard} />
    <Route path="map" component={Maper} />
    <Route path="location/:locationName" component={ImagesCard} />

  </Route>


);

