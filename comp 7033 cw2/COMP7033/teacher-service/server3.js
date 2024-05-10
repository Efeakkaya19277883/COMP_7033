const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Score = require("./models/Score");
const Student = require("./models/Student");
const Grade = require("./models/Grade")

const app = express();

app.use(cors());
app.use(express.json()); // Body parser

app.get("/", (req, res) => {
  res.send("Student service");
});

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// Materyal yükleme
app.post("/courses/:courseId/materials", async (req, res) => {
  const { title, url } = req.body;
  const courseId = req.params.courseId;
  try {
    const newMaterial = new Material({ title, url, courseId });
    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post("/student/:courseId/grades", async (req, res) => {
  const { title, score } = req.body;
  const studentId = req.params.studentId;
  try {
    const newGrade = new Grade({ title,studentId });
    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/student/:studentId/grades", async (req, res) => {
  try {
    console.log(process.env.USER_URL + "/users/" + req.params.studentId)
    await fetch(process.env.USER_URL + "/users/" + req.params.studentId)
  } catch (error) {
    console.log(err)
  } 

  try {
    const grades = await Grade.find({ studentId: req.params.studentId });
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete ("/student/:studentId/grades", async (req, res)  => {
  try {
    await Grade.findByIdAndDelete(req.params.GradeId);
    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



const PORT = process.env.PORT || 5300;

// MongoDB bağlantısı
mongoose
  .connect(
    (process.env.MONGO_URI =
      "mongodb+srv://project0:19277883@cluster0.oz4vrlr.mongodb.net/main?retryWrites=true&w=majority&appName=Cluster0"),
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
