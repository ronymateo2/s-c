import { from, BehaviorSubject } from "rxjs";
import { map, distinctUntilChanged } from "rxjs/operators";

import { BookingClient } from "./BookingClient";
import { BookingState } from "../model/BookingState";

export class BookingService {
  private _state: BookingState = {
    bookings: [],
    loading: false
  };

  private store = new BehaviorSubject<BookingState>(this._state);

  private state$ = this.store.asObservable();

  bookings$ = this.state$.pipe(
    map(state => state.bookings),
    distinctUntilChanged()
  );

  loading$ = this.state$.pipe(map(state => state.loading));

  constructor(private bookingClient: BookingClient) {
    this.updateState({ ...this._state, bookings: [], loading: true });
    from(this.bookingClient.getBookings()).subscribe(bookings => {
      this.updateState({ ...this._state, bookings, loading: false });
    });
  }

  private updateState(state: BookingState) {
    this.store.next((this._state = state));
  }
}
