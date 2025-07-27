// src/pages/CourseDetails.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import YouTube from 'react-youtube';
import './CourseDetails.css';

const CourseDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [enrolled, setEnrolled] = useState(false);
  const [completed, setCompleted] = useState(false);

  const course = state?.course;

  const handleEnroll = () => {
    setEnrolled(true);
    const enrolledCourses = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    if (!enrolledCourses.find(c => c.title === course.title)) {
      enrolledCourses.push(course);
      localStorage.setItem('enrolledCourses', JSON.stringify(enrolledCourses));
    }
  };

  const handleVideoEnd = () => {
    if (enrolled && !completed) {
      setCompleted(true);
      const completedCourses = JSON.parse(localStorage.getItem('completedCourses')) || [];
      if (!completedCourses.find(c => c.title === course.title)) {
        completedCourses.push({ ...course, completedAt: new Date().toISOString() });
        localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
      }
    }
  };

  const videoOptions = {
    height: '360',
    width: '640',
    playerVars: { autoplay: 0 },
  };

  if (!course) {
    return (
      <div className="course-detail-container">
        <h2>Course not found.</h2>
        <button onClick={() => navigate(-1)}>⬅ Go Back</button>
      </div>
    );
  }

  return (
    <div className="course-detail-container">
      <div className="course-detail-inner">
        <h1>{course.title}</h1>
        <p className="tag">{course.category}{course.type && ` - ${course.type}`}</p>
        <p className="difficulty">LEVEL: {course.difficulty}</p>

        {/* ⛔️ Removed the image block here */}

        <div className="video-section">
          <YouTube videoId="dQw4w9WgXcQ" opts={videoOptions} onEnd={handleVideoEnd} />
        </div>

        <div className="description">
          <p>{course.description}</p>
          <p>This course will guide you through the fundamentals of {course.title} with interactive content tailored to your level.</p>
        </div>

        <div className="actions">
          <button onClick={handleEnroll} disabled={enrolled}>
            {enrolled ? '✅ Enrolled' : 'Enroll'}
          </button>
          <button disabled>
            {completed ? '🎉 Completed Automatically' : 'Will be marked complete after video ends'}
          </button>
          <button onClick={() => navigate(-1)}>⬅ Back</button>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
