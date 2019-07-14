import { Observable, Subject, from, timer } from "rxjs";
import { switchMap, tap } from "rxjs/operators";

import { BookingClient } from "./BookingClient";
import { BookingModel } from "../model/BookingModel";

export class BookingService {
  bookings$: Observable<BookingModel[]>;
  loading$: Subject<boolean> = new Subject();

  constructor(private bookingClient: BookingClient) {
    this.bookings$ = timer(1).pipe(
      tap(() => this.loading$.next(true)),
      switchMap(() => from(this.bookingClient.getBookings())),
      tap(() => this.loading$.next(false))
    );
  }
}
