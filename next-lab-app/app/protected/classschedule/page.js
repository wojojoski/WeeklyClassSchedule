"use client";

import React, { useState, useEffect } from "react";
import WeekSelector from "../../components/WeekSelector";
import WeekSchedule from "../../components/WeekSchedule";

const ClassSchedulePage = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startOfWeek = new Date(today);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    setSelectedWeek({
      startDate: startOfWeek,
      endDate: endOfWeek,
    });
  }, []);

  const handleWeekChange = (newWeek) => {
    setSelectedWeek(newWeek);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="class-schedule-page">
      <WeekSelector
        onWeekSelect={handleWeekChange}
        selectedWeek={selectedWeek}
      />
      {selectedWeek ? (
        <WeekSchedule
          selectedWeek={selectedWeek}
          onWeekChange={handleWeekChange}
        />
      ) : (
        <p>Select a week to view the class schedule.</p>
      )}
    </div>
  );
};

export default ClassSchedulePage;
