import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import DefaultWait from './DefaultWait';
import ChatRoom from './ChatRoom';
import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

function App() {
  const [conn, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const JoinChatRoom = async (username, ChatRoom) => {
    try {
      const conn = new HubConnectionBuilder()
        .withUrl("https://localhost:7204/chat")
        .configureLogging(LogLevel.Information)
        .build();

      conn.onclose((error) => {
        console.error("Connection closed with error:", error);
      });

      conn.on("JoinSpecificRoom", (message) => {
        console.log("message : ", message);
        setMessages((messages) => [...messages, { username, message }]);
      });

      conn.on("ReceiveSpecificMessage", (username, message)=>{
        console.log("message : "+message+ " username "+ username)
        setMessages(messages=>[...messages,{username, message}])
      });

      await conn.start().catch((error) => {
        console.error('Error starting connection:', error);
        throw error;
      });

      console.log("JoinSpecificRoom invoked with:", username, ChatRoom);
      await conn.invoke("JoinSpecificRoom", { username, ChatRoom });

      setConnection(conn);
    } catch (error) {
      console.error('Error starting connection or invoking JoinSpecificRoom:', error);
    }
  }

const sendMessage = async(message) => {
  try {
    await conn.invoke("SendMessage",message); 
  }catch(e){
    console.log(e); 
  }
}

  return (
    <div className="App">
      <main>
        <h2>AspChat</h2>
        <Container className="container">
          <Row className="align-items-center">
            <Col xs={12} md={6} className="form-container">
              {!conn ? (
                <DefaultWait JoinChatRoom={JoinChatRoom} />
              ) : (
                <ChatRoom messages={messages} sendMessage={sendMessage}/>
              )}
            </Col>
          </Row>
        </Container>
      </main>
    </div>
  );
}

export default App;
