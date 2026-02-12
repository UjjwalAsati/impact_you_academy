import { useEffect, useState } from "react";
import { fetchUsers } from "../../services/adminUserService";
import { useAuth } from "../../context/AuthContext";
import { Shield, User, Mail } from "lucide-react";

const AdminUsers = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers(token).then(setUsers).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
         <h1 className="text-3xl font-bold text-slate-900">User Directory</h1>
         <p className="text-slate-500 mt-2">Manage registered accounts and roles.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-8 py-5">User Profile</th>
                <th className="px-8 py-5">Role</th>
                <th className="px-8 py-5">Registered Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="3" className="px-8 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.role === 'admin' ? 'bg-slate-900 text-yellow-400' : 'bg-slate-100 text-slate-500'}`}>
                                <User size={20} />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{user.name}</div>
                                <div className="text-xs text-slate-500 flex items-center gap-1">
                                    <Mail size={12}/> {user.email}
                                </div>
                            </div>
                        </div>
                    </td>
                    <td className="px-8 py-5">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border uppercase ${user.role === 'admin' ? 'bg-slate-900 text-white border-slate-700' : 'bg-white text-slate-600 border-slate-200'}`}>
                            {user.role === 'admin' && <Shield size={12} />}
                            {user.role}
                        </span>
                    </td>
                    <td className="px-8 py-5 text-slate-500 font-medium">
                        {new Date(user.createdAt).toLocaleDateString()}
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

export default AdminUsers;