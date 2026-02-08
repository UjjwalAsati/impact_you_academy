import { useEffect, useState } from "react";
import { fetchPrograms, createProgram } from "../../services/adminProgramService";
import { useAuth } from "../../context/AuthContext";

const AdminPrograms = () => {
  const { token } = useAuth();

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    price: ""
  });

  const [submitting, setSubmitting] = useState(false);

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

  useEffect(() => {
    loadPrograms();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
          price: Number(formData.price)
        },
        token
      );

      // Reset form
      setFormData({
        title: "",
        description: "",
        duration: "",
        price: ""
      });

      // Reload list
      loadPrograms();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">
        Programs Management
      </h1>

      {/* Add Program Form */}
      <div className="bg-white p-6 rounded-xl shadow-sm mb-10">
        <h2 className="text-lg font-semibold mb-4">
          Add New Program
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Program title"
            value={formData.title}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none"
          />

          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 8 Weeks)"
            value={formData.duration}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none"
          />

          <input
            type="number"
            name="price"
            placeholder="Price (INR)"
            value={formData.price}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none"
          />

          <input
            type="text"
            name="description"
            placeholder="Short description"
            value={formData.description}
            onChange={handleChange}
            className="px-4 py-2 border rounded-lg focus:outline-none md:col-span-2"
          />

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold px-6 py-2.5 text-sm w-fit"
          >
            {submitting ? "Adding..." : "Add Program"}
          </button>
        </form>
      </div>

      {/* Programs List */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100 text-left">
            <tr>
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Duration</th>
              <th className="px-6 py-4 font-semibold">Price</th>
              <th className="px-6 py-4 font-semibold">Status</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" className="px-6 py-6 text-center">
                  Loading programs...
                </td>
              </tr>
            ) : programs.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-6 py-6 text-center">
                  No programs found
                </td>
              </tr>
            ) : (
              programs.map((program) => (
                <tr key={program._id} className="border-t">
                  <td className="px-6 py-4 font-medium">
                    {program.title}
                  </td>
                  <td className="px-6 py-4">
                    {program.duration || "-"}
                  </td>
                  <td className="px-6 py-4">
                    ₹{program.price}
                  </td>
                  <td className="px-6 py-4">
                    {program.isActive ? "Active" : "Inactive"}
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
