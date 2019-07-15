import { BookingModel } from "./BookingModel";

export interface BookingState {
  bookings: BookingModel[];
  loading: boolean;
}
