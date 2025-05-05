import React, { useState } from 'react';

const ExamUpload = () => {
  const [year, setYear] = useState('');
  const [semester, setSemester] = useState('');
  const [course, setCourse] = useState('');
  const [unit, setUnit] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && (selectedFile.type === 'application/pdf' || selectedFile.type.includes('word'))) {
      setFile(selectedFile);
    } else {
      setMessage('Please select a PDF or Word document.');
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage('No file selected.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('exam_file', file);
    formData.append('year', year);
    formData.append('semester', semester);
    formData.append('course', course);
    formData.append('unit', unit);

    try {
      const response = await fetch('http://localhost:8080/upload-exam', {
        method: 'POST',
        body: formData,
      });

      const result = await response.text();
      if (response.ok) {
        setMessage('Upload successful!');
        setFile(null);
        setYear('');
        setSemester('');
        setCourse('');
        setUnit('');
      } else {
        setMessage(`Upload failed: ${result}`);
      }
    } catch (error) {
      setMessage('Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Upload Exam Paper</h2>
      {message && <p className="mb-4 text-red-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Year (e.g., 2024)"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Semester (e.g., 1)"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Course (e.g., BSC-IT)"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Unit Name"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload Exam'}
        </button>
      </form>
    </div>
  );
};

export default ExamUpload;
