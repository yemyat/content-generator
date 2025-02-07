import * as React from "react";
import { cn } from "~/lib/utils";
import { Button, type ButtonProps } from "~/components/ui/button";
import { Loader2, Check, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export interface AnimatedButtonProps extends ButtonProps {
  status?: "normal" | "loading" | "success" | "error";
  loadingText?: string;
  successText?: string;
  errorText?: string;
}

const AnimatedButton = React.forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  (
    {
      className,
      status = "normal",
      children,
      loadingText,
      successText,
      errorText,
      disabled,
      ...props
    },
    ref,
  ) => {
    const getStatusColor = () => {
      switch (status) {
        case "success":
          return "var(--success)";
        case "error":
          return "var(--destructive)";
        default:
          return "";
      }
    };

    const getContent = () => {
      const variants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
      };

      switch (status) {
        case "loading":
          return (
            <motion.div
              key="loading"
              className="flex items-center justify-center"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.2 }}
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>{loadingText ?? children}</span>
            </motion.div>
          );
        case "success":
          return (
            <motion.div
              key="success"
              className="flex items-center justify-center"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.2 }}
            >
              <Check className="mr-2 h-4 w-4" />
              <span>{successText ?? children}</span>
            </motion.div>
          );
        case "error":
          return (
            <motion.div
              key="error"
              className="flex items-center justify-center"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.2 }}
            >
              <X className="mr-2 h-4 w-4" />
              <span>{errorText ?? children}</span>
            </motion.div>
          );
        default:
          return (
            <motion.div
              key="normal"
              className="flex items-center justify-center"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={variants}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          );
      }
    };

    return (
      <Button
        className={cn(
          "relative overflow-hidden transition-colors duration-300",
          status === "loading" && "cursor-not-allowed opacity-80",
          className,
        )}
        style={{
          backgroundColor: getStatusColor(),
        }}
        disabled={disabled ?? status === "loading"}
        ref={ref}
        {...props}
      >
        <AnimatePresence mode="wait">{getContent()}</AnimatePresence>
      </Button>
    );
  },
);
AnimatedButton.displayName = "AnimatedButton";

export { AnimatedButton };
