import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const IBMCard = ({ article, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
    className="group bg-white flex flex-col h-full relative transition-colors duration-500 hover:bg-[#f4f4f4] cursor-pointer overflow-hidden p-6 md:p-8"
  >
    {/* Image Container - Lighter visual weight */}
    <div className="mb-10 h-40 flex items-center justify-start overflow-hidden">
      <img
        src={article.image}
        alt={article.title}
        className={`h-full ${
          article.isFullWidth ? "w-full object-cover" : "max-w-[120px] object-contain"
        } transition-transform duration-[1.5s] group-hover:scale-105 grayscale group-hover:grayscale-0`}
      />
    </div>

    {/* Metadata & Content */}
    <div className="flex flex-col flex-1">
      <p className="text-[11px] text-gray-400 font-bold mb-3 uppercase tracking-[0.2em]">
        {article.category}
      </p>

      <h3 className="text-[18px] md:text-[20px] font-normal text-gray-900 leading-[1.4] mb-8 line-clamp-3 tracking-tight">
        {article.title}
      </h3>

      {/* Pill Badge - Simplified weight */}
      <div className="mt-auto mb-10">
        <span className="px-3 py-1 bg-[#e0f7fa] text-[#006064] text-[10px] font-bold rounded-full uppercase tracking-wider">
          {article.badge}
        </span>
      </div>

      {/* Action Arrow */}
      <div className="flex justify-start">
        <ArrowRight 
          size={20} 
          className="text-[#0062ff] transition-transform duration-500 group-hover:translate-x-4" 
          strokeWidth={1.5} 
        />
      </div>
    </div>
  </motion.div>
);

export default function IBMRecommendedGrid() {
  const articles = [
    {
      id: 1,
      category: "Case Study",
      title: "Streamlining student migration to Germany with automated digital frameworks",
      badge: "Scale update",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1000", 
      isFullWidth: true,
    },
    {
      id: 2,
      category: "Engineering",
      title: "The technical requirements for 2026 German dual-education contracts",
      badge: "Industry spec",
      image: "https://www.ibm.com/design/language/static/7841961962/01_Visual_Language/01_Color/images/03_Gradients.png",
      isFullWidth: false,
    },
    {
      id: 3,
      category: "Cloud",
      title: "Securing student identity assets with IBM-standard data architecture",
      badge: "Verified",
      image: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
      isFullWidth: false,
    },
    {
      id: 4,
      category: "Intelligence",
      title: "Using AI to predict candidate compatibility with German work cultures",
      badge: "AI Report",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1000",
      isFullWidth: true,
    },
    {
      id: 5,
      category: "Visual Design",
      title: "The role of inclusive visual language in international career portals",
      badge: "Design kit",
      image: "https://www.ibm.com/design/language/static/7841961962/01_Visual_Language/01_Color/images/IBM_Color_Wheel.png",
      isFullWidth: false,
    },
    {
      id: 6,
      category: "Training",
      title: "Immersive language learning: Accelerating from A1 to B1 in 12 weeks",
      badge: "Curriculum",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000",
      isFullWidth: true,
    },
    {
      id: 7,
      category: "Partnership",
      title: "Establishing recruitment pipelines with Stuttgart engineering firms",
      badge: "Ecosystem",
      image: "https://www.ibm.com/design/language/static/7841961962/01_Visual_Language/01_Color/images/IBM_Color_Families.png",
      isFullWidth: false,
    },
    {
      id: 8,
      category: "Insights",
      title: "Mapping the 2026 European skilled labor demand for tech startups",
      badge: "Deep dive",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000",
      isFullWidth: true,
    }
  ];

  return (
    <section className="py-24 bg-white font-sans selection:bg-blue-100">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* Header */}
        <div className="mb-20">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-5">
                Recommended Insights
            </h2>
            <div className="w-16 h-[2px] bg-[#0062ff]"></div>
        </div>

        {/* 4-Column IBM Bordered Grid - Smoother flow with lighter lines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-l border-t border-gray-100">
          {articles.map((article, index) => (
            <div key={article.id} className="border-r border-b border-gray-100 h-full">
              <IBMCard article={article} index={index} />
            </div>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-20 flex justify-start">
            <button className="group flex items-center gap-5 text-[#0062ff] font-bold text-sm tracking-tight">
                View all insights 
                <div className="w-10 h-[1px] bg-[#0062ff] transition-all duration-500 group-hover:w-16"></div>
                <ArrowRight size={18} />
            </button>
        </div>
      </div>
    </section>
  );
}