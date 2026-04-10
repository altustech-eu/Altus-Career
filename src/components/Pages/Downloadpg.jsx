import React, { useState, useRef } from "react";
import { gsap } from "gsap";
import {
  Download,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

// --- DATA GENERATOR ---
const generatePages = () => {
  const categories = [
    "Medical",
    "Technology",
    "Engineering",
    "Services",
    "Artisan",
    "Finance"
  ];

  const pages = [];

  for (let i = 0; i < 26; i++) {
    const type = categories[i % categories.length];

    pages.push({
      left: {
        title: `Module ${i + 1}`,
        type,
        content: `Official technical framework and certification requirements for the ${type} sector in Germany.`,
        id: `altus-module-${i + 1}`
      },
      right: {
        title: `Strategic ${type}`,
        type: "Outcome",
        content:
          "Expected salary progression and career milestones for international talent in 2026.",
        id: `altus-outcome-${i + 1}`
      }
    });
  }

  return pages;
};

const bookPages = generatePages();

export default function RealBookUI() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [downloading, setDownloading] = useState(null);
  const flipPageRef = useRef(null);

  const triggerRealDownload = (id, title) => {
    setDownloading(id);

    setTimeout(() => {
      const content = `Altus Career - ${title}\nRef ID: ${id}`;
      const blob = new Blob([content], { type: "text/plain" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `${title.replace(/\s+/g, "-").toLowerCase()}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(url);
      setDownloading(null);
    }, 800);
  };

  const handleNext = () => {
    if (currentIndex >= bookPages.length - 1 || isAnimating) return;

    setIsAnimating(true);
    const el = flipPageRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex((prev) => prev + 1);
        gsap.set(el, { rotateY: 0, display: "none" });
        setIsAnimating(false);
      }
    });

    gsap.set(el, { display: "block", rotateY: 0 });

    tl.to(el, {
      rotateY: -180,
      duration: 0.9,
      ease: "power2.inOut",
      transformOrigin: "left center"
    });
  };

  const handlePrev = () => {
    if (currentIndex <= 0 || isAnimating) return;

    setIsAnimating(true);
    const el = flipPageRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentIndex((prev) => prev - 1);
        gsap.set(el, { rotateY: -180, display: "none" });
        setIsAnimating(false);
      }
    });

    gsap.set(el, { display: "block", rotateY: -180 });

    tl.to(el, {
      rotateY: 0,
      duration: 0.9,
      ease: "power2.inOut",
      transformOrigin: "left center"
    });
  };

  const PageContent = ({ page, side }) => {
    const [first, second] = page.title.split(" ");

    return (
      <div
        className={`w-full h-full p-8 md:p-14 flex flex-col justify-between bg-white ${
          side === "left" ? "border-r border-slate-100" : ""
        }`}
      >
        <div>
          <span className="text-[9px] font-bold uppercase text-blue-500 block mb-6">
            {page.type}
          </span>

          <h2 className="text-3xl md:text-4xl font-light uppercase text-slate-900 mb-4">
            {first} <span className="font-bold">{second}</span>
          </h2>

          <p className="text-sm text-slate-400 mb-8 max-w-xs">
            {page.content}
          </p>

          <button
            onClick={() => triggerRealDownload(page.id, page.title)}
            className="flex items-center gap-2 px-5 py-2 border rounded-full"
          >
            {downloading === page.id ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}
            <span className="text-xs font-bold">Download</span>
          </button>
        </div>

        <div className="text-[10px] text-slate-300">
          {side === "left"
            ? `P.${currentIndex * 2 + 1}`
            : `P.${currentIndex * 2 + 2}`}
        </div>
      </div>
    );
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#F8FAFC]">
      
      <Link to="/" className="absolute top-6 left-6 flex items-center gap-2">
        <ArrowLeft size={18} />
        <span>Back</span>
      </Link>

      <div className="relative w-full max-w-5xl aspect-[1.5/1]">
        <div className="flex w-full h-full bg-white border">
          <div className="w-1/2">
            <PageContent page={bookPages[currentIndex].left} side="left" />
          </div>

          <div className="w-1/2">
            <PageContent page={bookPages[currentIndex].right} side="right" />
          </div>
        </div>

        <div
          ref={flipPageRef}
          className="absolute right-0 top-0 w-1/2 h-full hidden"
        >
          {bookPages[currentIndex + 1] && (
            <PageContent
              page={bookPages[currentIndex + 1].left}
              side="left"
            />
          )}
        </div>
      </div>

      <div className="mt-10 flex gap-10">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          <ChevronLeft /> Prev
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === bookPages.length - 1}
        >
          Next <ChevronRight />
        </button>
      </div>
    </section>
  );
}