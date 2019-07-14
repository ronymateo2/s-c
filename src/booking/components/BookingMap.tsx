import React from "react";
import { GoogleMap, withGoogleMap, withScriptjs } from "react-google-maps";
import { compose, withProps } from "recompose";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";

export interface BookingMapProps {
  markers: JSX.Element[];
}

export const BookingMap = React.memo(
  compose<BookingMapProps, BookingMapProps>(
    withProps({
      googleMapURL:
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyDY6uKAy5cmr3HX42fBZ_8VvCpQKXYXqzY&v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />
    }),
    withScriptjs,
    withGoogleMap
  )((props: BookingMapProps) => {
    const defaultCenter = {
      lat: 1.29027,
      lng: 103.851959
    };
    return (
      <GoogleMap defaultZoom={11} defaultCenter={defaultCenter}>
        <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>
          {props.markers}
        </MarkerClusterer>
      </GoogleMap>
    );
  })
);
