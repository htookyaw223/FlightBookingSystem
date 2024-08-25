import { Flex, Image, Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";
const { Header, Content } = Layout;

function PageLayout() {
  return (
    <Layout>
      <Header style={{ ...headerStyle }}>
        <Flex align="center">
          <Image width={60} src="/logo.png" />
          <Typography.Title level={2}>Flight Booking System</Typography.Title>
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
