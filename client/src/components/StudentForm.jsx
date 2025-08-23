import { useState, useEffect } from 'react';

const StudentForm = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    nama: '',
    kelas: '',
    nilai: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({ nama: '', kelas: '', nilai: '' });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ nama: '', kelas: '', nilai: '' }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="student-form">
      <h3>{initialData ? 'Edit Siswa' : 'Tambah Siswa Baru'}</h3>
      <input
        type="text"
        name="nama"
        placeholder="Nama Siswa"
        value={formData.nama}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="kelas"
        placeholder="Kelas"
        value={formData.kelas}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="nilai"
        placeholder="Nilai"
        value={formData.nilai}
        onChange={handleChange}
        required
      />
      <button type="submit">{initialData ? 'Update' : 'Simpan'}</button>
    </form>
  );
};

export default StudentForm;