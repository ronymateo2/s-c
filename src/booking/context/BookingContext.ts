import React from "react";
import { BookingService } from "../service/BookingService";

export interface BookingContextInterface {
  service: BookingService;
}

export default React.createContext<BookingContextInterface | null>(null);
