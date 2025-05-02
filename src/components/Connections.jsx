import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ConnectionCard from "./ConnectionCard";

const Connections = () => {
  const [userConnections, setUserConnections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getConnections = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      setUserConnections(response.data.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch connections");
      console.error("Error fetching connections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (loading) return <div>Loading connections...</div>;
  if (error) return <div>Error: {error}</div>;
  if (userConnections.length === 0) return <div>No connections found</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* To show all connections */}
      {userConnections.map((connection) => (
        <ConnectionCard key={connection._id} data={connection} />
      ))}
    </div>
  );
};

export default Connections;
