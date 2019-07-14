export interface BookingModel {
  id: number;
  car: {
    id: number;
    licence_plate: string;
  };
  book_start: number;
  book_end: number;
  pickup: {
    id: number;
    code: string;
    lat: number;
    lng: number;
  };
  dropoff: {
    id: number;
    code: string;
    lat: number;
    lng: number;
  };
  user: {
    id: number;
    name: string;
  };
}

export const getLimitsDropOffDate = (
  bookings: BookingModel[]
): [number, number] => {
  if (bookings.length === 0) return [0, 0];
  const sorted = bookings.sort((a, b) => a.book_end - b.book_end);
  return [sorted[0].book_end, sorted[sorted.length - 1].book_end];
};

export function getLimitsPickUp(bookings: BookingModel[]) {
  if (bookings.length === 0) return [0, 0];
  const sorted = bookings.sort((a, b) => a.book_start - b.book_start);
  return [sorted[0].book_start, sorted[sorted.length - 1].book_start];
}

function getDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: string
) {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
}

export const getBookingDistance = (booking: BookingModel) =>
  getDistance(
    booking.pickup.lat,
    booking.pickup.lng,
    booking.dropoff.lat,
    booking.dropoff.lng,
    "k"
  );

export const isImpossibleRoute = (
  booking: BookingModel,
  maxSpeed: number = 90
) => {
  const distance = getBookingDistance(booking);
  const bookingTime = booking.book_end - booking.book_start;
  return bookingTime < (distance / maxSpeed) * 60 * 60 * 60;
};
