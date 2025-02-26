import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import api from "../services/api";

const CreateHangoutPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/hangouts", {
        title,
        description,
        date,
        location,
        organizer: user._id,
        createdBy: user._id,
      });
      setMessage("Hangout created successfully!");
      navigate(`/hangouts/${response.data._id}`);
    } catch (error) {
      setMessage("Error creating hangout: " + error.message);
    }
  };

  return (
    <div>
      <h1>Create a New Hangout</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Hangout</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateHangoutPage;
