"use client";

import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/style.css";
import { FaCalendarAlt } from "react-icons/fa";

const WeekSelector = ({ onWeekSelect, selectedWeek }) => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [highlightedWeek, setHighlightedWeek] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(false);

  useEffect(() => {
    if (selectedWeek) {
      setSelectedDate({
        startDate: new Date(selectedWeek.startDate),
        endDate: new Date(selectedWeek.endDate),
      });
      const { weekDates } = getWeekRange(new Date(selectedWeek.startDate));
      setHighlightedWeek(weekDates);
    }
  }, [selectedWeek]);

  const getWeekRange = (date) => {
    const startOfWeek = new Date(date);
    const day = startOfWeek.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;
    startOfWeek.setDate(startOfWeek.getDate() + diffToMonday);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    const weekDates = Array.from({ length: 7 }, (_, i) => {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      return weekDate;
    });

    return { startOfWeek, endOfWeek, weekDates };
  };

  const handleMouseEnter = (date) => {
    const { weekDates } = getWeekRange(date);
    setHighlightedWeek(weekDates);
  };

  const handleDateClick = (date) => {
    const { startOfWeek, endOfWeek, weekDates } = getWeekRange(date);
    const newSelectedDate = {
      startDate: startOfWeek,
      endDate: endOfWeek,
    };
    setSelectedDate(newSelectedDate);
    setHighlightedWeek(weekDates);
    onWeekSelect(newSelectedDate);
    setIsCalendarVisible(false);
  };

  const formatDate = (date) =>
    date instanceof Date ? date.toLocaleDateString() : "N/A";

  return (
    <div>
      <div className="week-selector-container">
        <div className="selected-week">
          <h3>Selected week:</h3>
          <p>From: {formatDate(selectedDate.startDate)}</p>
          <p>To: {formatDate(selectedDate.endDate)}</p>
        </div>

        <div
          className="calendar-icon"
          onClick={() => setIsCalendarVisible(!isCalendarVisible)}
        >
          <FaCalendarAlt />
        </div>
      </div>
      {isCalendarVisible && (
        <div>
          <Calendar
            onClickDay={handleDateClick}
            onMouseLeave={() => setHighlightedWeek([])}
            onMouseEnter={handleMouseEnter}
            value={selectedDate.startDate}
            tileClassName={({ date }) => {
              const isHighlighted = highlightedWeek.some(
                (highlightedDate) =>
                  highlightedDate.toDateString() === date.toDateString()
              );
              const isSelected =
                selectedDate.startDate.toDateString() === date.toDateString() ||
                selectedDate.endDate.toDateString() === date.toDateString();

              if (isSelected) {
                return "selected";
              }
              if (isHighlighted) {
                return "highlighted";
              }
              return "";
            }}
          />
        </div>
      )}
    </div>
  );
};

export default WeekSelector;
