import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Chrome, Github, UserPlus, LogIn, CheckCircle2, ArrowLeft } from "lucide-react";
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
      navigate("/dashboard");
    }, 1500);
  };

  // Smooth spring transition constant
  const smoothSpring = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-inter selection:bg-blue-100">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
      ` }} />

      {/* BACK TO HOME BUTTON */}
      <Link 
        to="/" 
        className="fixed top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-[#0f172a] transition-all group z-50"
      >
        <div className="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest">Back to Home</span>
      </Link>

      <motion.div 
        layout
        transition={smoothSpring}
        className="max-w-[1000px] w-full bg-white rounded-[40px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row min-h-[680px] border border-slate-100"
      >
        
        {/* LEFT SIDE: AUTH FORM */}
        <div className="flex-[1.1] p-8 md:p-14 flex flex-col justify-center relative bg-white">
          
          <div className="mb-10 flex justify-between items-center">
             <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#0f172a] rounded-lg flex items-center justify-center shadow-lg">
                    <span className="text-white font-black text-xs italic">A</span>
                </div>
                <span className="text-lg font-black tracking-tighter text-[#0f172a]">ALTUS.</span>
             </div>
             
             {/* COMPACT TOGGLE PILL */}
             <div className="bg-slate-50 p-1 rounded-full flex border border-slate-100">
                <button 
                    onClick={() => setIsLogin(true)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${isLogin ? 'bg-white shadow-sm text-[#0f172a]' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Login
                </button>
                <button 
                    onClick={() => setIsLogin(false)}
                    className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${!isLogin ? 'bg-white shadow-sm text-[#0f172a]' : 'text-slate-400 hover:text-slate-600'}`}
                >
                    Join
                </button>
             </div>
          </div>

          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[#0f172a] tracking-tight mb-2 uppercase">
              {isLogin ? "Welcome back" : "Get Started"}
            </h1>
            <p className="text-slate-400 text-sm font-medium">
              {isLogin ? "Continue your path to Europe." : "Create your career profile in minutes."}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block px-1">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full px-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/10 focus:bg-white transition-all text-slate-900 text-sm" />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block px-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                <input type="email" required placeholder="name@company.com" className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/10 focus:bg-white transition-all text-slate-900 text-sm font-medium" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2 px-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Password</label>
                {isLogin && <a href="/" className="text-[10px] font-bold text-blue-500 hover:text-blue-700">Forgot?</a>}
              </div>
              <div className="relative group">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition-colors" size={16} />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required placeholder="••••••••" 
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:ring-2 ring-blue-500/10 focus:bg-white transition-all text-slate-900 text-sm font-medium" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full py-4 bg-[#0f172a] text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-black transition-all shadow-xl shadow-slate-100 mt-6"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {isLogin ? "Authenticate" : "Register"}
                  <LogIn size={16} />
                </>
              )}
            </motion.button>
          </form>

          {/* SOCIAL LOGIN */}
          <div className="mt-10">
            <div className="flex items-center gap-4 mb-8 text-slate-200">
              <div className="h-[1px] bg-slate-100 flex-1" />
              <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300 px-2">Social Auth</span>
              <div className="h-[1px] bg-slate-100 flex-1" />
            </div>
            <div className="flex gap-4">
               <button className="flex-1 py-3 border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <Chrome size={14} className="text-blue-500" /> Google
               </button>
               <button className="flex-1 py-3 border border-slate-100 rounded-xl flex items-center justify-center gap-2 text-[11px] font-bold text-slate-600 hover:bg-slate-50 transition-all">
                  <Github size={14} /> Github
               </button>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: PREMIUM VISUAL SIDEBAR */}
        <div className="hidden md:flex flex-1 bg-[#0f172a] relative overflow-hidden items-center justify-center p-12">
          {/* Subtle Dynamic Gradients */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 w-full max-w-sm">
            <div className="mb-12">
              <span className="text-blue-500 font-bold uppercase tracking-[0.4em] text-[9px] mb-6 block">
                Verification Hub
              </span>
              <h2 className="text-white text-4xl font-light leading-tight mb-8">
                Your future <br /> <span className="font-bold">Starts here.</span>
              </h2>
              <div className="space-y-5">
                {[
                  "Verified Employer Matching",
                  "Digital Visa Documentation",
                  "EU Standard CV Builder"
                ].map((text, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    key={i} 
                    className="flex items-center gap-3 text-white/70 font-medium text-sm"
                  >
                    <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center">
                        <CheckCircle2 size={14} className="text-blue-500" />
                    </div>
                    {text}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Float Card - Smooth Flow */}
            <motion.div 
              initial={{ y: 30, opacity: 0 }} 
              animate={{ y: 0, opacity: 1 }} 
              transition={{ delay: 0.5, type: "spring" }}
              className="bg-white/5 border border-white/10 backdrop-blur-xl p-6 rounded-3xl flex flex-col gap-4 shadow-2xl"
            >
              <p className="text-white/80 text-xs leading-relaxed font-medium">
                "The CV optimization tool alone helped me land 3 interviews with Stuttgart firms in one week."
              </p>
              <div className="flex items-center gap-3">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-9 h-9 rounded-xl object-cover border border-white/20" alt="avatar" />
                <div>
                  <p className="text-white text-xs font-bold">Adam Ivansky</p>
                  <p className="text-white/30 text-[9px] font-bold uppercase tracking-wider">Cloud Dev @ SAP</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}