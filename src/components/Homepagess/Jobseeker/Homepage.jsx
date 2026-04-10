import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronRight, Star, Bookmark, CheckCircle2, 
  ChevronDown, X, Search, Loader2,
  Filter, ArrowUpDown
} from "lucide-react";

const ProviderCard = ({ provider }) => (
  <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white border border-slate-200 rounded-sm p-6 transition-all hover:shadow-xl hover:border-blue-400 group flex flex-col h-full"
  >
    <div className="flex items-start justify-between mb-5">
      <div className="w-20 h-20 bg-white border border-slate-100 flex-shrink-0 flex items-center justify-center p-3 rounded-sm shadow-sm">
        <img src={provider.logo} alt={provider.name} className="w-full h-full object-contain" />
      </div>
      <button className="text-slate-300 hover:text-blue-600 transition-colors p-1">
        <Bookmark size={22} />
      </button>
    </div>

    <div className="flex-1">
      <h3 className="font-extrabold text-[19px] text-[#002b5c] mb-2 group-hover:text-[#0062ff] transition-colors cursor-pointer leading-tight font-poppins">
        {provider.name}
      </h3>
      
      <div className="flex items-center gap-2 mb-4 font-inter">
        <div className="flex items-center text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} className={i < Math.floor(provider.rating) ? "fill-yellow-400" : "text-slate-200"} />
          ))}
        </div>
        <span className="text-[14px] font-bold text-[#002b5c]">{provider.rating}</span>
        <span className="text-[14px] text-slate-400">({provider.reviews})</span>
      </div>

      <p className="text-[14px] text-slate-600 leading-relaxed mb-6 line-clamp-3 font-inter">
        {provider.description}
      </p>
    </div>

    <div className="pt-6 border-t border-slate-100 flex items-center justify-between font-poppins">
      <div className="flex items-center gap-2">
        <CheckCircle2 size={16} className="text-green-600" />
        <span className="text-[10px] font-bold text-[#002b5c] uppercase tracking-widest">Trusted Partner</span>
      </div>
      <button className="text-[13px] font-bold text-[#0062ff] flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-tight">
        View details <ChevronRight size={18} />
      </button>
    </div>
  </motion.div>
);

