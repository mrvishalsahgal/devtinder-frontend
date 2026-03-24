import React, { useState } from "react";
import UserCard from "./userCard";
import { BASE_URL } from "../utils/constant";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  if (!user) return;
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [about, setAbout] = useState(user.about);
  const [photoURL, setPhotoURl] = useState(user.photoURL);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const response = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          email,
          about,
          photoURL,
          gender,
          age,
        },
        { withCredentials: true },
      );
      dispatch(addUser(response.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      console.log(error.response);
      setError(error.response.data);
    }
  };

  return (
    <div className="flex justify-center my-10">
      {user && (
        <div className="flex justify-center items-center  mx-10">
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border  p-4">
            <legend className="fieldset-legend">Edit Profile</legend>

            <label className="label">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input"
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input"
              placeholder="Last Name"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="Email ID"
            />
            <input
              type="text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
              className="input"
              placeholder="About"
            />
            <input
              type="text"
              value={photoURL}
              onChange={(e) => setPhotoURl(e.target.value)}
              className="input"
              placeholder="Photo URL"
            />
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="input"
              placeholder="Gender"
            />
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input"
              placeholder="Age"
            />
            <p className="text-red-500">{error}</p>
            <button className="btn btn-neutral mt-4" onClick={saveProfile}>
              Save Profile
            </button>
          </fieldset>
        </div>
      )}

      <UserCard user={{ firstName, lastName, photoURL, age, gender, about }} />
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-info">
            <span>Profile Saved Succesfully</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
