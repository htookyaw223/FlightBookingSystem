const flightUrl = "";
const authUrl = "/auth";
export const FlightUrl = {
  getFlights: `${flightUrl}/flights`,
  getAirports: `${flightUrl}/airports`,
  getTripFlights: `${flightUrl}/trip-flights`,
  bookFlight:`${flightUrl}/book-flight`
};
export const AuthUrl = {
  loginUrl:`${authUrl}/login`
}
