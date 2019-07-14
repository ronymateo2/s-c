import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { BookingModel } from "../model/BookingModel";

export class BookingClient {
  private instance: AxiosInstance;
  private baseUrl: string;
  protected jsonParseReviver:
    | ((key: string, value: any) => any)
    | undefined = undefined;

  constructor(baseUrl?: string, instance?: AxiosInstance) {
    this.instance = instance ? instance : axios.create();
    this.baseUrl = baseUrl ? baseUrl : "https://";
  }

  async getBookings(): Promise<BookingModel[]> {
    let url_ = this.baseUrl + "/bookings";
    url_ = url_.replace(/[?&]$/, "");

    let options_: AxiosRequestConfig = {
      method: "GET",
      url: url_
    };

    const _response = await this.instance.request(options_);
    return this.processBooking(_response);
  }

  protected processBooking(response: AxiosResponse): Promise<BookingModel[]> {
    const status = response.status;
    if (status === 200) {
      return Promise.resolve<BookingModel[]>(response.data as any);
    } else if (status !== 200) {
      throw new Error("A server error occurred");
    }
    return Promise.resolve<BookingModel[]>([]);
  }
}
