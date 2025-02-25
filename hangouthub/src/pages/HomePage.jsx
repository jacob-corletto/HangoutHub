import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import api from "../services/api";

const HomePage = () => {
  const { user, logout } = useContext(AuthContext);
  const [hangouts, setHangouts] = useState([]);

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

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <button onClick={logout}>Logout</button>
      <h2>Your Hangouts</h2>
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
