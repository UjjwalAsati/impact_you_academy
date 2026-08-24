import { useEffect, useState } from "react";
import {
  fetchEnrollments,
  updateEnrollmentStatus
} from "../../services/adminEnrollmentService";
import { useAuth } from "../../context/AuthContext";
import {
  Clock,
  Calendar,
  RefreshCw,
  IndianRupee
} from "lucide-react";

const AdminEnrollments = () => {
  const { token } = useAuth();

  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEnrollments = async () => {
    if (!token) return;

    setLoading(true);

    try {
      const data = await fetchEnrollments(token);

      console.log("ADMIN ENROLLMENTS:", data);

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

  // ==============================
  // COURSE DAYS LEFT
  // ==============================
  const calculateDaysLeft = (createdAt, duration) => {
    if (!duration) {
      return (
        <span className="text-slate-400">
          -
        </span>
      );
    }

    const numberMatch = duration.match(/\d+/);

    if (!numberMatch) return "-";

    let totalDays = Number(numberMatch[0]);

    const lower = duration.toLowerCase();

    if (lower.includes("week")) {
      totalDays *= 7;
    }

    if (lower.includes("month")) {
      totalDays *= 30;
    }

    const passed = Math.floor(
      (new Date() - new Date(createdAt)) /
        (1000 * 60 * 60 * 24)
    );

    const left = totalDays - passed;

    return left > 0 ? (
      <span className="text-slate-600 font-medium">
        {left} Days
      </span>
    ) : (
      <span className="text-green-600 font-bold">
        Completed
      </span>
    );
  };

  // ==============================
  // ENROLLMENT STATUS
  // ==============================
  const getStatusBadge = (status) => {
    const normalized = status?.toLowerCase();

    const styles = {
      active:
        "bg-green-50 text-green-700 border-green-100",

      pending:
        "bg-orange-50 text-orange-700 border-orange-100",

      completed:
        "bg-blue-50 text-blue-700 border-blue-100"
    };

    return (
      <span
        className={`px-2.5 py-0.5 rounded-full text-xs font-bold border uppercase tracking-wide ${
          styles[normalized] ||
          "bg-slate-100 text-slate-600"
        }`}
      >
        {normalized || "-"}
      </span>
    );
  };

  // ==============================
  // PAYMENT STATUS
  // ==============================
  const getPaymentStatusBadge = (status) => {
    const normalized = status?.toLowerCase();

    const styles = {
      unpaid:
        "bg-red-50 text-red-700 border-red-100",

      partially_paid:
        "bg-yellow-50 text-yellow-700 border-yellow-100",

      paid:
        "bg-green-50 text-green-700 border-green-100"
    };

    const labels = {
      unpaid: "Unpaid",
      partially_paid: "Partially Paid",
      paid: "Paid"
    };

    return (
      <span
        className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
          styles[normalized] ||
          "bg-slate-100 text-slate-600"
        }`}
      >
        {labels[normalized] || "Unknown"}
      </span>
    );
  };

  // ==============================
  // UPDATE ENROLLMENT STATUS
  // ==============================
  const handleStatusUpdate = async (enrollment) => {
    try {
      const currentStatus =
        enrollment.status.toLowerCase();

      let newStatus;

      if (currentStatus === "pending") {
        newStatus = "active";
      } else if (currentStatus === "active") {

        const numberMatch =
          enrollment.program?.duration?.match(/\d+/);

        if (numberMatch) {
          let totalDays =
            Number(numberMatch[0]);

          const lower =
            enrollment.program.duration.toLowerCase();

          if (lower.includes("week")) {
            totalDays *= 7;
          }

          if (lower.includes("month")) {
            totalDays *= 30;
          }

          const passed = Math.floor(
            (new Date() -
              new Date(enrollment.createdAt)) /
              (1000 * 60 * 60 * 24)
          );

          if (passed < totalDays) {
            alert(
              "Course duration is not completed yet."
            );

            return;
          }
        }

        newStatus = "completed";
      } else {
        return;
      }

      const confirmAction = window.confirm(
        `Are you sure you want to mark this enrollment as ${newStatus}?`
      );

      if (!confirmAction) return;

      await updateEnrollmentStatus(
        enrollment._id,
        newStatus,
        token
      );

      loadEnrollments();

    } catch (err) {
      console.error(
        "Status update failed:",
        err
      );
    }
  };

  return (
    <div className="space-y-8 pb-10">

      {/* ================= HEADER ================= */}
      <div className="flex justify-between items-end border-b border-slate-200 pb-5">

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Enrollments
          </h1>

          <p className="text-slate-500 mt-1">
            Track students, course progress and payments.
          </p>
        </div>

        <button
          onClick={loadEnrollments}
          className="p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 shadow-sm transition-colors"
          title="Refresh"
        >
          <RefreshCw size={18} />
        </button>

      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full text-sm text-left whitespace-nowrap">

            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">

              <tr>

                <th className="px-6 py-4">
                  Student
                </th>

                <th className="px-6 py-4">
                  Program
                </th>

                <th className="px-6 py-4">
                  Course Fee
                </th>

                <th className="px-6 py-4">
                  Paid
                </th>

                <th className="px-6 py-4">
                  Pending
                </th>

                <th className="px-6 py-4">
                  Payment
                </th>

                <th className="px-6 py-4">
                  Enrollment
                </th>

                <th className="px-6 py-4">
                  Joined
                </th>

                <th className="px-6 py-4">
                  Timeline
                </th>

                <th className="px-6 py-4 text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-slate-100">

              {loading ? (

                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    Loading records...
                  </td>
                </tr>

              ) : enrollments.length === 0 ? (

                <tr>
                  <td
                    colSpan="10"
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No enrollments found.
                  </td>
                </tr>

              ) : (

                enrollments.map((en) => {

                  const total =
                    Number(en.totalAmount || 0);

                  const paid =
                    Number(en.paidAmount || 0);

                  const pending =
                    Number(
                      en.remainingAmount ??
                      Math.max(total - paid, 0)
                    );

                  return (
                    <tr
                      key={en._id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >

                      {/* STUDENT */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-3">

                          <div className="w-9 h-9 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs">
                            {en.user?.name
                              ?.slice(0, 2)
                              ?.toUpperCase() ||
                              "NA"}
                          </div>

                          <div>

                            <div className="font-bold text-slate-900">
                              {en.user?.name ||
                                "Unknown"}
                            </div>

                            <div className="text-xs text-slate-500">
                              {en.user?.email ||
                                "-"}
                            </div>

                          </div>

                        </div>

                      </td>

                      {/* PROGRAM */}
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {en.program?.title || "-"}
                      </td>

                      {/* COURSE FEE */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-1 font-bold text-slate-900">

                          <IndianRupee size={14} />

                          {total.toLocaleString("en-IN")}

                        </div>

                      </td>

                      {/* PAID */}
                      <td className="px-6 py-4">

                        <div className="font-bold text-green-600">
                          ₹{paid.toLocaleString("en-IN")}
                        </div>

                      </td>

                      {/* PENDING */}
                      <td className="px-6 py-4">

                        <div
                          className={`font-bold ${
                            pending > 0
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          ₹{pending.toLocaleString("en-IN")}
                        </div>

                      </td>

                      {/* PAYMENT STATUS */}
                      <td className="px-6 py-4">
                        {getPaymentStatusBadge(
                          en.paymentStatus
                        )}
                      </td>

                      {/* ENROLLMENT STATUS */}
                      <td className="px-6 py-4">
                        {getStatusBadge(
                          en.status
                        )}
                      </td>

                      {/* JOINED */}
                      <td className="px-6 py-4 text-slate-500">

                        <div className="flex items-center gap-2">

                          <Calendar size={14} />

                          {new Date(
                            en.createdAt
                          ).toLocaleDateString()}

                        </div>

                      </td>

                      {/* TIMELINE */}
                      <td className="px-6 py-4">

                        <div className="flex items-center gap-2 text-slate-500">

                          <Clock size={14} />

                          {calculateDaysLeft(
                            en.createdAt,
                            en.program?.duration
                          )}

                        </div>

                      </td>

                      {/* ACTIONS */}
                      <td className="px-6 py-4 text-right">

                        {en.status?.toLowerCase() !==
                          "completed" && (

                          <button
                            onClick={() =>
                              handleStatusUpdate(en)
                            }
                            className="text-xs font-bold text-blue-600 hover:text-blue-800 hover:underline"
                          >
                            Mark{" "}

                            {en.status?.toLowerCase() ===
                            "pending"
                              ? "Active"
                              : "Completed"}

                          </button>

                        )}

                      </td>

                    </tr>
                  );
                })
              )}

            </tbody>

          </table>

        </div>
      </div>

    </div>
  );
};

export default AdminEnrollments;