import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, ChevronRight, Globe,
  X, Filter as FilterIcon,
  ChevronDown, Star, ShieldCheck, Heart,
  Settings,Check, ArrowRight, Home
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_PROVIDERS = [
  {
    id: 1,
    name: "TechSetup Germany",
    logo: "TS",
    verified: true,
    rating: 4.9,
    reviews: 128,
    categories: ["Corporate Services", "IT Consulting"],
    summary: "Complete company registration, tax setup, and IT compliance for tech startups integrating locally.",
    highlights: ["24-hour setup", "English & German interface", "Dedicated account manager"],
    languages: ["English", "German"],
    pricing: "Starting from €499",
    turnaround: "1-2 days",
    companyTypes: ["Startup", "Freelancer"],
    industries: ["IT", "eCommerce"]
  },
  {
    id: 2,
    name: "Nordic Business Group",
    logo: "NB",
    verified: true,
    rating: 4.7,
    reviews: 64,
    categories: ["Tax & Accounting", "Legal"],
    summary: "Full-stack financial administration tailored for medium enterprises crossing borders.",
    highlights: ["Quarterly audits", "Cross-border tax optimization", "Payroll automation"],
    languages: ["English", "Finnish", "German"],
    pricing: "Custom Quote",
    turnaround: "Assessed individually",
    companyTypes: ["Micro/small/medium", "Large"],
    industries: ["Manufacturing", "Consulting services"]
  },
  {
    id: 3,
    name: "Digital Nomad Relocations",
    logo: "DN",
    verified: false,
    rating: 4.5,
    reviews: 32,
    categories: ["HR & Relocation", "Coworking"],
    summary: "Seamless visa processing, residential registration, and co-working passes for remote workers.",
    highlights: ["Visa sponsorship help", "Turnkey apartments", "City induction"],
    languages: ["English", "Spanish"],
    pricing: "Package: €1,200/mo",
    turnaround: "1 week",
    companyTypes: ["Digital nomad", "Freelancer"],
    industries: ["IT", "Culture / Entertainment"]
  },
  {
    id: 4,
    name: "Alpha Legal Partners",
    logo: "AL",
    verified: true,
    rating: 4.8,
    reviews: 215,
    categories: ["Legal", "Business Development"],
    summary: "Premium corporate law firm acting as your specialized legal counsel and compliance officer.",
    highlights: ["Contract negotiation", "IP Registration", "GDPR Compliance"],
    languages: ["English", "French", "German"],
    pricing: "Starting from €150/hr",
    turnaround: "SLA-based",
    companyTypes: ["Startup", "Micro/small/medium", "Large"],
    industries: ["Banking / FinTech", "Real estate"]
  },
  {
    id: 5,
    name: "Growth Catalyst Incubator",
    logo: "GC",
    verified: true,
    rating: 4.6,
    reviews: 89,
    categories: ["Accelerators & Incubators", "Growth Support"],
    summary: "Seed-stage acceleration, mentorship networks, and initial funding access across Europe.",
    highlights: ["Pitch deck prep", "Investor matchmaking", "Strategic advisory"],
    languages: ["English"],
    pricing: "Equity or Custom",
    turnaround: "Cohort-based",
    companyTypes: ["Startup"],
    industries: ["IT", "Blockchain", "Healthcare"]
  }
];

const FILTER_TAXONOMY = {
  companyType: {
    label: "My company type",
    options: ["Freelancer", "Micro/small/medium", "Large", "Digital nomad", "Startup"]
  },
  industry: {
    label: "My target industry",
    options: ["IT", "Banking / FinTech", "eCommerce", "Consulting services", "Manufacturing", "Culture / Entertainment", "Blockchain", "Healthcare", "Real estate"]
  },
  language: {
    label: "My preferred language",
    options: ["English", "German", "Spanish", "French", "Finnish"]
  },
  services: {
    label: "Service categories",
    options: ["Tax & Accounting", "Corporate Services", "Legal", "HR & Relocation", "Business Development", "IT Consulting", "Accelerators & Incubators", "Growth Support", "Coworking"]
  }
};

