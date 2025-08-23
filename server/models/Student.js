import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  kelas: {
    type: String,
    required: true,
  },
  nilai: {
    type: Number,
    required: true,
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;