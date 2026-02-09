import { useEffect, useState } from "react";
import { fetchMyEnrollments } from "../../services/userEnrollmentService";
import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { token, user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const data = await fetchMyEnrollments(token);
      setEnrollments(data);
      setLoading(false);
    };
    load();
  }, [token]);

  const calculateDaysLeft = (createdAt, duration) => {
    if (!duration) return "-";

    const weeks = parseInt(duration);
    if (isNaN(weeks)) return "-";

    const totalDays = weeks * 7;
    const start = new Date(createdAt);
    const now = new Date();
    const passed = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    const left = totalDays - passed;

    return left > 0 ? `${left} days` : "Completed";
  };

  const statusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold";
    if (status === "active") return `${base} bg-green-100 text-green-700`;
    if (status === "pending") return `${base} bg-yellow-100 text-yellow-700`;
    return `${base} bg-gray-100 text-gray-600`;
  };

  return (
    <div className="pt-28 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy">
          Welcome back, {user.name}
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track your enrolled programs and progress
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Enrollments</p>
          <p className="text-2xl font-bold text-navy">
            {enrollments.length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Active Programs</p>
          <p className="text-2xl font-bold text-navy">
            {enrollments.filter(e => e.status === "active").length}
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Completed Programs</p>
          <p className="text-2xl font-bold text-navy">
            {enrollments.filter(e => e.status === "completed").length}
          </p>
        </div>
      </div>

      {/* Enrollments Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left">Program</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Enrolled On</th>
              <th className="px-6 py-4 text-left">Days Left</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center">
                  Loading your enrollments...
                </td>
              </tr>
            ) : enrollments.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-8 text-center">
                  You are not enrolled in any program yet.
                </td>
              </tr>
            ) : (
              enrollments.map((en) => (
                <tr key={en._id} className="border-t hover:bg-slate-50">
                  <td className="px-6 py-4 font-medium text-navy">
                    {en.program?.title}
                  </td>
                  <td className="px-6 py-4">
                    <span className={statusBadge(en.status)}>
                      {en.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {new Date(en.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {calculateDaysLeft(
                      en.createdAt,
                      en.program?.duration
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

export default UserDashboard;
