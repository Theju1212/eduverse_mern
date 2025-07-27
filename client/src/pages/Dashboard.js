// src/pages/Dashboard.js

import React, { useEffect, useState, useRef } from 'react';
import './Dashboard.css';
import getCourseImageSrc from '../utils/getCourseImageSrc';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [currentCertificateCourse, setCurrentCertificateCourse] = useState(null);
  const certificateRef = useRef(null);
  const navigate = useNavigate();

  const dummyName = "Velvaluri Thejaswini";

  useEffect(() => {
    const enrolled = JSON.parse(localStorage.getItem('enrolledCourses')) || [];
    const completed = JSON.parse(localStorage.getItem('completedCourses')) || [];
    setEnrolledCourses(enrolled);
    setCompletedCourses(completed);
  }, []);

  const downloadCertificate = async (course) => {
    setCurrentCertificateCourse(course);
    setTimeout(async () => {
      const canvas = await html2canvas(certificateRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${course.title}_Certificate.pdf`);
      setCurrentCertificateCourse(null);
    }, 200);
  };

  const goToQuiz = (course) => {
    navigate('/quiz', { state: { courseTitle: course.title } });
  };

  const renderCourseCard = (course, isCompleted = false) => (
    <div className="dashboard-card" key={course.title}>
      <img
        src={getCourseImageSrc(course)}
        alt={course.title}
        onError={(e) => {
          e.target.src = "/images/placeholder.png";
        }}
      />
      <h3>{course.title}</h3>
      <p className="tag">{course.category}</p>
      <p className="description">{course.description}</p>

      <div className="badge">
        {isCompleted ? (
          <span className="completed">🎉 Completed</span>
        ) : (
          <span className="enrolled">✅ Enrolled</span>
        )}
      </div>

      <div className="dashboard-actions">
        {!isCompleted && (
          <button className="quiz-btn" onClick={() => goToQuiz(course)}>
            📝 Take Quiz
          </button>
        )}
        {isCompleted && (
          <button className="download-btn" onClick={() => downloadCertificate(course)}>
            📥 Download Certificate
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-wrapper">
      <h1>🎓 My Dashboard</h1>

      <div className="section">
        <h2>📘 Enrolled Courses</h2>
        <div className="dashboard-grid">
          {enrolledCourses.length > 0 ? (
            enrolledCourses.map((course) => renderCourseCard(course, false))
          ) : (
            <p className="empty-msg">No enrolled courses yet.</p>
          )}
        </div>
      </div>

      <div className="section">
        <h2>✅ Completed Courses</h2>
        <div className="dashboard-grid">
          {completedCourses.length > 0 ? (
            completedCourses.map((course) => renderCourseCard(course, true))
          ) : (
            <p className="empty-msg">No completed courses yet.</p>
          )}
        </div>
      </div>

      {currentCertificateCourse && (
        <div
          ref={certificateRef}
          style={{
            width: '1120px',
            height: '800px',
            background: 'white',
            border: '8px solid #4b5563',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)',
            fontFamily: 'Georgia, serif',
            color: '#1f2937',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            textAlign: 'center',
            position: 'absolute',
            top: '-9999px',
            left: '-9999px',
          }}
        >
          <h1 style={{ fontSize: '40px', color: '#2563eb', marginBottom: '30px' }}>
            Eduverse Certificate of Completion
          </h1>
          <p style={{ fontSize: '22px', maxWidth: '800px', lineHeight: 1.6 }}>
            This is to proudly certify that
            <strong> {dummyName} </strong>
            has successfully completed the course:
          </p>
          <h2 style={{ fontSize: '32px', color: '#10b981', margin: '30px 0' }}>
            {currentCertificateCourse.title}
          </h2>
          <p style={{ fontSize: '20px' }}>
            Category: <strong>{currentCertificateCourse.category}</strong>
          </p>
          <p style={{ fontSize: '20px', marginBottom: '20px' }}>
            Date: <strong>{new Date().toLocaleDateString()}</strong>
          </p>
          <h3 style={{ color: '#dc2626', fontSize: '22px', marginTop: '20px' }}>
            🎉 Congratulations on completing this level from Eduverse!
          </h3>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
