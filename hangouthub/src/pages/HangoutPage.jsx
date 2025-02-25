import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const HangoutPage = () => {
  const { id } = useParams();
  const [hangout, setHangout] = useState(null);

  useEffect(() => {
    api
      .get(`/hangouts/${id}`)
      .then((response) => {
        setHangout(response.data);
      })
      .catch((error) => {
        console.error("Error fetching hangout:", error);
      });
  }, [id]);

  if (!hangout) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{hangout.title}</h1>
      <p>{hangout.description}</p>
      <p>{new Date(hangout.date).toLocaleString()}</p>
      <p>{hangout.location}</p>
    </div>
  );
};

export default HangoutPage;
