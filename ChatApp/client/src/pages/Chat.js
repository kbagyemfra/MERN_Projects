import { Col, Container, Row } from "react-bootstrap";
import MessageForm from "../components/MessageForm";
import Sidybar from "../components/Sidybar";

const Chat = () => {
  return (
    <Container>
      <Row>
        <Col md={4}>
          <Sidybar />
        </Col>
        <Col md={8}>
          <MessageForm />
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
