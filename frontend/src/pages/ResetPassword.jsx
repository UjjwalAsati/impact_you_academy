import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(
        `${API_BASE_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password })
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setMessage("Password reset successful. Redirecting...");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-navy mb-6">
          Reset Password
        </h2>

        {message && (
          <p className="mb-4 text-sm text-center text-red-500">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full border px-4 py-2 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-2"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
