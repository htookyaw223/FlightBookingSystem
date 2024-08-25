import {
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Flex,
  Form,
  Grid,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { businessClass, economyClass, oneWayTrip, roundTrip } from "../utils";
import { faPerson } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useFetchAirportListQuery } from "../reduxtoolkit/api/flightApi";
type FlightSearchFormProps = {
  search: (arg: any) => any;
};
const FlightSearchForm = ({ search }: FlightSearchFormProps) => {
  const [form] = Form.useForm();
  const { data, isSuccess, isFetching, isError } = useFetchAirportListQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [originAirpots, setOriginAirport] = useState([]);
  const [arrivalAirpots, setArrivalAirport] = useState([]);
  const [hasSelectAirport, setHasSelectAirport] = useState({
    originSelect: false,
    arrivalSelect: false,
  });

  const [tripMode, setTripMode] = useState<string>(oneWayTrip.value);
  const [noOfPassenger, setNoOfPassenger] = useState<any>(1);
  const { useBreakpoint } = Grid;
  const { sm: isLargerScreen } = useBreakpoint();
  const isRoundTrip = tripMode === roundTrip.value;
  useEffect(() => {
    if (isSuccess) {
      const airports = data.map((airport: any) => ({
        label: `${airport.name}, ${airport.city}, ${airport.country}`,
        value: airport.id,
      }));
      setOriginAirport(airports);
      setArrivalAirport(airports);
    }
  }, [data, isSuccess]);
  return (
    <Flex justify="center" style={{ marginTop: 20 }}>
      <Form
        style={{ width: isLargerScreen ? "70%" : "90%" }}
        name="basic"
        onFinish={values => {
          const searchData = {
            originalAirportId: values.from.value,
            arrivalAirportId: values.to.value,
            tripMode: tripMode === "oneWay" ? "ONE_WAY_TRIP" : "ROUND_TRIP",
            departureDate: values.departureDate,
            returnDate: values.returnDate,
            originAirpot: values.from.label,
            arrivalAirpot: values.to.label,
            noOfPassenger,
          };
          search(searchData);
        }}
        form={form}
      >
        <Card>
          <Row>
            <Form.Item name={"tripMode"}>
              <Radio.Group
                onChange={e => {
                  setTripMode(e.target.value);
                }}
                defaultValue={oneWayTrip.value}
              >
                <Radio value={oneWayTrip.value}>{oneWayTrip.label}</Radio>
                <Radio value={roundTrip.value}>{roundTrip.label}</Radio>
              </Radio.Group>
            </Form.Item>
          </Row>
          <Row align={"middle"}>
            <Col md={isRoundTrip ? 6 : 8} sm={12} xs={24}>
              <Form.Item
                style={{ margin: 5 }}
                rules={[
                  { required: true, message: "Please input from place!" },
                ]}
                name={"from"}
              >
                <Select
                  showSearch
                  placeholder={"Select Origin"}
                  labelInValue
                  options={originAirpots}
                  style={{ width: "80%" }}
                  loading={isFetching}
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>
            <Col md={isRoundTrip ? 6 : 8} sm={12} xs={24}>
              <Form.Item
                style={{ margin: 5 }}
                rules={[
                  {
                    required: true,
                    message: "Please input destination place!",
                  },
                ]}
                name={"to"}
              >
                <Select
                  showSearch
                  placeholder={"Select Arrival"}
                  labelInValue
                  options={arrivalAirpots}
                  style={{ width: "80%" }}
                  loading={isFetching}
                  optionFilterProp="label"
                />
              </Form.Item>
            </Col>
            <Col md={isRoundTrip ? 6 : 8} sm={isRoundTrip ? 12 : 24} xs={24}>
              <Form.Item
                style={{ margin: 5 }}
                rules={[
                  {
                    required: true,
                    message: "Please select departure date!",
                  },
                ]}
                name={"departureDate"}
              >
                <DatePicker
                  showNow={false}
                  placeholder="Departure Date"
                  onChange={() => {}}
                  style={{ width: "100%" }}
                  minDate={dayjs()}
                />
              </Form.Item>
            </Col>
            {roundTrip.value === tripMode && (
              <Col md={isRoundTrip ? 6 : 8} sm={12} xs={24}>
                <Form.Item
                  style={{ margin: 5 }}
                  rules={[
                    {
                      required: true,
                      message: "Please select return date!",
                    },
                  ]}
                  name={"returnDate"}
                >
                  <DatePicker
                    showNow={false}
                    placeholder="Return Date"
                    onChange={() => {}}
                    style={{ width: "100%" }}
                    minDate={
                      form.getFieldValue("departureDate")
                        ? form.getFieldValue("departureDate").add(1, "day")
                        : dayjs().add(1, "day")
                    }
                  />
                </Form.Item>
              </Col>
            )}
          </Row>
          <Row align={"middle"}>
            <Col sm={8} xs={24}>
              <Form.Item style={{ margin: 5 }}>
                <Dropdown
                  placement="bottom"
                  arrow
                  dropdownRender={menu => (
                    <Card style={{ padding: 3 }}>
                      <Form.Item
                        wrapperCol={{
                          span: 24,
                        }}
                        label="Number of passenger"
                        rules={[
                          {
                            required: true,
                            message: "Please input passengers!",
                          },
                        ]}
                        name={"noOfPassenger"}
                      >
                        <InputNumber
                          value={noOfPassenger}
                          style={{ width: 200 }}
                          min={1}
                          onChange={value => setNoOfPassenger(value)}
                        />
                      </Form.Item>
                    </Card>
                  )}
                >
                  <Input
                    readOnly
                    value={noOfPassenger + " passengers"}
                    suffix={<FontAwesomeIcon icon={faPerson} />}
                  />
                </Dropdown>
              </Form.Item>
            </Col>
            <Col sm={8} xs={24}>
              <Form.Item
                style={{ margin: 5 }}
                rules={[
                  {
                    required: true,
                    message: "Please select cabin class!",
                  },
                ]}
                name={"cabinClass"}
              >
                <Select
                  placeholder={"Cabin class"}
                  labelInValue
                  options={[economyClass, businessClass]}
                />
              </Form.Item>
            </Col>
            <Col sm={8}>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SearchOutlined />}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Card>
      </Form>
    </Flex>
  );
};

export default FlightSearchForm;
