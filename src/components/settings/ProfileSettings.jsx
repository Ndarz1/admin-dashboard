import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";

const MySwal = withReactContent(Swal);

const ProfileSettings = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    identity_number: "",
    role: "",
  });

  const getAuthHeader = () => {
    const token = localStorage.getItem("authToken");

    if (!token) return null;
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const config = getAuthHeader();

      if (!config) {
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/users/profile",
          config
        );
        if (response.data.success) {
          setFormData(response.data.data);
        }
      } catch (error) {
        console.error("Error Fetching Profile:", error);

        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          localStorage.clear();

          await MySwal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Please login again.",
            confirmButtonColor: "#be123c",
            allowOutsideClick: false,
          });

          navigate("/login");
        } else {
          MySwal.fire({
            icon: "error",
            title: "Error",
            text: "Failed to load profile data.",
          });
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const config = getAuthHeader();
    if (!config) return;

    try {
      const response = await axios.put(
        "http://localhost:5000/api/users/profile",
        {
          name: formData.name,
          email: formData.email,
        },
        config
      );

      if (response.data.success) {
        MySwal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
          confirmButtonColor: "#be123c",
          timer: 1500,
        });
      }
    } catch (error) {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 403)
      ) {
        localStorage.clear();
        navigate("/login");
        return;
      }

      MySwal.fire({
        icon: "error",
        title: "Failed",
        text: error.response?.data?.message || "Update failed",
        confirmButtonColor: "#be123c",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-ruby-red-600">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-xl font-serif text-gray-900 mb-6">General Profile</h3>

      <div className="flex items-center gap-6 mb-8">
        <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-white shadow-md overflow-hidden relative group cursor-pointer">
          <img
            src={`https://ui-avatars.com/api/?name=${
              formData.name || "User"
            }&background=be123c&color=fff`}
            alt="User"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-serif text-lg">{formData.name}</h4>
          <p className="text-xs text-gray-500 uppercase tracking-widest">
            {formData.role || "User"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors font-serif"
          />
        </div>
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-ruby-red-600 transition-colors"
          />
        </div>
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Identity Number
          </label>
          <input
            type="text"
            value={formData.identity_number || "-"}
            disabled
            className="w-full border-b border-gray-200 py-2 text-gray-400 bg-transparent cursor-not-allowed"
          />
        </div>
        <div className="group">
          <label className="block text-xs uppercase tracking-[0.2em] text-gray-400 mb-2">
            Department
          </label>
          <input
            type="text"
            value={formData.department || "-"}
            disabled
            className="w-full border-b border-gray-200 py-2 text-gray-400 bg-transparent cursor-not-allowed"
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-gray-900 text-white px-8 py-3 text-xs uppercase tracking-[0.2em] hover:bg-ruby-red-600 transition-colors shadow-lg"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ProfileSettings;
