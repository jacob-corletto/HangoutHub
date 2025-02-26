import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../services/api";

const HomePage = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const [hangouts, setHangouts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHangouts = async () => {
      try {
        const response = await api.get("/hangouts");
        setHangouts(response.data);
      } catch (error) {
        console.error("Error fetching hangouts:", error);
      }
    };

    fetchHangouts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to see your hangouts.</div>;
  }

  const handleCreateHangout = () => {
    navigate("/create-hangout");
  };

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button>
      <h2>Your Hangouts</h2>
      <button onClick={handleCreateHangout}>Create Hangout</button>
      <ul>
        {hangouts.map((hangout) => (
          <li key={hangout._id}>
            <h3>{hangout.title}</h3>
            <p>{hangout.description}</p>
            <p>Organizer: {hangout.organizer.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
