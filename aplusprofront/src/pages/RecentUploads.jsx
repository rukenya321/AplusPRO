import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const RecentUploads = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);

  const lecturerID = 'LEC001IT'; // Replace with dynamic ID (if needed)

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await fetch(`http://localhost:8080/exams?lecturer_id=${lecturerID}`);
        const data = await res.json();
        setExams(data);
      } catch (error) {
        console.error('Error fetching exams:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExams();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back button and title */}
      <div className="flex items-center mb-8">
        <Link to="/lec-home">
          <button className="flex items-center space-x-2 text-white bg-navy-custom px-4 py-2 rounded hover:bg-blue-700 transition duration-300">
            <FaArrowLeft className="text-xl" />
            <span>Back</span>
          </button>
        </Link>
      </div>

      {/* Papers Table */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-4">Loading exams...</p>
        ) : exams.length === 0 ? (
          <p className="p-4">No exams uploaded yet.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left py-4 px-6">Unit Name</th>
                <th className="text-left py-4 px-6">Date Uploaded</th>
                <th className="text-left py-4 px-6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.map((exam, index) => (
                <tr key={index} className="border-t">
                  <td className="py-4 px-6">{exam.unit_name}</td>
                  <td className="py-4 px-6">{new Date(exam.uploaded_at).toLocaleDateString()}</td>
                  <td className="py-4 px-6">
                    <a
                      href={`https://tvjgmnmsokytgawsfwcq.supabase.co/storage/v1/object/public/exam-papers/${exam.file_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
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

export default RecentUploads;
