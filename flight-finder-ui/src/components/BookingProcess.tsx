import {
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { faPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Steps } from "antd";

const BookingProcess = () => {
  return (
    <Steps
      items={[
        {
          title: "",
          status: "finish",
          icon: <FontAwesomeIcon icon={faPlane} />,
        },
        {
          title: "Verification",
          status: "finish",
          icon: <SolutionOutlined />,
        },
        {
          title: "Pay",
          status: "process",
          icon: <LoadingOutlined />,
        },
        {
          title: "Done",
          status: "wait",
          icon: <SmileOutlined />,
        },
      ]}
    />
  );
};

export default BookingProcess;
