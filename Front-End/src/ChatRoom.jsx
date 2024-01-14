import { Col, Row } from "react-bootstrap";
import MessageContainer from "./MessageContainer";
import SendMessage from "./SendMessage";

const ChatRoom = ({ messages, sendMessage }) => (
  <div>
    <Row>
      <Col>
        <h1>ChatRoom</h1>
      </Col>
      <Col></Col>
    </Row>
    <Row>
      <Col sm={12}>
        <MessageContainer messages={messages} />
      </Col>
      <Col sm={12}>
        <SendMessage sendMessage={sendMessage} />
      </Col>
    </Row>
  </div>
);

export default ChatRoom;
