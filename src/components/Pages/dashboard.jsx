import React, { useState } from "react";
import { motion,} from "framer-motion";
import { 
  Search, Bell, Settings, Grid, Plus, 
  ChevronRight, ChevronLeft,
  FileText, Globe, Layout, 
  CheckCircle2, TrendingUp, MoreVertical
} from "lucide-react";

// --- SUB-COMPONENTS ---

const StatCard = ({ label, value, subtext, progress, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex-1 min-w-[200px]"
  >
    <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider mb-2">{label}</p>
    <div className="flex items-end gap-2 mb-4">
      <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
      <span className="text-xs text-gray-500 mb-1 font-medium">{subtext}</span>
    </div>
    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className={`h-full ${color}`}
      />
    </div>
  </motion.div>
);

export default function Dashboard() {
  // --- STATE MANAGEMENT ---
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [notificationCount, setNotificationCount] = useState(3);
  
  const navItems = ["Dashboard", "People", "Hiring", "Salary", "Calendar"];
  
  const applications = [
    { id: 1, company: "BMW Group", role: "Mechatronics", status: "Interview", stipend: "€1,100", color: "text-blue-500 bg-blue-50" },
    { id: 2, company: "SAP SE", role: "Software Developer", status: "Pending", stipend: "€1,250", color: "text-orange-500 bg-orange-50" },
    { id: 3, company: "Siemens AG", role: "IT Specialist", status: "Accepted", stipend: "€980", color: "text-emerald-500 bg-emerald-50" },
  ];

  // --- HANDLERS ---
  const handleAction = (type) => alert(`${type} clicked! In a real app, this would trigger a route or API call.`);

  return (
    <div className="w-full min-h-screen bg-[#F8F9FB] text-gray-800 font-inter flex flex-col">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@500;600;700&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
      ` }} />

      {/* --- TOP GLOBAL NAVIGATION --- */}
      <header className="w-full bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleAction("Home")}>
          <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg">
            <Layout className="text-white" size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight font-poppins">AltusPortal</span>
        </div>

        <nav className="hidden lg:flex items-center gap-1 bg-gray-50 p-1.5 rounded-full border border-gray-100">
          {navItems.map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveNav(tab)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                activeNav === tab ? 'bg-black text-white shadow-md' : 'text-gray-400 hover:text-black hover:bg-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative group">
            <button 
                onClick={() => setNotificationCount(0)}
                className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-black hover:bg-gray-100 transition-all relative"
            >
              <Bell size={20} />
              {notificationCount > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                  {notificationCount}
                </span>
              )}
            </button>
          </div>
          <button onClick={() => handleAction("Settings")} className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-black transition-all">
            <Settings size={20} />
          </button>
          <div className="w-px h-8 bg-gray-200 mx-2" />
          <div className="flex items-center gap-3 pl-2 cursor-pointer group" onClick={() => handleAction("Profile")}>
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold leading-none">Marcus H.</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Pro Member</p>
            </div>
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-11 h-11 rounded-2xl object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform" alt="User" />
          </div>
        </div>
      </header>

      {/* --- MAIN BODY --- */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* LEFT COLUMN: Main Dashboard */}
        <main className="flex-1 overflow-y-auto p-8 no-scrollbar">
          
          {/* WELCOME BANNER */}
          <section className="mb-10">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 font-poppins">Hello Marcus,</h1>
                    <p className="text-gray-500 mt-2 font-medium">Here's what's happening with your German applications today.</p>
                </div>
                <button onClick={() => handleAction("Add New")} className="bg-[#003fa3] text-white px-6 py-4 rounded-[20px] font-bold text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-black transition-all shadow-xl shadow-blue-100">
                    <Plus size={18} /> New Application
                </button>
            </div>

            <div className="flex flex-wrap gap-6">
              <StatCard label="Applied" value="24" subtext="Pathways" progress={85} color="bg-black" />
              <StatCard label="Interviews" value="08" subtext="Qualified" progress={60} color="bg-yellow-400" />
              <StatCard label="Success" value="82%" subtext="Rate" progress={82} color="bg-emerald-500" />
            </div>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* SCHEDULE WIDGET */}
            <section className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold font-poppins">Schedule</h3>
                <div className="flex items-center gap-4">
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20}/></button>
                    <span className="text-sm font-bold uppercase tracking-widest text-gray-400">April 2025</span>
                    <button className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20}/></button>
                </div>
              </div>
              
              <div className="flex justify-between mb-10 overflow-x-auto pb-4 gap-4 no-scrollbar">
                {[22, 23, 24, 25, 26, 27, 28].map((day, i) => (
                  <div key={day} className="flex flex-col items-center min-w-[50px] gap-3">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                    </span>
                    <button className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all ${day === 25 ? 'bg-yellow-400 text-black shadow-lg scale-110' : 'bg-gray-50 text-gray-400 hover:bg-gray-100'}`}>
                      {day}
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex gap-6 items-start relative pl-8 border-l-2 border-gray-100 group">
                   <div className="absolute left-[-6px] top-1.5 w-3 h-3 rounded-full bg-yellow-400 border-2 border-white outline outline-4 outline-yellow-100 opacity-0 group-hover:opacity-100 transition-opacity" />
                   <span className="text-xs font-bold text-gray-400 w-16 pt-1">09:00 AM</span>
                   <div className="flex-1 bg-black text-white p-5 rounded-[24px] shadow-lg hover:translate-x-2 transition-transform cursor-pointer">
                      <p className="text-sm font-bold mb-1">Interview: SAP Berlin</p>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest">Final Technical Round</p>
                   </div>
                </div>
              </div>
            </section>

            {/* APPLICATIONS TABLE */}
            <section className="bg-white p-8 rounded-[40px] shadow-sm border border-gray-50 overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold font-poppins">Recent Activity</h3>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-12 pr-6 py-3 bg-gray-50 rounded-full text-xs font-medium outline-none focus:ring-2 ring-blue-500/20 w-48 transition-all" 
                        placeholder="Filter list..." 
                    />
                  </div>
               </div>

               <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead className="text-[10px] text-gray-400 uppercase font-black tracking-[0.1em]">
                       <tr>
                         <th className="pb-6">Company</th>
                         <th className="pb-6">Status</th>
                         <th className="pb-6 text-right">Action</th>
                       </tr>
                    </thead>
                    <tbody className="text-sm">
                       {applications.filter(app => app.company.toLowerCase().includes(searchQuery.toLowerCase())).map((app) => (
                         <tr key={app.id} className="border-t border-gray-50 group">
                           <td className="py-6">
                              <p className="font-bold text-gray-900">{app.company}</p>
                              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">{app.role}</p>
                           </td>
                           <td className="py-6">
                              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${app.color}`}>
                                {app.status}
                              </span>
                           </td>
                           <td className="py-6 text-right">
                              <button onClick={() => handleAction(`Edit ${app.company}`)} className="p-2 text-gray-300 hover:text-black transition-colors">
                                 <MoreVertical size={18} />
                              </button>
                           </td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
               </div>
            </section>
          </div>
        </main>

        {/* RIGHT COLUMN: Sidebar (Amélie Laurent Style) */}
        <aside className="w-[350px] bg-white border-l border-gray-100 p-10 flex flex-col hidden xl:flex overflow-y-auto no-scrollbar">
           <div className="text-center mb-10">
              <div className="relative inline-block mb-6">
                <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200" className="w-24 h-24 rounded-[32px] object-cover border-4 border-gray-50 shadow-xl" alt="profile"/>
                <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-500 rounded-2xl border-4 border-white flex items-center justify-center">
                    <CheckCircle2 className="text-white" size={14} />
                </div>
              </div>
              <h2 className="text-2xl font-bold font-poppins">Amélie Laurent</h2>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">UX Designer Candidate</p>
           </div>

           <div className="space-y-8 flex-1">
              <div className="bg-gray-50/50 p-6 rounded-[32px] border border-gray-100">
                <h4 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-[0.2em]">Key Information</h4>
                <ul className="space-y-4 text-xs font-semibold">
                   <li className="flex justify-between items-center"><span className="text-gray-400 font-medium">Status</span><span className="text-blue-600">Active Search</span></li>
                   <li className="flex justify-between items-center"><span className="text-gray-400 font-medium">Target</span><span>Berlin, DE</span></li>
                   <li className="flex justify-between items-center"><span className="text-gray-400 font-medium">Salary Range</span><span>€45k - €55k</span></li>
                </ul>
              </div>

              <div>
                <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em]">Vault Documents</h4>
                    <button className="p-1.5 bg-gray-100 rounded-lg text-gray-600 hover:bg-black hover:text-white transition-all"><Plus size={14}/></button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <button onClick={() => handleAction("Download Resume")} className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col items-center gap-2 hover:border-blue-500 transition-all shadow-sm">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500"><FileText size={20}/></div>
                      <span className="text-[10px] font-black uppercase">Resume</span>
                   </button>
                   <button onClick={() => handleAction("Download Visa")} className="bg-white p-4 rounded-3xl border border-gray-100 flex flex-col items-center gap-2 hover:border-orange-500 transition-all shadow-sm">
                      <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500"><Globe size={20}/></div>
                      <span className="text-[10px] font-black uppercase">Visa Doc</span>
                   </button>
                </div>
              </div>

              <div className="bg-black text-white p-8 rounded-[40px] relative overflow-hidden group cursor-pointer mt-auto">
                 <div className="relative z-10">
                    <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center mb-4">
                        <TrendingUp size={20} className="text-black" />
                    </div>
                    <h4 className="text-lg font-bold mb-2 font-poppins">Unlock Expert Support</h4>
                    <p className="text-xs text-gray-400 leading-relaxed font-medium">Get connected with 1-on-1 interview mentors in Germany.</p>
                    <button onClick={() => handleAction("Upgrade")} className="mt-6 w-full bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-yellow-400 transition-all">Go Premium</button>
                 </div>
                 <Grid className="absolute top-[-20px] right-[-20px] text-white/5 group-hover:text-white/10 transition-all duration-500" size={150} />
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
}