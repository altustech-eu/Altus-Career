import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, Globe, Loader2, Users, Briefcase, History, MapPin } from "lucide-react";

// --- INFINITE LOGO SCROLLER (AC-IMAGE-UI) ---
const TrustedBySection = () => {
  const stats = [
    { label: "Clients Served", value: "30,000+", icon: Users },
    { label: "Talent Hired", value: "85,000+", icon: Briefcase },
    { label: "Years in Business", value: "15+", icon: History },
    { label: "Countries Served", value: "140+", icon: MapPin },
  ];

  const logos = [
    { name: "Precision", img: "https://images.unsplash.com/photo-1560177112-fbfd5fde9566?w=400&q=80" },
    { name: "Zoetis", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80" },
    { name: "Corpay", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80" },
    { name: "Bridgestone", img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=400&q=80" },
    { name: "Big Sur AI", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80" },
    { name: "Kamylon", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80" },
  ];

  return (
    <section className="bg-[#001d3d] py-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#0062ff] blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        <div className="border-t border-white/20 pt-10 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div className="max-w-2xl">
            <span className="text-[#0062ff] text-[10px] font-semibold uppercase tracking-[0.3em] font-poppins block mb-4">Client Case Studies</span>
            <h2 className="text-white text-3xl md:text-5xl font-bold font-poppins tracking-tight leading-tight uppercase">
              Trusted by Leading <br /> Companies Around the World
            </h2>
          </div>
          <p className="text-slate-400 font-inter text-sm max-w-sm leading-relaxed font-normal">
            From Fortune 500 enterprises to fast-growing startups, we deliver exceptional results at scale.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-y border-white/10 py-12 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center md:items-start border-r last:border-0 border-white/10">
              <span className="text-slate-500 text-[10px] font-semibold uppercase tracking-widest mb-2 font-poppins">{stat.label}</span>
              <span className="text-white text-3xl font-semibold font-poppins">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-6 overflow-hidden select-none">
        <motion.div 
          animate={{ x: [0, -1920] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="flex gap-6 shrink-0"
        >
          {[...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="w-72 h-96 relative rounded-sm overflow-hidden border border-white/10 group cursor-pointer">
              <img src={logo.img} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={logo.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <span className="text-white font-medium uppercase tracking-widest text-xs font-poppins">{logo.name}</span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const DestinationCard = ({ country }) => (
  <motion.div
    layout
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -10 }}
    className="group relative bg-white border border-slate-200 rounded-sm overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
  >
    <div className="h-56 overflow-hidden relative">
      <img src={country.image} alt={country.name} className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#002b5c]/90 via-transparent to-transparent" />
      <div className="absolute bottom-4 left-5">
        <h3 className="text-white text-xl font-bold font-poppins uppercase tracking-tight">{country.name}</h3>
      </div>
    </div>

    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col">
          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-poppins">Intakes</span>
          <span className="text-[13px] font-semibold text-[#002b5c] font-inter">{country.intake}</span>
        </div>
        <div className="w-px h-6 bg-slate-100" />
        <div className="flex flex-col text-right">
          <span className="text-[9px] font-semibold text-slate-400 uppercase tracking-widest font-poppins">Post-Study</span>
          <span className="text-[13px] font-semibold text-[#0062ff] font-inter">{country.psw}</span>
        </div>
      </div>
      <button className="w-full py-2.5 bg-slate-50 group-hover:bg-[#002b5c] group-hover:text-white text-[#002b5c] font-bold text-[10px] uppercase tracking-[0.2em] transition-all font-poppins border border-slate-100">
        View Universities
      </button>
    </div>
  </motion.div>
);

export default function StudyAbroadPage() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);

  const allDestinations = [
    { name: "Germany", intake: "Sept / March", psw: "18 Months", image: "https://images.unsplash.com/photo-1467226632440-65f0b4957563?w=600" },
    { name: "United Kingdom", intake: "Sept / Jan", psw: "2 Years", image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600" },
    { name: "Canada", intake: "Jan / May / Sept", psw: "3 Years", image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600" },
    { name: "Ireland", intake: "Sept / Feb", psw: "2 Years", image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?w=600" },
    { name: "USA", intake: "Jan / Aug", psw: "1-3 Years", image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=600" },
    { name: "Australia", intake: "Feb / July", psw: "2-4 Years", image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=600" },
    { name: "France", intake: "Sept / Jan", psw: "2 Years", image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600" },
    { name: "Netherlands", intake: "Sept / Feb", psw: "1 Year", image: "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=600" },
  ];

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      ` }} />

      <TrustedBySection />

      <section className="bg-white border-b border-slate-200 pt-16 pb-20 font-inter">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 border border-blue-100 text-[#0062ff] rounded-sm mb-6">
                <Globe size={14} strokeWidth={2} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] font-poppins">Global Campus Network</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-[#002b5c] leading-tight tracking-tight mb-8 font-poppins uppercase">
                Dream Big. <br /> <span className="text-[#0062ff]">Study Anywhere.</span>
              </h1>
              <p className="text-lg text-slate-500 font-normal font-inter max-w-xl leading-relaxed mb-10">
                End-to-end support for international admissions in 20+ countries.
              </p>
              <div className="flex flex-col md:flex-row gap-0 max-w-2xl shadow-xl">
                <div className="flex-1 flex items-center bg-white border-2 border-slate-200 p-4 focus-within:border-[#0062ff] transition-all">
                  <Search className="text-slate-300 mr-3" size={20} />
                  <input type="text" placeholder="Where do you want to study?" className="w-full outline-none font-inter text-base font-normal" />
                </div>
                <button className="bg-[#002b5c] text-white px-8 py-4 font-semibold uppercase tracking-[0.2em] font-poppins hover:bg-[#0062ff] transition-all">Search</button>
              </div>
            </div>
            <div className="lg:col-span-5 hidden lg:flex justify-center">
              <motion.div initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }} className="relative">
                <img src="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=700" alt="Student" className="relative w-[420px] rounded-2xl shadow-2xl object-cover" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 font-inter">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="border-l-4 border-[#0062ff] pl-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#002b5c] tracking-tight uppercase leading-none font-poppins mb-2">Explore Destinations</h2>
            <p className="text-slate-400 font-normal font-inter text-base">Select your country to see intake dates and post-study rights.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {allDestinations.slice(0, visibleCount).map((dest, i) => (
            <DestinationCard key={i} country={dest} />
          ))}
        </div>

        {visibleCount < allDestinations.length && (
          <div className="mt-20 flex justify-center">
            <button onClick={handleLoadMore} className="group relative bg-white border-2 border-[#002b5c] text-[#002b5c] px-12 py-4 rounded-sm font-semibold transition-all hover:text-white">
              <span className="relative z-10 flex items-center gap-3 uppercase tracking-[0.2em] font-poppins text-xs">
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : "Explore More Countries"}
              </span>
              <div className="absolute inset-0 bg-[#002b5c] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}