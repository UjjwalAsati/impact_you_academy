import { useEffect, useState } from "react";
import { fetchDashboardStats } from "../../services/adminDashboardService";
import { fetchEnrollments } from "../../services/adminEnrollmentService";
import { useAuth } from "../../context/AuthContext";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar
} from "recharts";
import { Users, BookOpen, Clock, CheckCircle2, MessageSquare, TrendingUp, Activity } from "lucide-react";

// Improved Stat Card to prevent text overflow
const StatCard = ({ title, value, icon: Icon, colorClass, borderClass }) => (
  <div className={`bg-white rounded-xl p-5 shadow-sm border hover:shadow-md transition-all duration-300 ${borderClass}`}>
    <div className="flex items-center justify-between">
      <div className="overflow-hidden">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 truncate">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg flex-shrink-0 ${colorClass}`}>
        <Icon size={20} />
      </div>
    </div>
  </div>
);

const AdminHome = () => {
  const { token, user } = useAuth();
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
  }, [token]);

  if (loading) return (
    <div className="flex items-center justify-center h-64 text-slate-500">
        Loading dashboard data...
    </div>
  );

  const enrollmentTrend = enrollments?.reduce((acc, e) => {
    const date = new Date(e.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const existing = acc.find((item) => item.date === date);
    if (existing) existing.count += 1;
    else acc.push({ date, count: 1 });
    return acc;
  }, []).slice(-7) || [];

  const statusDistribution = [
    { status: "Pending", count: enrollments?.filter((e) => e.status === "pending").length || 0 },
    { status: "Active", count: enrollments?.filter((e) => e.status === "active").length || 0 },
    { status: "Completed", count: enrollments?.filter((e) => e.status === "completed").length || 0 }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Overview of system performance.</p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-200">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           System Live
        </div>
      </div>

      {/* Stats Grid - Responsive Fix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatCard title="Total Users" value={stats?.totalUsers || 0} icon={Users} colorClass="bg-blue-50 text-blue-600" borderClass="border-blue-100"/>
        <StatCard title="Enrollments" value={stats?.totalEnrollments || 0} icon={BookOpen} colorClass="bg-indigo-50 text-indigo-600" borderClass="border-indigo-100"/>
        <StatCard title="Active" value={stats?.activeEnrollments || 0} icon={Activity} colorClass="bg-green-50 text-green-600" borderClass="border-green-100"/>
        <StatCard title="Pending" value={stats?.pendingEnrollments || 0} icon={Clock} colorClass="bg-orange-50 text-orange-600" borderClass="border-orange-100"/>
        <StatCard title="Inquiries" value={stats?.totalInquiries || 0} icon={MessageSquare} colorClass="bg-purple-50 text-purple-600" borderClass="border-purple-100"/>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
             <TrendingUp size={18} className="text-slate-400"/> Growth Trend
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={enrollmentTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} allowDecimals={false} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Line type="monotone" dataKey="count" stroke="#eab308" strokeWidth={3} dot={{r: 4, fill: '#eab308'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
             <CheckCircle2 size={18} className="text-slate-400"/> Status Distribution
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} allowDecimals={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                <Bar dataKey="count" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;