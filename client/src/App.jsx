import { useState, useEffect } from 'react';
import axios from 'axios';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import './App.css';

const API_URL = 'http://localhost:5000/api/students';

function App() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };

  const handleAddOrUpdateStudent = async (studentData) => {
    try {
      if (editingStudent) {
        // Update
        await axios.put(`${API_URL}/${editingStudent._id}`, studentData);
      } else {
        // Create
        await axios.post(API_URL, studentData);
      }
      setEditingStudent(null);
      fetchStudents(); // Refresh data
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents(); // Refresh data
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="app-container">
      <h1>Data Siswa</h1>
      <StudentForm
        onSubmit={handleAddOrUpdateStudent}
        initialData={editingStudent}
      />
      <StudentList
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;