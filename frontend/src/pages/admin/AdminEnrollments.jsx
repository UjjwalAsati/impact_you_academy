import { useEffect, useState } from "react";
import { fetchEnrollments, updateEnrollmentStatus } 
from "../../services/adminEnrollmentService";
import { useAuth } from "../../context/AuthContext";
import { Clock, Calendar, RefreshCw } from "lucide-react";

const AdminEnrollments = () => {
  const { token } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnrollments = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const data = await fetchEnrollments(token);
      setEnrollments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnrollments();
  }, [token]);

  const calculateDaysLeft = (createdAt, duration) => {
    if (!duration) return <span className="text-slate-400">-</span>;
    const weeksMatch = duration.match(/\d+/);
    if (!weeksMatch) return "-";
    const totalDays = Number(weeksMatch[0]) * 7;
    const passed = Math.floor(
      (new Date() - new Date(createdAt)) / (1000 * 60 * 60 * 24)
    );
    const left = totalDays - passed;

    return left > 0 ? (
      <span className="text-slate-600 font-medium">{left} Days</span>
    ) : (
      <span className="text-green-600 font-bold">Completed</span>
    );
  };

  const getStatusBadge = (status) => {
    const normalized = status?.toLowerCase();

    const styles = {
      active: "bg-green-50 text-green-700 border-green-100",
      pending: "bg-orange-50 text-orange-700 border-orange-100",
      completed: "bg-blue-50 text-blue-700 border-blue-100",
    };

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide ${
          styles[normalized] || "bg-slate-100 text-slate-600"
        }`}
      >
        {normalized}
      </span>
    );
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex justify-between items-end border-b border-slate-200 pb-5">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Enrollments</h1>
          <p className="text-slate-500 mt-1">
            Track student progress and subscriptions.
          </p>
        </div>
        <button
          onClick={loadEnrollments}
          className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 shadow-sm transition-colors"
        >
          <RefreshCw size={18} />
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Student</th>
                <th className="px-6 py-4">Program</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4">Timeline</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    Loading records...
                  </td>
                </tr>
              ) : enrollments.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No enrollments found.
                  </td>
                </tr>
              ) : (
                enrollments.map((en) => (
                  <tr
                    key={en._id}
                    className="hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                          {en.user?.name
                            ?.slice(0, 2)
                            ?.toUpperCase() || "NA"}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">
                            {en.user?.name || "Unknown"}
                          </div>
                          <div className="text-xs text-slate-500">
                            {en.user?.email || "-"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-700">
                      {en.program?.title || "-"}
                    </td>

                    <td className="px-6 py-4">
                      {getStatusBadge(en.status)}
                    </td>

                    <td className="px-6 py-4 text-slate-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(en.createdAt).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} />
                        {calculateDaysLeft(
                          en.createdAt,
                          en.program?.duration
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      {en.status?.toLowerCase() !== "completed" && (
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline">
                          Mark{" "}
                          {en.status?.toLowerCase() === "pending"
                            ? "Active"
                            : "Completed"}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminEnrollments;