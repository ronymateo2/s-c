import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, Grid, makeStyles } from "@material-ui/core";
import { Marker } from "react-google-maps";

import TopBar from "../../shared/components/TopBar";
import SectionHeader from "../../shared/components/SectionHeader";

import { BookingModel } from "../model/BookingModel";
import { BookingMap } from "./BookingMap";
import { withRouter } from "react-router";
import Loading from "../../shared/components/Loading";
import { useBookingService } from "./useBookingService";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.grey[100],
      overflow: "hidden",
      backgroundSize: "cover",
      backgroundPosition: "0 400px",
      marginTop: 20,
      padding: 20,
      paddingBottom: 200
    },
    grid: {
      width: 1000
    }
  })
);

const Booking = withRouter(() => {
  const classes = useStyles();
  const [bookings, loading] = useBookingService();

  const dropOffMarkers = bookings.map((marker: BookingModel, index: number) => (
    <Marker
      key={index + 1}
      position={{
        lat: marker.dropoff.lat,
        lng: marker.dropoff.lng
      }}
    />
  ));

  const pickupMarkers = bookings.map((marker: BookingModel, index: number) => (
    <Marker
      key={index + 1}
      position={{
        lat: marker.pickup.lat,
        lng: marker.pickup.lng
      }}
    />
  ));

  return (
    <React.Fragment>
      <CssBaseline />
      <TopBar currentPath="home" />
      <div className={classes.root}>
        <Grid container justify="center">
          <Grid
            spacing={10}
            alignItems="center"
            justify="center"
            container
            className={classes.grid}
          >
            <Grid item xs={12}>
              <SectionHeader
                title="Drop Off and Pikup Cluster Map"
                subtitle="Number of drops off and pickup"
              />
              {loading && <Loading />}
              {!loading && (
                <div>
                  <BookingMap markers={dropOffMarkers} />
                  <BookingMap markers={pickupMarkers} />
                </div>
              )}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
});

export default Booking;
