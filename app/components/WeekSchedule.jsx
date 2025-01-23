import React, { useState, useEffect } from "react";
import { useAuth } from "../lib/AuthContext";
import DayColumn from "./DayColumn";
import CourseForm from "./CourseForm";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../styles/weekschedule.css";
import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight } from "react-icons/hi";
import "../styles/weekschedule.css";

const WeekSchedule = ({ selectedWeek, onWeekChange }) => {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseToEdit, setCourseToEdit] = useState(null);

  const { user } = useAuth();
  const userId = user?.uid;

  const fetchCourses = async () => {
    if (!userId) {
      console.warn("No user logged in.");
      setCourses([]);
      return;
    }
    try {
      setIsLoading(true);

      const coursesRef = collection(db, "courses");
      const q = query(
        coursesRef,
        where("startTime", ">=", selectedWeek.startDate),
        where("startTime", "<=", selectedWeek.endDate),
        where("user", "==", `/users/${userId}`)
      );

      const querySnapshot = await getDocs(q);

      const fetchedCourses = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedCourses.push({
          id: doc.id,
          name: data.name,
          startTime: data.startTime.toDate(),
          endTime: data.endTime.toDate(),
          dayOfWeek: data.dayOfWeek,
          color: data.color,
          user: data.user,
        });
      });

      fetchedCourses.sort((a, b) => a.startTime - b.startTime);
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error downloading classes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [selectedWeek, userId]);

  const generateWeekDays = () => {
    const days = [];
    const currentDay = new Date(selectedWeek.startDate);

    while (currentDay <= selectedWeek.endDate) {
      days.push(new Date(currentDay));
      currentDay.setDate(currentDay.getDate() + 1);
    }

    return days;
  };

  const handleSave = () => {
    fetchCourses();
    setIsModalOpen(false);
    setCourseToEdit(null);
  };

  const handleDelete = () => {
    fetchCourses();
    setIsModalOpen(false);
    setCourseToEdit(null);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCourseToEdit(null);
  };

  const handlePreviousWeek = () => {
    const newStartDate = new Date(selectedWeek.startDate);
    newStartDate.setDate(newStartDate.getDate() - 7);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 6);
    onWeekChange({ startDate: newStartDate, endDate: newEndDate });
  };

  const handleNextWeek = () => {
    const newStartDate = new Date(selectedWeek.startDate);
    newStartDate.setDate(newStartDate.getDate() + 7);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 6);
    onWeekChange({ startDate: newStartDate, endDate: newEndDate });
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const weekDays = generateWeekDays();

  return (
    <div className="week-schedule">
      <div className="week-navigation">
        <button className="nav-button" onClick={handlePreviousWeek}>
          Previous Week <HiOutlineArrowSmLeft className="arrow-icon" />
        </button>
        <h3 style={{ fontSize: "30px" }}>
          Class schedule for the selected week
        </h3>
        <button className="nav-button" onClick={handleNextWeek}>
          Next Week <HiOutlineArrowSmRight className="arrow-icon" />
        </button>
      </div>

      {isLoading && <p>Loading classes...</p>}

      <div className="calendar-grid">
        <div className="hours-column">
          <div className="corner-header" />
          {hours.map((hour) => (
            <div key={hour} className="hour-label">
              {`${hour.toString().padStart(2, "0")}:00`}
            </div>
          ))}
        </div>

        <div className="days-grid">
          {weekDays.map((day) => (
            <DayColumn
              key={day.toDateString()}
              date={day}
              courses={courses.filter(
                (course) =>
                  course.startTime.toDateString() === day.toDateString()
              )}
              setCourseToEdit={setCourseToEdit}
              setIsModalOpen={setIsModalOpen}
            />
          ))}
        </div>
      </div>

      {isModalOpen && courseToEdit && (
        <CourseForm
          course={courseToEdit}
          onClose={handleClose}
          onSave={handleSave}
          onDelete={handleDelete}
          userId={userId}
        />
      )}
    </div>
  );
};

export default WeekSchedule;
