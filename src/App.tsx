import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, indigo } from "@material-ui/core/colors";
import Routes from "./booking/routes/Routes";
import BookingContext from "./booking/context/BookingContext";
import { BookingService } from "./booking/service/BookingService";
import { BookingClient } from "./booking/service/BookingClient";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: blue[900]
    },
    primary: {
      main: indigo[700]
    }
  },
  typography: {
    fontFamily: ['"Lato"', "sans-serif"].join(",")
  }
});

// adding inject dependecy with context
//const client = new BookingClient("https://challenge.smove.sg");
const client = new BookingClient("http://localhost:5000");
const bookingService = new BookingService(client);
const bookingContext = {
  service: bookingService
};

const App: React.FC = () => {
  return (
    <div className="App">
      <BookingContext.Provider value={bookingContext!}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </BookingContext.Provider>
    </div>
  );
};

export default App;
