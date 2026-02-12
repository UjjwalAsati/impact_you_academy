import { useState } from "react";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setMessage("Reset link generated. Check email");
    //   console.log("Reset Token:", data.resetToken);

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
          Forgot Password
        </h2>

        {message && (
          <p className="mb-4 text-sm text-center text-red-500">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your registered email"
            className="w-full border px-4 py-2 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-2"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-4 text-sm text-center">
          <Link to="/login" className="text-gold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
