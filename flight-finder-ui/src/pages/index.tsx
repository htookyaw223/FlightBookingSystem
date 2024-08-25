import { Button, Flex, Image, Layout, Typography } from "antd";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getItem, removeItem } from "../utils/localstorage";
import { LogoutOutlined } from "@ant-design/icons";
const { Header, Content } = Layout;

function PageLayout() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getItem();
    if (!token) {
      navigate("/login");
    }
  }, []);
  const logout = () => {
    removeItem();
    navigate("/login");
  };
  return (
    <Layout>
      <Header style={{ ...headerStyle }}>
        <Flex align="center" justify="space-between">
          <Flex align="center">
            <Image width={60} src="/logo.png" />
            <Typography.Title level={2}>Flight Booking System</Typography.Title>
          </Flex>
          <Button onClick={logout} icon={<LogoutOutlined />}>
            Logout
          </Button>
        </Flex>
      </Header>
      <Content style={{ height: "100vh", padding: 10 }}>
        <Outlet />
      </Content>
    </Layout>
  );
}
const headerStyle: React.CSSProperties = {
  height: 90,
  lineHeight: "64px",
  backgroundColor: "#ddd7c3",
};
export default PageLayout;
