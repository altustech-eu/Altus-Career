import React from "react";
import { Linkedin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerData = {
    "Hire Talent": [
      "Hire Freelance Developers",
      "Hire Freelance Designers",
      "Hire Freelance Marketers",
      "Hire Vocational Trainees",
      "Hire Study Abroad Interns",
      "Hire Project Managers",
      "Hire Sales Experts",
    ],
    "Featured Skills": {
      column1: [
        "Nursing (Ausbildung)",
        "IT Specialist",
        "Mechatronics",
        "Hospitality Management",
        "AI Engineers",
        "React.js Developers",
        "Python Developers",
      ],
      column2: [
        "Front-end Developers",
        "UX Designers",
        "UI Designers",
        "Mobile App Designers",
        "Graphic Designers",
        "SEO Experts",
        "Social Media Creators",
      ],
      column3: [
        "Digital Product Managers",
        "Web Project Managers",
        "Finance Experts",
        "Interim CFOs",
        "M&A Consultants",
        "Startup Consultants",
        "Visa Specialists",
      ],
    },
    "About": [
      "Why Altus?",
      "Contact Us",
      "Press Center",
      "Careers",
      "About Us",
    ]
  };

  return (
    <footer className="bg-[#f8fafc] text-slate-900 py-16 px-6 sm:px-12 lg:px-20 font-sans border-t border-slate-200">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-200">
          
          {/* Column 1: Hire Talent */}
          <div className="lg:col-span-2">
            <h6 className="text-[13px] font-black mb-8 text-slate-900 uppercase tracking-widest">Hire Talent</h6>
            <ul className="space-y-4 text-[13px] text-slate-500 font-medium">
              {footerData["Hire Talent"].map((link) => (
                <li key={link}><a href="/" className="hover:text-blue-600 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>

          {/* Column 2-4: Featured Skills (Mega Column) */}
          <div className="lg:col-span-8">
            <h6 className="text-[13px] font-black mb-8 text-slate-900 uppercase tracking-widest">Featured Skills</h6>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <ul className="space-y-4 text-[13px] text-slate-500 font-medium">
                {footerData["Featured Skills"].column1.map((link) => (
                  <li key={link}><a href="/" className="hover:text-blue-600 transition-colors">{link}</a></li>
                ))}
              </ul>
              <ul className="space-y-4 text-[13px] text-slate-500 font-medium">
                {footerData["Featured Skills"].column2.map((link) => (
                  <li key={link}><a href="/" className="hover:text-blue-600 transition-colors">{link}</a></li>
                ))}
              </ul>
              <ul className="space-y-4 text-[13px] text-slate-500 font-medium">
                {footerData["Featured Skills"].column3.map((link) => (
                  <li key={link}><a href="/" className="hover:text-blue-600 transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 5: About */}
          <div className="lg:col-span-2">
            <h6 className="text-[13px] font-black mb-8 text-slate-900 uppercase tracking-widest">About</h6>
            <ul className="space-y-4 text-[13px] text-slate-500 font-medium">
              {footerData["About"].map((link) => (
                <li key={link}><a href="/" className="hover:text-blue-600 transition-colors">{link}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Brand & Social Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center py-10 gap-8 border-b border-slate-200">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
               <div className="w-6 h-6 bg-slate-900 rotate-45 flex items-center justify-center shadow-lg">
                  <div className="-rotate-45 text-white font-black text-xs">A</div>
               </div>
               <span className="text-xl font-bold tracking-tighter text-slate-900">ALTUS.</span>
            </div>
            <span className="h-4 w-[1px] bg-slate-300 hidden sm:block" />
            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] hidden sm:block">
              The World's Top Talent, On Demand®
            </p>
          </div>

          <div className="flex gap-4">
            {[Linkedin, Twitter, Facebook, Instagram].map((Icon, i) => (
              <a 
                key={i} 
                href="/" 
                className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10 text-[11px] font-bold text-slate-400 uppercase tracking-[0.15em]">
          <p>© 2010 - {currentYear} Altus Network</p>
          <div className="flex gap-8">
            <a href="/" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="/" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="/Download" className="hover:text-slate-900 transition-colors">DOwnload</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;