import { motion } from "framer-motion";

export function Button({
  children,
  onClick,
  className = "",
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: "primary" | "secondary";
}) {
  const baseClasses = `px-5 py-3 border border-primary uppercase focus:outline-none transition-all duration-300 ease-in-out`;

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-primary-600",
    secondary: "bg-white text-primary hover:bg-white-600",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className} focus:ring-4 focus:ring-blue-500`}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.15 }, // shorter duration
      }}
      whileTap={{
        scale: 0.95,
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.2)",
        transition: { duration: 0.1 }, // even quicker on tap
      }}
      transition={{
        type: "spring",
        stiffness: 500, // higher stiffness = snappier
        damping: 10, // higher damping to reduce bounce & speed up settle time
        mass: 0.25, // optional: lighter mass can also speed things up
      }}
    >
      {children}
    </motion.button>
  );
}
