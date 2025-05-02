import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, gender, about, age } = user;
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const handleRequest = async (action) => {
    try {
      await axios.post(
        `${BASE_URL}/requests/${_id}/${action}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(_id));
    } catch (error) {
      console.error(error);
      setError(error);
    }
  };
  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="User Image" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <p></p>
        <p>{age + ", " + gender}</p>
        <p>{about}</p>
        <div className="card-actions justify-center flex gap-2">
          <button
            className="btn btn-primary flex-1 cursor-pointer"
            onClick={() => handleRequest("ignored")}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary flex-1 cursor-pointer"
            onClick={() => handleRequest("interested")}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
