import React from "react";

const DayColumn = ({ date, courses, setCourseToEdit, setIsModalOpen }) => {
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const getGridPosition = (course) => {
    const startHour = course.startTime.getHours();
    const startMinutes = course.startTime.getMinutes();
    const endHour = course.endTime.getHours();
    const endMinutes = course.endTime.getMinutes();

    const startPosition = startHour + startMinutes / 60;
    const endPosition = endHour + endMinutes / 60;

    return {
      startPosition,
      endPosition,
      style: {
        top: `calc(${startPosition * 60}px)`,
        height: `calc(${(endPosition - startPosition) * 60}px)`,
      },
    };
  };

  // Find overlapping courses
  const findOverlaps = (courses) => {
    const overlaps = new Map();

    courses.forEach((course1) => {
      const pos1 = getGridPosition(course1);
      courses.forEach((course2) => {
        if (course1.id !== course2.id) {
          const pos2 = getGridPosition(course2);
          if (
            !(
              pos1.endPosition <= pos2.startPosition ||
              pos2.endPosition <= pos1.startPosition
            )
          ) {
            // Store overlapping courses for both courses
            const key1 = course1.id;
            const key2 = course2.id;
            if (!overlaps.has(key1)) overlaps.set(key1, []);
            if (!overlaps.has(key2)) overlaps.set(key2, []);
            overlaps.get(key1).push(course2);
            overlaps.get(key2).push(course1);
          }
        }
      });
    });

    return overlaps;
  };

  const sortedCourses = courses
    .filter((course) => {
      return (
        course.startTime.getDate() === date.getDate() &&
        course.startTime.getMonth() === date.getMonth() &&
        course.startTime.getFullYear() === date.getFullYear()
      );
    })
    .sort((a, b) => a.startTime - b.startTime);

  const overlaps = findOverlaps(sortedCourses);

  const handleCellClick = (hour) => {
    const startTime = new Date(date);
    startTime.setHours(hour, 0, 0);
    const endTime = new Date(date);
    endTime.setHours(hour + 1, 0, 0);

    setCourseToEdit({
      startTime,
      endTime,
      name: "",
      color: "#4285f4", // default color
      isNew: true,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="day-column">
      <div className="day-header">
        <div className="day-label">
          {date.toLocaleDateString("en-US", {
            weekday: "short",
          })}
        </div>
        <div className="day-number">{date.getDate()}</div>
      </div>

      <div className="hours-grid">
        {hours.map((hour) => (
          <div
            key={hour}
            className="hour-cell"
            onClick={() => handleCellClick(hour)}
          />
        ))}

        {sortedCourses.map((course, index) => {
          const { style } = getGridPosition(course);
          const hasOverlap = overlaps.has(course.id);

          return (
            <div
              key={course.id}
              className={`course-block ${hasOverlap ? "has-overlap" : ""}`}
              style={{
                ...style,
                backgroundColor: course.color || "#4285f4",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setCourseToEdit({ ...course, isNew: false });
                setIsModalOpen(true);
              }}
            >
              <div className="course-info">
                <strong>{course.name}</strong>
                <div className="course-time">
                  {course.startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {" - "}
                  {course.endTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
              {hasOverlap && <div className="overlap-indicator" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DayColumn;
