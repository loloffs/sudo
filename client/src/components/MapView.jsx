import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import MyLocationIcon from '@material-ui/icons/MyLocation';

import LocateControl from './LocateControl';
import LocationPopup from "./LocationPopup";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "calc(100vh - 65px)",
    top: '65px'
  }
}));

export default function MapView(props) {

  const { locations, mapPosition } = props;
  const classes = useStyles();  

  const locateOptions = {
    initialZoomLevel: 13,
    strings: {
        title: 'Show me where I am, yo!'
    },
    onActivate: () => {} // callback before engine starts retrieving locations
  }

  return (
    <Map
      center={mapPosition} zoom={13} className={classes.root}>
      <TileLayer
        attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { locations.map(item => (
        <Marker position={[item.latitude, item.longitude]}>
         <Popup>
          <LocationPopup 
            image={item.image}
            title={item.title}
            description={item.description}
            alt="Location Thumbnail"
          />
         </Popup>
        </Marker>
      ))}
      <LocateControl options={locateOptions} startDirectly/>
    </Map>
  );

};