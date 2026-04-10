import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search,ChevronRight, ArrowRight, 
  CheckCircle2, Globe, GraduationCap, Laptop, 
  HeartPulse, Car, Building2, Utensils,
  MapPin, Briefcase,Building, X,
  Filter as FilterIcon, BellRing, Hammer, 
  Camera, Plane, HardHat, Microscope, Landmark, Zap
} from "lucide-react";

// --- STATIC DATA OUTSIDE COMPONENT TO PREVENT RE-RENDERS ---
const sectorsData = [
  { title: "Registered Nurse", type: "Medical", description: "General healthcare and patient management in German hospitals.", icon: <HeartPulse size={22} />, loc: "Berlin" },
  { title: "Mechatronics Technician", type: "Technical", description: "Combining mechanics, electronics and computing for automation.", icon: <Hammer size={22} />, loc: "Munich" },
  { title: "IT Specialist (Dev)", type: "Technical", description: "Focus on software development and application architecture.", icon: <Laptop size={22} />, loc: "Hamburg" },
  { title: "Hotel Manager", type: "Commercial", description: "Front office and hospitality management in 5-star chains.", icon: <Utensils size={22} />, loc: "Frankfurt" },
  { title: "Automotive Electrician", type: "Technical", description: "Specializing in EV technology and high-voltage systems.", icon: <Car size={22} />, loc: "Stuttgart" },
  { title: "Industrial Clerk", type: "Commercial", description: "Business processes, logistics, and supply chain management.", icon: <Building size={22} />, loc: "Düsseldorf" },
  { title: "Aviation Technician", type: "Technical", description: "Maintenance and repair of commercial aircraft systems.", icon: <Plane size={22} />, loc: "Hamburg" },
  { title: "Physiotherapist", type: "Medical", description: "Physical rehabilitation and movement therapy specialists.", icon: <HeartPulse size={22} />, loc: "Cologne" },
  { title: "Bank Clerk", type: "Commercial", description: "Financial services, investment consulting, and private banking.", icon: <Landmark size={22} />, loc: "Frankfurt" },
  { title: "Civil Engineer Assistant", type: "Technical", description: "Supporting structural planning and construction management.", icon: <Building2 size={22} />, loc: "Leipzig" },
  { title: "Digital Media Designer", type: "Creative", description: "Layout, web design, and digital content production.", icon: <Camera size={22} />, loc: "Berlin" },
  { title: "Chemistry Lab Tech", type: "Technical", description: "Conducting tests and analyzing chemical substances in labs.", icon: <Microscope size={22} />, loc: "Leverkusen" },
  { title: "Logistics Specialist", type: "Commercial", description: "Warehouse management and global shipping coordination.", icon: <Globe size={22} />, loc: "Bremen" },
  { title: "Bricklayer Specialist", type: "Construction", description: "Traditional and modern masonry for residential buildings.", icon: <HardHat size={22} />, loc: "Dresden" },
  { title: "Electronics for Energy", type: "Technical", description: "Infrastructure wiring and renewable energy system installation.", icon: <Zap size={22} />, loc: "Nuremberg" },
  { title: "Dental Assistant", type: "Medical", description: "Supporting dental procedures and patient organization.", icon: <HeartPulse size={22} />, loc: "Essen" },
  { title: "Ecommerce Manager", type: "Commercial", description: "Managing online sales platforms and digital marketing.", icon: <Laptop size={22} />, loc: "Berlin" },
  { title: "Carpentry Specialist", type: "Technical", description: "Crafting wood structures and interior fittings.", icon: <Hammer size={22} />, loc: "Freiburg" },
  { title: "Public Admin Clerk", type: "Commercial", description: "Working in government offices and municipal services.", icon: <Landmark size={22} />, loc: "Bonn" },
  { title: "Paramedic Assistant", type: "Medical", description: "Emergency response and basic life support services.", icon: <HeartPulse size={22} />, loc: "Dortmund" },
  { title: "Metal Technology Tech", type: "Technical", description: "Precision machining and metal component manufacturing.", icon: <Hammer size={22} />, loc: "Wolfsburg" },
  { title: "Marketing Comm. Clerk", type: "Commercial", description: "Planning advertising campaigns and PR activities.", icon: <Camera size={22} />, loc: "Munich" },
  { title: "Interior Decorator", type: "Creative", description: "Spatial planning and aesthetic design for interiors.", icon: <Building2 size={22} />, loc: "Berlin" },
  { title: "Radiology Assistant", type: "Medical", description: "Operating imaging equipment like MRI and CT scanners.", icon: <Microscope size={22} />, loc: "Heidelberg" },
  { title: "Insurance Specialist", type: "Commercial", description: "Risk assessment and insurance policy management.", icon: <Landmark size={22} />, loc: "Munich" },
  { title: "Systems Integration IT", type: "Technical", description: "Network infrastructure and hardware management.", icon: <Laptop size={22} />, loc: "Karlsruhe" },
  { title: "Ship Mechanic", type: "Technical", description: "Managing engine rooms and mechanical systems on ships.", icon: <Plane size={22} />, loc: "Rostock" },
  { title: "Optician Specialist", type: "Medical", description: "Vision testing and fitting of corrective lenses.", icon: <Microscope size={22} />, loc: "Jena" },
  { title: "Tool Mechanic", type: "Technical", description: "Creating precision molds and cutting tools.", icon: <Hammer size={22} />, loc: "Solingen" },
  { title: "Travel Consultant", type: "Commercial", description: "Planning global travel itineraries and tourism packages.", icon: <Globe size={22} />, loc: "Düsseldorf" },
  { title: "Wholesale Trader", type: "Commercial", description: "Managing large scale B2B purchase and sales operations.", icon: <Briefcase size={22} />, loc: "Hamburg" },
  { title: "Surgical Assistant", type: "Medical", description: "Preparing operating theaters and assisting surgeons.", icon: <HeartPulse size={22} />, loc: "Ulm" },
  { title: "Roofing Specialist", type: "Construction", description: "Installing and repairing roof structures and insulation.", icon: <HardHat size={22} />, loc: "Kiel" },
  { title: "Social Security Clerk", type: "Commercial", description: "Managing health and pension insurance claims.", icon: <Landmark size={22} />, loc: "Berlin" },
  { title: "Plant Mechanic", type: "Technical", description: "Industrial pipework and large scale heating systems.", icon: <Building2 size={22} />, loc: "Mannheim" },
  { title: "Chef de Cuisine", type: "Commercial", description: "Professional culinary arts and kitchen management.", icon: <Utensils size={22} />, loc: "Munich" },
  { title: "Technical Product Designer", type: "Technical", description: "Creating CAD models and technical documentation.", icon: <Laptop size={22} />, loc: "Stuttgart" },
  { title: "Legal Assistant", type: "Commercial", description: "Support for lawyers and legal documentation management.", icon: <Landmark size={22} />, loc: "Frankfurt" },
  { title: "Pharmacy Tech", type: "Medical", description: "Dispensing medication and advising lab customers.", icon: <Microscope size={22} />, loc: "Aachen" },
  { title: "Event Manager", type: "Commercial", description: "Organizing trade fairs, concerts and corporate events.", icon: <Camera size={22} />, loc: "Cologne" },
  { title: "Information Electronics", type: "Technical", description: "Repairs for high-tech communication equipment.", icon: <Zap size={22} />, loc: "Berlin" },
  { title: "Property Manager", type: "Commercial", description: "Real estate management and facility coordination.", icon: <Building size={22} />, loc: "Munich" },
  { title: "Vehicle Painter", type: "Technical", description: "Surface treatment and precision coating for cars.", icon: <Car size={22} />, loc: "Ingolstadt" },
  { title: "Laboratory Bio-Tech", type: "Medical", description: "Analyzing biological samples for medical research.", icon: <Microscope size={22} />, loc: "Göttingen" },
  { title: "Retail Sales Clerk", type: "Commercial", description: "Customer service and inventory management in retail.", icon: <Briefcase size={22} />, loc: "Berlin" },
  { title: "Structural Drafter", type: "Technical", description: "Drafting detailed plans for building structures.", icon: <Building2 size={22} />, loc: "Darmstadt" },
  { title: "Office Management", type: "Commercial", description: "Core administrative and coordination roles.", icon: <Building size={22} />, loc: "Essen" },
  { title: "Plumber (SHK)", type: "Technical", description: "Heating, cooling, and water system specialist.", icon: <Hammer size={22} />, loc: "Potsdam" },
  { title: "Warehouse Logistics", type: "Commercial", description: "In-house material flow and inventory tracking.", icon: <Briefcase size={22} />, loc: "Duisburg" },
  { title: "Speech Therapist", type: "Medical", description: "Aiding patients with vocal and speech disorders.", icon: <HeartPulse size={22} />, loc: "Berlin" }
];

