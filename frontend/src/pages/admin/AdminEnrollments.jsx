import { useEffect, useState } from "react";
import { fetchEnrollments } from "../../services/adminEnrollmentService";
import { useAuth } from "../../context/AuthContext";

const AdminEnrollments = () => {
  const { token } = useAuth();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadEnrollments = async () => {
    try {
      setLoading(true);
      const data = await fetchEnrollments(token);
      setEnrollments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, []);

  const calculateDaysLeft = (createdAt, duration) => {
    if (!duration) return "-";

    const weeksMatch = duration.match(/\d+/);
    if (!weeksMatch) return "-";

    const totalDays = Number(weeksMatch[0]) * 7;
    const startDate = new Date(createdAt);
    const today = new Date();

    const diffTime = today - startDate;
    const daysPassed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    const daysLeft = totalDays - daysPassed;
    return daysLeft > 0 ? daysLeft : "Completed";
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">
        Enrollments
      </h1>

      {error && (
        <p className="text-red-500 text-sm mb-4">{error}</p>
      )}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="px-6 py-4 font-semibold">User</th>
              <th className="px-6 py-4 font-semibold">Program</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Enrolled On</th>
              <th className="px-6 py-4 font-semibold">Days Left</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="px-6 py-6 text-center">
                  Loading enrollments...
                </td>
              </tr>
            ) : enrollments.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-6 text-center">
                  No enrollments found
                </td>
              </tr>
            ) : (
              enrollments.map((enrollment) => (
                <tr key={enrollment._id} className="border-t">
                  <td className="px-6 py-4">
                    <div className="font-medium">
                      {enrollment.user?.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {enrollment.user?.email}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    {enrollment.program?.title}
                  </td>

                  <td className="px-6 py-4 capitalize">
                    {enrollment.status}
                  </td>

                  <td className="px-6 py-4">
                    {new Date(enrollment.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4">
                    {calculateDaysLeft(
                      enrollment.createdAt,
                      enrollment.program?.duration
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminEnrollments;
