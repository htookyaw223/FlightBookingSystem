import React, { useState } from "react";
import FlightSearchForm from "../components/FlightSearchForm";
import FlightResult from "../components/FlightResult";

export default function FlightSearchPage() {
  const [searchData, setSearchData] = useState(null);
  return (
    <>
      {/* Flight Search Form */}
      <FlightSearchForm search={(data: object) => setSearchData(data)} />

      {searchData && <FlightResult searchData={searchData} />}
    </>
  );
}
