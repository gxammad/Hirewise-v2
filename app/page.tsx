import Link from "next/link";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeaturesSection";
import Services from "@/components/Servcies";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamsSection";
import BrandsSection from "@/components/BrandsSection";
import TestimonialSection from "@/components/TestimonialSection";
import InterviewSection from "@/components/InterviewSection";
import InterviewQuestionBank from "@/components/Interviewquestions";
import StatsSection from "@/components/StatsSection";
import BlogSection from "@/components/BlogArea";
import GallerySection from "@/components/GallerySection";
import PricingArea from "@/components/PricingArea";
import BackToTopCom from "../components/common/back-to-top-com";
import AIJobsSection from "@/components/AISection";
import JobsSection from "@/components/JobsSection";
import FAQs from "@/components/FaqsSection";
export default function HomePage() {
  return (
    <div className="min-h-screen  flex flex-col items-center justify-center px-6 transition-colors duration-300">
      {/* Hero Section */}
      <HeroSection />
      {/* Main Content */}
     
      {/* About Section */}
      <AboutSection />
       <Services />
      {/* Stats Section */}
      <StatsSection />
      <JobsSection />
        <FeaturesSection />
      {/* Teams Highlights */}
      <TeamSection />
      {/* Feature Highlights */}
      {/* Brands Section */}
      <BrandsSection />
      {/* Testimonial Section */}
      <TestimonialSection />
      {/* Interview Section */}
      <InterviewSection />
      <PricingArea />
      {/* Gallery Section */}
      <GallerySection />
      <AIJobsSection />
       <FAQs />
      {/* Blog Section */}
      <BlogSection />
         
      <InterviewQuestionBank />
  
      <BackToTopCom />
    </div>
  );
}