import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

const academicSubjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'];
const programmingLanguages = ['Java', 'Python', 'C', 'C++', 'HTML', 'CSS', 'JavaScript'];
const professionalSkills = ['MS Excel', 'AI', 'Generative AI', 'Leadership', 'Communication Skills'];
const classLevels = ['Class 6', 'Class 7', 'Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];

// Manual mapping for filenames (including cpp fix and mixed extensions)
const courseImageMap = {
  // Academic
  mathematics: 'mathematics.jpg',
  physics: 'physics.jpeg',
  chemistry: 'chemistry.png',
  biology: 'biology.jpeg',
  english: 'english.jpeg',

  // Skill: Programming
  java: 'java.png',
  python: 'python.png',
  c: 'c.jpeg',
  cpp: 'cpp.jpeg', // previously c++.jpeg
  html: 'html.png',
  css: 'css.png',
  javascript: 'javascript.png',

  // Skill: Professional
  msexcel: 'msexcel.jpeg',
  ai: 'ai.jpeg',
  generativeai: 'generativeai.jpeg',
  leadership: 'leadership.png',
  communicationskills: 'communicationskills.jpeg',
};

const getDifficulty = (studentClass) => {
  const classNumber = parseInt(studentClass.split(' ')[1]);
  if (classNumber <= 7) return 'Easy';
  if (classNumber <= 9) return 'Medium';
  return 'Hard';
};

const getCourseImageSrc = (course) => {
  const folder = course.category === 'Academic' ? 'academic' : 'skill';
  const key = course.title.toLowerCase().replace(/\+\+/g, 'pp').replace(/\s+/g, '');
  const file = courseImageMap[key];
  return file ? `/images/courses/${folder}/${file}` : '/images/placeholder.png';
};

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const allCourses = [
    ...academicSubjects.map((subject) => ({
      title: subject,
      category: 'Academic',
      subject,
      description: `Master the concepts of ${subject} from basics to advanced.`,
    })),
    ...programmingLanguages.map((subject) => ({
      title: subject,
      category: 'Skill Development',
      subject,
      type: 'Programming Languages',
      description: `Learn programming in ${subject} with real-world examples.`,
    })),
    ...professionalSkills.map((subject) => ({
      title: subject,
      category: 'Skill Development',
      subject,
      type: 'Professional & Emerging Skills',
      description: `Boost your skills in ${subject} to stay ahead in your career.`,
    })),
  ];

  const filteredCourses = allCourses.filter((course) => {
    const categoryMatch = selectedCategory ? course.category === selectedCategory : true;
    const subjectMatch = selectedSubject ? course.subject === selectedSubject : true;
    return categoryMatch && subjectMatch;
  });

  return (
    <div className="courses-container">
      <h1>📘 Courses</h1>

      <div className="filters">
        <select onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          {classLevels.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Academic">Academic</option>
          <option value="Skill Development">Skill Development</option>
        </select>

        {selectedCategory && (
          <select onChange={(e) => setSelectedSubject(e.target.value)}>
            <option value="">Select Subject</option>
            {(selectedCategory === 'Academic'
              ? academicSubjects
              : [...programmingLanguages, ...professionalSkills]
            ).map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </select>
        )}
      </div>

      <div className="course-list">
        {filteredCourses.map((course, index) => {
          const difficulty = selectedClass ? getDifficulty(selectedClass) : '—';
          const imagePath = getCourseImageSrc(course);

          return (
            <div key={index} className="course-card">
              <div className="course-image">
                <img src={imagePath} alt={course.title} />
              </div>
              <h3>{course.title}</h3>
              <p className="tag">{course.category}{course.type ? ` - ${course.type}` : ''}</p>
              {selectedClass && <p className="difficulty">Level: {difficulty}</p>}
              <p>{course.description}</p>
              <Link
                to="/course-details"
                state={{
                  course: {
                    ...course,
                    difficulty,
                  },
                }}
              >
                View Course
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
