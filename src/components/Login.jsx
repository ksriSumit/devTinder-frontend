import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    skills: [],
  });
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle skills input
  const handleSkillsChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      skills: value.split(",").map((skill) => skill.trim()),
    });
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    if (!isLoginForm) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.age) newErrors.age = "Age is required";
      else if (isNaN(formData.age) || formData.age < 13 || formData.age > 120)
        newErrors.age = "Age must be between 13 and 120";
      if (!formData.gender) newErrors.gender = "Gender is required";
    }

    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";

    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validateForm()) return;

    try {
      const endpoint = isLoginForm ? "/login" : "/signup";
      const payload = isLoginForm
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await axios.post(BASE_URL + endpoint, payload, {
        withCredentials: true,
      });

      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (error) {
      setApiError(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="flex justify-center card-title">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Signup Fields - only show when not in login mode */}
            {!isLoginForm && (
              <>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">First Name</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    className={`input w-full ${
                      errors.firstName ? "input-error" : ""
                    }`}
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <span className="text-error text-sm">
                      {errors.firstName}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Last Name</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    className={`input w-full ${
                      errors.lastName ? "input-error" : ""
                    }`}
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <span className="text-error text-sm">
                      {errors.lastName}
                    </span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Age</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    className={`input w-full ${
                      errors.age ? "input-error" : ""
                    }`}
                    value={formData.age}
                    onChange={handleChange}
                    min="13"
                    max="120"
                  />
                  {errors.age && (
                    <span className="text-error text-sm">{errors.age}</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Gender</span>
                  </label>
                  <select
                    name="gender"
                    className={`select w-full ${
                      errors.gender ? "select-error" : ""
                    }`}
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                  {errors.gender && (
                    <span className="text-error text-sm">{errors.gender}</span>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Skills (comma separated)</span>
                  </label>
                  <input
                    type="text"
                    name="skills"
                    className="input w-full"
                    value={formData.skills.join(", ")}
                    onChange={handleSkillsChange}
                    placeholder="e.g., JavaScript, React, Node.js"
                  />
                </div>
              </>
            )}

            {/* Common Fields (both login and signup) */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                className={`input w-full ${errors.email ? "input-error" : ""}`}
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-error text-sm">{errors.email}</span>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                className={`input w-full ${
                  errors.password ? "input-error" : ""
                }`}
                value={formData.password}
                onChange={handleChange}
                minLength="8"
              />
              {errors.password && (
                <span className="text-error text-sm">{errors.password}</span>
              )}
            </div>

            {apiError && (
              <div className="text-error text-center my-2">{apiError}</div>
            )}

            <div className="card-actions justify-center mt-4">
              <button type="submit" className="btn btn-primary w-full">
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>

            <div className="text-center mt-4">
              <button
                type="button"
                className="link"
                onClick={() => {
                  setIsLoginForm(!isLoginForm);
                  setErrors({});
                  setApiError("");
                }}
              >
                {isLoginForm
                  ? "Need an account? Sign Up"
                  : "Already have an account? Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
