import React, { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

const DefaultWait = ({ JoinChatRoom }) => {
  const [username, setusername] = useState("");
  const [ChatRoom, setChatRoom] = useState("");

  return (
    <div>
      <Row>
        <Col>
          <h1>Bienvenu</h1>
        </Col>
      </Row>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          JoinChatRoom(username, ChatRoom);
        }}
      >
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                placeholder="Username"
                onChange={(e) => setusername(e.target.value)}
                className="mb-4"
              />
              <Form.Control
                placeholder="ChatRoom"
                onChange={(e) => setChatRoom(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <hr />
            <Button variant="success" type="submit">
              Joindre Room
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default DefaultWait;