export default function EResidencyMarketplace() {
  // Increased initial visibility to 20
  const [visibleItems, setVisibleItems] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [openCategory, setOpenCategory] = useState("Company establishment");

  const categories = [
    { name: "Company establishment", count: 42, sub: ["Company formation", "Legal address & contact person", "Relocation advisory"] },
    { name: "Business banking", count: 18, sub: ["Banking accounts", "Payment gateways", "Card services"] },
    { name: "Tax & accounting", count: 35, sub: ["Monthly bookkeeping", "Annual reports", "Tax consulting"] },
    { name: "Legal advisory", count: 12, sub: ["Contract drafting", "GDPR compliance", "IP protection"] }
  ];

  // Generated 25+ Providers with realistic logos and data
  const providers = Array.from({ length: 25 }).map((_, i) => {
    const names = [
      "Xolo", "E-Residency Hub", "Unicount", "1Office", "Enty", "Magrat", "Sunny Business", 
      "Silva Hunt", "LeapIN", "B2B Baltics", "Magrat OÜ", "Companio", "Nordic Consult", 
      "GrouHub", "Estx", "Dalanta", "TuneUp", "Incorporate", "Deel", "Remote", "FirstBase",
      "Stripe Atlas", "Clerky", "Founders"
    ];
    const domains = [
      "xolo.io", "erhub.com", "unicount.eu", "1office.co", "enty.io", "magrat.eu", "sunny.ee",
      "silvahunt.ee", "leapin.eu", "b2baltics.eu", "magrat.eu", "companio.co", "nordic.ee",
      "grouhub.com", "estx.io", "dalanta.ee", "tuneup.ee", "incorporate.ee", "deel.com", "remote.com",
      "firstbase.io", "stripe.com", "clerky.com", "founders.co"
    ];
    
    return {
      id: i,
      name: names[i % names.length],
      logo: `https://logo.clearbit.com/${domains[i % domains.length]}`,
      rating: (4.4 + Math.random() * 0.6).toFixed(1),
      reviews: Math.floor(Math.random() * 400 + 20),
      description: "Comprehensive professional services for digital nomads and global entrepreneurs. We handle the bureaucracy so you can focus on growing your business from anywhere in the world."
    };
  });

  return (
    <div className="bg-[#f9fafb] text-slate-900 antialiased min-h-screen pb-20">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700;800;900&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-inter { font-family: 'Inter', sans-serif; }
      ` }} />
      
    
      {/* 2. HEADER */}
      <header className="bg-white border-b border-slate-200 pt-10 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <nav className="flex items-center gap-2 text-[11px] font-bold text-[#0062ff] uppercase tracking-[0.2em] mb-10 font-poppins">
            <span className="cursor-pointer hover:underline">Marketplace</span>
            <ChevronRight size={14} className="text-slate-300" />
            <span className="text-slate-400">Service providers</span>
          </nav>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
            <div className="max-w-3xl">
              <h1 className="text-[44px] md:text-[52px] font-black text-[#002b5c] mb-6 tracking-tighter leading-[1] font-poppins uppercase">
                Service providers
              </h1>
              <p className="text-slate-500 text-[18px] font-medium max-w-2xl leading-relaxed font-inter">
                Connect with vetted partners to establish, manage and scale your Estonian company with complete peace of mind.
              </p>
            </div>
            
            <div className="w-full lg:w-[480px] font-inter">
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Search for providers, services..." 
                  className="w-full bg-white border-2 border-slate-200 rounded-sm px-6 py-5 outline-none focus:border-[#0062ff] transition-all text-[16px] font-medium shadow-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#0062ff] p-3 rounded-sm text-white cursor-pointer hover:bg-[#002b5c] transition-colors">
                  <Search size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-[1440px] mx-auto px-6 md:px-12 py-12">
        
        {/* 3. TABS BAR */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 font-poppins">
          <div className="flex bg-white border border-slate-200 p-1 rounded-sm shadow-sm self-start">
            <button className="bg-[#002b5c] text-white px-8 py-3 rounded-sm text-[14px] font-bold uppercase tracking-wider">Providers ({providers.length})</button>
            <button className="text-slate-500 px-8 py-3 rounded-sm text-[14px] font-bold uppercase tracking-wider hover:bg-slate-50">Packages (70)</button>
          </div>

          <div className="flex items-center gap-3">
            {["Company type", "Industry", "Language"].map(f => (
              <button key={f} className="bg-white border border-slate-200 px-5 py-3 rounded-sm text-[12px] font-bold text-[#002b5c] flex items-center gap-3 hover:border-[#0062ff] transition-all uppercase tracking-tight">
                {f} <ChevronDown size={14} />
              </button>
            ))}
            <button className="bg-white border border-slate-200 px-5 py-3 rounded-sm text-[12px] font-bold text-[#002b5c] flex items-center gap-3 hover:border-[#0062ff] uppercase tracking-tight">
              Sort by <ArrowUpDown size={14} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* 4. SIDEBAR FILTER */}
          <aside className="w-full lg:w-[300px] shrink-0 font-poppins">
            <div className="sticky top-28">
              <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-slate-200">
                <span className="text-[16px] font-black text-[#002b5c] uppercase tracking-tight flex items-center gap-2">
                  <Filter size={18} /> Filters
                </span>
                <button className="text-[12px] font-bold text-[#0062ff] underline hover:text-[#002b5c]">Clear all</button>
              </div>

              <div className="space-y-3">
                {categories.map((cat, i) => (
                  <div key={i} className={`bg-white border transition-all rounded-sm ${openCategory === cat.name ? 'border-[#0062ff] shadow-md' : 'border-slate-200'}`}>
                    <button 
                      onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
                      className="w-full flex items-center justify-between p-5 text-[14px] font-bold text-[#002b5c] uppercase tracking-tight"
                    >
                      <span className="flex items-center gap-2">{cat.name} <span className="text-slate-300 font-normal">({cat.count})</span></span>
                      <ChevronDown size={18} className={`transition-transform duration-300 ${openCategory === cat.name ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {openCategory === cat.name && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="px-5 pb-6 space-y-5 overflow-hidden font-inter"
                        >
                          {cat.sub.map((s, idx) => (
                            <label key={idx} className="flex items-start gap-4 cursor-pointer group">
                               <input type="checkbox" defaultChecked={idx === 1} className="mt-1 w-5 h-5 accent-[#0062ff] rounded-sm" />
                               <span className={`text-[14px] leading-tight ${idx === 1 ? 'text-[#0062ff] font-bold' : 'text-slate-600 group-hover:text-blue-600'}`}>{s}</span>
                            </label>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* 5. RESULTS GRID AREA */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-10 font-poppins">
               <span className="text-[14px] font-bold text-slate-500 mr-2 uppercase tracking-tight">{providers.length} Results for:</span>
               <div className="bg-blue-50 text-[#0062ff] px-4 py-2 rounded-sm text-[12px] font-bold flex items-center gap-3 border border-blue-100 shadow-sm uppercase tracking-tight">
                 Legal address & contact person <X size={16} className="cursor-pointer" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
              {providers.slice(0, visibleItems).map(p => (
                <ProviderCard key={p.id} provider={p} />
              ))}
            </div>

            {/* 6. LOAD MORE BUTTON (HIDDEN IF ALL ITEMS SHOWN) */}
            {visibleItems < providers.length && (
              <div className="mt-20 flex flex-col items-center gap-12 font-poppins">
                <button 
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => { setVisibleItems(v => v + 9); setIsLoading(false); }, 1000);
                  }}
                  disabled={isLoading}
                  className="group relative bg-white border-2 border-[#002b5c] text-[#002b5c] px-16 py-5 rounded-sm font-black text-[16px] overflow-hidden transition-all hover:text-white disabled:opacity-50"
                >
                  <span className="relative z-10 flex items-center gap-4 uppercase tracking-[0.25em]">
                    {isLoading ? <Loader2 size={22} className="animate-spin" /> : "Load more"}
                  </span>
                  <div className="absolute inset-0 bg-[#002b5c] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

  
    </div>
  );
}