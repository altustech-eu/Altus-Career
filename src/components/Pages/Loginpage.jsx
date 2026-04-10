import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,

  LogIn,
  ArrowLeft
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard"); // ✅ now used properly
    }, 1500);
  };

  const smoothSpring = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-inter selection:bg-blue-100">
      
      {/* font import */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
          .font-inter { font-family: 'Inter', sans-serif; }
        `}
      </style>

      {/* back button */}
      <Link
        to="/"
        className="fixed top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-[#0f172a] transition-all group z-50"
      >
        <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-1 transition-transform"
          />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest">
          Back to Home
        </span>
      </Link>

      <motion.div
        layout
        transition={smoothSpring}
        className="max-w-[1000px] w-full bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row min-h-[680px] border border-slate-100"
      >
        {/* LEFT */}
        <div className="flex-[1.1] p-8 md:p-14 flex flex-col justify-center bg-white">
          
          {/* header */}
          <div className="mb-10 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0f172a] rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-xs italic">A</span>
              </div>
              <span className="text-lg font-black tracking-tighter text-[#0f172a]">
                ALTUS.
              </span>
            </div>

            {/* toggle */}
            <div className="bg-slate-50 p-1 rounded-full flex border border-slate-100">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  isLogin
                    ? "bg-white shadow-sm text-[#0f172a]"
                    : "text-slate-400"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  !isLogin
                    ? "bg-white shadow-sm text-[#0f172a]"
                    : "text-slate-400"
                }`}
              >
                Join
              </button>
            </div>
          </div>

          {/* title */}
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#0f172a] uppercase">
              {isLogin ? "Welcome back" : "Get Started"}
            </h1>
            <p className="text-slate-400 text-sm">
              {isLogin
                ? "Continue your path to Europe."
                : "Create your career profile in minutes."}
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleAuth} className="space-y-5">
            
            {/* name */}
            <AnimatePresence>
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* email */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">
                Email
              </label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl"
                />
              </div>
            </div>

            {/* password */}
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase mb-2 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-10 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-bold text-xs uppercase flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Authenticate" : "Register"}
                  <LogIn size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex flex-1 bg-[#0f172a] items-center justify-center p-12">
          <div className="text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Your future starts here</h2>
            <p className="text-sm text-white/60">
              Verified jobs. Smart CV. Faster hiring.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}