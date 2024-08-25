import React from "react";

import {
  Flex,
  Form,
  Input,
  Button,
  Card,
  Typography,
  Image,
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLoginMutation } from "../reduxtoolkit/api/authApi";
import { setItem } from "../utils/localstorage";
const { Title, Text } = Typography;
const LoginPage = ({}) => {
  const navigate = useNavigate();
  const [login, result] = useLoginMutation();

  const onFinish = values => {
    login({ ...values });
  };
  useEffect(() => {
    if (result.isSuccess) {
      setItem(result.data?.token);
      navigate("/flight-search");
    } else {
      if (result.isError) message.error(result.error.data.errorMessage);
    }
  }, [result]);

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ height: "100vh" }}>
      <Flex justify="center" align="center" style={{ height: "100%" }} vertical>
        <Card
          bordered
          style={{
            maxWidth: 500,
            minWidth: 330,
            boxShadow: "0 10px 10px -5px #ddd7c3",
          }}
          bodyStyle={{ paddingTop: 10 }}
        >
          <Flex
            justify="center"
            align="center"
            style={{ height: "100%" }}
            vertical
          >
            <Title color="primary" level={3}>
              Login
            </Title>
            <Form
              name="basic"
              style={{
                maxWidth: 600,
                minWidth: 250,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 0,
                  span: 24,
                }}
              >
                <Button
                  style={{ width: "100%" }}
                  type="primary"
                  htmlType="submit"
                >
                  Click to Login
                </Button>
              </Form.Item>
            </Form>
            <Text>
              Don't have an account? <Link to="/signup">Click here</Link>{" "}
            </Text>
            <Link to="/forget-password">Forget password?</Link>
          </Flex>
        </Card>
      </Flex>
    </div>
  );
};

export default LoginPage;