export default function AusbildungStudyfeeds() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeView, setActiveView] = useState("Providers");
  const [activeFilters, setActiveFilters] = useState({});
  const [sortOption, setSortOption] = useState("Rating count");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [expandedAccordions, setExpandedAccordions] = useState(["companyType", "services"]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Derive active chips flat array
  const activeChips = Object.entries(activeFilters).flatMap(([category, options]) =>
    options.map(opt => ({ category, value: opt }))
  );

  // Filtering Logic
  const filteredProviders = useMemo(() => {
    return MOCK_PROVIDERS.filter(provider => {
      // Search matches
      const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.summary.toLowerCase().includes(searchTerm.toLowerCase());

      // Filter matches
      const matchesCompanyType = !activeFilters.companyType?.length || provider.companyTypes.some(type => activeFilters.companyType.includes(type));
      const matchesIndustry = !activeFilters.industry?.length || provider.industries.some(ind => activeFilters.industry.includes(ind));
      const matchesLanguage = !activeFilters.language?.length || provider.languages.some(lang => activeFilters.language.includes(lang));
      const matchesService = !activeFilters.services?.length || provider.categories.some(cat => activeFilters.services.includes(cat));

      return matchesSearch && matchesCompanyType && matchesIndustry && matchesLanguage && matchesService;
    }).sort((a, b) => {
      if (sortOption === "Average rating") return b.rating - a.rating;
      if (sortOption === "Rating count") return b.reviews - a.reviews;
      return 0; // Default or Newest
    });
  }, [searchTerm, activeFilters, sortOption]);

  const totalResults = filteredProviders.length;
  const paginatedProviders = filteredProviders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(totalResults / itemsPerPage);

  // Toggle filter checkbox
  const toggleFilter = (category, value) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      const updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];

      const newFilters = { ...prev, [category]: updated };
      if (updated.length === 0) delete newFilters[category];
      return newFilters;
    });
    setCurrentPage(1); // Reset to page 1 on filter
  };

  const removeChip = (category, value) => {
    toggleFilter(category, value);
  };

  const clearAllFilters = () => {
    setActiveFilters({});
    setSearchTerm("");
    setCurrentPage(1);
  };

  const toggleAccordion = (key) => {
    setExpandedAccordions(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen font-inter text-gray-800 flex flex-col">
      {/* 1. TOP NAVIGATION */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            {/* Brand Logo Area */}
            <a href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold tracking-tighter">
                ee
              </div>
              <span className="font-semibold text-lg tracking-tight group-hover:text-blue-600 transition-colors">marketplace</span>
            </a>

            {/* Desktop Nav Items */}
            <nav className="hidden md:flex items-center gap-6 text-[14px] font-medium text-gray-600">
              <a href="/" className="hover:text-gray-900 transition-colors">Why us?</a>
              <a href="/" className="hover:text-gray-900 transition-colors">How it works</a>
              <a href="/" className="hover:text-gray-900 transition-colors">Resources</a>
              <a href="/" className="text-gray-900 font-semibold border-b-2 border-blue-600 py-5">Service Providers</a>
            </nav>
          </div>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-4">
            <a href="/" className="hidden sm:block text-[14px] font-medium text-gray-600 hover:text-gray-900">Sign in</a>
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-[14px] font-medium px-5 py-2 rounded-md shadow-sm transition-all">
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO / INTRO SECTION */}
      <section className="bg-white pt-8 pb-10 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] font-medium text-gray-500 mb-6">
            <a href="/" className="hover:text-blue-600 flex items-center gap-1"><Home size={14} /> Home</a>
            <ChevronRight size={14} className="text-gray-300" />
            <a href="/" className="hover:text-blue-600">Marketplace</a>
            <ChevronRight size={14} className="text-gray-300" />
            <span className="text-gray-900">Service providers</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
              All Services and Providers
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Explore our curated selection of trusted partners out to support your business. Filter by industry, language, and services to find your perfect match.
            </p>

            {/* Optional Search Bar beneath subtitle */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search providers by name or service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. RESULTS MODE SWITCH */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-30 shadow-sm shadow-gray-100/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-3">
          <div className="flex bg-gray-100/80 p-1 rounded-lg">
            <button
              onClick={() => setActiveView("Providers")}
              className={`flex items-center gap-2 px-5 py-2 rounded-md text-[14px] font-semibold transition-all ${activeView === "Providers" ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200" : "text-gray-600 hover:text-gray-900"}`}
            >
              Providers
              <span className={`px-2 py-0.5 rounded-full text-[12px] font-bold ${activeView === "Providers" ? "bg-gray-100 text-gray-600" : "bg-gray-200/50 text-gray-500"}`}>47</span>
            </button>
            <button
              onClick={() => setActiveView("Packages")}
              className={`flex items-center gap-2 px-5 py-2 rounded-md text-[14px] font-semibold transition-all ${activeView === "Packages" ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200" : "text-gray-600 hover:text-gray-900"}`}
            >
              Packages
              <span className={`px-2 py-0.5 rounded-full text-[12px] font-bold ${activeView === "Packages" ? "bg-gray-100 text-gray-600" : "bg-gray-200/50 text-gray-500"}`}>70</span>
            </button>
          </div>

          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-md text-[14px] font-semibold text-gray-700 hover:bg-gray-50 shadow-sm"
          >
            <FilterIcon size={16} /> Filters
            {activeChips.length > 0 && (
              <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-[11px]">{activeChips.length}</span>
            )}
          </button>
        </div>
      </div>

      {/* 4. MAIN LAYOUT */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full flex gap-8 relative items-start">

        {/* 5. FILTER SIDEBAR (Desktop) */}
        <aside className={`fixed inset-y-0 left-0 z-50 w-[320px] bg-white shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:bg-transparent lg:shadow-none lg:z-auto shrink-0 ${isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="h-full flex flex-col pt-4 lg:pt-0 pb-20 lg:pb-0 overflow-y-auto lg:overflow-visible custom-scrollbar lg:sticky lg:top-[140px] max-h-[calc(100vh-140px)]">

            <div className="flex items-center justify-between px-6 lg:px-0 mb-6 lg:mb-4">
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
              <button onClick={() => setIsMobileFiltersOpen(false)} className="lg:hidden p-2 text-gray-400 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
              {activeChips.length > 0 && (
                <button onClick={clearAllFilters} className="hidden lg:block text-[13px] font-medium text-blue-600 hover:underline">
                  Clear all
                </button>
              )}
            </div>

            <div className="px-6 lg:px-0 flex flex-col gap-1">
              {Object.entries(FILTER_TAXONOMY).map(([key, data]) => {
                const isExpanded = expandedAccordions.includes(key);
                const checkedCount = activeFilters[key]?.length || 0;
                return (
                  <div key={key} className="border-b border-gray-200 py-4 last:border-0">
                    <button
                      onClick={() => toggleAccordion(key)}
                      className="w-full flex items-center justify-between text-left group outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                    >
                      <span className="text-[15px] font-semibold text-gray-900 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                        {data.label}
                        {checkedCount > 0 && (
                          <span className="w-5 h-5 bg-blue-100 text-blue-700 rounded text-[11px] flex items-center justify-center font-bold">{checkedCount}</span>
                        )}
                      </span>
                      <ChevronDown size={18} className={`text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`} />
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 flex flex-col gap-3">
                            {data.options.map(option => (
                              <label key={option} className="flex items-start gap-3 group cursor-pointer">
                                <div className="relative flex items-center justify-center pt-0.5">
                                  <input
                                    type="checkbox"
                                    checked={activeFilters[key]?.includes(option) || false}
                                    onChange={() => toggleFilter(key, option)}
                                    className="peer appearance-none w-4.5 h-4.5 border border-gray-300 rounded-[3px] checked:bg-blue-600 checked:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 transition-all cursor-pointer bg-white"
                                  />
                                  <Check size={14} strokeWidth={3} className="absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" />
                                </div>
                                <span className="text-[14px] text-gray-700 leading-snug group-hover:text-gray-900 selected:font-medium transition-colors">
                                  {option}
                                </span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Mobile sticky apply block */}
            <div className="lg:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
              <button onClick={() => setIsMobileFiltersOpen(false)} className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md shadow-sm">
                Apply Filters ({totalResults})
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile backdrop */}
        {isMobileFiltersOpen && (
          <div onClick={() => setIsMobileFiltersOpen(false)} className="fixed inset-0 bg-gray-900/40 z-40 lg:hidden backdrop-blur-sm" />
        )}

        {/* RESULTS CONTENT AREA (Right Column) */}
        <div className="flex-1 min-w-0">

          {/* 6. Results top bar / Active filter chips */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
              <div>
                <h2 className="text-[20px] font-bold text-gray-900">
                  {totalResults} provider{totalResults !== 1 && 's'} found
                </h2>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[13px] text-gray-500 font-medium">Sort by:</span>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="bg-white border border-gray-200 text-gray-700 text-[14px] font-medium rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22currentColor%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.293%207.293a1%201%200%20011.414%200L10%2010.586l3.293-3.293a1%201%200%20111.414%201.414l-4%204a1%201%200%2001-1.414%200l-4-4a1%201%200%20010-1.414z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.5rem_center] bg-no-repeat cursor-pointer shadow-sm"
                >
                  <option>Rating count</option>
                  <option>Average rating</option>
                  <option>Newest first</option>
                </select>
              </div>
            </div>

            {/* 7. Active Chips container */}
            {activeChips.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {activeChips.map(chip => (
                  <span key={`${chip.category}-${chip.value}`} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 border border-gray-200 text-gray-700 rounded-full text-[13px] font-medium shadow-sm transition-all hover:bg-gray-200">
                    {chip.value}
                    <button onClick={() => removeChip(chip.category, chip.value)} className="hover:text-gray-900 bg-white/60 rounded-full p-0.5 hover:bg-white transition-colors">
                      <X size={14} />
                    </button>
                  </span>
                ))}
                <button onClick={clearAllFilters} className="text-[13px] text-gray-500 font-medium hover:text-gray-900 underline ml-2 decoration-gray-300 underline-offset-2">
                  Clear all filters
                </button>
              </div>
            )}
          </div>

          {/* 8. Provider Results Grid */}
          {filteredProviders.length === 0 ? (
            <div className="bg-white border border-gray-100 rounded-xl p-12 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Search size={28} />
              </div>
              <h3 className="text-[18px] font-bold text-gray-900 mb-2">No providers match your criteria</h3>
              <p className="text-gray-500 text-[15px] mb-6 max-w-md mx-auto">Try broadening your search or adjusting your filters to find suitable service partners.</p>
              <button
                onClick={clearAllFilters}
                className="bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 font-semibold px-6 py-2.5 rounded-lg shadow-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
              {paginatedProviders.map((provider) => (
                <div key={provider.id} className="group bg-white border border-gray-200 hover:border-blue-300 rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex flex-col relative overflow-hidden">

                  {/* Top: Logo & Title Row */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-inner group-hover:shadow-md transition-shadow">
                      <span className="font-bold text-gray-600 text-[18px] tracking-tight">{provider.logo}</span>
                    </div>
                    <div className="min-w-0 flex-1 pt-0.5">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <h3 className="text-[17px] font-bold text-gray-900 truncate leading-tight group-hover:text-blue-600 transition-colors">
                          {provider.name}
                        </h3>
                        {provider.verified && (
                          <div title="Verified Trusted Partner" className="text-blue-600 shrink-0 bg-blue-50 rounded-full p-0.5">
                            <ShieldCheck size={16} strokeWidth={2.5} />
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[13px]">
                        <div className="flex items-center text-amber-500 font-bold bg-amber-50 px-1.5 py-0.5 rounded text-[12px]">
                          <Star size={12} fill="currentColor" className="mr-1" />
                          {provider.rating}
                        </div>
                        <span className="text-gray-500 font-medium tracking-tight">({provider.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* 9. Card metadata logic */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {provider.categories.slice(0, 2).map((cat, i) => (
                      <span key={i} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[12px] font-semibold tracking-tight border border-gray-100">
                        {cat}
                      </span>
                    ))}
                    {provider.categories.length > 2 && <span className="text-gray-400 text-[12px] font-medium pt-1">+{provider.categories.length - 2}</span>}
                  </div>

                  <p className="text-[14px] text-gray-600 leading-relaxed mb-5 line-clamp-3 bg-gray-50/50 p-3 rounded-lg border border-transparent group-hover:bg-blue-50/30 group-hover:border-blue-100 transition-colors">
                    {provider.summary}
                  </p>

                  <div className="flex flex-col gap-2.5 mt-auto pb-6">
                    <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                      <Settings size={14} className="text-gray-400 shrink-0" />
                      <span className="truncate">{provider.companyTypes[0]} & {provider.companyTypes.length - 1} more</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] text-gray-500 font-medium">
                      <Globe size={14} className="text-gray-400 shrink-0" />
                      <span className="truncate">{provider.languages.join(", ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[13px] mt-2 pt-3 border-t border-gray-100">
                      <span className="font-bold text-gray-900 bg-gray-100 px-2.5 py-1 rounded-md">{provider.pricing}</span>
                    </div>
                  </div>

                  {/* Bottom Actions */}
                  <div className="flex gap-3 mt-auto relative z-10 pt-2">
                    <button className="flex-1 bg-white border border-gray-200 text-gray-800 font-bold px-4 py-2.5 rounded-lg text-[13px] hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-sm flex justify-center items-center gap-2">
                      Profile
                    </button>
                    <button className="flex-1 bg-blue-600 text-white font-bold px-4 py-2.5 rounded-lg text-[13px] hover:bg-blue-700 shadow-sm transition-colors shadow-blue-600/20 flex justify-center items-center gap-1.5 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                      Inquire <ArrowRight size={14} />
                    </button>
                  </div>

                  {/* Subtle favorite top right */}
                  <button className="absolute top-4 right-4 text-gray-300 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-full transition-colors z-10">
                    <Heart size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* 10. Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-between border-t border-gray-200 pt-6">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md bg-white text-[14px] font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Previous
              </button>

              <div className="hidden sm:flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-9 h-9 rounded-md flex items-center justify-center text-[14px] font-bold transition-colors ${currentPage === i + 1
                        ? "bg-gray-900 text-white shadow-sm"
                        : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <div className="sm:hidden text-[14px] text-gray-500 font-medium">
                Page {currentPage} of {totalPages}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-md bg-white text-[14px] font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 11. PREMIUM FOOTER */}
      <footer className="mt-20 bg-[#0f172a] text-white border-t border-gray-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
            <div className="col-span-2 lg:col-span-2">
              <a href="/" className="flex items-center gap-2 mb-6 opacity-90 hover:opacity-100 transition-opacity w-max">
                <div className="w-8 h-8 rounded bg-blue-500 flex items-center justify-center text-white font-bold tracking-tighter">
                  ee
                </div>
                <span className="font-semibold text-[20px] tracking-tight text-white">marketplace</span>
              </a>
              <p className="text-gray-400 text-[15px] leading-relaxed max-w-sm">
                The official directory for trusted business service providers. Simplify your global expansion with vetted experts in tax, law, and growth.
              </p>
            </div>

            <div>
              <h4 className="text-gray-200 font-bold mb-5 text-[15px]">About</h4>
              <ul className="space-y-4 text-[14px] text-gray-400 font-medium">
                <li><a href="/" className="hover:text-white transition-colors">Program overview</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Success stories</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Press & Media</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>


            <div>

              <h4 className="text-gray-200 font-bold mb-5 text-[15px]">Resources</h4>
              <ul className="space-y-4 text-[14px] text-gray-400 font-medium">
                <li><a href="/" className="hover:text-white transition-colors">Knowledge Base</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Company Setup Guide</a></li>
                <li><a href="/" className="hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Brand Assets</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gray-200 font-bold mb-5 text-[15px]">Policies & Support</h4>
              <ul className="space-y-4 text-[14px] text-gray-400 font-medium">
                <li><a href="/" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Contact Support</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="/" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-800/80 gap-4">
            <p className="text-gray-500 text-[14px] font-medium">
              &copy; {new Date().getFullYear()} Republic of Innovation Marketplace. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="/" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <Globe size={18} />
              </a>
              <a href="/" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition-colors">
                <ShieldCheck size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}