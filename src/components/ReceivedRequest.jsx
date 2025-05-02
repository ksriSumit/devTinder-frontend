import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import ReceivedRequestCard from "./ReceivedRequestCard";

const ReceivedRequest = () => {
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRequests = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/user/received/connectionRequests`,
        { withCredentials: true }
      );
      setReceivedRequests(response.data.data || []);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to fetch connection requests"
      );
      console.error("Error fetching requests:", err);
    } finally {
      setLoading(false);
    }
  };

  // Remove a specific request from state
  const handleRequestUpdate = (requestId) => {
    setReceivedRequests((prev) =>
      prev.filter((request) => request._id !== requestId)
    );
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="p-4 border rounded-lg animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded-lg">
        {error}
        <button
          onClick={fetchRequests}
          className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  if (receivedRequests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No connection requests received
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {receivedRequests.map((request) => (
        <ReceivedRequestCard
          key={request._id}
          data={request}
          onUpdate={handleRequestUpdate} // Pass refresh function if cards can modify state
        />
      ))}
    </div>
  );
};

export default ReceivedRequest;
