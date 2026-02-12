import { useEffect, useState } from "react";
import { fetchPrograms, createProgram, toggleProgramStatus } from "../../services/adminProgramService";
import { useAuth } from "../../context/AuthContext";
import { Plus, ToggleLeft, ToggleRight, Loader2, IndianRupee, Clock } from "lucide-react";

const AdminPrograms = () => {
  const { token } = useAuth();
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "", description: "", duration: "", price: ""
  });

  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await fetchPrograms();
      setPrograms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadPrograms(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.title || !formData.price) { setError("Title and price are required"); return; }
    try {
      setSubmitting(true);
      await createProgram({ ...formData, price: Number(formData.price) }, token);
      setFormData({ title: "", description: "", duration: "", price: "" });
      loadPrograms();
    } catch (err) { setError(err.message); } 
    finally { setSubmitting(false); }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-slate-200 pb-5">
        <h1 className="text-3xl font-bold text-slate-900">Program Management</h1>
        <p className="text-slate-500 mt-1">Add, edit, or deactivate training programs.</p>
      </div>

      {/* Add Program Card */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
        <div className="flex items-center gap-2 mb-6 text-lg font-bold text-slate-900">
            <div className="p-2 bg-slate-100 rounded-lg"><Plus size={18} /></div>
            Create New Program
        </div>

        {error && <p className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm mb-6 border border-red-100">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Program Title</label>
             <input type="text" name="title" placeholder="e.g. Recruiter Foundation" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all text-sm" />
          </div>
          <div className="lg:col-span-4">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Duration</label>
             <div className="relative">
                <Clock className="absolute left-3 top-3.5 text-slate-400" size={16} />
                <input type="text" name="duration" placeholder="e.g. 30 Days" value={formData.duration} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all text-sm" />
             </div>
          </div>
          <div className="lg:col-span-4">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Price (INR)</label>
             <div className="relative">
                <IndianRupee className="absolute left-3 top-3.5 text-slate-400" size={16} />
                <input type="number" name="price" placeholder="9999" value={formData.price} onChange={handleChange} className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all text-sm" />
             </div>
          </div>
          <div className="lg:col-span-9">
             <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
             <input type="text" name="description" placeholder="Brief overview of the program..." value={formData.description} onChange={handleChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all text-sm" />
          </div>
          <div className="lg:col-span-3 flex items-end">
             <button type="submit" disabled={submitting} className="w-full py-3 bg-slate-900 text-white font-bold rounded-lg hover:bg-yellow-500 hover:text-slate-900 transition-all shadow-md disabled:opacity-70 flex items-center justify-center gap-2 text-sm">
                {submitting ? <Loader2 className="animate-spin" size={18}/> : "Add Program"}
             </button>
          </div>
        </form>
      </div>

      {/* Programs List Table - Added overflow-x-auto for responsiveness */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Duration</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">Loading programs...</td></tr>
              ) : programs.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center text-slate-500">No programs found.</td></tr>
              ) : (
                programs.map((prog) => (
                  <tr key={prog._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-bold text-slate-900">{prog.title}</td>
                    <td className="px-6 py-4 text-slate-600">{prog.duration || "-"}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">₹{prog.price.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${prog.isActive ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${prog.isActive ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                        {prog.isActive ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => { toggleProgramStatus(prog._id, token).then(loadPrograms); }}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                            prog.isActive 
                            ? "bg-white border border-red-200 text-red-600 hover:bg-red-50" 
                            : "bg-green-600 text-white shadow-sm hover:bg-green-700"
                        }`}
                      >
                         {prog.isActive ? <><ToggleRight size={14}/> Deactivate</> : <><ToggleLeft size={14}/> Activate</>}
                      </button>
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

export default AdminPrograms;