import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false); // ✅ prevents double execution

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    if (hasVerified.current) return; // 🛑 stop second call
    hasVerified.current = true;

    const verify = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/auth/verify-email/${token}`
        );

        const data = await res.json();

        if (!res.ok) {
          setStatus("error");
          setMessage(data.message || "Verification failed.");
        } else {
          setStatus("success");
          setMessage("Email verified successfully! Redirecting to login...");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        setStatus("error");
        setMessage("Something went wrong. Please try again later.");
      }
    };

    verify();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">

        {status === "loading" && (
          <>
            <Loader2 className="mx-auto mb-4 animate-spin text-navy" size={40} />
            <h2 className="text-lg font-semibold text-navy">
              {message}
            </h2>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="mx-auto mb-4 text-green-500" size={40} />
            <h2 className="text-lg font-semibold text-green-600">
              {message}
            </h2>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="mx-auto mb-4 text-red-500" size={40} />
            <h2 className="text-lg font-semibold text-red-600">
              {message}
            </h2>
          </>
        )}

      </div>
    </div>
  );
}
