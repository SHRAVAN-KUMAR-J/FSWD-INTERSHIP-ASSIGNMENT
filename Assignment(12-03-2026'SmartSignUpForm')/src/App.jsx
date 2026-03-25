import { useState } from "react";
import "./App.css";

function App() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Password format like Shravan@123655
    const passwordPattern = /^[A-Z][a-zA-Z]+@[0-9]+$/;

    if (!emailPattern.test(email)) {
      setMessage("❌ Invalid Email Format");
      return;
    }

    if (!passwordPattern.test(password)) {
      setMessage("❌ Password must be like: Shravan@123655");
      return;
    }

    setMessage("✅ Signup Successful!");
  };

  return (
    <div className="container">
      <h2>Smart Signup Form</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password (Example: Shravan@123655)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Signup</button>

      </form>

      <p>{message}</p>
    </div>
  );
}

export default App;