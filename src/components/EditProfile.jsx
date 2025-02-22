import { useState } from "react";
import Card from "./Card";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [skills, setSkills] = useState(Array.isArray(user.skills) ? user.skills : []);
  const [skillInput, setSkillInput] = useState("");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  // ✅ Add Skill to the List
  const handleSkillAdd = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
    }
    setSkillInput(""); // Clear input field after adding
  };

  // ✅ Remove Skill from the List
  const handleSkillRemove = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  // ✅ Save Profile Function (with Debugging)
  const saveProfile = async () => {
    setError("");
    console.log("Saving profile with skills:", skills); // Debugging skills before API call

    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, gender, about, skills },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.response?.data || "An error occurred.");
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center gap-10 my-10">
        {/* Edit Profile Card */}
        <div className="card bg-base-300 shadow-xl rounded-lg p-6 w-96">
          <h2 className="card-title text-center text-xl font-semibold mb-4">Edit Profile</h2>

          <div className="space-y-3">
            <label className="form-control w-full">
              <span className="label-text">First Name:</span>
              <input
                type="text"
                value={firstName}
                className="input input-bordered w-full"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Last Name:</span>
              <input
                type="text"
                value={lastName}
                className="input input-bordered w-full"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Photo URL:</span>
              <input
                type="text"
                value={photoUrl}
                className="input input-bordered w-full"
                onChange={(e) => setPhotoUrl(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Age:</span>
              <input
                type="text"
                value={age}
                className="input input-bordered w-full"
                onChange={(e) => setAge(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">Gender:</span>
              <input
                type="text"
                value={gender}
                className="input input-bordered w-full"
                onChange={(e) => setGender(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text">About:</span>
              <textarea
                value={about}
                className="textarea textarea-bordered w-full"
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            {/* Skills Input Field */}
            <label className="form-control w-full">
              <span className="label-text">Skills:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full flex items-center"
                  >
                    {skill}
                    <button
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleSkillRemove(index)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={skillInput}
                  className="input input-bordered flex-1"
                  placeholder="Enter a skill"
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSkillAdd()}
                />
                <button className="btn btn-primary" onClick={handleSkillAdd}>Add</button>
              </div>
            </label>

            {/* Error Message */}
            {error && <p className="text-red-500">{error}</p>}

            {/* Save Button */}
            <div className="text-center mt-4">
              <button className="btn btn-primary w-full" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Profile Preview Card */}
        <Card user={{ firstName, lastName, photoUrl, age, gender, about, skills }} />
      </div>

      {/* Success Toast */}
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
