import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";

const COLORS = [
  "#4285f4", // blue
  "#ea4335", // red
  "#fbbc05", // yellow
  "#34a853", // green
  "#ff7f50", // coral
  "#9c27b0", // purple
  "#795548", // brown
  "#607d8b", // blue grey
];

const CourseForm = ({ course, onClose, onSave, onDelete, userId }) => {
  const [formData, setFormData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    color: "#4285f4",
  });

  useEffect(() => {
    if (course) {
      setFormData({
        name: course.name || "",
        startTime: course.startTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        endTime: course.endTime.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        color: course.color || "#4285f4",
      });
    }
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const startDateTime = new Date(course.startTime);
    const [startHours, startMinutes] = formData.startTime.split(":");
    startDateTime.setHours(parseInt(startHours), parseInt(startMinutes));

    const endDateTime = new Date(course.startTime);
    const [endHours, endMinutes] = formData.endTime.split(":");
    endDateTime.setHours(parseInt(endHours), parseInt(endMinutes));

    const courseData = {
      name: formData.name,
      startTime: startDateTime,
      endTime: endDateTime,
      color: formData.color,
      user: `/users/${userId}`,
    };

    try {
      if (course.isNew) {
        await addDoc(collection(db, "courses"), courseData);
      } else {
        await updateDoc(doc(db, "courses", course.id), courseData);
      }
      onSave();
    } catch (error) {
      console.error("Error saving course:", error);
      alert("Error saving course. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteDoc(doc(db, "courses", course.id));
        onDelete();
      } catch (error) {
        console.error("Error deleting course:", error);
        alert("Error deleting course. Please try again.");
      }
    }
  };

  return (
    <div className="course-form-modal">
      <div className="course-form">
        <h3>{course.isNew ? "Add New Course" : "Edit Course"}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Course Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Start Time</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              required
            />
          </div>

          <div className="form-group">
            <label>Color</label>
            <div className="color-palette">
              {COLORS.map((color) => (
                <div
                  key={color}
                  className={`color-option ${
                    formData.color === color ? "selected" : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setFormData({ ...formData, color })}
                />
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="save-btn">
              {course.isNew ? "Add Course" : "Save Changes"}
            </button>
            {!course.isNew && (
              <button
                type="button"
                className="delete-btn"
                onClick={handleDelete}
              >
                Delete Course
              </button>
            )}
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;
