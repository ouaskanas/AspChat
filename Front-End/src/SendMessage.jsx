import React, { useState } from "react";
import { Form, FormControl, InputGroup, Button } from "react-bootstrap";

const SendMessage = ({ sendMessage }) => {
  const [message, setMessage] = useState('');

  return (
<Form onSubmit={e => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
}}>
      <InputGroup>
        <InputGroup.Text>Chat</InputGroup.Text>
        <FormControl onChange={e => setMessage(e.target.value)} value={message} placeholder="Votre Message" />
        <Button variant="primary" type="submit" disabled={!message}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
}
export default SendMessage;