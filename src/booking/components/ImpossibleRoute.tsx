import React, { useContext, useEffect, useState } from "react";
import { map } from "rxjs/operators";
import { withRouter } from "react-router";

import CssBaseline from "@material-ui/core/CssBaseline";
import {
  createStyles,
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  makeStyles
} from "@material-ui/core";

import TopBar from "../../shared/components/TopBar";
import SectionHeader from "../../shared/components/SectionHeader";
import BookingContext from "../context/BookingContext";
import Loading from "../../shared/components/Loading";

import {
  BookingModel,
  isImpossibleRoute,
  getBookingDistance
} from "../model/BookingModel";

const useStyles = makeStyles(theme =>
  createStyles({
    root: {
      width: "100%",
      marginTop: theme.spacing(3)
    },
    table: {
      minWidth: 650
    },
    grid: {
      width: 1000
    }
  })
);

const ImpossibleRoute = withRouter(() => {
  const classes = useStyles();
  const bookingService = useContext(BookingContext)!.service;
  const [bookings, setBookings] = useState([] as BookingModel[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const sub = bookingService.bookings$
      .pipe(map(bookings => bookings.filter(b => isImpossibleRoute(b))))
      .subscribe(bookings => {
        setBookings(bookings);
      });
    return () => {
      sub.unsubscribe();
    };
  }, [bookingService.bookings$]);

  useEffect(() => {
    const sub = bookingService.loading$.subscribe(setLoading);
    return () => {
      sub.unsubscribe();
    };
  }, [bookingService.loading$]);

  return (
    <React.Fragment>
      <CssBaseline />
      <TopBar currentPath="impossibleRoutes" />
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
                title="Imposible Routes"
                subtitle="Assuming max speed 90km"
              />
              <div>
                {loading && <Loading />}
                {!loading && (
                  <Paper className={classes.root}>
                    <Table className={classes.table}>
                      <TableHead>
                        <TableRow>
                          <TableCell>Licence Plate</TableCell>
                          <TableCell>Booking Time</TableCell>
                          <TableCell>Distance</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bookings.map(row => (
                          <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                              {row.car.licence_plate}
                            </TableCell>
                            <TableCell>
                              {(
                                (row.book_end - row.book_start) /
                                (60 * 60)
                              ).toFixed(2)}
                              min
                            </TableCell>
                            <TableCell>
                              {getBookingDistance(row).toFixed(2)}Km
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Paper>
                )}
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
});

export default ImpossibleRoute;
