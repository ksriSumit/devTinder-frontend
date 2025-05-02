import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState(user?.skills?.join(", ") || "");
  const [about, setAbout] = useState(user?.about || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setAge(user?.age || "");
    setGender(user?.gender || "");
    setSkills(user?.skills || "");
    setAbout(user?.about || "");
  }, [user]);

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setAge(user?.age || "");
    setGender(user?.gender || "");
    setSkills(user?.skills || "");
    setAbout(user?.about || "");
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const updatedProfileData = {
      firstName,
      lastName,
      age,
      gender,
      skills,
      about,
    };

    try {
      let skillsArray;
      if (Array.isArray(updatedProfileData.skills)) {
        skillsArray = updatedProfileData.skills;
      } else {
        skillsArray = updatedProfileData.skills
          ? updatedProfileData.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter((skill) => skill)
          : [];
      }

      const response = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { ...updatedProfileData, skills: skillsArray },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(response.data));
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.log(err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred while updating profile.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-start">
      <div className="card bg-base-300 shadow-xl w-full max-w-2xl my-8">
        <div className="card-body">
          <div className="flex items-center justify-between mb-4">
            <h2 className="card-title">Edit Profile</h2>
            {!isEditing && (
              <button onClick={handleEdit} className="btn btn-outline">
                Edit
              </button>
            )}
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="input input-bordered w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!isEditing}
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="input input-bordered w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!isEditing}
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Age</span>
              </label>
              <input
                type="number"
                placeholder="Enter your age"
                className="input input-bordered w-full"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={!isEditing}
                readOnly={!isEditing}
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">Gender</span>
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select select-bordered w-full"
                disabled={!isEditing}
              >
                <option disabled value="">
                  Select your gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="label">
                <span className="label-text">Skills</span>
              </label>
              <input
                type="text"
                placeholder="Enter your skills (e.g., React, Node.js, Design)"
                className="input input-bordered w-full"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                disabled={!isEditing}
                readOnly={!isEditing}
              />
              <span className="label-text-alt">
                Separate skills with commas
              </span>
            </div>
            <div>
              <label className="label">
                <span className="label-text">About</span>
              </label>
              <textarea
                placeholder="Tell us a bit about yourself"
                className="textarea textarea-bordered w-full"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                disabled={!isEditing}
                readOnly={!isEditing}
              ></textarea>
            </div>
            {isEditing && (
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleCancelEdit}
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
