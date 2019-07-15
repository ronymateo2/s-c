import { Observable, Subject, from, timer, BehaviorSubject } from "rxjs";
import { switchMap, tap, map, distinctUntilChanged } from "rxjs/operators";

import { BookingClient } from "./BookingClient";
import { BookingModel } from "../model/BookingModel";
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
    from(this.bookingClient.getBookings()).subscribe(bookings => {
      this.updateState({ ...this._state, bookings, loading: false });
    });
  }

  private updateState(state: BookingState) {
    this.store.next((this._state = state));
  }
}
