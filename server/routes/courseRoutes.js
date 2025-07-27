const express = require("express");
const Course = require("../models/Course");
const router = express.Router();

// GET all courses
router.get("/", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// ADD a course
router.post("/", async (req, res) => {
  const newCourse = new Course(req.body);
  await newCourse.save();
  res.json({ message: "Course added", course: newCourse });
});

// DELETE a course
router.delete("/:id", async (req, res) => {
  await Course.findByIdAndDelete(req.params.id);
  res.json({ message: "Course deleted" });
});

// UPDATE a course
router.put("/:id", async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ message: "Course updated", course: updatedCourse });
});

module.exports = router;
