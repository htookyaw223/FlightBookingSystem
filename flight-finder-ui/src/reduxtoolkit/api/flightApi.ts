import { FlightUrl } from "../../config/api";
import { mainApi } from "./mainApi";

const Tags = Object.freeze({
  Flight: "Flight",
  Airport: "Airport",
  TripFlight: "TripFlight"
});

const flightApi = mainApi.injectEndpoints({
  endpoints: build => ({
    fetchFlightList: build.query({
      query: params => ({
        url: FlightUrl.getFlights,
        method: "POST",
        body: params,
      }),
      transformErrorResponse: error => {
        return error; //createError(error);
      },
      providesTags: [Tags.Flight],
    }),
    fetchAirportList: build.query({
      query: params => ({
        url: FlightUrl.getAirports,
        method: "POST",
        body: params,
      }),
      transformErrorResponse: error => {
        return error; //createError(error);
      },
      providesTags: [Tags.Airport],
    }),
    fetchTripFlights: build.query({
      query: params => ({
        url: FlightUrl.getTripFlights,
        method: "POST",
        body: params,
      }),
      transformErrorResponse: error => {
        return error; //createError(error);
      },
      providesTags: [Tags.TripFlight],
    }),
    bookFlight: build.mutation({
      query: params => ({
        url: FlightUrl.bookFlight,
        method: "POST",
        body: params,
      }),
      transformErrorResponse: error => {
        return error; //createError(error);
      },
      providesTags: [Tags.Flight],
    }),
  }),
});

export const { useFetchFlightListQuery, useFetchAirportListQuery, useFetchTripFlightsQuery, useBookFlightMutation } = flightApi;
