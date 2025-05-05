import React, { useState, useEffect, useCallback } from 'react';

const Papers = () => {
  const [papers, setPapers] = useState([]);
  const [filters, setFilters] = useState({
    year: '',
    semester: '',
  });
  const studentId = localStorage.getItem('user_id'); // Corrected localStorage key (it was wrong before!)

  // Fetch papers from backend
  const fetchPapers = useCallback(async () => {
    try {
      const query = new URLSearchParams({
        student_id: studentId,
        ...(filters.year && { year: filters.year }),
        ...(filters.semester && { semester: filters.semester }),
      }).toString();

      const response = await fetch(`http://localhost:8080/exams?${query}`);
      const data = await response.json();
      setPapers(data);
    } catch (error) {
      console.error('Error fetching papers:', error);
    }
  }, [studentId, filters.year, filters.semester]);

  useEffect(() => {
    fetchPapers();
  }, [fetchPapers]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    fetchPapers();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h2 className="text-2xl font-bold mb-6">Available Exam Papers</h2>

      {/* Filter controls */}
      <div className="flex space-x-4 mb-6">
        <input
          type="number"
          name="year"
          value={filters.year}
          onChange={handleFilterChange}
          placeholder="Year"
          className="px-3 py-2 border rounded"
        />
        <select
          name="semester"
          value={filters.semester}
          onChange={handleFilterChange}
          className="px-3 py-2 border rounded"
        >
          <option value="">Select Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
        </select>
        <button
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Papers Table */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {papers.length === 0 ? (
          <p className="text-center py-4">No exam papers found.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="py-3 px-6 text-left">Unit</th>
                <th className="py-3 px-6 text-left">Year</th>
                <th className="py-3 px-6 text-left">Semester</th>
                <th className="py-3 px-6 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {papers.map((paper, index) => (
                <tr key={index} className="border-t">
                  <td className="py-3 px-6">{paper.unit_name}</td>
                  <td className="py-3 px-6">{paper.year}</td>
                  <td className="py-3 px-6">{paper.semester}</td>
                  <td className="py-3 px-6">
                    <a
                      href={`https://tvjgmnmsokytgawsfwcq.supabase.co/storage/v1/object/public/exam-papers/${paper.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                      download
                    >
                      Download
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Papers;
