import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ReceivedRequestCard = ({ data, onUpdate }) => {
  const [error, setError] = useState(null);
  const {
    _id,
    fromUserId: { firstName, lastName, about, skills = [], gender, photoUrl },
    status,
  } = data;

  const initials = `${firstName?.[0] || ""}${
    lastName?.[0] || ""
  }`.toUpperCase();

  const handleAccept = async (action) => {
    try {
      await axios.patch(
        `${BASE_URL}/requests/${_id}/${action}`,
        {},
        { withCredentials: true }
      );
      onUpdate(_id);
      console.log("accepted");
      toast.success("Request Accepted");
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleDecline = async (action) => {
    try {
      await axios.patch(
        `${BASE_URL}/requests/${_id}/${action}`,
        {},
        { withCredentials: true }
      );
      onUpdate(_id);
      console.log("declined");
      toast("Request Declined", {
        type: "error",
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message || err.message || "An error occurred";
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="bg-gray-800 text-white rounded-xl p-4 shadow-md space-y-3 w-full max-w-md">
      {" "}
      {/* Added max-w-md */}
      <div className="flex items-start space-x-3">
        {" "}
        {/* Changed space-x-4 to space-x-3 */}
        {/* Avatar container */}
        <div className="flex-shrink-0">
          {" "}
          {/* Prevent avatar from growing */}
          {photoUrl ? (
            <img
              src={photoUrl}
              alt={`${firstName} ${lastName}`}
              className="rounded-full w-10 h-10 object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                e.currentTarget.nextElementSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`bg-gray-700 w-10 h-10 flex items-center justify-center rounded-full text-md font-semibold ${
              photoUrl ? "hidden" : "flex"
            }`}
          >
            {initials}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {" "}
          {/* Added min-w-0 to prevent text overflow */}
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-md truncate">
              {" "}
              {/* Reduced text-lg to text-md and added truncate */}
              {firstName} {lastName}
            </span>
            <span
              className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                status === "interested"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-gray-500/20 text-gray-400"
              }`}
            >
              {status}
            </span>
          </div>
          <p className="text-xs text-gray-400">
            {" "}
            {/* Reduced text-sm to text-xs */}
            {gender?.[0]?.toUpperCase() || ""}
          </p>
        </div>
      </div>
      {about && (
        <div className="pl-13">
          {" "}
          {/* Reduced from pl-16 to account for smaller avatar */}
          <p className="text-xs text-gray-300 line-clamp-2">
            {" "}
            {/* Added line-clamp-2 */}
            {about}
          </p>
        </div>
      )}
      {skills.length > 0 && (
        <div className="pl-13 pt-1 flex flex-wrap gap-1">
          {" "}
          {/* Reduced padding and gap */}
          {skills.map((skill, index) => (
            <span
              key={`${_id}-skill-${index}`}
              className="text-xs px-1.5 py-0.5 bg-gray-700 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
      <div className="pl-13 pt-2 flex gap-2">
        {" "}
        {/* Reduced padding and gap */}
        <button
          className="px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded-lg text-xs font-medium  cursor-pointer"
          onClick={() => handleAccept("accepted")}
        >
          Accept
        </button>
        <button
          className="px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-xs font-medium  cursor-pointer"
          onClick={() => handleDecline("rejected")}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default ReceivedRequestCard;
