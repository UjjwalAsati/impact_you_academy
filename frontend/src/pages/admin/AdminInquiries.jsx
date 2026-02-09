import { useEffect, useState } from "react";
import { fetchInquiries, updateInquiryStatus } from "../../services/adminInquiryService";
import { useAuth } from "../../context/AuthContext";

const AdminInquiries = () => {
  const { token } = useAuth();
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadInquiries = async () => {
    const data = await fetchInquiries(token);
    setInquiries(data);
    setLoading(false);
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-navy mb-6">
        Inquiries
      </h1>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Message</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="px-6 py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              inquiries.map((inq) => (
                <tr key={inq._id} className="border-t">
                  <td className="px-6 py-4">{inq.name}</td>
                  <td className="px-6 py-4">{inq.email}</td>
                  <td className="px-6 py-4">{inq.phone}</td>
                  <td className="px-6 py-4">{inq.message}</td>
                  <td className="px-6 py-4 capitalize">{inq.status}</td>
                  <td className="px-6 py-4">
                    {inq.status !== "closed" && (
                      <button
                        className="px-3 py-1 bg-navy text-white rounded"
                        onClick={async () => {
                          await updateInquiryStatus(
                            inq._id,
                            inq.status === "new" ? "contacted" : "closed",
                            token
                          );
                          loadInquiries();
                        }}
                      >
                        Mark {inq.status === "new" ? "Contacted" : "Closed"}
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

export default AdminInquiries;
