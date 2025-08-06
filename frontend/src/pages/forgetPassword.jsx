import { useState } from "react";
import { useNavigate } from "react-router-dom";
import askit from "/logo.svg"
import { axiosInstance } from "../lib/axios";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [successEmail, setSuccessEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(true);

    try {
      const res = await axiosInstance.post("/auth/forget-password", { email });
        // if (res.status !== 200) {
        //     throw new Error("Failed to send reset link");
        // }
    
        if (res.status !== 200) {
            throw new Error(res.message || "User not found");
        }


      setSuccessEmail(email);
    } catch (err) {
        if (err.response?.status === 400) {
            setError(err.response.data.message || "Bad request");
        } else {
            setError(err.message || "Something went wrong");
        }
    //   setError(err.message || "Something went wrong");
    } finally {
      setSubmitted(false);
    }
  };

  return (
    <div className="h-full w-full max-w-[500px] bg-black text-white flex flex-col py-4">
      {/* Top Logo */}

      {/* Navigation */}
      <div className="topNavBar flex w-full justify-between items-center mt-2 px-4">
        <div className="back-to-main-page flex pt-[0.2rem]">
          <button
            style={{ all: "unset", cursor: "pointer" }}
            className="h-full"
            type="button"
            onClick={() => navigate("/")}
          >
            <svg
              width="10"
              height="16"
              viewBox="0 0 10 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.5 15L1.5 8L8.5 1"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="text-white text-3xl ml-5 font-semibold">
            Forgot Password
          </div>
        </div>
      </div>

      <div className="w-full bg-[#2f2f2f] h-0.25 mt-6 mb-6"></div>

      {/* Form Section */}
      <div className="px-5 w-full">
        {!successEmail ? (
            <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="text-[#ddd] text-xl mb-1"> What's your email address?</div>
            <div className="text-[#ccc] text-sm mb-4">We'll help you reset your password.</div>
            
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/15 text-white p-3 rounded-md"
              required
            />

            {error && <p className="text-red-800 text-sm mt-2">{error}</p>}

            <button
              type="submit"
              disabled={submitted || !email}
              className="mt-8 w-full bg-white text-black font-bold rounded-md cursor-pointer py-2  disabled:opacity-50"
            >
              {submitted ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        ) : (
          <div className="text-[#ddd] text-lg">
            An email has been sent to{" "}
            <span className="font-semibold">{successEmail}</span>.
            <br />
            Please follow the instructions there to reset your password.
          </div>
        )}
      </div>
    </div>
  );
}
