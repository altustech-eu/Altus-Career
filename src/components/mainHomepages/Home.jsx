import React from "react";
import { motion } from "framer-motion";
import Navbar from "../Pages/Navigation"; 
import HeroSection from "./HeroSection";
import Banner from "./banner";
import Meetstudent2 from "./Meetstudent2";
import Worldclass from "./Worldclasstalent";
import PopularSectors from "./Popularsector";
import Buildamazing from "./Buildamazingteam";
import Whyorg from "./Why Organizations";
import LeadintheAI from "./LeadintheAI";
import Alutspublications from "./AltusPublications";
import Faq1 from "./FAQ1";
import Footer from "../Pages/Footer";

// Scroll animation wrapper
const ScrollSection = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    {children}
  </motion.div>
);

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth; }
      `}} />

      <Banner />
      <Navbar />

      <ScrollSection>
        <HeroSection />
      </ScrollSection>

       <ScrollSection>
        <LeadintheAI />
      </ScrollSection>

      


      <ScrollSection>
        <Meetstudent2 />
      </ScrollSection>

      <ScrollSection>
        <Worldclass />
      </ScrollSection>


       <ScrollSection>
        <Buildamazing />
      </ScrollSection>

      
       <ScrollSection>
        <Whyorg />
      </ScrollSection>

      <ScrollSection>
        <PopularSectors />
      </ScrollSection>

      
       <ScrollSection>
        <Alutspublications />
      </ScrollSection>

      

<ScrollSection>
        <Faq1 />
      </ScrollSection>



      <ScrollSection>
        <Footer />
      </ScrollSection>
      

      {/* Add more sections inside ScrollSection as needed */}
      
    </main>
  );
}