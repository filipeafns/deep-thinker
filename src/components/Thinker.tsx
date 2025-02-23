"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { StarBorder } from "@/components/ui/star-border";

const baseLines = [
  // Authentication & Setup
  "Initializing NetSuite REST authentication...",
  "Generating OAuth 1.0 headers...",
  "Configuring TBA (Token Based Authentication)...",
  "Validating account credentials...",
  "Setting up REST endpoints...",
  
  // Requests & Operations
  "GET /rest/platform/v1/record/customer",
  "POST /rest/platform/v1/record/salesorder",
  "PATCH /rest/platform/v1/record/invoice/{id}",
  "Analyzing response headers...",
  "Processing rate limiting parameters...",
  
  // Data Processing
  "Mapping customer fields to NetSuite schema...",
  "Validating mandatory fields...",
  "Transforming JSON payload...",
  "Sanitizing input data...",
  "Building RESTlet request body...",
  
  // Integration Logic
  "Implementing retry mechanism...",
  "Setting up error handling...",
  "Configuring webhook listeners...",
  "Establishing secure connection...",
  "Validating SSL certificates...",
  
  // Business Logic
  "Processing customer records...",
  "Updating inventory levels...",
  "Synchronizing order status...",
  "Calculating tax rates...",
  "Validating business rules...",
  
  // Technical Operations
  "Implementing pagination logic...",
  "Optimizing batch operations...",
  "Caching authentication tokens...",
  "Managing session state...",
  "Handling concurrent requests...",
  
  // Error Handling
  "Checking response status: 429 Too Many Requests",
  "Implementing exponential backoff...",
  "Handling timeout exceptions...",
  "Processing error queue...",
  "Logging integration events...",
  
  // Performance
  "Monitoring API usage...",
  "Optimizing request payload...",
  "Analyzing response times...",
  "Implementing connection pooling...",
  "Managing memory allocation..."
];

const ChevronDown = ({ size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Thinker = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentLine, setCurrentLine] = useState(0);
  const [thinkingLines, setThinkingLines] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  // Format elapsed time
  const formatElapsedTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds} second${seconds !== 1 ? 's' : ''}`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}min and ${remainingSeconds}s`;
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime(prev => {
        // Reset at 5 minutes (300 seconds)
        if (prev >= 300) return 0;
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const lines = Array.from({ length: 1000 }, () => {
      const randomLine = baseLines[Math.floor(Math.random() * baseLines.length)];
      return randomLine;
    });
    setThinkingLines(lines);
  }, []);

  useEffect(() => {
    if (thinkingLines.length === 0) return;

    const randomPause = () => {
      setIsPaused(true);
      const pauseDuration = Math.random() * 1000 + 500; // Random pause between 500ms and 1500ms
      setTimeout(() => setIsPaused(false), pauseDuration);
    };

    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentLine((prev) => {
          const next = (prev + 1) % thinkingLines.length;
          
          // Randomly decide to pause
          if (Math.random() < 0.1) { // 10% chance to pause
            randomPause();
          }
          
          return next;
        });

        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, isHovered ? (isExpanded ? 400 : 200) : 60);

    return () => clearInterval(interval);
  }, [thinkingLines, isHovered, isExpanded, isPaused]);

  // Split text into words for animation
  const splitIntoWords = (text: string) => text.split(' ');

  return (
    <div className="relative w-[450px]">
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "center center" }}
      >
        <StarBorder 
          as="div"
          className="w-[450px] !p-[1px] shadow-[0_0_0_1px_rgba(255,255,255,0.1)]"
          color="white"
          speed="20s"
        >
          <motion.div 
            className="bg-black backdrop-blur-sm relative overflow-hidden border-0"
            animate={{ height: isExpanded ? 450 : 200 }}
            transition={{ duration: 0.3 }}
          >
            {/* Centered blur overlay */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[40px] z-[99] rounded-lg">
              {/* Gaussian blur effect */}
              <div 
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-green-500 scale-150 animate-pulse"
                style={{ filter: 'blur(50px)' }}
              />
            </div>

            <div className="flex flex-col h-full p-4">
              <div className="flex items-center gap-2 mb-2">
                <motion.div
                  className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: isHovered ? 2 : 1, repeat: Infinity, ease: "linear" }}
                />
                <motion.p 
                  className="text-white/80 font-medium min-w-[140px] text-[14px]"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  Thinking for {formatElapsedTime(elapsedTime)}
                </motion.p>
              </div>
              
              {/* Content container with gradient masks */}
              <div className="relative">
                <motion.div 
                  className="relative"
                  animate={{ height: isExpanded ? 400 : 150 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Top gradient mask */}
                  <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black to-transparent z-10" />
                  
                  {/* Bottom gradient mask */}
                  <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black to-transparent z-10" />
                  
                  {/* Scrolling content */}
                  <div 
                    ref={scrollRef}
                    className="h-full overflow-hidden font-mono text-sm text-white/60 relative"
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-0.5"
                    >
                      {thinkingLines.slice(0, currentLine + 1).map((line, i) => (
                        <motion.div
                          key={i}
                          className="px-2 py-0.5 rounded hover:bg-white/5 flex flex-wrap gap-1"
                        >
                          {splitIntoWords(line).map((word, wordIndex) => (
                            <motion.span
                              key={`${i}-${wordIndex}`}
                              initial={{ 
                                opacity: 0, 
                                y: 20,
                              }}
                              animate={{ 
                                opacity: isPaused ? [0.3, 0.6, 0.3] : 1,
                                y: 0 
                              }}
                              transition={{ 
                                duration: isPaused ? 1 : 0.2,
                                delay: wordIndex * 0.05, // Stagger each word
                                ease: isPaused ? "easeInOut" : [0.25, 0.1, 0.25, 1],
                                opacity: {
                                  repeat: isPaused ? Infinity : 0,
                                  duration: 1
                                }
                              }}
                            >
                              {word}
                            </motion.span>
                          ))}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </StarBorder>
      </motion.div>

      {/* Fixed-position button container */}
      <div className="absolute left-0 right-0 bottom-[10px] flex justify-center z-50 pointer-events-none">
        <motion.button
          className="pointer-events-auto flex items-center gap-1 px-3 py-1 rounded-full 
                    bg-black/50 backdrop-blur-sm border border-white/10
                    text-white/70 text-sm hover:text-white/90 transition-colors"
          onClick={() => setIsExpanded(!isExpanded)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{isExpanded ? 'Hide details' : 'Show details'}</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>
      </div>
    </div>
  );
}; 