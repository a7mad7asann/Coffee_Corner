import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Coffee } from "lucide-react";

export default function BuildingLoader({ loading }) {
  const [isVisible, setIsVisible] = useState(loading);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [loading]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: loading ? 1 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 bg-white flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-orange-100/20 via-transparent to-orange-50/15"
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Coffee Cup Container */}
      <div className="relative z-10">
        {/* Coffee Cup SVG Animation */}
        <motion.svg
          width="140"
          height="180"
          viewBox="0 0 120 160"
          className="mx-auto mb-12"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          {/* Cup Body */}
          <motion.path
            d="M 30 40 L 30 120 Q 30 140 50 140 L 70 140 Q 90 140 90 120 L 90 40 Z"
            fill="none"
            stroke="url(#cupGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />

          {/* Cup Handle */}
          <motion.path
            d="M 90 60 Q 120 60 120 90 Q 120 120 90 120"
            fill="none"
            stroke="url(#cupGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
          />

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="cupGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#b85c1a" />
            </linearGradient>
          </defs>

          {/* Coffee Liquid Animation */}
          <motion.g>
            <defs>
              <clipPath id="cupClip">
                <path d="M 32 80 L 32 120 Q 32 138 50 138 L 70 138 Q 88 138 88 120 L 88 80 Z" />
              </clipPath>
            </defs>

            {/* Animated Liquid */}
            <motion.rect
              x="30"
              y="80"
              width="60"
              height="60"
              fill="url(#liquidGradient)"
              clipPath="url(#cupClip)"
              animate={{
                y: [60, 80, 60],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Liquid Gradient */}
            <defs>
              <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#d97706" />
                <stop offset="100%" stopColor="#92400e" />
              </linearGradient>
            </defs>

            {/* Coffee Ripples */}
            {[0, 1, 2].map((i) => (
              <motion.circle
                key={i}
                cx="60"
                cy="80"
                r="5"
                fill="none"
                stroke="#f97316"
                strokeWidth="1"
                opacity="0.6"
                animate={{
                  r: [5, 25],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
                clipPath="url(#cupClip)"
              />
            ))}
          </motion.g>

          {/* Steam */}
          {[0, 1, 2].map((i) => (
            <motion.path
              key={`steam-${i}`}
              d={`M ${50 + i * 15} 35 Q ${55 + i * 15} 25 ${50 + i * 15} 15`}
              fill="none"
              stroke="#f97316"
              strokeWidth="1.5"
              opacity="0.7"
              strokeLinecap="round"
              animate={{
                y: [-20, 0],
                opacity: [0, 0.7, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.svg>

        {/* Text Content */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h3 className="text-4xl font-black text-[#2f2118] tracking-tight leading-tight">
            تحضير <br /> القهوة
          </h3>
          <p className="text-sm text-[#6f5a4e] font-medium tracking-wide">
            انتظر لحظة من فضلك
          </p>
        </motion.div>

        {/* Animated Coffee Beans */}
        <motion.div
          className="mt-10 flex justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-orange-500 rounded-full shadow-md"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Floating Coffee Cups - Subtle */}
      <motion.div
        className="absolute top-20 left-10 opacity-5"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Coffee size={72} className="text-orange-500" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 opacity-5"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Coffee size={56} className="text-orange-500" />
      </motion.div>
    </motion.div>
  );
}