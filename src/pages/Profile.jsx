import { useState, useContext } from "react";
import Nav from "../components/Nav";
import { FiMail } from "react-icons/fi"; // Import email icon from react-icons library
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import { updateProfileApi } from "../../api";

const Profile = () => {
  const context = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState(0);
  const [field, setField] = useState("");
  const [dob, setDob] = useState("mm/dd/yyyy");

  useEffect(() => {
    // console.log("USERNAME ", context?.username);
    setFirstName(context?.username?.split(" ")[0]);
    setLastName(context?.username?.split(" ")[1] === undefined ? "" : context?.username?.split(" ")[1]);
    setGender(context?.gender);
    setDob(context?.dob?.split("T")[0]);
  }, [context]);

  const navigate = useNavigate();

  const handleSubmit = (e, context, dob, gender) => {
    e.preventDefault();
    alert("Profile updated successfully!");
    const data = {
      username: firstName + " " + lastName,
      email: context?.email,
      dob: dob,
      gender: gender,
    };

    axios.put(`${updateProfileApi}/${context.userId}`, data).then((res) => {
      // console.log(res.data.data);

      const data = {
        email: res.data.data.email.toLowerCase(),
        username: res.data.data.name,
        dob: res.data.data.dob,
        imgUrl: res.data.data.img_url,
        gender: res.data.data.gender,
        token: context.token,
        userId: res.data.data.id,
        events: context.events,
      };
      context.login(data);
      setFirstName(res.data.data.name.split(" ")[0]);
      setLastName(res.data.data.name.split(" ")[1]);
      setDob(res.data.data.dob.split("T")[0]);
      setGender(res.data.data.gender);
      localStorage.setItem("name", res.data.data.name);
      localStorage.setItem("dob", res.data.data.dob);
      localStorage.setItem("gender", res.data.data.gender);
    });

    setIsEditing(false); // Disable editing mode after submission
  };

  function calculateAge(dob) {
    if (!dob) {
      setAge(0);
      return;
    }
    if (dob == "mm/dd/yyyy") {
      setAge(0);
      return;
    }
    // console.log("dob", dob);
    const [year, month, day] = dob.split("-").map(Number);

    const birthDate = new Date(year, month - 1, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    setAge(age);
  }

  const handleLogout = (e) => {
    e.preventDefault();
    alert("You've been logged out successfully!");
    context.logout();
    navigate("/");
  };

  const { status } = context;
  useEffect(() => {
    if (status === false) {
      navigate("/");
    }
    calculateAge(dob);
  }, [status, dob]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Nav />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-center px-10">
            <div className="flex items-center">
              <div className="h-20 w-20 flex items-center justify-center rounded-full text-white text-4xl font-bold bg-green-500">
                {context?.username?.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="font-bold text-2xl text-gray-900">
                  {context?.username}
                </p>
                <p className="text-gray-600">{context?.email}</p>
              </div>
            </div>
            <div className="ml-auto">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  Edit
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e, context, dob, gender)}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Form section with user details */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="block text-gray-700 font-bold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                readOnly={!isEditing}
                className={`px-4 py-2 w-full bg-gray-100 rounded-lg border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="First Name"
              />
            </div>

            {/* Last Name */}
            <div>
              <label
                htmlFor="lastName"
                className="block text-gray-700 font-bold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                readOnly={!isEditing}
                className={`px-4 py-2 w-full bg-gray-100 rounded-lg border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Last Name"
              />
            </div>
          </div>

          {/* Gender and Age */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="gender"
                className="block text-gray-700 font-bold mb-2"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                readOnly={!isEditing}
                className={`px-4 py-2 w-full bg-gray-100 rounded-lg border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Gender"
              />
            </div>
            <div>
              <label
                htmlFor="age"
                className="block text-gray-700 font-bold mb-2"
              >
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                value={age}
                readOnly={false}
                className={`px-4 py-2 w-full bg-gray-100 rounded-lg border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Age"
                disabled={true}
              />
            </div>
          </div>

          {/* Field and Date of Birth */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="field"
                className="block text-gray-700 font-bold mb-2"
              >
                Field
              </label>
              <input
                type="text"
                id="field"
                name="field"
                value={field}
                onChange={(e) => setField(e.target.value)}
                readOnly={!isEditing}
                className={`px-4 py-2 w-full bg-gray-100 rounded-lg border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Field"
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block text-gray-700 font-bold mb-2"
              >
                Date of Birth
              </label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                readOnly={!isEditing}
                className={`px-4 py-2 w-full bg-gray-100 rounded-lg border ${
                  isEditing ? "border-gray-300" : "border-transparent"
                } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                placeholder="Date of Birth"
              />
            </div>
          </div>

          {/* Email icon and email */}
          <div className="flex items-center mb-6">
            <FiMail className="text-2xl text-gray-700 mr-2" />
            <p className="text-gray-700">{context.email}</p>
          </div>

          {/* Logout button */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            >
              Logout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
