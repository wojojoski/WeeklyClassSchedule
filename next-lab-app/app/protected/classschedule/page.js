"use client";

import React, { useState } from "react";
import WeekSelector from "../../components/WeekSelector";
import WeekSchedule from "../../components/WeekSchedule";

const ClassSchedulePage = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);

  const handleWeekChange = (newWeek) => {
    setSelectedWeek(newWeek);
  };

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
