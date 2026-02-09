import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../services/adminDashboardService";
import { fetchEnrollments } from "../../services/adminEnrollmentService";
import { useAuth } from "../../context/AuthContext";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

const StatCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <p className="text-sm text-slate-500 mb-1">{title}</p>
    <p className="text-3xl font-bold text-navy">{value}</p>
  </div>
);

const AdminHome = () => {
  const { token } = useAuth();

  const [stats, setStats] = useState(null);
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [statsData, enrollmentsData] = await Promise.all([
          fetchDashboardStats(token),
          fetchEnrollments(token)
        ]);

        setStats(statsData);
        setEnrollments(enrollmentsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  /* 📈 Enrollment growth over time */
  const enrollmentTrend = enrollments.reduce((acc, e) => {
    const date = new Date(e.createdAt).toLocaleDateString();
    const existing = acc.find((item) => item.date === date);
    if (existing) {
      existing.count += 1;
    } else {
      acc.push({ date, count: 1 });
    }
    return acc;
  }, []);

  /* 📊 Status distribution */
  const statusDistribution = [
    {
      status: "Pending",
      count: enrollments.filter((e) => e.status === "pending").length
    },
    {
      status: "Active",
      count: enrollments.filter((e) => e.status === "active").length
    },
    {
      status: "Completed",
      count: enrollments.filter((e) => e.status === "completed").length
    }
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-8">
        Admin Dashboard
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Enrollments" value={stats.totalEnrollments} />
        <StatCard title="Active Enrollments" value={stats.activeEnrollments} />
        <StatCard title="Pending Enrollments" value={stats.pendingEnrollments} />
        <StatCard title="Total Inquiries" value={stats.totalInquiries} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Enrollment Trend */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Enrollment Growth
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={enrollmentTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#0f172a"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Status Distribution */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">
            Enrollment Status
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={statusDistribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#d4af37" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
