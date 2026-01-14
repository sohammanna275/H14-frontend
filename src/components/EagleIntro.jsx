// // eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const containerVariants = {
  initial: { opacity: 1 },
  exit: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

const logoVariants = {
  initial: {
    scale: 0.5,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  exit: {
    scale: 8,                 
    opacity: 0,
    rotateX: 15,              
    filter: "blur(20px)",
    transition: {
      duration: 0.7,
      ease: "easeIn",
    },
  },
};


const EagleIntro = ({ onComplete, autoStart = true }) => {
  const [showIntro, setShowIntro] = useState(autoStart);

  const hasCompleted = useRef(false);
  const hideTimerRef = useRef(null);
  const completeTimerRef = useRef(null);

  useEffect(() => {
    if (!showIntro || hasCompleted.current) return;

    hideTimerRef.current = setTimeout(() => {
      setShowIntro(false);

      completeTimerRef.current = setTimeout(() => {
        if (!hasCompleted.current) {
          hasCompleted.current = true;
          onComplete(); 
        }
      }, 700); 
    }, 3500);

    return () => {
      clearTimeout(hideTimerRef.current);
      clearTimeout(completeTimerRef.current);
    };
  }, [onComplete, showIntro]);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0a1f0a]"
          variants={containerVariants}
          initial="initial"
          animate="initial"
          exit="exit"
          style={{ perspective: "1200px" }} 
        >
          <div className="relative w-screen h-screen flex flex-col items-center justify-center">

            <motion.svg
              viewBox="0 0 200 200"
              className="block w-[50vw] max-w-[600px] h-auto"
              variants={logoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.g
                initial={{ y: 20 }}
                animate={{ y: [20, 0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  ease: "easeOut",
                  times: [0, 0.5, 0.75, 1],
                }}
              >
                <motion.path
                  d="M100 30 L60 80 L40 75 L70 100 L50 95 L80 120 L100 100 L120 120 L150 95 L130 100 L160 75 L140 80 L100 30Z"
                  fill="#2d5a2d"
                  stroke="#4ade80"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
                <motion.path
                  d="M80 120 L100 160 L120 120"
                  fill="#1e3d1e"
                  stroke="#4ade80"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.8,
                    ease: "easeInOut",
                  }}
                />
              </motion.g>

              <motion.path
                d="M30 70 Q10 60 25 50 Q15 55 30 70"
                fill="#2d5a2d"
                stroke="#4ade80"
                strokeWidth="1.5"
                initial={{ x: 30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
              <motion.path
                d="M170 70 Q190 60 175 50 Q185 55 170 70"
                fill="#2d5a2d"
                stroke="#4ade80"
                strokeWidth="1.5"
                initial={{ x: -30, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              />
            </motion.svg>
            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
            >
              <motion.h1
                className="font-bold tracking-wider"
                style={{
                  fontSize: "clamp(3rem, 6vw, 6rem)",
                  background:
                    "linear-gradient(135deg, #4ade80 0%, #22c55e 50%, #16a34a 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "0 0 60px rgba(74, 222, 128, 0.3)",
                }}
              >
                HOSTEL - 14
              </motion.h1>

              <motion.p
                className="mt-4 text-emerald-400/80 tracking-widest"
                style={{ fontSize: "clamp(1rem, 2vw, 2rem)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2 }}
              >
                FLY ABOVE ALL
              </motion.p>
            </motion.div>
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 2, delay: 1, repeat: 1 }}
            >
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-emerald-400 rounded-full"
                  style={{
                    width: "clamp(4px, 0.8vw, 12px)",
                    height: "clamp(4px, 0.8vw, 12px)",
                    left: `${50 + Math.cos((i * Math.PI) / 4) * 40}%`,
                    top: `${50 + Math.sin((i * Math.PI) / 4) * 40}%`,
                  }}
                  animate={{
                    scale: [0, 1.5, 0],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 1.8 + i * 0.1,
                    ease: "easeOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EagleIntro;
