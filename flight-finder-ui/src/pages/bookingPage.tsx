import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  Col,
  Row,
  Form,
  Input,
  Select,
  DatePicker,
  Typography,
  Flex,
  Steps,
  Image,
  Space,
  Divider,
  Button,
  Spin,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLuggageCart,
  faPlaneArrival,
  faPlaneDeparture,
} from "@fortawesome/free-solid-svg-icons";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  CheckCircleFilled,
  ClockCircleOutlined,
  CloseCircleFilled,
  InfoCircleFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  useBookFlightMutation,
  useFetchTripFlightsQuery,
} from "../reduxtoolkit/api/flightApi";
import dayjs from "dayjs";
import { airLineLogo } from "../utils/airLineLogo";
import PaymentDrawer from "../components/PaymentDrawer";

const BookingPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const fromId = searchParams.get("fromId");
  const toId = searchParams.get("toId");
  const noOfPassenger = searchParams.get("noOfPassenger");
  const [openPaymentDrawer, setOpenPaymentDrawer] = useState(false);
  const [passengers, setPassengers] = useState({});
  const [bookFlight, result] = useBookFlightMutation();
  const { data, isSuccess, isFetching, refetch } = useFetchTripFlightsQuery(
    {
      departureFlightScheduleId: fromId,
      returnFlightScheduleId: toId,
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const confirmPayment = paymentInfo => {
    const bookingInfo = {
      paymentInfo,
      passengers: passengers.map((d, i) => {
        return {
          ...d,
          docType: d.docType.value,
          issuingCountry: d.issuingCountry.value,
          nationality: d.nationality.value,
          gender: d.gender.value,
        };
      }),
      departureFlightScheduleId: parseInt(fromId),
      returnFlightScheduleId: parseInt(toId),
    };
    bookFlight({ ...bookingInfo });
    setOpenPaymentDrawer(false);
  };

  return (
    <Spin spinning={result.isLoading}>
      {result.isSuccess ? (
        <Card>
          <Typography.Text type="success" style={{ fontSize: 20 }}>
            Your flight booking is Successful !
          </Typography.Text>
          <br />
          <Typography.Text style={{ fontSize: 20 }}>
            <InfoCircleFilled type="success" style={{ fontSize: 18 }} />
            Please take note or capture the booking reference ID provided below.
          </Typography.Text>
          <Typography.Title level={3} copyable>
            {result.data.bookingRefId}
          </Typography.Title>
          <Button
            onClick={() => navigate("/")}
            type="primary"
            icon={<ArrowLeftOutlined />}
          >
            Go back
          </Button>
        </Card>
      ) : (
        <>
          <Form
            name="basic"
            onFinish={values => {
              console.log("values ", values);
              setPassengers(values.passengers);
              setOpenPaymentDrawer(true);
            }}
            form={form}
            style={{ width: "100%" }}
            initialValues={{
              passengers: [
                ...Array(parseInt(noOfPassenger))
                  .fill({})
                  .map(d => d),
              ],
            }}
          >
            <Row gutter={[8, 0]}>
              <Col md={12}>
                <Form.List name={"passengers"}>
                  {fields =>
                    fields.map(({ key, name }, i) => {
                      return (
                        <Card
                          key={i}
                          title={
                            <Typography.Text
                              style={{
                                fontWeight: 500,
                                fontSize: 18,
                                color: "#c84137",
                              }}
                            >
                              Passenger {+1}
                            </Typography.Text>
                          }
                        >
                          <Row>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="First Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input passengers!",
                                  },
                                ]}
                                name={[name, "firstName"]}
                              >
                                <Input style={{ width: "80%" }} />
                              </Form.Item>
                            </Col>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="Middle Name"
                                name={[name, "middleName"]}
                              >
                                <Input style={{ width: "80%" }} />
                              </Form.Item>
                            </Col>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="Last Name"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input Last Name!",
                                  },
                                ]}
                                name={[name, "lastName"]}
                              >
                                <Input style={{ width: "80%" }} />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="Gender"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select genders!",
                                  },
                                ]}
                                name={[name, "gender"]}
                              >
                                <Select
                                  placeholder={"Select a Gender"}
                                  labelInValue
                                  options={[
                                    { value: "Mr", label: "Mr" },
                                    { value: "Mrs", label: "Mrs" },
                                  ]}
                                  style={{ width: "80%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="Date of Birt"
                                name={[name, "dateOfBirth"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input date of birth!",
                                  },
                                ]}
                              >
                                <DatePicker
                                  showNow={false}
                                  format={"DD/MM/YYYY"}
                                  placeholder="DD/MM/YYYY"
                                  onChange={() => {}}
                                  style={{ width: "80%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="Nationality"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select nationality!",
                                  },
                                ]}
                                name={[name, "nationality"]}
                              >
                                <Select
                                  showSearch
                                  placeholder={"Select Nationality"}
                                  labelInValue
                                  options={[
                                    { value: "Myanmar", label: "Myanmar" },
                                    { value: "Thailand", label: "Thailand" },
                                    { value: "Singapore", label: "Singapore" },
                                    {
                                      value: "South Korea",
                                      label: "South Korea",
                                    },
                                  ]}
                                  style={{ width: "80%" }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="Passenger Document"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select Doc Type!",
                                  },
                                ]}
                                name={[name, "docType"]}
                              >
                                <Select
                                  placeholder={"Doc Type"}
                                  labelInValue
                                  options={[
                                    { value: "Passport", label: "Passport" },
                                  ]}
                                  style={{ width: "80%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="Passport No"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please input passportNumber!",
                                  },
                                ]}
                                name={[name, "passportNumber"]}
                              >
                                <Input style={{ width: "80%" }} />
                              </Form.Item>
                            </Col>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="Issuing country/Region"
                                name={[name, "issuingCountry"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select issuing country!",
                                  },
                                ]}
                              >
                                <Select
                                  placeholder={"Select a country/region"}
                                  labelInValue
                                  options={[
                                    { value: "Myanmar", label: "Myanmar" },
                                    { value: "Thailand", label: "Thailand" },
                                    { value: "Singapore", label: "Singapore" },
                                    {
                                      value: "South Korea",
                                      label: "South Korea",
                                    },
                                  ]}
                                  style={{ width: "80%" }}
                                />
                              </Form.Item>
                            </Col>
                            <Col md={8}>
                              <Form.Item
                                wrapperCol={{
                                  span: 24,
                                }}
                                labelCol={{
                                  span: 24,
                                }}
                                label="Passport Expiry Date"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please input passport expiray date!",
                                  },
                                ]}
                                name={[name, "passportExpiryDate"]}
                              >
                                <DatePicker
                                  showNow={false}
                                  format={"DD/MM/YYYY"}
                                  placeholder="DD/MM/YYYY"
                                  onChange={() => {}}
                                  style={{ width: "80%" }}
                                />
                              </Form.Item>
                            </Col>
                          </Row>
                          {i === 0 && (
                            <Row>
                              <Col md={8}>
                                <Form.Item
                                  wrapperCol={{
                                    span: 24,
                                  }}
                                  labelCol={{
                                    span: 24,
                                  }}
                                  label="Email"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input email!",
                                      type: "email",
                                    },
                                  ]}
                                  name={[name, "email"]}
                                >
                                  <Input style={{ width: "80%" }} />
                                </Form.Item>
                              </Col>
                              <Col md={8}>
                                <Form.Item
                                  wrapperCol={{
                                    span: 24,
                                  }}
                                  labelCol={{
                                    span: 24,
                                  }}
                                  label="Phone No"
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please Input phone number!",
                                    },
                                  ]}
                                  name={[name, "phoneNo"]}
                                >
                                  <Input style={{ width: "80%" }} />
                                </Form.Item>
                              </Col>
                              <Col md={8}>
                                <Form.Item
                                  wrapperCol={{
                                    span: 24,
                                  }}
                                  labelCol={{
                                    span: 24,
                                  }}
                                  label="Address"
                                  name={[name, "address"]}
                                  rules={[
                                    {
                                      required: true,
                                      message: "Please input address!",
                                    },
                                  ]}
                                >
                                  <Input.TextArea style={{ width: "80%" }} />
                                </Form.Item>
                              </Col>
                            </Row>
                          )}
                        </Card>
                      );
                    })
                  }
                </Form.List>
              </Col>
              <Col md={12}>
                <Spin spinning={isFetching}>
                  {isSuccess && (
                    <>
                      <Card
                        loading={isFetching}
                        title={
                          <Flex justify="space-between">
                            <Typography.Text
                              style={{
                                fontWeight: 500,
                                fontSize: 18,
                                color: "#c84137",
                              }}
                            >
                              Trip Summary
                            </Typography.Text>
                            <Button
                              icon={<ArrowLeftOutlined />}
                              onClick={() => navigate("/")}
                              type="primary"
                            >
                              Go back
                            </Button>
                          </Flex>
                        }
                      >
                        {data.departureFlights.length > 0 && (
                          <>
                            <Typography.Text>Departure Flight</Typography.Text>
                            <br />
                            <Typography.Text strong style={{ marginRight: 10 }}>
                              {data.departureFlights[0].originAirport.city}
                            </Typography.Text>
                            <ArrowRightOutlined width={200} />
                            <Typography.Text strong style={{ marginLeft: 10 }}>
                              {data.departureFlights[0].arrivalAirport.city}
                            </Typography.Text>
                            <Flex>
                              <Flex
                                vertical
                                justify="center"
                                align="center"
                                style={{ width: "30%", textAlign: "center" }}
                              >
                                <Image
                                  preview={false}
                                  width={40}
                                  src={`${
                                    airLineLogo[
                                      data.departureFlights[0].airLineLogo
                                    ]
                                  }`}
                                />
                                <Typography.Text>
                                  {data.departureFlights[0].airLineName}
                                </Typography.Text>
                                <Typography.Text>
                                  {data.departureFlights[0].flightNo}
                                </Typography.Text>
                              </Flex>
                              <div style={{ width: "40%" }}>
                                <Steps
                                  style={{ height: 250 }}
                                  current={1}
                                  direction="vertical"
                                  labelPlacement="vertical"
                                  items={[
                                    {
                                      title: `${data.departureFlights[0].originAirport.name}`,
                                      description: dayjs(
                                        data.departureFlights[0].departureTime
                                      ).format("DD/MM/YYYY HH:mm"),
                                      status: "finish",
                                      icon: (
                                        <FontAwesomeIcon
                                          style={{ fontSize: 15 }}
                                          icon={faPlaneDeparture}
                                        />
                                      ),
                                    },
                                    {
                                      title: (
                                        <Typography.Text>
                                          {`${Math.floor(
                                            dayjs(
                                              data.departureFlights[0]
                                                .arrivalTime
                                            ).diff(
                                              data.departureFlights[0]
                                                .departureTime,
                                              "minutes"
                                            ) / 60
                                          )}hr ${
                                            dayjs(
                                              data.departureFlights[0]
                                                .arrivalTime
                                            ).diff(
                                              data.departureFlights[0]
                                                .departureTime,
                                              "minutes"
                                            ) % 60
                                          }m`}
                                        </Typography.Text>
                                      ),
                                      status: "finish",
                                      icon: (
                                        <ClockCircleOutlined
                                          style={{ fontSize: 15 }}
                                        />
                                      ),
                                    },
                                    {
                                      title: `${data.departureFlights[0].arrivalAirport.name}`,
                                      description: dayjs(
                                        data.departureFlights[0].arrivalTime
                                      ).format("DD/MM/YYYY HH:mm"),
                                      status: "finish",
                                      icon: (
                                        <FontAwesomeIcon
                                          style={{ fontSize: 15 }}
                                          icon={faPlaneArrival}
                                        />
                                      ),
                                    },
                                  ]}
                                />
                              </div>
                              <Flex vertical style={{ width: "30%" }}>
                                <Space>
                                  <FontAwesomeIcon icon={faLuggageCart} />
                                  <Typography.Text>
                                    Cabin Baggage 10kg
                                  </Typography.Text>
                                </Space>
                                <Space>
                                  <ReloadOutlined />
                                  <Typography.Text>
                                    Reschedulable
                                  </Typography.Text>
                                </Space>
                                <Space>
                                  <CloseCircleFilled />
                                  <Typography.Text>
                                    Non Refundable
                                  </Typography.Text>
                                </Space>
                                <Space>
                                  <CheckCircleFilled />
                                  <Typography.Text>{`Estimate ticket issue < 2hr`}</Typography.Text>
                                </Space>
                              </Flex>
                            </Flex>
                          </>
                        )}

                        {data.returnFlights.length > 0 && (
                          <>
                            <Divider />
                            <Typography.Text>Return Flight</Typography.Text>
                            <br />
                            <Typography.Text strong style={{ marginRight: 10 }}>
                              Bangkok
                            </Typography.Text>
                            <ArrowRightOutlined width={200} />
                            <Typography.Text strong style={{ marginLeft: 10 }}>
                              Yangon
                            </Typography.Text>
                            <Flex>
                              <Flex
                                vertical
                                justify="center"
                                align="center"
                                style={{ width: "30%", textAlign: "center" }}
                              >
                                <Image
                                  preview={false}
                                  width={40}
                                  src={`${
                                    airLineLogo[
                                      data.returnFlights[0].airLineLogo
                                    ]
                                  }`}
                                />
                                <Typography.Text>
                                  {data.returnFlights[0].airLineName}
                                </Typography.Text>
                                <Typography.Text>
                                  {data.returnFlights[0].flightNo}
                                </Typography.Text>
                              </Flex>
                              <div style={{ width: "40%" }}>
                                <Steps
                                  style={{ height: 250 }}
                                  // progressDot
                                  current={1}
                                  direction="vertical"
                                  labelPlacement="vertical"
                                  items={[
                                    {
                                      title: `${data.returnFlights[0].originAirport.name}`,
                                      description: dayjs(
                                        data.returnFlights[0].departureTime
                                      ).format("DD/MM/YYYY HH:mm"),
                                      status: "finish",
                                      icon: (
                                        <FontAwesomeIcon
                                          style={{ fontSize: 15 }}
                                          icon={faPlaneDeparture}
                                        />
                                      ),
                                    },
                                    {
                                      title: (
                                        <Typography.Text>
                                          {`${Math.floor(
                                            dayjs(
                                              data.returnFlights[0].arrivalTime
                                            ).diff(
                                              data.returnFlights[0]
                                                .departureTime,
                                              "minutes"
                                            ) / 60
                                          )}hr ${
                                            dayjs(
                                              data.returnFlights[0].arrivalTime
                                            ).diff(
                                              data.returnFlights[0]
                                                .departureTime,
                                              "minutes"
                                            ) % 60
                                          }m`}
                                        </Typography.Text>
                                      ),
                                      status: "finish",
                                      icon: (
                                        <ClockCircleOutlined
                                          style={{ fontSize: 15 }}
                                        />
                                      ),
                                    },
                                    {
                                      title: `${data.returnFlights[0].arrivalAirport.name}`,
                                      description: dayjs(
                                        data.returnFlights[0].arrivalTime
                                      ).format("DD/MM/YYYY HH:mm"),
                                      status: "finish",
                                      icon: (
                                        <FontAwesomeIcon
                                          style={{ fontSize: 15 }}
                                          icon={faPlaneArrival}
                                        />
                                      ),
                                    },
                                  ]}
                                />
                              </div>
                              <Flex vertical style={{ width: "30%" }}>
                                <Space>
                                  <FontAwesomeIcon icon={faLuggageCart} />
                                  <Typography.Text>
                                    Cabin Baggage 10kg
                                  </Typography.Text>
                                </Space>
                                <Space>
                                  <ReloadOutlined />
                                  <Typography.Text>
                                    Reschedulable
                                  </Typography.Text>
                                </Space>
                                <Space>
                                  <CloseCircleFilled />
                                  <Typography.Text>
                                    Non Refundable
                                  </Typography.Text>
                                </Space>
                                <Space>
                                  <CheckCircleFilled />
                                  <Typography.Text>{`Estimate ticket issue < 2hr`}</Typography.Text>
                                </Space>
                              </Flex>
                            </Flex>
                          </>
                        )}
                      </Card>
                      <Card
                        style={{ marginBottom: 10 }}
                        title={
                          <Typography.Text
                            style={{
                              fontWeight: 500,
                              fontSize: 18,
                              color: "#c84137",
                            }}
                          >
                            Price Detail
                          </Typography.Text>
                        }
                      >
                        <Flex>
                          <Flex vertical style={{ width: "50%" }}>
                            <Flex justify="space-between">
                              <Typography.Text strong>
                                Adult (1 pax)
                              </Typography.Text>
                              <Typography.Text strong>
                                $
                                {data.departureFlights[0].price +
                                  (data.returnFlights.length &&
                                    data.returnFlights[0].price)}
                              </Typography.Text>
                            </Flex>
                            <Divider />
                            <Flex justify="space-between">
                              <Typography.Text strong style={{ fontSize: 20 }}>
                                Total Price
                              </Typography.Text>
                              <Typography.Text strong style={{ fontSize: 20 }}>
                                {(data.departureFlights[0].price +
                                  (data.returnFlights.length &&
                                    data.returnFlights[0].price)) *
                                  parseInt(noOfPassenger)}
                              </Typography.Text>
                            </Flex>
                            <Typography.Text>{`For ${noOfPassenger} pax`}</Typography.Text>
                          </Flex>
                          <Flex justify="right" style={{ width: "50%" }}>
                            <Button htmlType="submit" type="primary">
                              Checkout
                            </Button>
                          </Flex>
                        </Flex>
                      </Card>
                    </>
                  )}
                </Spin>
              </Col>
            </Row>
          </Form>
          <PaymentDrawer
            visible={openPaymentDrawer}
            onClose={() => setOpenPaymentDrawer(false)}
            confirmPayment={paymentInfo => confirmPayment(paymentInfo)}
          />
        </>
      )}
    </Spin>
  );
};

export default BookingPage;
