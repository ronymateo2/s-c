import React from "react";
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
  makeStyles,
  TableFooter,
  TablePagination
} from "@material-ui/core";

import TopBar from "../../shared/components/TopBar";
import SectionHeader from "../../shared/components/SectionHeader";
import Loading from "../../shared/components/Loading";

import {
  BookingModel,
  isImpossibleRoute,
  getBookingDistance
} from "../model/BookingModel";
import { useBookingService } from "./useBookingService";
import { Observable } from "rxjs";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";

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

const impossibleRoutes = (bookings$: Observable<BookingModel[]>) => {
  return bookings$.pipe(
    map(bookings => bookings.filter(b => isImpossibleRoute(b)))
  );
};

const ImpossibleRoute = withRouter(() => {
  const classes = useStyles();
  const [bookings, loading] = useBookingService(impossibleRoutes);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, bookings.length - page * rowsPerPage);

  function handleChangePage(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

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
                subtitle="Assuming max speed 90km, those cars will never make it at the end booking time"
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
                        {bookings
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map(row => (
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
                        {emptyRows > 0 && (
                          <TableRow style={{ height: 48 * emptyRows }}>
                            <TableCell colSpan={3} />
                          </TableRow>
                        )}
                      </TableBody>
                      <TableFooter>
                        <TablePagination
                          rowsPerPageOptions={[5, 10, 15]}
                          colSpan={3}
                          count={bookings.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { "aria-label": "Rows per page" },
                            native: true
                          }}
                          onChangePage={handleChangePage}
                          onChangeRowsPerPage={handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableFooter>
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
