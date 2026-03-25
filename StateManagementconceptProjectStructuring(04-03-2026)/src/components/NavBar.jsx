import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function NavBar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      style={{
        background: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        padding: "10px",
      }}
    >
      <h1>NavBar</h1>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}

export default NavBar;