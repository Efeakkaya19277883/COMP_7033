const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const Material = require("./models/Material");
const Grade = require("./models/Grade");

const app = express();

app.use(cors());
app.use(express.json()); // Body parser

app.get("/", (req, res) => {
  res.send("Teacher service 2");
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

// Materyalleri listeleme
app.get("/courses/:courseId/materials", async (req, res) => {
  try {
    const materials = await Material.find({ courseId: req.params.courseId });
    res.json(materials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Materyal silme
app.delete("/materials/:materialId", async (req, res) => {
  try {
    await Material.findByIdAndDelete(req.params.materialId);
    res.json({ message: "Material deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//  Grade

// Not girişi
app.post("/courses/:courseId/grades", async (req, res) => {
  const { studentId, assignmentId, score } = req.body;
  const courseId = req.params.courseId;
  try {
    const newGrade = new Grade({ courseId, studentId, assignmentId, score });
    await newGrade.save();
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Notları listeleme
app.get("/courses/:courseId/grades", async (req, res) => {
  try {
    const grades = await Grade.find({ courseId: req.params.courseId });
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5100;

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
