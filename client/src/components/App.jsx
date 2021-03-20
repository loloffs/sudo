import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PersistentDrawerLeft from "./PersistentDrawerLeft";
import MapView from './MapView'

const App = () => {

  const user_id = 1;

  const [state, setState] = useState({
    locations: [],
    activities: [],
    mapPosition: [49.2827, -123.1207],
    darkMode: false,
    favouritesOnly: false,
    activitySelected: 0,
    markers: [],
    readyToMark: false
  });
  
  useEffect(() => {

    const locationsReq = axios.get('/api/locations');
    const activitiesReq = axios.get('/api/activities');
    const favouritesReq = axios.get(`/api/users/${user_id}/favourites`);
    
    Promise.all([locationsReq, activitiesReq, favouritesReq])
      .then((responses) => {
      
        const [locationsRes, activitesRes, favouritesRes] = responses;
    
        const locations = locationsRes.data;
        const activities = activitesRes.data;
        const favourites = favouritesRes.data;

        const favouriteLocations = favourites.map(fave => fave.location_id);

        locations.forEach(location => {
          location.favourited = favouriteLocations.includes(location.id)
          location.toggleFavourited = toggleFavourited
        });
      
        setState(current => ({
          ...current,
          locations,
          activities
        }));

      })

  }, []);

  const toggleFavourited = id => {

    setState(current => {

      const currentlyFavourite = current.locations[id - 1].favourited;
  
      const location = {
        ...current.locations[id - 1],
        favourited: !currentlyFavourite
      };

      const locations = current.locations;
      locations[id - 1] = location;

      currentlyFavourite
        ? axios.delete(`/api/users/${user_id}/favourites/${id}`)
        : axios.post(`/api/users/${user_id}/favourites`, {location_id: id})

      return ({
        ...current, 
        locations
      })

    });

  };

  const toggleFavouritesOnly = () => {
    setState({
      ...state,
      favouritesOnly: !state.favouritesOnly
    });
  };

  const toggleDarkMode = function() {
    setState({
      ...state,
      darkMode: !state.darkMode
    });
  };
  
  const setActivity = function(id) {
    setState({
      ...state,
      activitySelected: id
    });
  };
  
  const setReadyToMark = () => {
    setState({
      ...state,
      readyToMark: !state.readyToMark
    })
  }

  const addMarker = (e) => {
    if (state.readyToMark === true) {
      const { markers } = state;
      markers.push(e.latlng)
      setState({
        ...state,
        markers: state.markers,
        readyToMark: false
      });
    }
  }

  // Validate the form input, save to db if sound
  const saveMarker = (title, description, image, activity, position) => {

    if (title === "") {
      alert("Title cannot be blank");
      return;
    }
    if (activity === "") {
      alert("Select an activity type");
      return;
    }

    const newLocation = {
      title,
      description,
      image,
      activity_id: activity,
      latitude: position.lat,
      longitude: position.lng,
      user_id
    }

    axios.post(`/api/locations`, newLocation);

  }

  return(

    <div className="content">
      <div className="activityIcons">
        <PersistentDrawerLeft 
          favouritesOnly={state.favouritesOnly}
          toggleFavouritesOnly={toggleFavouritesOnly}
          darkMode={state.darkMode}
          toggleDarkMode={toggleDarkMode}
          activitySelected={state.activitySelected}
          setActivity={setActivity}
        />  
      </div>
      <MapView
        locations={state.locations}
        mapPosition={state.mapPosition}
        darkMode={state.darkMode}
        favouritesOnly={state.favouritesOnly}
        activitySelected={state.activitySelected}
        markers={state.markers}
        saveMarker={saveMarker}
        addMarker={addMarker}
        readyToMark={state.readyToMark}
        setReadyToMark={setReadyToMark}
      />
    </div>
  )

};

export default App;
