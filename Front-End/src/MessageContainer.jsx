import React from "react";

const MessageContainer = ({ messages }) => {
    return (
      <div>
        <table striped="true" bordered="true">
          <tbody>
            {messages.map((message, index) => (
              <tr key={index}>
                <td>{`${message.message} - ${message.username}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  

export default MessageContainer;
