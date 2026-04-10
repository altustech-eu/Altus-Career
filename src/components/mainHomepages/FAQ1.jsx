import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

export default function ExpertSkillsets() {
  const [activeId, setActiveId] = useState(null);

  const skills = [
    { id: 1, title: "Web Development", content: ["React.js", "Next.js", "Node.js", "Tailwind CSS"] },
    { id: 2, title: "DevOps & Cloud Computing", content: ["AWS", "Docker", "Kubernetes", "CI/CD Pipelines"] },
    { id: 3, title: "UX/UI Designers", content: ["Figma", "Adobe XD", "User Research", "Prototyping"] },
    { id: 4, title: "Programming Languages", content: ["Python", "JavaScript", "TypeScript", "Go", "Rust"] },
    { id: 5, title: "Software Development Roles", content: ["Frontend", "Backend", "Fullstack", "Tech Lead"] },
    { id: 6, title: "Quality Assurance & Testing", content: ["Selenium", "Cypress", "Manual Testing", "Automation"] },
    { id: 7, title: "API Development & Integration", content: ["REST APIs", "GraphQL", "Webhooks", "Microservices"] },
    { id: 8, title: "Blockchain Development", content: ["Solidity", "Smart Contracts", "Web3.js", "Ethereum"] },
    { id: 9, title: "Desktop Development", content: ["Electron", "Qt", "C# .NET", "JavaFX"] },
    { id: 10, title: "AR/VR & Game Development", content: ["Unity", "Unreal Engine", "C++", "Three.js"] },
    { id: 11, title: "Nursing (Ausbildung)", content: ["Pflegefachmann", "Elderly Care", "Clinical Support"] },
    { id: 12, title: "IT Specialist (Ausbildung)", content: ["System Integration", "Application Development"] },
    { id: 13, title: "Mechatronics (Ausbildung)", content: ["Robotics", "Automation", "Circuit Design"] },
    { id: 14, title: "Masters in Germany", content: ["CS Masters", "Engineering", "Business Schools"] },
    { id: 15, title: "Visa & Embassy Support", content: ["Schengen Visa", "Student Permits", "Documentation"] },
    { id: 16, title: "Visual & Brand Design", content: ["Logo Design", "Brand Guidelines", "Typography"] },
    { id: 17, title: "Product & Project Management", content: ["Agile/Scrum", "Kanban", "Product Roadmap"] },
    { id: 18, title: "Finance & Management", content: ["Interim CFO", "M&A", "Financial Modeling"] },
    { id: 19, title: "Marketing & Growth", content: ["SEO", "Content Strategy", "Performance Ads"] },
    { id: 20, title: "Trending Skills & Roles", content: ["Generative AI", "LLM Fine-tuning", "Prompt Eng."] },
  ];

  const containerEase = [0.22, 1, 0.36, 1];

  return (
    <section className="py-20 bg-white font-sans selection:bg-indigo-50">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-24">
        
        {/* Lighter Header */}
        <div className="flex flex-col items-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: containerEase }}
            className="text-4xl md:text-5xl font-light text-slate-900 tracking-tight text-center"
          >
            Our Expert <span className="font-bold">Skillsets</span>
          </motion.h2>
          <div className="w-10 h-[2px] bg-pink-500 mt-6" />
        </div>

        {/* Streamlined Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-slate-100">
          {skills.map((skill, index) => (
            <motion.div 
              key={skill.id} 
              className={`relative border-b border-slate-100 transition-colors duration-500 ${
                index % 2 === 0 ? "md:border-r" : ""
              } ${activeId === skill.id ? "bg-slate-50/50" : "hover:bg-slate-50/30"}`}
            >
              <motion.button 
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveId(activeId === skill.id ? null : skill.id)}
                className="w-full py-8 px-8 lg:px-12 flex items-center justify-between text-left group"
              >
                <div className="flex items-center gap-6">
                  <span className="text-[10px] font-bold text-slate-300 tracking-widest tabular-nums">
                    {skill.id < 10 ? `0${skill.id}` : skill.id}
                  </span>
                  <span className={`text-lg transition-colors duration-300 ${activeId === skill.id ? "text-indigo-600 font-bold" : "text-slate-700 font-medium group-hover:text-indigo-500"}`}>
                    {skill.title}
                  </span>
                </div>
                
                <div className="relative flex items-center justify-center shrink-0">
                  <motion.div
                    animate={{ rotate: activeId === skill.id ? 45 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`p-1.5 rounded-full transition-colors ${activeId === skill.id ? "text-pink-500" : "text-slate-300 group-hover:text-slate-400"}`}
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {activeId === skill.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: containerEase }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 px-8 lg:px-12 ml-14 flex flex-wrap gap-2">
                      {skill.content.map((item, i) => (
                        <motion.span 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          key={item} 
                          className="px-3 py-1.5 bg-white border border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition-all cursor-pointer shadow-sm"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Background Decorator */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none z-0 opacity-[0.03]">
          <div className="absolute top-1/4 left-10 w-64 h-64 bg-indigo-400 blur-[120px] rounded-full" />
          <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-pink-400 blur-[120px] rounded-full" />
      </div>
    </section>
  );
}