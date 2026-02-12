import { useEffect, useState } from "react";
import {
  fetchPrograms,
  createProgram,
  toggleProgramStatus
} from "../../services/adminProgramService";
import { useAuth } from "../../context/AuthContext";
import { Plus, Loader2 } from "lucide-react";

const AdminPrograms = () => {
  const { token } = useAuth();

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: "",
    certification: "",
    schedule: "",
    learningOutcomes: ""
  });

  const [modules, setModules] = useState([]);

  // ==============================
  // LOAD PROGRAMS
  // ==============================
  const loadPrograms = async () => {
    try {
      setLoading(true);
      const data = await fetchPrograms(token);
      setPrograms(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) loadPrograms();
  }, [token]);

  // ==============================
  // HANDLE INPUT CHANGE
  // ==============================
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // ==============================
  // MODULE HANDLING
  // ==============================
  const addModule = () => {
    setModules([...modules, { title: "", topics: "" }]);
  };

  const updateModule = (index, field, value) => {
    const updated = [...modules];
    updated[index][field] = value;
    setModules(updated);
  };

  const removeModule = (index) => {
    setModules(modules.filter((_, i) => i !== index));
  };

  // ==============================
  // SUBMIT (CREATE / UPDATE)
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.price) {
      setError("Title and price are required");
      return;
    }

    try {
      setSubmitting(true);

      await createProgram(
        {
          ...formData,
          price: Number(formData.price),
          learningOutcomes: formData.learningOutcomes
            ? formData.learningOutcomes.split(",").map((item) => item.trim())
            : [],
          modules: modules.map((mod) => ({
            title: mod.title,
            topics: mod.topics
              ? mod.topics.split(",").map((t) => t.trim())
              : []
          }))
        },
        token,
        editingId
      );

      resetForm();
      loadPrograms();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
      price: "",
      certification: "",
      schedule: "",
      learningOutcomes: ""
    });
    setModules([]);
    setEditingId(null);
  };

  // ==============================
  // EDIT PROGRAM
  // ==============================
  const handleEdit = (program) => {
    setFormData({
      title: program.title,
      description: program.description,
      duration: program.duration,
      price: program.price,
      certification: program.certification || "",
      schedule: program.schedule || "",
      learningOutcomes: program.learningOutcomes?.join(", ") || ""
    });

    setModules(
      program.modules?.map((mod) => ({
        title: mod.title,
        topics: mod.topics?.join(", ")
      })) || []
    );

    setEditingId(program._id);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ==============================
  // DEACTIVATE PROGRAM
  // ==============================
  const handleDeactivate = async (id) => {
    try {
      await toggleProgramStatus(id, token);
      loadPrograms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8 pb-10">

      {/* HEADER */}
      <div className="border-b pb-5">
        <h1 className="text-3xl font-bold">Program Management</h1>
      </div>

      {/* ================= FORM ================= */}
      <div className="bg-white p-8 rounded-xl shadow border">
        <div className="flex items-center gap-2 mb-6 font-bold text-lg">
          <Plus size={18} />
          {editingId ? "Edit Program" : "Create New Program"}
        </div>

        {error && (
          <p className="bg-red-100 text-red-600 p-3 rounded mb-4 text-sm">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="title"
            placeholder="Program Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <textarea
            name="description"
            placeholder="Program Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              value={formData.duration}
              onChange={handleChange}
              className="p-3 border rounded"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={formData.price}
              onChange={handleChange}
              className="p-3 border rounded"
            />
          </div>

          <input
            type="text"
            name="certification"
            placeholder="Certification Name"
            value={formData.certification}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="schedule"
            placeholder="Schedule"
            value={formData.schedule}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="text"
            name="learningOutcomes"
            placeholder="Learning Outcomes (comma separated)"
            value={formData.learningOutcomes}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          {/* MODULES */}
          <div>
            <h3 className="font-bold mb-3">Modules</h3>

            {modules.map((mod, index) => (
              <div key={index} className="border p-4 rounded mb-3 space-y-2">
                <input
                  type="text"
                  placeholder="Module Title"
                  value={mod.title}
                  onChange={(e) =>
                    updateModule(index, "title", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />

                <input
                  type="text"
                  placeholder="Topics (comma separated)"
                  value={mod.topics}
                  onChange={(e) =>
                    updateModule(index, "topics", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                />

                <button
                  type="button"
                  onClick={() => removeModule(index)}
                  className="text-red-600 text-xs"
                >
                  Remove Module
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addModule}
              className="text-blue-600 text-sm"
            >
              + Add Module
            </button>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 bg-black text-white rounded-lg"
          >
            {submitting ? (
              <Loader2 className="animate-spin mx-auto" />
            ) : editingId ? (
              "Update Program"
            ) : (
              "Add Program"
            )}
          </button>
        </form>
      </div>

      {/* ================= PROGRAM TABLE ================= */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-xs uppercase">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Duration</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : programs.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center">
                  No programs found.
                </td>
              </tr>
            ) : (
              programs.map((prog) => (
                <tr key={prog._id} className="border-t">
                  <td className="p-4 font-bold">{prog.title}</td>
                  <td className="p-4">{prog.duration}</td>
                  <td className="p-4">₹{prog.price}</td>
                  <td className="p-4">
                    {prog.isActive ? "Active" : "Inactive"}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleEdit(prog)}
                      className="px-3 py-1 text-xs border rounded"
                    >
                      Edit
                    </button>

                    {prog.isActive && (
                      <button
                        onClick={() => handleDeactivate(prog._id)}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                      >
                        Deactivate
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
  );
};

export default AdminPrograms;
