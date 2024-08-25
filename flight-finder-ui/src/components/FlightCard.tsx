import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { Button, Card, Col, Row, Steps, Typography } from "antd";
import dayjs from "dayjs";

const FlightCard = ({ flight, onSelect, isLargerScreen, viewOnly }) => {
  return (
    <Card
      style={{
        width: isLargerScreen ? "70%" : "90%",
        marginBottom: 5,
        background: viewOnly && "#ddd7c3",
      }}
    >
      <Row>
        <Col span={3}>
          <Typography.Text
            strong
            style={{
              marginBottom: 4,
              display: "block",
              fontSize: 18,
            }}
          >
            {dayjs(flight.departureTime).format("HH:mm")}
          </Typography.Text>
          <Typography.Text
            strong
            style={{
              marginBottom: 4,
              display: "block",
              fontSize: 16,
            }}
          >
            {`${flight.originAirport.city}, ${flight.originAirport.country}`}
          </Typography.Text>
          <Typography.Text>{`${flight.originAirport.name}`}</Typography.Text>
          <Typography.Text
            strong
            style={{
              marginBottom: 4,
              display: "block",
              fontSize: 14,
            }}
          >
            {dayjs(flight.departureTime).format("DD/MM/YYYY")}
          </Typography.Text>
        </Col>
        <Col style={{ textAlign: "center" }} span={12}>
          <Typography.Text>
            {`${Math.floor(
              dayjs(flight.arrivalTime).diff(flight.departureTime, "minutes") /
                60
            )}hr ${
              dayjs(flight.arrivalTime).diff(flight.departureTime, "minutes") %
              60
            }m`}
          </Typography.Text>
          <Steps
            items={[
              {
                title: null,
                status: "finish",
                icon: <FontAwesomeIcon icon={faPlane} />,
              },
              {
                title: null,
                status: "finish",
                icon: <FontAwesomeIcon icon={faPlane} />,
              },
            ]}
          />
          <Typography.Text>Nonstop</Typography.Text>
          <br />
          <Typography.Text>{flight.flightNo}</Typography.Text>
        </Col>
        <Col span={3} style={{ textAlign: "right" }}>
          <Typography.Text
            strong
            style={{
              marginBottom: 4,
              display: "block",
              fontSize: 18,
            }}
          >
            {dayjs(flight.arrivalTime).format("HH:mm")}
          </Typography.Text>
          <Typography.Text
            strong
            style={{
              marginBottom: 4,
              display: "block",
              fontSize: 16,
            }}
          >
            {`${flight.arrivalAirport.city}, ${flight.arrivalAirport.country}`}
          </Typography.Text>
          <Typography.Text>{`${flight.arrivalAirport.name}`}</Typography.Text>
          <Typography.Text
            strong
            style={{
              marginBottom: 4,
              display: "block",
              fontSize: 14,
            }}
          >
            {dayjs(flight.arrivalTime).format("DD/MM/YYYY")}
          </Typography.Text>
        </Col>
        <Col
          span={6}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!viewOnly && (
            <Button type="primary" onClick={onSelect}>
              Select
            </Button>
          )}
        </Col>
      </Row>
    </Card>
  );
};

export default FlightCard;
