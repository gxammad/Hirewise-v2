'use client';
import BackToTop from "@/lib/back-to-top";
import React, { useEffect } from "react";
import { ArrowUp } from "lucide-react"; // Lucide icon

function BackToTopCom({ className = "" }) {
  useEffect(() => {
    BackToTop(".scroll-top");
  }, []);

  return (
    <button
      type="button"
    >
      <ArrowUp className={`scroll-top scroll-to-target fixed bottom-6 right-6 
        z-50 flex items-center justify-center 
        w-10 h-10 rounded-full shadow-lg 
        bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800
        hover:bg-gray-700 dark:hover:bg-gray-300 transition-all duration-500
        animate-float-fade ${className || ""}`} />  {/* Centered icon */}
    </button>
  );
}

export default BackToTopCom;
