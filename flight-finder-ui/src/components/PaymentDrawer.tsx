import {
  Avatar,
  Button,
  Card,
  Drawer,
  Flex,
  Form,
  Input,
  Popconfirm,
  Space,
  Typography,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield } from "@fortawesome/free-solid-svg-icons";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import visaLogo from "../assets/visa.png";
import jcbcard from "../assets/jcbcard.png";
import mastercard from "../assets/mastercard.png";
import unionpay from "../assets/union-pay.png";
import { useState } from "react";

const ELEMENT_STYLE = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": { color: "#aab7c4" },
    },
    invalid: { color: "#9e2146" },
  },
};

const PaymentDrawer = ({ visible, onClose, confirmPayment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const values = await form.validateFields();

    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardNumberElement);

    const { token, error } = await stripe.createToken(card, {
      name: values.cardHolder,
    });

    if (error) {
      console.error("Stripe error:", error.message);
      setLoading(false);
      return;
    }

    confirmPayment({
      token: token.id,
      cardHolder: values.cardHolder,
    });

    setLoading(false);
  };

  return (
    <Drawer
      title="Please select your payment method"
      placement="right"
      width="50%"
      onClose={onClose}
      open={visible}
      maskClosable={false}
      extra={<Button onClick={onClose}>Cancel</Button>}
    >
      <Card>
        <FontAwesomeIcon style={{ marginRight: 10 }} icon={faShield} />
        <Typography.Text style={{ fontSize: 16 }}>
          Your card information is fully encrypted, secure, and protected
        </Typography.Text>
      </Card>

      <Card title="Credit/Debit Card">
        <Space style={{ marginBottom: 16 }}>
          <Avatar shape="square" src={visaLogo} />
          <Avatar shape="square" src={jcbcard} />
          <Avatar shape="square" src={mastercard} />
          <Avatar shape="square" src={unionpay} />
        </Space>

        <Form form={form} layout="vertical">
          <Form.Item
            name="cardHolder"
            label="Name on Card"
            rules={[{ required: true, message: "Cardholder name is required" }]}
          >
            <Input placeholder="Card Holder Name" />
          </Form.Item>

          <Form.Item label="Card Number" required>
            <div
              style={{
                border: "1px solid #d9d9d9",
                padding: "11px 14px",
                borderRadius: 6,
              }}
            >
              <CardNumberElement options={ELEMENT_STYLE} />
            </div>
          </Form.Item>

          <Flex gap="small">
            <Form.Item label="Valid Until" required style={{ flex: 1 }}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  padding: "11px 14px",
                  borderRadius: 6,
                }}
              >
                <CardExpiryElement options={ELEMENT_STYLE} />
              </div>
            </Form.Item>

            <Form.Item label="CVC" required style={{ flex: 1 }}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  padding: "11px 14px",
                  borderRadius: 6,
                }}
              >
                <CardCvcElement options={ELEMENT_STYLE} />
              </div>
            </Form.Item>
          </Flex>

          <Popconfirm
            onConfirm={handleSubmit}
            title="Payment will proceed with your card. Are you sure?"
          >
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!stripe}
            >
              Submit
            </Button>
          </Popconfirm>
        </Form>
      </Card>
    </Drawer>
  );
};

export default PaymentDrawer;
