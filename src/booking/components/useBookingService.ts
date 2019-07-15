import { useContext, useState, useEffect } from "react";

import BookingContext from "../context/BookingContext";
import { BookingModel, isImpossibleRoute } from "../model/BookingModel";
import { map } from "rxjs/operators";
import { Observable, SubscriptionLike } from "rxjs";

export const useBookingService = (
  pipeBookings?: (
    bookings$: Observable<BookingModel[]>
  ) => Observable<BookingModel[]>
): [BookingModel[], boolean] => {
  const bookingService = useContext(BookingContext)!.service;
  const [bookings, setBookings] = useState([] as BookingModel[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let sub: SubscriptionLike;
    if (!pipeBookings) {
      pipeBookings = x => x;
    }

    sub = pipeBookings(bookingService.bookings$).subscribe(bookings => {
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

  return [bookings, loading];
};

function PipeIs() {
  return map((bookings: BookingModel[]) =>
    bookings.filter(b => isImpossibleRoute(b))
  );
}
