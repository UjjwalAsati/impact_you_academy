import { useEffect, useState } from "react";
import { fetchInquiries, updateInquiryStatus } from "../../services/adminInquiryService";
import { useAuth } from "../../context/AuthContext";
import { MessageSquare, Phone, Mail, CheckCircle, XCircle } from "lucide-react";

const AdminInquiries = () => {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const data = await fetchInquiries(token);
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const getStatusColor = (status) => {
      if(status === 'new') return 'bg-blue-50 text-blue-700 border-blue-100';
      if(status === 'contacted') return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      return 'bg-slate-100 text-slate-500 border-slate-200';
  };

  return (
    <div className="space-y-8">
      <div>
         <h1 className="text-3xl font-bold text-slate-900">Inquiries</h1>
         <p className="text-slate-500 mt-2">Manage incoming questions from the contact form.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-8 py-5">Contact Details</th>
                <th className="px-8 py-5 w-1/3">Message</th>
                <th className="px-8 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="4" className="px-8 py-8 text-center text-slate-500">Loading...</td></tr>
              ) : inquiries.map((inq) => (
                <tr key={inq._id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 align-top">
                    <div className="font-bold text-slate-900 text-lg mb-1">{inq.name}</div>
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Mail size={12} className="text-yellow-500"/> {inq.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                            <Phone size={12} className="text-yellow-500"/> {inq.phone}
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 align-top">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-xs leading-relaxed italic">
                        "{inq.message}"
                    </div>
                  </td>
                  <td className="px-8 py-5 align-top">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${getStatusColor(inq.status)}`}>
                        {inq.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 align-top text-right">
                    {inq.status !== "closed" && (
                        <div className="flex justify-end gap-2">
                            {inq.status === 'new' && (
                                <button 
                                    onClick={() => updateInquiryStatus(inq._id, "contacted", token).then(load)}
                                    className="px-3 py-1.5 bg-yellow-400 text-slate-900 rounded-lg text-xs font-bold hover:bg-yellow-500 transition-colors shadow-sm"
                                >
                                    Mark Contacted
                                </button>
                            )}
                            <button 
                                onClick={() => updateInquiryStatus(inq._id, "closed", token).then(load)}
                                className="px-3 py-1.5 bg-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-slate-300 transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminInquiries;