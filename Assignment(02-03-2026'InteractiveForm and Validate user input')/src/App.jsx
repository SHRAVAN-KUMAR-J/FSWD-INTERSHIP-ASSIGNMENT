import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false
  });

  // Password strength checker
  useEffect(() => {
    if (formData.password) {
      if (formData.password.length < 6) {
        setPasswordStrength("weak");
      } else if (formData.password.length < 10) {
        setPasswordStrength("medium");
      } else {
        setPasswordStrength("strong");
      }
    } else {
      setPasswordStrength("");
    }
  }, [formData.password]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    
    // Clear messages when user starts typing
    setError("");
    setMessage("");
  };

  const handleBlur = (e) => {
    setTouched({
      ...touched,
      [e.target.name]: true
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsSubmitting(true);

    // Validation
    if (formData.name.length < 3) {
      setError("Name must be at least 3 characters");
      setIsSubmitting(false);
      return;
    }

    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      setError("Enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setMessage("🎉 Form submitted successfully!");
      setFormData({ name: "", email: "", password: "" });
      setTouched({ name: false, email: false, password: false });
      setPasswordStrength("");
      setIsSubmitting(false);
    }, 1500);
  };

  const getPasswordStrengthColor = () => {
    switch(passwordStrength) {
      case "weak": return "#ff4444";
      case "medium": return "#ffbb33";
      case "strong": return "#00C851";
      default: return "#ddd";
    }
  };

  return (
    <div className="app">
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      
      <div className="container">
        <div className="header">
          <h1>✨ Welcome Back</h1>
          <p>Please enter your details to continue</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <div className="input-wrapper">
              <span className="input-icon">👤</span>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.name && formData.name.length < 3 ? "error-input" : ""}
              />
            </div>
            {touched.name && formData.name.length < 3 && formData.name.length > 0 && (
              <span className="input-error">Name is too short</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={touched.email && (!formData.email.includes("@") || !formData.email.includes(".")) ? "error-input" : ""}
              />
            </div>
            {touched.email && formData.email && !formData.email.includes("@") && (
              <span className="input-error">Please include '@' in email</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <span className="input-icon">🔒</span>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            
            {/* Password strength indicator */}
            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div 
                    className="strength-fill"
                    style={{ 
                      width: passwordStrength === "weak" ? "33%" : 
                             passwordStrength === "medium" ? "66%" : 
                             passwordStrength === "strong" ? "100%" : "0%",
                      backgroundColor: getPasswordStrengthColor()
                    }}
                  ></div>
                </div>
                <span className="strength-text" style={{ color: getPasswordStrengthColor() }}>
                  {passwordStrength ? passwordStrength.toUpperCase() : ""}
                </span>
              </div>
            )}
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="terms" />
            <label htmlFor="terms">I agree to the Terms and Conditions</label>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? "submitting" : ""}
          >
            {isSubmitting ? (
              <span className="spinner"></span>
            ) : (
              "Sign In"
            )}
          </button>

          <div className="links">
            <a href="#">Forgot Password?</a>
            <a href="#">Create Account</a>
          </div>
        </form>

        {/* Message containers with animations */}
        <div className="message-container">
          {error && (
            <div className="message error-message">
              <span className="message-icon">❌</span>
              <p>{error}</p>
            </div>
          )}
          {message && (
            <div className="message success-message">
              <span className="message-icon">✅</span>
              <p>{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;