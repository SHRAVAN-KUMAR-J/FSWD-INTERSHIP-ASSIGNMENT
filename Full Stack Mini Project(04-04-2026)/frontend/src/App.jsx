import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";
import Upload from "./Upload";
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1>Mini Project 1</h1>
      <div className="form-grid">
        <Signup />
        <Login />
      </div>
      <Profile />
      <Upload />
    </div>
  );
}

export default App;