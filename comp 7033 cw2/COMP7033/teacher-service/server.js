const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const Course = require('./models/Course');
const Assignment = require('./models/Assignment');
const app = express();

app.use(cors());
app.use(express.json()); // Body parser

// Course için
// Ders oluşturma
app.post('/courses', async (req, res) => {
  const { title, description, teacherId, students } = req.body;
  try {
    const newCourse = new Course({ title, description, teacherId, students });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put('/courses/:id', async (req, res) => {
  const { title, description, students } = req.body;
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, { title, description, students }, { new: true });
    res.json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ders silme
app.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//

// Assignment için

// Ödev oluşturma
app.post('/courses/:courseId/assignments', async (req, res) => {
  const { title, description, dueDate } = req.body;
  const courseId = req.params.courseId;
  try {
    const newAssignment = new Assignment({ title, description, dueDate, courseId });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ödevleri listeleme
app.get('/courses/:courseId/assignments', async (req, res) => {
  try {
    const assignments = await Assignment.find({ courseId: req.params.courseId });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Ödev güncelleme
app.put('/assignments/:assignmentId', async (req, res) => {
  const { title, description, dueDate } = req.body;
  try {
    const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.assignmentId, { title, description, dueDate }, { new: true });
    res.json(updatedAssignment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Ödev silme
app.delete('/assignments/:assignmentId', async (req, res) => {
  try {
    await Assignment.findByIdAndDelete(req.params.assignmentId);
    res.json({ message: 'Assignment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




const PORT = process.env.PORT || 5001;

// MongoDB bağlantısı
mongoose.connect(process.env.MONGO_URI = 'mongodb+srv://project0:19277883@cluster0.oz4vrlr.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
