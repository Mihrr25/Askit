import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import askit from "/logo.svg";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { use } from "react";

export default function ResetPasswordPage() {
  const [Name, setName] = useState("");
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [successChange, setSuccessChange] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const t = queryParams.get("token") || "";
    setToken(t);

    if (!t) return;

    const verifyToken = async () => {
      try {
        const res = await axiosInstance.post("/auth/checkResetToken", { token: t });

        if (res.status === 200) {
          setName(res.data.userName);
        } else {
          throw new Error(res.message || "Invalid token");
        }
      } catch (err) {
        if (err.response?.status === 400) {
          toast.error(err.response.data.message || "Bad request");
        } else {
          toast.error(err.message || "Something went wrong");
        }
        navigate("/");
      }
    };

    verifyToken();
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (newPassword !== reNewPassword) {
      setError("Passwords do not match");
      return;
    }
    setSubmitted(true);

    try {
      const res = await axiosInstance.post("/auth/reset-password", {
        token,
        newPassword,
      });
      if (res.status !== 200) {
        throw new Error(res.message || "Issue somewhere");
      }

      setSuccessChange(true);
    } catch (err) {
      if (err.response?.status === 400) {
        setError(err.response.data.message || "Bad request");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setSubmitted(false);
      
    }
  };

  useEffect(() => {
    if(newPassword && reNewPassword && newPassword !== reNewPassword) {
      setError("Passwords do not match");
    }
    else {
        setError("");
    }
  }, [newPassword, reNewPassword]);

  return (
    <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col py-4">
      {/* Top Logo */}

      {/* Navigation */}
      <div className="topNavBar flex w-full justify-between items-center mt-2 px-4">
        <div className="back-to-main-page flex pt-[0.2rem] w-full">
          <div className="text-white text-3xl font-semibold w-full text-center">
            Reset Password
          </div>
        </div>
      </div>

      <div className="w-full bg-[#2f2f2f] h-0.25 mt-6 mb-6"></div>

      {/* Form Section */}
      <div className="px-5 w-full h-full">
        {!successChange ? (
          <form onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="text-[#ddd] text-xl mb-1">
              {" "}
              Hello {Name || "User"} !
            </div>
            <div className="text-[#ccc] text-sm mb-4">
              Now you can reset your password.
            </div>

            <div className="text-[#ccc] text-sm mb-1">
              Enter your New Password
            </div>
            <input
              type="password"
              placeholder="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full bg-white/15 text-white p-3 rounded-md mb-2"
              required
            />
            <div className="text-[#ccc] text-sm mb-1">
                Confirm your New Password
            </div>
            <input
              type="password"
              placeholder="password"
              value={reNewPassword}
              onChange={(e) => setReNewPassword(e.target.value)}
              className="w-full bg-white/15 text-white p-3 rounded-md"
              required
            />

            {error && <p className="text-red-800 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              disabled={submitted || !newPassword || !reNewPassword}
              className="mt-8 w-full h-10 bg-white text-black font-bold rounded-md cursor-pointer disabled:opacity-50"
            >
              {submitted ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="text-[#ddd] text-lg">
            Your password has been reset successfully. You can now log in with
            your new password.
          </div>
        )}
      </div>
    </div>
  );
}