// --- VECTOR HIGHLIGHT COMPONENT ---
const VectorHighlight = ({ children, color = "#a3e635" }) => (
  <span className="relative inline-block px-1">
    <span className="relative z-10">{children}</span>
    <svg className="absolute inset-0 w-[115%] h-[130%] -left-[7%] -top-[15%] z-0 pointer-events-none overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
      <motion.path
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        d="M5,50 C5,20 95,20 95,50 C95,80 5,80 5,50 Z"
        fill="none" stroke={color} strokeWidth="3" strokeLinecap="round"
      />
    </svg>
  </span>
);

const FilterDropdown = ({ icon: Icon, label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)} className={`flex items-center justify-between p-3 bg-gray-50 border transition-all cursor-pointer group ${isOpen ? 'border-indigo-600 ring-2 ring-indigo-50' : 'border-transparent hover:border-gray-200'}`}>
        <div className="flex items-center gap-3">
          <span className={`${isOpen ? 'text-indigo-600' : 'text-gray-400'}`}><Icon size={16}/></span>
          <span className="text-[12px] font-medium text-gray-600 font-inter">{selected || label}</span>
        </div>
        <ChevronRight size={14} className={`text-gray-300 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="absolute z-50 w-full mt-1 bg-white border border-gray-200 shadow-xl max-h-60 overflow-y-auto no-scrollbar">
            {options.map((opt) => (
              <div key={opt} onClick={() => { onSelect(opt); setIsOpen(false); }} className="px-4 py-2.5 text-[12px] font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 cursor-pointer">{opt}</div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function AusbildungStudyfeeds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [distance, setDistance] = useState(1000);
  const [activeFilters, setActiveFilters] = useState({ degree: "", profession: "", industry: "", date: "September 2025" });
  const [trainingTypes, setTrainingTypes] = useState({ classic: true, school: true, dual: true });

  // --- useMemo WITH CORRECT DEPENDENCIES ---
  const filteredSectors = useMemo(() => {
    return sectorsData.filter(item => 
      (item.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (activeFilters.profession === "" || item.title.includes(activeFilters.profession)) &&
      (activeFilters.industry === "" || item.type === activeFilters.industry)
    );
  }, [searchTerm, activeFilters.profession, activeFilters.industry]);

  const toggleCheckbox = (key) => setTrainingTypes(prev => ({ ...prev, [key]: !prev[key] }));
  const resetFilters = () => {
    setActiveFilters({ degree: "", profession: "", industry: "", date: "" });
    setDistance(1000);
    setSearchTerm("");
  };

  return (
    <div className="bg-white min-h-screen antialiased font-inter">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      ` }} />
      
      <section className="bg-[#fafafa] border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-[1.1] font-poppins tracking-tighter">
                Discover Your <VectorHighlight color="#a3e635">Pathways.</VectorHighlight>
              </h1>
              <p className="text-base text-gray-500 mb-8 font-medium max-w-xl">Search 350+ professional roles and find your dual-education contract for 2026.</p>
            </div>
            <div className="bg-[#001b3d] p-8 text-white shadow-xl flex justify-between items-center">
               <div><p className="text-[10px] opacity-60 uppercase font-bold">Monthly Pay</p><p className="text-lg font-semibold">€900 - €1,400</p></div>
               <div className="h-10 w-[1px] bg-white/20" />
               <div><p className="text-[10px] opacity-60 uppercase font-bold">Tuition</p><p className="text-lg font-semibold">100% Free</p></div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b border-gray-100 py-4 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center gap-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Active Filters:</span>
          {activeFilters.date && (
            <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-3 py-1 text-[11px] font-bold text-indigo-600">
              {activeFilters.date} <X size={12} className="cursor-pointer" onClick={() => setActiveFilters({...activeFilters, date: ""})} />
            </div>
          )}
        </div>
      </div>

      <section className="py-12 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-gray-900">
          
          <div className="lg:col-span-3 space-y-8 sticky top-24 h-fit pr-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold font-poppins flex items-center gap-2"><FilterIcon size={18} className="text-indigo-600" /> Filter</h2>
              <button onClick={resetFilters} className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Reset</button>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-4 font-poppins">Search Area</label>
              <input type="range" min="0" max="1000" value={distance} onChange={(e) => setDistance(e.target.value)} className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
              <div className="flex justify-between mt-2 font-inter text-[11px] font-bold text-indigo-600"><span>0 km</span><span>{distance} km</span></div>
            </div>

            <div className="space-y-2">
              <FilterDropdown icon={GraduationCap} label="Select degree" options={["High school diploma", "Baccalaureate"]} selected={activeFilters.degree} onSelect={(val) => setActiveFilters({...activeFilters, degree: val})} />
              <FilterDropdown icon={Briefcase} label="Profession" options={["Nursing", "IT", "Mechatronics"]} selected={activeFilters.profession} onSelect={(val) => setActiveFilters({...activeFilters, profession: val})} />
              <FilterDropdown icon={Building} label="Industry" options={["Medical", "Technical", "Commercial", "Construction"]} selected={activeFilters.industry} onSelect={(val) => setActiveFilters({...activeFilters, industry: val})} />
            </div>

            <div className="pt-4">
              <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5 font-poppins">Program Types</h3>
              <div className="space-y-3.5">
                {['classic', 'school', 'dual'].map((id) => (
                  <label key={id} className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center" onClick={() => toggleCheckbox(id)}>
                      <div className={`w-5 h-5 border-2 transition-all flex items-center justify-center ${trainingTypes[id] ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-200'}`}>
                        {trainingTypes[id] && <CheckCircle2 size={14} className="text-white" />}
                      </div>
                    </div>
                    <span className="text-[12px] font-medium text-gray-500 font-inter capitalize">{id} training</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gray-100 p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-2"><BellRing size={16} className="text-indigo-600" /><h4 className="font-bold text-gray-900 text-sm font-poppins">Subscribe</h4></div>
              <p className="text-[11px] text-gray-500 font-medium mb-4">Get notifications for matching jobs.</p>
              <button className="w-full py-3 bg-indigo-600 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-black transition-all">Subscribe now</button>
            </div>
          </div>

          <div className="lg:col-span-9">
            <div className="mb-10 flex flex-col md:flex-row items-center justify-between border-b border-gray-50 pb-6 gap-4">
              <h2 className="text-xl font-bold font-poppins tracking-tight">Programs Found ({filteredSectors.length})</h2>
              <div className="relative w-full md:w-80">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="Search programs..." className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 text-sm outline-none focus:border-indigo-600 transition-all" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSectors.map((sector, index) => (
                <motion.div layout key={index} className="bg-white p-5 border border-gray-100 hover:border-indigo-200 shadow-sm transition-all group cursor-pointer">
                  <div className="w-11 h-11 flex items-center justify-center bg-indigo-50 text-indigo-600 mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">{sector.icon}</div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1 font-poppins">{sector.title}</h3>
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold mb-3"><MapPin size={10} className="text-indigo-400" /> {sector.loc}</div>
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">{sector.description}</p>
                  <div className="flex items-center text-[10px] font-bold text-indigo-600 uppercase tracking-widest group-hover:gap-3 transition-all">View Details <ArrowRight size={14} className="ml-1" /></div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}