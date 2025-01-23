"use client";

import { useAuth } from "@/app/lib/AuthContext";
import { useState, useEffect } from "react";
import { updateProfile, getAuth } from "firebase/auth";
import { db } from "@/app/lib/firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";

export default function ProfileForm() {
  const { user } = useAuth();
  const auth = getAuth();
  const [formData, setFormData] = useState({
    displayName: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    street: "",
    city: "",
    zipCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const snapshot = await getDoc(doc(db, "users", user.uid));
          if (snapshot.exists()) {
            const address = snapshot.data().address;
            setFormData((prevData) => ({
              ...prevData,
              street: address.street,
              city: address.city,
              zipCode: address.zipCode,
            }));
          }
        } catch (error) {
          console.error("Error fetching user address: ", error);
          setError("Failed to load user address.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateProfile(user, {
        displayName: formData.displayName,
        photoURL: formData.photoURL,
      });

      await setDoc(doc(db, "users", user.uid), {
        address: {
          city: formData.city,
          street: formData.street,
          zipCode: formData.zipCode,
        },
      });

      await auth.currentUser.reload();

      setSuccessMessage("Profile and address updated successfully!");
      setError("");
    } catch (error) {
      console.error("Error updating profile: ", error);
      setError("Failed to update profile or address.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: "300px",
          }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>

          {error && (
            <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-2 text-sm text-green-600 bg-green-100 rounded">
              {successMessage}
            </div>
          )}

          <form onSubmit={onSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Display Name
              </label>
              <input
                type="text"
                name="displayName"
                value={formData.displayName}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email (Read Only)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="mt-1 p-2 w-full border border-gray-300 rounded-md bg-gray-100"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Photo URL
              </label>
              <input
                type="text"
                name="photoURL"
                value={formData.photoURL}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                disabled={loading}
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Zip Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>

        <div>
          {user?.photoURL ? (
            <img
              style={{ width: "128px", height: "128px" }}
              src={user.photoURL}
              alt="Profile"
            />
          ) : (
            <div>
              <img
                style={{ width: "128px", height: "128px" }}
                src="/guestpic.jpg"
                alt="Profile"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
