import React from "react";

function UserMessage(props) {
  return (
    <div>
      <h3>Hello, {props.username} 👋</h3>
      <p>You have successfully submitted the form.</p>
    </div>
  );
}

export default UserMessage;