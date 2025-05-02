import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import axios from "axios";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/feed`, {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data || [])); // Ensure array fallback
    } catch (error) {
      console.error("Error fetching feed:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  // Show loading/empty states
  if (!feed || feed.length === 0) {
    return <div className="flex justify-center my-10">No Users Found...</div>;
  }

  return (
    <div className="flex justify-center my-10">
      <UserCard key={feed[0]._id} user={feed[0]} />
    </div>
  );
};

export default Feed;
