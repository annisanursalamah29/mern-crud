import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import Student from "./models/Student.js";

dotenv.config();

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://annisanursalamah29.github.io",
    "https://annisanursalamah29.github.io/mern-crud",
  ],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.use(express.json());

// Koneksi ke MongoDB
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

// Endpoint CRUD
app.post("/api/students", async (req, res) => {
  const { nama, kelas, nilai } = req.body;
  if (!nama || !kelas || typeof nilai !== "number") {
    return res.status(400).json({ message: "Data tidak valid" });
  }
  try {
    const student = new Student({ nama, kelas, nilai });
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ message: "Terjadi kesalahan" });
  }
});

// READ: Mendapatkan semua siswa
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ: Mendapatkan satu siswa berdasarkan ID
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE: Mengubah data siswa
app.put("/api/students/:id", async (req, res) => {
  const { nama, kelas, nilai } = req.body;
  if (!nama || !kelas || typeof nilai !== "number") {
    return res.status(400).json({ message: "Data tidak valid" });
  }
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { nama, kelas, nilai },
      { new: true }
    );
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(400).json({ message: "Terjadi kesalahan" });
  }
});

// DELETE: Menghapus siswa
app.delete("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;