
import { motion } from 'framer-motion';

export default function Signature() {
  return (
    <div className="w-48 md:w-64 h-16 border border-white/10 rounded-lg flex items-center justify-center bg-white/5 overflow-hidden animate-pulse">
      <svg
        viewBox="0 0 300 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full p-2"
      >
        {/* A simple continuous signature-like path */}
        <path
          d="M20,60 C40,40 40,80 60,60 C70,50 70,30 60,40 C50,50 50,70 70,70 C90,70 90,40 110,50 C120,55 120,65 130,60 C150,50 170,50 190,60 C210,70 230,40 250,50 C260,55 270,60 280,50"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
