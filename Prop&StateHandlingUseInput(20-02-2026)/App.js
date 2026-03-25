import React, { useState } from "react";
import UserMessage from "./UserMessage";

function App() {

  // ✅ State for name input
  const [name, setName] = useState("");

  // ✅ State to store submitted name
  const [submittedName, setSubmittedName] = useState("");

  // ✅ State for showing/hiding message
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Handle input change (Controlled Component)
  const handleChange = (event) => {
    setName(event.target.value);
  };

  // ✅ Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();   // prevent page reload
    setSubmittedName(name);
    setName(""); // clear input
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>React Props, State & Conditional Rendering Example</h2>

      {/* ✅ Form Handling */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}              // Controlled Component
          onChange={handleChange}   // Event handler
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>

      <br />

      {/* ✅ Conditional Rendering using Ternary */}
      {submittedName ? (
        <UserMessage username={submittedName} />
      ) : (
        <p>Please enter your name above.</p>
      )}

      <br />

      {/* ✅ Conditional Rendering using && */}
      {isLoggedIn && <p>Welcome Back!</p>}

      <br />

      {/* ✅ Button Click Event */}
      <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
        {isLoggedIn ? "Logout" : "Login"}
      </button>

    </div>
  );
}

export default App;