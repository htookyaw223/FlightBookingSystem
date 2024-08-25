import { SecurityScanFilled, SecurityScanOutlined } from "@ant-design/icons";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Drawer,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import visaLogo from "../assets/visa.png";
import jcbcard from "../assets/jcbcard.png";
import mastercard from "../assets/mastercard.png";
import paypal from "../assets/paypal.png";
import unionpay from "../assets/union-pay.png";
import NumericInput from "./NumericInput";
import { useState } from "react";

const PaymentDrawer = ({ visible, onClose, confirmPayment }) => {
  const [value, setValue] = useState("");
  const [form] = Form.useForm();
  return (
    <Drawer
      title="Please select your payment method"
      placement={"right"}
      width={"50%"}
      onClose={() => onClose()}
      open={visible}
      extra={
        <Space>
          <Button onClick={() => {}}>Cancel</Button>
        </Space>
      }
      maskClosable={false}
    >
      <Card>
        <FontAwesomeIcon style={{ marginRight: 10 }} icon={faShield} />
        <Typography.Text style={{ fontSize: 16 }}>
          Your card information is fully encrypted,secure, and protected
        </Typography.Text>
      </Card>
      <Card title="Credit/Debit Card">
        <Space>
          <Avatar shape="square" src={visaLogo} />
          <Avatar shape="square" src={jcbcard} />
          <Avatar shape="square" src={mastercard} />
          <Avatar shape="square" src={unionpay} />
        </Space>
        <Form form={form}>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name={"cardNumber"}
            label="Card Number"
          >
            <NumericInput value={value} onChange={setValue} />
          </Form.Item>
          <Flex>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name={"validUntil"}
              label="Valid Until"
              rules={[
                {
                  required: true,
                  message: "Please set valid until!",
                },
              ]}
            >
              <DatePicker
                format={{
                  format: "MM/YY",
                  type: "mask",
                }}
                placeholder="MM/YY"
              />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              name={"cvv"}
              label="CVV/CVC"
              rules={[
                {
                  required: true,
                  message: "Please set valid until!",
                },
              ]}
            >
              <Input placeholder="MM/YY" />
            </Form.Item>
          </Flex>
          <Form.Item
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            name={"cardHolder"}
            label="Name on card"
            rules={[
              {
                required: true,
                message: "Please set valid until!",
              },
            ]}
          >
            <Input placeholder="Card Holder Name" />
          </Form.Item>
          <Space>
            <Popconfirm
              onConfirm={() => {
                const paymentInfo = {
                  cardHolder: form.getFieldValue("cardHolder"),
                  cvv: form.getFieldValue("cvv"),
                  expiryDate: form.getFieldValue("validUntil").format("MM/YY"),
                  cardNumber: form.getFieldValue("cardNumber"),
                };
                confirmPayment(paymentInfo);
              }}
              title="Payment will proceed with your filling account and Price will be deducted from your account!"
            >
              <Button htmlType="submit" type="primary">
                Submit
              </Button>
            </Popconfirm>
          </Space>
        </Form>
      </Card>
    </Drawer>
  );
};

export default PaymentDrawer;
