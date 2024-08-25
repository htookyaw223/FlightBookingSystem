import {
  CheckCircleFilled,
  InfoCircleFilled,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Button, Empty, Flex, Grid, Row, Spin, Typography } from "antd";
import { useEffect, useState } from "react";
import { useFetchFlightListQuery } from "../reduxtoolkit/api/flightApi";
import FlightCard from "./FlightCard";
import { useNavigate } from "react-router-dom";

const FlightResult = ({ searchData }) => {
  const { useBreakpoint } = Grid;
  const navigate = useNavigate();
  const { sm: isLargerScreen } = useBreakpoint();
  const [selectedDeparture, setSelectedDeparture] = useState(false);
  const [selectedReturn, setSelectedReturn] = useState(false);
  const [selectedFlights, setSelectedFlights] = useState([]);
  const { data, isLoading, isFetching, isSuccess } = useFetchFlightListQuery(
    {
      ...searchData,
    },
    { refetchOnMountOrArgChange: true }
  );

  const handleSelectFlight = (flight, isReturn) => {
    if (isReturn) {
      setSelectedReturn(true);
    } else {
      setSelectedDeparture(true);
    }
    setSelectedFlights(prev => [...prev, flight]);
  };
  useEffect(() => {
    setSelectedFlights([]);
    setSelectedDeparture(false);
    setSelectedReturn(false);
  }, [searchData]);
  const disabled =
    (searchData.tripMode === "ONE_WAY_TRIP" && selectedFlights.length !== 1) ||
    (searchData.tripMode === "ROUND_TRIP" && selectedFlights.length !== 2);

  return (
    <Spin spinning={isFetching}>
      <Flex justify="center" align="center" style={{ marginTop: 20 }} vertical>
        <div style={{ width: isLargerScreen ? "70%" : "90%", marginBottom: 5 }}>
          {selectedDeparture ? (
            <>
              <CheckCircleFilled style={{ color: "green" }} /> Departure flight
              is selected
            </>
          ) : (
            <>
              <InfoCircleFilled disabled /> Please select departure flight
            </>
          )}
        </div>
        {searchData.tripMode === "ROUND_TRIP" && (
          <div
            style={{ width: isLargerScreen ? "70%" : "90%", marginBottom: 5 }}
          >
            {selectedReturn ? (
              <>
                <CheckCircleFilled style={{ color: "green" }} /> Return flight
                is selected
              </>
            ) : (
              <>
                <InfoCircleFilled disabled /> Please select return flight
              </>
            )}
          </div>
        )}
        <Row
          justify={"space-between"}
          align={"middle"}
          style={{ width: isLargerScreen ? "70%" : "90%", marginBottom: 5 }}
        >
          <Typography.Title level={4}>
            {selectedDeparture
              ? searchData.tripMode === "ROUND_TRIP" && disabled
                ? "Return flights to " + searchData.originAirpot
                : "Selected flights"
              : "Departure flights to " + searchData.arrivalAirpot}
          </Typography.Title>
          <Button
            disabled={disabled}
            type="primary"
            style={{ fontSize: 18 }}
            icon={<ArrowRightOutlined />}
            onClick={() => {
              let fromId = selectedFlights[0].flightScheduleId;
              let toId =
                selectedFlights.length > 1
                  ? selectedFlights[1].flightScheduleId
                  : "";
              navigate(
                `/booking?fromId=${fromId}&toId=${toId}&noOfPassenger=${searchData.noOfPassenger}`
              );
            }}
          >
            Proceed to book
          </Button>
        </Row>

        {!disabled ? (
          selectedFlights.map((d, i) => (
            <FlightCard
              key={i}
              flight={d}
              onSelect={() => handleSelectFlight(d, true)}
              isLargerScreen={isLargerScreen}
              viewOnly
            />
          ))
        ) : isSuccess ? (
          !selectedDeparture ? (
            data.departureFlights.map((d, i) => (
              <FlightCard
                key={i}
                flight={d}
                onSelect={() => handleSelectFlight(d, false)}
                isLargerScreen={isLargerScreen}
              />
            ))
          ) : (
            searchData.tripMode === "ROUND_TRIP" &&
            (data.returnFlights.length > 0 ? (
              data.returnFlights.map((d, i) => (
                <FlightCard
                  key={i}
                  flight={d}
                  onSelect={() => handleSelectFlight(d, true)}
                  isLargerScreen={isLargerScreen}
                />
              ))
            ) : (
              <Empty />
            ))
          )
        ) : (
          <Empty description="no flights on this date" />
        )}
      </Flex>
    </Spin>
  );
};

export default FlightResult;
