import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <h1>🔒 Secure Dashboard</h1>
      <p>You have successfully logged in using JWT authentication with hashed passwords.</p>
      <p><strong>Welcome to your protected area!</strong></p>
      
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
