import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    difficulty: "",
    type: "",
    description: ""
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await axios.get("http://localhost:5000/api/courses");
    setCourses(res.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddCourse = async () => {
    await axios.post("http://localhost:5000/api/courses", formData);
    setFormData({ title: "", category: "", difficulty: "", type: "", description: "" });
    fetchCourses(); // Refresh list
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/courses/${id}`);
    fetchCourses(); // Refresh list
  };

  return (
    <div className="admin-container">
      <h2>Admin Dashboard – Manage Courses</h2>
      <div className="admin-form">
        <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
        <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
        <input name="difficulty" placeholder="Difficulty" value={formData.difficulty} onChange={handleChange} />
        <input name="type" placeholder="Type (Free/Paid)" value={formData.type} onChange={handleChange} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange}></textarea>
        <button onClick={handleAddCourse}>➕ Add Course</button>
      </div>

      <div className="course-list">
        {courses.map((course) => (
          <div className="course-card" key={course._id}>
            <h3>{course.title}</h3>
            <p>{course.category} – {course.difficulty}</p>
            <p>{course.description}</p>
            <button onClick={() => handleDelete(course._id)}>🗑 Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
