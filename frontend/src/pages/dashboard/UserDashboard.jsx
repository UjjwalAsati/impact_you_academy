import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchMyEnrollments } from "../../services/userEnrollmentService"; 
import { useAuth } from "../../context/AuthContext"; 
import { useCart } from "../../context/CartContext"; // Import Cart Context to handle retry
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  Calendar, 
  ChevronRight, 
  Loader2,
  Sparkles,
  PlayCircle,
  Award,
  AlertCircle,
  CreditCard
} from "lucide-react";

const UserDashboard = () => {
  const { user } = useAuth();
  const { addToCart } = useCart(); // Use cart to retry payment
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- 1. LOAD DATA ---
  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchMyEnrollments();
        setEnrollments(data);
      } catch (error) {
        console.error("Failed to load enrollments", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // --- 2. HANDLERS ---
  const handleCompletePayment = (enrollment) => {
    // Re-add to cart and redirect to payment
    addToCart({
      _id: enrollment.program._id,
      title: enrollment.program.title,
      price: enrollment.program.price,
      duration: enrollment.program.duration,
    });
    navigate('/payment');
  };

  // --- 3. HELPER LOGIC ---
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getProgressInfo = (createdAt, durationString) => {
    if (!durationString) return { percent: 0, label: "Self-paced" };
    const durationMatch = durationString.match(/(\d+)/);
    const durationDays = durationMatch ? parseInt(durationMatch[0]) : 30;
    const start = new Date(createdAt);
    const now = new Date();
    const diffDays = Math.ceil(Math.abs(now - start) / (1000 * 60 * 60 * 24));
    let percent = Math.min(100, Math.round((diffDays / durationDays) * 100));
    let label = `${Math.max(0, durationDays - diffDays)} days left`;
    if (diffDays >= durationDays) {
      percent = 100;
      label = "Course Ended";
    }
    return { percent, label };
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "active": return "bg-green-100 text-green-700 border-green-200";
      case "completed": return "bg-blue-100 text-blue-700 border-blue-200";
      case "pending": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-slate-100 text-slate-600 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <Loader2 className="w-10 h-10 text-yellow-500 animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Loading your learning space...</p>
      </div>
    );
  }

  // Stats calculation
  const activeCount = enrollments.filter(e => e.status === 'active').length;
  const pendingCount = enrollments.filter(e => e.status === 'pending').length;
  const completedCount = enrollments.filter(e => e.status === 'completed').length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="bg-white border-b border-slate-200 pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-yellow-600 font-bold text-sm uppercase tracking-wider mb-2">
                 <Sparkles size={16} />
                 <span>Student Dashboard</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                {getGreeting()}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600">{user?.name || 'Scholar'}</span>
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                Track your progress. You have <strong>{activeCount} active</strong> and <strong>{pendingCount} pending</strong> courses.
              </p>
            </div>
            
            {/* Quick Stats Row */}
            <div className="flex flex-wrap gap-4">
               {/* Pending Stat (Only shows if > 0) */}
               {pendingCount > 0 && (
                 <div className="px-6 py-4 bg-orange-50 rounded-2xl border border-orange-100 flex items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <p className="text-xs text-orange-400 font-bold uppercase">Pending</p>
                      <p className="text-xl font-bold text-orange-900">{pendingCount}</p>
                    </div>
                 </div>
               )}

               <div className="px-6 py-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <BookOpen size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase">Active</p>
                    <p className="text-xl font-bold text-slate-900">{activeCount}</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <PlayCircle className="text-slate-400" /> My Enrollments
            </h2>
            <Link to="/programs" className="text-sm font-bold text-yellow-600 hover:underline flex items-center gap-1">
                Browse More Courses <ChevronRight size={16} />
            </Link>
        </div>

        {/* --- EMPTY STATE --- */}
        {enrollments.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-500">
              <BookOpen size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No enrollments yet</h3>
            <p className="text-slate-500 max-w-md mx-auto mb-8">
              It looks like you haven't enrolled in any programs yet. Explore our curriculum to kickstart your recruitment career.
            </p>
            <Link to="/programs">
              <button className="px-8 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors">
                Browse Programs
              </button>
            </Link>
          </div>
        ) : (
          
          /* --- COURSE GRID --- */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrollments.map((en) => {
              const { percent, label } = getProgressInfo(en.createdAt, en.program?.duration);
              const isPending = en.status === 'pending';
              
              return (
                <div 
                  key={en._id} 
                  className={`group bg-white rounded-2xl border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col 
                    ${isPending ? 'border-orange-200 shadow-orange-100' : 'border-slate-200'}
                  `}
                >
                  {/* Card Header */}
                  <div className={`h-32 p-6 flex items-start justify-between relative overflow-hidden
                      ${isPending ? 'bg-orange-50' : 'bg-gradient-to-br from-slate-800 to-slate-900'}
                  `}>
                     {/* Decorative Blob */}
                     <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-10 -mt-10 
                        ${isPending ? 'bg-orange-200/50' : 'bg-white/5'}
                     `} />
                     
                     <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusStyle(en.status)} bg-white/90 shadow-sm z-10`}>
                        {en.status}
                     </div>
                     
                     {isPending ? (
                       <AlertCircle className="text-orange-300 w-12 h-12" />
                     ) : (
                       <Award className="text-white/20 w-12 h-12" />
                     )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-yellow-600 transition-colors">
                        {en.program?.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-6">
                        <Calendar size={14} />
                        <span>Enrolled: {new Date(en.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="mt-auto">
                        {isPending ? (
                          /* PENDING STATE UI */
                          <div className="space-y-3">
                             <div className="p-3 bg-orange-50 rounded-lg text-xs text-orange-800 border border-orange-100">
                                <strong>Action Required:</strong> Payment is pending. Complete payment to access course materials.
                             </div>
                             <button 
                                onClick={() => handleCompletePayment(en)}
                                className="w-full py-2.5 bg-orange-500 text-white font-bold text-sm rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-orange-200"
                             >
                                <CreditCard size={16} /> Complete Payment
                             </button>
                          </div>
                        ) : (
                          /* ACTIVE/COMPLETED STATE UI */
                          <>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Progress</span>
                                <span className="text-xs font-bold text-slate-900">{percent}%</span>
                            </div>
                            
                            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-yellow-500 rounded-full transition-all duration-1000" 
                                    style={{ width: `${percent}%` }} 
                                />
                            </div>
                            
                            <div className="flex justify-between mt-3 text-xs">
                                <span className="flex items-center gap-1 text-slate-500">
                                    <Clock size={12} /> {label}
                                </span>
                                {en.status === 'completed' ? (
                                    <span className="text-green-600 font-bold flex items-center gap-1">
                                        <Award size={12} /> Certified
                                    </span>
                                ) : (
                                    <span className="text-yellow-600 font-bold">In Progress</span>
                                )}
                            </div>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;